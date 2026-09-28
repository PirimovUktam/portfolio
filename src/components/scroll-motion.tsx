"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
      ...Array.from(root.querySelectorAll<HTMLElement>("[data-motion-surface]"),
        (element) => ({
          element, top: 0, height: 0, stickyTop: 0, pinned: false,
          progress: createValue(element, "--surface-progress"),
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

    const measure = () => {
      viewportHeight = Math.max(1, window.innerHeight);
      scrollRange = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
      const headerHeight = root.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 80;
      tracks.forEach((track) => {
        track.top = layoutTop(track.element);
        track.height = track.element.offsetHeight;
        const stickyChild = track.element.matches("[data-scroll-scene]")
          ? track.element.querySelector<HTMLElement>("[data-scroll-sticky]")
          : null;
        track.pinned = Boolean(stickyChild && getComputedStyle(stickyChild).position === "sticky");
        const configuredTop = Number.parseFloat(
          getComputedStyle(track.element).getPropertyValue("--scene-sticky-top"),
        );
        track.stickyTop = Number.isFinite(configuredTop) ? configuredTop : headerHeight;
      });
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
                track.top + track.height - viewportHeight,
              )
            : progressBetween(
                Math.max(0, track.top - viewportHeight * 0.75),
                track.top + track.height - viewportHeight * 0.25,
              );
        }
      });
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
      let unsettled = false;
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
      snap = false;
      previousTime = unsettled ? time : 0;
      if (unsettled) frame = window.requestAnimationFrame(tick);
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

    const resetPointers = () => {
      tilts.forEach((tilt) => {
        tilt.x.target = 0;
        tilt.y.target = 0;
        tilt.bounds = null;
      });
      schedule();
    };

    const onScroll = () => {
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
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
        previousTime = 0;
      } else {
        startMotion();
      }
    };

    const pointerCleanups = tilts.map((tilt) => {
      const move = (event: PointerEvent) => {
        if (!enabled || !finePointer.matches || event.pointerType === "touch") return;
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
      clearMotion();
      delete root.dataset.motion;
      resizeObserver?.disconnect();
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
