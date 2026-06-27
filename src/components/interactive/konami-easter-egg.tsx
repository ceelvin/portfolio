"use client";

import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function KonamiEasterEgg() {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI_CODE[index];
      const expectedKey =
        expected.length === 1 ? expected.toLowerCase() : expected;

      if (key === expectedKey) {
        const next = index + 1;
        if (next === KONAMI_CODE.length) {
          setActive(true);
          setIndex(0);
          window.setTimeout(() => setActive(false), 4000);
        } else {
          setIndex(next);
        }
        return;
      }

      setIndex(key === KONAMI_CODE[0] ? 1 : 0);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index]);

  if (!active) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-6 left-1/2 z-[200] -translate-x-1/2"
    >
      <div className="flex items-center gap-3 rounded-full border border-cyan-400/40 bg-card/90 px-5 py-3 shadow-xl shadow-cyan-500/20 backdrop-blur-md">
        <Rocket className="size-5 animate-pulse text-cyan-400" aria-hidden="true" />
        <span className="font-mono text-sm text-cyan-400">
          Warp drive engaged — welcome aboard, space cadet!
        </span>
      </div>
    </div>
  );
}