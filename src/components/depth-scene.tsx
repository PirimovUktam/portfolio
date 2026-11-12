"use client";

import { useState, type PointerEvent, type ReactNode } from "react";

export function DepthScene({ children }: { children: ReactNode }) {
  const [coords, setCoords] = useState("0.0° / 0.0°");

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") {
      return;
    }

    const scene = event.currentTarget;
    const bounds = scene.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const rotX = -y * 15;
    const rotY = x * 18;

    scene.style.setProperty("--tilt-x", `${rotX.toFixed(2)}deg`);
    scene.style.setProperty("--tilt-y", `${rotY.toFixed(2)}deg`);
    scene.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
    scene.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    setCoords(`${rotX.toFixed(1)}° / ${rotY.toFixed(1)}°`);
  }

  function reset(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--tilt-y");
    setCoords("0.0° / 0.0°");
  }

  return (
    <div className="scene-viewport" onPointerMove={tilt} onPointerLeave={reset}>
      <div className="scene-orbit">
        <div className="scene-plane">
          {children}
          <div className="scene-hud" aria-hidden="true">
            <span className="scene-hud-dot" />
            <span>3D INTERACTIVE · {coords}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
