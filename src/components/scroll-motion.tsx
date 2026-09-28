"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { createCinematicRenderer } from "@/lib/cinematic-renderer";

type MotionValue = {
  element: HTMLElement;
  property: string;
  current: number;
  target: number;
  written: string | null;
};

type ScrollTrack = {
  element: HTMLElement;
  top: number;
  height: number;
  stageHeight?: number;
  stickyTop: number;
  pinned: boolean;
  enter?: MotionValue;
  progress?: MotionValue;
};

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));

// offsetTop measures layout, so our own CSS transforms cannot feed back into
// the scroll geometry on resize or font/image load.
function layoutTop(element: HTMLElement): number {
  let top = 0;
  let current: HTMLElement | null = element;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return top;
}

export function ScrollMotion(): null {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.getElementById("top");
    if (!root) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const values: MotionValue[] = [];
    const createValue = (element: HTMLElement, property: string): MotionValue => {
      const value = { element, property, current: 0, target: 0, written: null };
      values.push(value);
      return value;
    };
    const pageProgress = createValue(root, "--page-progress");
    const scrollVelocity = createValue(root, "--scroll-velocity");
    const storyProgress = createValue(root, "--story-progress");
    const heroProgress = createValue(root, "--hero-progress");
    const tracks: ScrollTrack[] = [
      ...Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-scene]"),
        (element) => ({
          element, top: 0, height: 0, stickyTop: 0, pinned: false,
          enter: createValue(element, "--scene-enter"),
          progress: createValue(element, "--scene-progress"),
        })),
      ...Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-section]"),
        (element) => ({
          element, top: 0, height: 0, stickyTop: 0, pinned: false,
          enter: createValue(element, "--section-enter"),
        })),
      ...Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"),
        (element) => ({
          element, top: 0, height: 0, stickyTop: 0, pinned: false,
          enter: createValue(element, "--reveal-enter"),
        })),
    ];
    const tilts = Array.from(root.querySelectorAll<HTMLElement>("[data-tilt]"),
      (element) => ({
        element,
        x: createValue(element, "--pointer-x"),
        y: createValue(element, "--pointer-y"),
        bounds: null as DOMRect | null,
      }));

    let enabled = false;
    let disposed = false;
    let printing = false;
    let frame: number | null = null;
    let previousTime = 0;
    let geometryDirty = true;
    let targetsDirty = true;
    let snap = true;
    let viewportHeight = window.innerHeight;
    let scrollRange = 1;
    let lastScrollY = window.scrollY;
    let lastScrollTime = 0;
    const canvas = root.querySelector<HTMLCanvasElement>("[data-cinematic-canvas]");
    // A chapter is a content boundary, never an additional scroll container.
    const chapters = Array.from(root.querySelectorAll<HTMLElement>(
      "[data-scroll-scene], [data-scroll-section], .project-details, [data-case-chapter]",
    )).filter((element) => !element.querySelector("[data-scroll-scene]"));
    let chapterPositions: number[] = [];
    let cinematic: ReturnType<typeof createCinematicRenderer> = null;
    let renderedFrame = "";

    const measure = () => {
      viewportHeight = Math.max(1, window.innerHeight);
      const headerHeight = root.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 80;
      tracks.forEach((track) => {
        const stickyChild = track.element.matches("[data-scroll-scene]")
          ? track.element.querySelector<HTMLElement>("[data-scroll-sticky]")
          : null;
        if (stickyChild) {
          track.stageHeight = stickyChild.offsetHeight;
          // A tall chapter scrolls fully into view before it holds. Its links
          // remain reachable even on short laptops or with enlarged text.
          track.element.style.setProperty("--scene-stage-height", `${track.stageHeight}px`);
        }
        track.pinned = Boolean(stickyChild && getComputedStyle(stickyChild).position === "sticky");
        const configuredTop = Number.parseFloat(
          stickyChild ? getComputedStyle(stickyChild).top : "",
        );
        track.stickyTop = Number.isFinite(configuredTop) ? configuredTop : headerHeight;
      });
      // Scene heights above can move all following sections. Measure positions
      // only after every scene has received its intrinsic stage height.
      tracks.forEach((track) => {
        track.top = layoutTop(track.element);
        track.height = track.element.offsetHeight;
      });
      scrollRange = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
      chapterPositions = chapters.map((element, index) => index === 0 ? 0 :
        clamp(layoutTop(element) - viewportHeight * .35, 0, scrollRange));
      cinematic?.resize(window.innerWidth, viewportHeight);
      renderedFrame = "";
      tilts.forEach((tilt) => { tilt.bounds = null; });
      geometryDirty = false;
      targetsDirty = true;
    };

    const updateTargets = () => {
      const scrollY = window.scrollY;
      const focused = document.activeElement;
      // Short sections near the footer must reach their final pose at the
      // actual end of the document, without requiring empty scroll space.
      const progressBetween = (start: number, end: number) =>
        clamp((scrollY - start) / Math.max(1, Math.min(end, scrollRange) - start));
      pageProgress.target = clamp(scrollY / scrollRange);
      let chapter = 0;
      for (let index = 1; index < chapterPositions.length; index++) {
        const start = chapterPositions[index - 1];
        const end = chapterPositions[index];
        if (scrollY >= end) chapter = index;
        else {
          chapter = index - 1 + clamp((scrollY - start) / Math.max(1, end - start));
          break;
        }
      }
      storyProgress.target = chapter / Math.max(1, chapterPositions.length - 1);
      tracks.forEach((track) => {
        const hasFocus = focused?.matches(":focus-visible") && track.element.contains(focused);
        if (track.enter) {
          track.enter.target = hasFocus
            ? 1
            : progressBetween(track.top - viewportHeight, track.top - viewportHeight * 0.15);
          // Keyboard navigation must never wait for an entrance animation.
          // Pointer focus must not move a link between pointerdown and click.
          if (hasFocus) track.enter.current = 1;
        }
        if (track.progress) {
          track.progress.target = track.pinned
            ? progressBetween(
                track.top - track.stickyTop,
                track.top + track.height - (track.stageHeight ?? viewportHeight) - track.stickyTop,
              )
            : progressBetween(
                Math.max(0, track.top - viewportHeight * 0.75),
                track.top + track.height - viewportHeight * 0.25,
              );
        }
      });
      heroProgress.target = tracks.find((track) => track.element.matches("[data-scroll-scene]"))?.progress?.target ?? pageProgress.target;
      targetsDirty = false;
    };

    const tick = (time: number) => {
      frame = null;
      if (!enabled || disposed || document.hidden) return;
      if (!root.classList.contains("motion-enabled")) {
        // Prime the variables before enabling CSS, then measure its actual
        // sticky layout and finalize values in this same frame before paint.
        values.forEach((value) => {
          const output = value.current.toFixed(4);
          value.element.style.setProperty(value.property, output);
          value.written = output;
        });
        root.classList.add("motion-enabled");
        root.dataset.motion = "on";
        geometryDirty = true;
      }
      if (geometryDirty) measure();
      if (targetsDirty) updateTargets();

      const elapsed = previousTime ? Math.min(64, time - previousTime) : 16;
      const blend = 1 - Math.exp(-elapsed / 95);
      if (reducedMotion.matches || time - lastScrollTime > 80) scrollVelocity.target = 0;
      let unsettled = Math.abs(scrollVelocity.target) > 0.0005;
      values.forEach((value) => {
        const difference = value.target - value.current;
        // Reduced motion removes trailing inertia, while scroll remains in
        // direct control of the scene instead of disabling the experience.
        if (snap || reducedMotion.matches || Math.abs(difference) < 0.0005) value.current = value.target;
        else {
          value.current += difference * blend;
          unsettled = true;
        }
        const output = value.current.toFixed(4);
        if (output !== value.written) {
          value.element.style.setProperty(value.property, output);
          value.written = output;
        }
      });
      const portraitTilt = tilts[0];
      const cinematicFrame = {
        chapter: storyProgress.current,
        hero: heroProgress.current,
        velocity: scrollVelocity.current,
        pointerX: portraitTilt?.x.current ?? 0,
        pointerY: portraitTilt?.y.current ?? 0,
        reducedMotion: reducedMotion.matches,
      };
      const signature = Object.values(cinematicFrame).map((value) =>
        typeof value === "number" ? value.toFixed(4) : String(value)).join(",");
      if (signature !== renderedFrame) {
        cinematic?.render(cinematicFrame);
        renderedFrame = signature;
      }
      snap = false;
      previousTime = unsettled ? time : 0;
      if (unsettled && frame === null) frame = window.requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (enabled && !disposed && !document.hidden && frame === null) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const invalidateGeometry = () => {
      geometryDirty = true;
      schedule();
    };
    if (canvas) cinematic = createCinematicRenderer(canvas, invalidateGeometry);

    const resetPointers = () => {
      tilts.forEach((tilt) => {
        tilt.x.target = 0;
        tilt.y.target = 0;
        tilt.bounds = null;
      });
      schedule();
    };

    const onScroll = () => {
      const now = performance.now();
      const elapsed = Math.max(16, now - lastScrollTime);
      scrollVelocity.target = reducedMotion.matches ? 0 : clamp((window.scrollY - lastScrollY) / elapsed / 2, -1, 1);
      lastScrollY = window.scrollY;
      lastScrollTime = now;
      targetsDirty = true;
      // A moved document invalidates pointer bounds, but needs no layout reads.
      tilts.forEach((tilt) => { tilt.bounds = null; });
      schedule();
    };

    const onFocus = () => {
      targetsDirty = true;
      resetPointers();
    };

    const clearMotion = () => {
      enabled = false;
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      previousTime = 0;
      root.classList.remove("motion-enabled");
      root.dataset.motion = "off";
      root.style.setProperty("--ambient-play-state", "paused");
      values.forEach((value) => {
        value.element.style.removeProperty(value.property);
        value.current = 0;
        value.target = 0;
        value.written = null;
      });
      tilts.forEach((tilt) => { tilt.bounds = null; });
    };

    const startMotion = () => {
      if (printing) {
        clearMotion();
        return;
      }
      enabled = true;
      root.style.setProperty("--ambient-play-state", "running");
      lastScrollY = window.scrollY;
      lastScrollTime = 0;
      if (reducedMotion.matches) {
        tilts.forEach((tilt) => { tilt.x.target = 0; tilt.y.target = 0; });
      }
      geometryDirty = true;
      targetsDirty = true;
      snap = true;
      schedule();
    };

    const beforePrint = () => {
      printing = true;
      clearMotion();
    };

    const afterPrint = () => {
      printing = false;
      startMotion();
    };

    const onVisibility = () => {
      if (document.hidden) {
        root.style.setProperty("--ambient-play-state", "paused");
        scrollVelocity.target = 0;
        scrollVelocity.current = 0;
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
        previousTime = 0;
      } else {
        startMotion();
      }
    };

    const pointerCleanups = tilts.map((tilt) => {
      const move = (event: PointerEvent) => {
        if (!enabled || reducedMotion.matches || !finePointer.matches || event.pointerType === "touch") return;
        tilt.bounds ??= tilt.element.getBoundingClientRect();
        const { left, top, width, height } = tilt.bounds;
        if (!width || !height) return;
        tilt.x.target = clamp(((event.clientX - left) / width) * 2 - 1, -1, 1);
        tilt.y.target = clamp(((event.clientY - top) / height) * 2 - 1, -1, 1);
        schedule();
      };
      const leave = () => {
        tilt.x.target = 0;
        tilt.y.target = 0;
        tilt.bounds = null;
        schedule();
      };
      tilt.element.addEventListener("pointermove", move, { passive: true });
      tilt.element.addEventListener("pointerleave", leave);
      tilt.element.addEventListener("pointercancel", leave);
      return () => {
        tilt.element.removeEventListener("pointermove", move);
        tilt.element.removeEventListener("pointerleave", leave);
        tilt.element.removeEventListener("pointercancel", leave);
      };
    });

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(invalidateGeometry)
      : undefined;
    resizeObserver?.observe(root);
    tracks.forEach(({ element }) => resizeObserver?.observe(element));
    root.querySelectorAll<HTMLElement>("[data-scroll-sticky]").forEach((element) => resizeObserver?.observe(element));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", invalidateGeometry, { passive: true });
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    root.addEventListener("load", invalidateGeometry, true);
    finePointer.addEventListener("change", resetPointers);
    reducedMotion.addEventListener("change", startMotion);
    void document.fonts.ready.then(() => { if (!disposed) invalidateGeometry(); });
    startMotion();

    return () => {
      disposed = true;
      cinematic?.dispose();
      clearMotion();
      delete root.dataset.motion;
      resizeObserver?.disconnect();
      root.style.removeProperty("--ambient-play-state");
      tracks.forEach(({ element }) => element.style.removeProperty("--scene-stage-height"));
      pointerCleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", invalidateGeometry);
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
      root.removeEventListener("load", invalidateGeometry, true);
      finePointer.removeEventListener("change", resetPointers);
      reducedMotion.removeEventListener("change", startMotion);
    };
  }, [pathname]);

  return null;
}
