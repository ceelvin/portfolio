"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { HeroSidePanel } from "@/components/sections/hero-terminal";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center pt-16"
    >
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-sm text-cyan-400"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
            </span>
            Available for new opportunities
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-xl font-medium text-muted-foreground sm:text-2xl"
          >
            {siteConfig.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button
              nativeButton={false}
              render={<Link href="#projects" />}
              size="lg"
              className="bg-cyan-500 font-semibold text-navy-950 hover:bg-cyan-400"
            >
              View My Work
            </Button>
            <Button
              nativeButton={false}
              render={
                <a href={siteConfig.resumeUrl} download="Celvin-Kuhn-Resume.pdf" />
              }
              variant="outline"
              size="lg"
              className="border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-400/5"
            >
              <Download className="size-4" />
              Download Resume
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-6 text-xs text-muted-foreground"
          >
            Try the terminal — type{" "}
            <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
              help
            </kbd>{" "}
            · Press{" "}
            <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
              ?
            </kbd>{" "}
            for vim keybindings
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 hidden lg:block"
          >
            <Link
              href="#about"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-cyan-400"
              aria-label="Scroll to about section"
            >
              <ArrowDown className="size-4 animate-bounce" />
              Scroll to explore
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <HeroSidePanel />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 lg:hidden"
          >
            <Link
              href="#about"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-cyan-400"
              aria-label="Scroll to about section"
            >
              <ArrowDown className="size-4 animate-bounce" />
              Scroll to explore
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}