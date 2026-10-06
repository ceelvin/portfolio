"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useLenis((lenis) => {
    const next = Math.round(lenis.progress * 200) / 2;
    setProgress((current) => (current === next ? current : next));
  });

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useLenis((instance) => {
    setVisible(instance.scroll > 500);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            size="icon"
            onClick={() => lenis?.scrollTo(0)}
            className="size-10 rounded-full border border-cyan-400/30 bg-card/90 shadow-lg backdrop-blur-sm hover:bg-cyan-400/10"
            aria-label="Back to top"
          >
            <ArrowUp className="size-4 text-cyan-400" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}