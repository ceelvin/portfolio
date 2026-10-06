"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { navLinks, siteConfig } from "@/data/site";
import { hrefToSectionId, SECTIONS } from "@/lib/sections";
import { useActiveSection } from "@/hooks/use-active-section";
import { useSectionNavigation } from "@/hooks/use-section-navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<(typeof SECTIONS)[number] | null>(null);
  const spiedSection = useActiveSection(SECTIONS);
  const activeSection = pending ?? spiedSection;
  const { navigateToSection } = useSectionNavigation();

  const handleNavClick = (id: (typeof SECTIONS)[number]) => {
    setOpen(false);
    setPending(id);
    navigateToSection(id, () => setPending(null));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl dark:bg-[#0a0a23]/70">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="font-heading text-lg font-bold tracking-tight"
        >
          <span className="text-foreground">{siteConfig.name.split(" ")[0]}</span>{" "}
          <span className="text-cyan-400">{siteConfig.name.split(" ")[1]}</span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = hrefToSectionId(link.href);
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNavClick(id)}
                  className={cn(
                    "relative cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-cyan-400"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-[1.15rem] h-0.5 rounded-full bg-cyan-400" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-heading text-left">
                  Navigation
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const id = hrefToSectionId(link.href);
                  const isActive = activeSection === id;
                  return (
                    <li key={link.href}>
                      <button
                        type="button"
                        onClick={() => handleNavClick(id)}
                        className={cn(
                          "block w-full cursor-pointer rounded-lg px-4 py-3 text-left text-base font-medium transition-colors",
                          isActive
                            ? "bg-cyan-400/10 text-cyan-400"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}