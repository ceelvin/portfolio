"use client";

import { getProject, onChange, types, val } from "@theatre/core";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

const projectState = {
  definitionVersion: "0.4.0",
  revisionHistory: ["launch"],
  sheetsById: {
    scroll: {
      staticOverrides: { byObject: {} },
      sequence: {
        type: "PositionalSequence",
        length: 1,
        subUnitsPerUnit: 30,
        tracksByObject: {
          rocket: {
            trackIdByPropPath: { '["progress"]': "progress" },
            trackData: {
              progress: {
                type: "BasicKeyframedTrack",
                keyframes: [
                  {
                    id: "start",
                    value: 0,
                    position: 0,
                    handles: [0, 0, 0, 0],
                    connectedRight: true,
                    type: "bezier",
                  },
                  {
                    id: "end",
                    value: 1,
                    position: 1,
                    handles: [0, 0, 0, 0],
                    connectedRight: false,
                    type: "bezier",
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
};

const sheet = getProject("celvin", { state: projectState }).sheet("scroll");
const launch = sheet.object("rocket", {
  progress: types.number(0, { range: [0, 1] }),
});

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProjectLaunch() {
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!reducedMotion() && window.innerWidth >= 768);
    setProgress(val(launch.props.progress));
    return onChange(launch.props.progress, setProgress);
  }, []);

  useLenis(
    (lenis) => {
      if (!enabled || sheet.sequence.position > 0) return;
      const section = document.getElementById("projects");
      if (!section) return;
      if (lenis.scroll + window.innerHeight * 0.72 > section.offsetTop) {
        void sheet.sequence.play({ rate: 0.45, range: [0, 1] });
      }
    },
    [enabled]
  );

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      <svg
        viewBox="0 0 32 48"
        className="absolute size-8 text-cyan-400"
        style={{
          left: `${8 + progress * 78}%`,
          top: `${72 - progress * 58}%`,
          opacity: progress > 0.02 && progress < 0.98 ? 0.7 : 0,
          transform: "rotate(-42deg)",
        }}
      >
        <path d="M16 2 L22 28 L16 24 L10 28 Z" fill="currentColor" />
        <path d="M14 28 H18 L16 40 Z" fill="#e0a15a" />
        <path
          d="M16 40 C14 46 12 48 8 46"
          fill="none"
          stroke="currentColor"
          strokeDasharray="2 3"
          strokeWidth="1"
          opacity={0.6}
        />
      </svg>
    </div>
  );
}
