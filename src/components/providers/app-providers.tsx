"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { KonamiEasterEgg } from "@/components/interactive/konami-easter-egg";
import { BackToTop, ScrollProgress } from "@/components/interactive/scroll-ui";
import { VimKeybindings } from "@/components/interactive/vim-keybindings";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <VimKeybindings />
      <KonamiEasterEgg />
      <BackToTop />
      {children}
    </ThemeProvider>
  );
}