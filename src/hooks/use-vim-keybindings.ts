"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSectionNavigation } from "@/hooks/use-section-navigation";
import { type SectionId } from "@/lib/sections";

const SECTIONS: Record<string, SectionId> = {
  h: "home",
  a: "about",
  p: "projects",
  c: "contact",
};

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

export function useVimKeybindings() {
  const { navigateToSection } = useSectionNavigation();
  const [helpOpen, setHelpOpen] = useState(false);
  const [pendingG, setPendingG] = useState(false);
  const [statusLine, setStatusLine] = useState<string | null>(null);
  const lastGRef = useRef(0);
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const flashStatus = useCallback((msg: string) => {
    setStatusLine(msg);
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    statusTimeoutRef.current = setTimeout(() => setStatusLine(null), 1200);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;

      if (helpOpen && e.key === "Escape") {
        e.preventDefault();
        setHelpOpen(false);
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setHelpOpen((o) => !o);
        return;
      }

      if (helpOpen) return;

      if (e.key === "g" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastGRef.current < 400) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          flashStatus("gg → top");
          lastGRef.current = 0;
          setPendingG(false);
          return;
        }
        lastGRef.current = now;
        setPendingG(true);
        flashStatus("g_");
        setTimeout(() => setPendingG(false), 600);
        return;
      }

      if (pendingG) {
        e.preventDefault();
        setPendingG(false);
        const section = SECTIONS[e.key];
        if (section) {
          navigateToSection(section);
          flashStatus(`g${e.key} → /${section === "home" ? "" : section}`);
        } else {
          flashStatus(`g${e.key} → unknown`);
        }
        return;
      }

      switch (e.key) {
        case "j":
          e.preventDefault();
          window.scrollBy({ top: 60, behavior: "smooth" });
          break;
        case "k":
          e.preventDefault();
          window.scrollBy({ top: -60, behavior: "smooth" });
          break;
        case "G":
          e.preventDefault();
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
          flashStatus("G → bottom");
          break;
        case ":":
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("focus-terminal"));
          flashStatus(": → terminal");
          break;
        default:
          if (e.ctrlKey && e.key === "d") {
            e.preventDefault();
            window.scrollBy({
              top: window.innerHeight / 2,
              behavior: "smooth",
            });
          } else if (e.ctrlKey && e.key === "u") {
            e.preventDefault();
            window.scrollBy({
              top: -window.innerHeight / 2,
              behavior: "smooth",
            });
          }
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    };
  }, [helpOpen, pendingG, flashStatus, navigateToSection]);

  return { helpOpen, setHelpOpen, statusLine };
}