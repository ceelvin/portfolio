"use client";

import { useLenis } from "lenis/react";
import { useCallback, useEffect, useState } from "react";

const NAV_OFFSET = 96;

function sectionAt(scroll: number, ids: readonly string[]) {
  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll > 0 && scroll >= maxScroll - 8) {
    return ids[ids.length - 1] ?? "";
  }

  const marker = scroll + NAV_OFFSET;
  let current = ids[0] ?? "";

  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= marker) current = id;
  }

  return current;
}

export function useActiveSection(sectionIds: readonly string[]) {
  const ids = sectionIds.join(",");
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  const update = useCallback(
    (scroll: number) => {
      setActiveSection(sectionAt(scroll, ids.split(",")));
    },
    [ids]
  );

  useLenis((lenis) => {
    update(lenis.scroll);
  });

  useEffect(() => {
    update(window.scrollY);
  }, [update]);

  return activeSection;
}