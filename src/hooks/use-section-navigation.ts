"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";
import { type SectionId } from "@/lib/sections";

export function useSectionNavigation() {
  const lenis = useLenis();

  const navigateToSection = useCallback(
    (section: SectionId, onComplete?: () => void) => {
      const target = section === "home" ? 0 : `#${section}`;
      if (lenis) {
        lenis.scrollTo(target, {
          offset: section === "home" ? 0 : -64,
          onComplete: () => onComplete?.(),
        });
        return;
      }
      if (section === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }
      onComplete?.();
    },
    [lenis]
  );

  return { navigateToSection };
}
