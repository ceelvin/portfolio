"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navLinks, siteConfig } from "@/data/site";
import { hrefToSectionId, SECTIONS } from "@/lib/sections";
import { useActiveSection } from "@/hooks/use-active-section";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection([...SECTIONS]);

  const handleNavClick = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl dark:bg-[#0a0a23]/70">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          scroll={false}
          className="font-heading text-lg font-bold tracking-tight"
        >
          <span className="text-foreground">{siteConfig.name.split(" ")[0]}</span>{" "}
          <span className="text-cyan-400">{siteConfig.name.split(" ")[1]}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = hrefToSectionId(link.href);
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  scroll={false}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-cyan-400"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-[1.15rem] h-0.5 rounded-full bg-cyan-400" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />

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
                      <Link
                        href={link.href}
                        scroll={false}
                        onClick={handleNavClick}
                        className={cn(
                          "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                          isActive
                            ? "bg-cyan-400/10 text-cyan-400"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
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