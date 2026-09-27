"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RevealController(): null {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (!elements.length || !("IntersectionObserver" in window)) {
      return;
    }

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let observer: IntersectionObserver | undefined;

    const reveal = (element: HTMLElement, immediate = false) => {
      if (immediate) {
        element.classList.add("reveal-immediate");
      }

      element.classList.remove("reveal-pending");
      element.classList.add("is-revealed");
      observer?.unobserve(element);
    };

    const revealAll = () => {
      elements.forEach((element) => reveal(element, true));
      observer?.disconnect();
    };

    const revealFocusedContent = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      const target = event.target;
      elements.forEach((element) => {
        if (element.contains(target)) {
          reveal(element, true);
        }
      });
    };

    if (!motionPreference.matches) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) {
              reveal(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
      );

      elements.forEach((element) => {
        const isBelowViewport =
          element.getBoundingClientRect().top >= window.innerHeight;
        const containsFocus = element.contains(document.activeElement);

        if (isBelowViewport && !containsFocus) {
          element.classList.add("reveal-pending");
          observer?.observe(element);
        } else {
          reveal(element, true);
        }
      });
    }

    motionPreference.addEventListener("change", revealAll);
    window.addEventListener("beforeprint", revealAll);
    document.addEventListener("focusin", revealFocusedContent);

    return () => {
      observer?.disconnect();
      motionPreference.removeEventListener("change", revealAll);
      window.removeEventListener("beforeprint", revealAll);
      document.removeEventListener("focusin", revealFocusedContent);
      elements.forEach((element) => {
        element.classList.remove(
          "reveal-pending",
          "is-revealed",
          "reveal-immediate",
        );
      });
    };
  }, [pathname]);

  return null;
}
