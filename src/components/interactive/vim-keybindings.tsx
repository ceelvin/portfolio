"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useVimKeybindings } from "@/hooks/use-vim-keybindings";

const bindings = [
  { keys: "j / k", desc: "Scroll down / up" },
  { keys: "Ctrl+d / Ctrl+u", desc: "Half page down / up" },
  { keys: "gg", desc: "Go to top" },
  { keys: "G", desc: "Go to bottom" },
  { keys: "gh / ga / gp / gc", desc: "Go to Home / About / Projects / Contact" },
  { keys: ":", desc: "Focus terminal" },
  { keys: "?", desc: "Toggle this help" },
  { keys: "Esc", desc: "Close help" },
];

export function VimKeybindings() {
  const { helpOpen, setHelpOpen, statusLine } = useVimKeybindings();

  return (
    <>
      <AnimatePresence>
        {statusLine && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="pointer-events-none fixed bottom-6 left-6 z-[100] rounded-md border border-cyan-400/20 bg-[#0d1117]/90 px-3 py-1.5 font-mono text-xs text-cyan-400 shadow-lg backdrop-blur-sm"
          >
            {statusLine}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {helpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setHelpOpen(false)}
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md overflow-hidden rounded-xl border border-cyan-400/20 bg-[#0d1117]/95 font-mono shadow-2xl"
              role="dialog"
              aria-label="Vim keybindings help"
            >
              <div className="border-b border-border/40 px-5 py-3">
                <p className="text-sm font-bold text-cyan-400">
                  VIM KEYBINDINGS
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  -- NORMAL mode --
                </p>
              </div>
              <div className="space-y-0 divide-y divide-border/30 px-5 py-2">
                {bindings.map((b) => (
                  <div
                    key={b.keys}
                    className="flex items-center justify-between gap-4 py-2.5 text-xs"
                  >
                    <span className="shrink-0 text-emerald-400">{b.keys}</span>
                    <span className="text-right text-muted-foreground">
                      {b.desc}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/40 px-5 py-2.5 text-[10px] text-muted-foreground">
                Press <span className="text-cyan-400">?</span> or{" "}
                <span className="text-cyan-400">Esc</span> to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}