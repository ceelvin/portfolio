"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { StarryBackground } from "@/components/background/starry-background";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { pathToSection } from "@/lib/sections";

export function PortfolioPage() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (prevPathnameRef.current === pathname) {
      return;
    }

    prevPathnameRef.current = pathname;

    const section = pathToSection(pathname);

    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <StarryBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}