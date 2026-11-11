"use client";

import type { PointerEvent, ReactNode } from "react";

function tilt(event: PointerEvent<HTMLDivElement>) {
  if (
    event.pointerType !== "mouse" ||
    !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches
  ) {
    return;
  }

  const scene = event.currentTarget;
  const bounds = scene.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  scene.style.setProperty("--tilt-x", (-y * 13) + "deg");
  scene.style.setProperty("--tilt-y", (x * 15) + "deg");
}

function reset(event: PointerEvent<HTMLDivElement>) {
  event.currentTarget.style.removeProperty("--tilt-x");
  event.currentTarget.style.removeProperty("--tilt-y");
}

export function DepthScene({ children }: { children: ReactNode }) {
  return (
    <div className="scene-viewport" onPointerMove={tilt} onPointerLeave={reset}>
      <div className="scene-orbit">
        <div className="scene-plane">{children}</div>
      </div>
    </div>
  );
}
