"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import { useSectionNavigation } from "@/hooks/use-section-navigation";
import { runTerminalCommand } from "@/lib/terminal-commands";
import { isValidSection } from "@/lib/sections";

const bootLines = [
  { prompt: "$", command: "whoami", output: siteConfig.name },
  { prompt: "$", command: "cat role.txt", output: "Full Stack Developer @ Accenture" },
  { prompt: "$", command: "echo $LOCATION", output: siteConfig.location },
  { prompt: "$", command: "npm run status", output: "● Available for new opportunities" },
];

interface HistoryEntry {
  command: string;
  output: string[];
}

export function HeroSidePanel() {
  const [bootIndex, setBootIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const { navigateToSection } = useSectionNavigation();

  const currentBootLine = bootLines[bootIndex];
  const fullBootText = currentBootLine
    ? `${currentBootLine.prompt} ${currentBootLine.command}`
    : "";
  const isBooting = !bootComplete && bootIndex < bootLines.length;

  useEffect(() => {
    if (!isBooting) return;

    if (typedChars < fullBootText.length) {
      const timeout = setTimeout(() => setTypedChars((c) => c + 1), 45);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (bootIndex + 1 >= bootLines.length) {
        setBootComplete(true);
      } else {
        setBootIndex((i) => i + 1);
        setTypedChars(0);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [typedChars, fullBootText.length, isBooting, bootIndex]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history, bootIndex, typedChars, bootComplete]);

  useEffect(() => {
    const focusTerminal = () => {
      document
        .querySelector("#home")
        ?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 300);
    };
    window.addEventListener("focus-terminal", focusTerminal);
    return () => window.removeEventListener("focus-terminal", focusTerminal);
  }, []);

  const handleCommand = useCallback(
    (raw: string) => {
      const command = raw.trim();
      if (!command) return;

      const output = runTerminalCommand(
        command,
        (section) => {
          if (isValidSection(section)) {
            navigateToSection(section);
          }
        },
        () => setTheme(resolvedTheme === "dark" ? "light" : "dark")
      );

      if (output[0] === "__CLEAR__") {
        setHistory([]);
      } else {
        setHistory((h) => [...h, { command, output }]);
      }
      setInput("");
    },
    [navigateToSection, resolvedTheme, setTheme]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="w-full overflow-hidden rounded-xl border border-cyan-400/20 bg-[#0d1117]/80 shadow-xl shadow-cyan-500/5 backdrop-blur-sm"
      onClick={() => bootComplete && inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border/40 bg-card/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-red-500/80" />
            <span className="size-3 rounded-full bg-yellow-500/80" />
            <span className="size-3 rounded-full bg-green-500/80" />
          </div>
          <div className="ml-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Terminal className="size-3.5" />
            celvin@portfolio
          </div>
        </div>
        {bootComplete && (
          <span className="text-[10px] text-cyan-400/70">type &quot;help&quot;</span>
        )}
      </div>

      <div
        ref={scrollRef}
        className="max-h-72 space-y-2 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
      >
        {bootLines.slice(0, bootComplete ? bootLines.length : bootIndex).map((line, i) => (
          <div key={`boot-${i}`}>
            <p className="text-cyan-400/90">
              <span className="text-emerald-400">{line.prompt}</span> {line.command}
            </p>
            <p className="pl-4 text-muted-foreground">{line.output}</p>
          </div>
        ))}

        {isBooting && (
          <p className="text-cyan-400/90">
            {fullBootText.slice(0, typedChars)}
            <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-cyan-400" />
          </p>
        )}

        {history.map((entry, i) => (
          <div key={`hist-${i}`}>
            <p className="text-cyan-400/90">
              <span className="text-emerald-400">$</span> {entry.command}
            </p>
            {entry.output.map((line, j) => (
              <p key={j} className="pl-4 text-muted-foreground">
                {line}
              </p>
            ))}
          </div>
        ))}

        {bootComplete && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="flex items-center gap-1 text-cyan-400/90"
          >
            <span className="text-emerald-400">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none caret-cyan-400"
              aria-label="Terminal command input"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="inline-block h-4 w-2 animate-pulse bg-cyan-400" />
          </form>
        )}
      </div>
    </motion.div>
  );
}