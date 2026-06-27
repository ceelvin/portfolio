"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { type SectionId, sectionToPath } from "@/lib/sections";

export function useSectionNavigation() {
  const router = useRouter();

  const navigateToSection = useCallback(
    (section: SectionId) => {
      router.push(sectionToPath(section), { scroll: false });
    },
    [router]
  );

  return { navigateToSection };
}