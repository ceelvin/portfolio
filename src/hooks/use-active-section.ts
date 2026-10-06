"use client";

import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";

const NAV_OFFSET = 96;

function sectionAt(
  scroll: number,
  ids: readonly string[],
  tops: number[],
  maxScroll: number
) {
  if (maxScroll > 0 && scroll >= maxScroll - 8) {
    return ids[ids.length - 1] ?? "";
  }

  const marker = scroll + NAV_OFFSET;
  let current = ids[0] ?? "";

  for (let i = 0; i < ids.length; i++) {
    if (tops[i] <= marker) current = ids[i];
  }

  return current;
}

export function useActiveSection(sectionIds: readonly string[]) {
  const ids = sectionIds.join(",");
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const topsRef = useRef<number[]>([]);
  const maxScrollRef = useRef(0);

  const measure = useCallback(() => {
    const list = ids.split(",");
    topsRef.current = list.map((id) => {
      const el = document.getElementById(id);
      return el ? el.offsetTop : Number.POSITIVE_INFINITY;
    });
    maxScrollRef.current =
      document.documentElement.scrollHeight - window.innerHeight;
  }, [ids]);

  const update = useCallback(
    (scroll: number) => {
      const next = sectionAt(
        scroll,
        ids.split(","),
        topsRef.current,
        maxScrollRef.current
      );
      setActiveSection((current) => (current === next ? current : next));
    },
    [ids]
  );

  useLenis(
    (lenis) => {
      update(lenis.scroll);
    },
    [update],
    0
  );

  useEffect(() => {
    measure();
    update(window.scrollY);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, update]);

  return activeSection;
}