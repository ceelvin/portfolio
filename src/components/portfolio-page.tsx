"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { StarryBackground } from "@/components/background/starry-background";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { siteTitle } from "@/data/site";

export function PortfolioPage() {
  const lenis = useLenis();

  useEffect(() => {
    document.title = siteTitle;
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  return (
    <>
      <StarryBackground />
      <div className="relative">
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