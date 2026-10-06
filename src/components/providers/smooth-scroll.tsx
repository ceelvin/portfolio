"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.12,
        syncTouch: false,
        anchors: true,
        prevent: (node) =>
          node.closest("[data-lenis-prevent]") instanceof HTMLElement,
      }}
    >
      {children}
    </ReactLenis>
  );
}
