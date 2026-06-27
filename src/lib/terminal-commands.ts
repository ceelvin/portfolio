import { bio, projects, skills, siteConfig } from "@/data/site";
import { type SectionId } from "@/lib/sections";
import { randomFortune } from "@/lib/terminal-fun";

export function runTerminalCommand(
  input: string,
  onNavigate?: (section: SectionId) => void,
  onThemeToggle?: () => void
): string[] {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return [];

  const [cmd, ...args] = trimmed.split(/\s+/);

  switch (cmd) {
    case "help":
      return [
        "Available commands:",
        "  help       — show this list",
        "  whoami     — who is this portfolio about?",
        "  skills     — list tech skills",
        "  projects   — list featured projects",
        "  socials    — GitHub & LinkedIn",
        "  contact    — contact info",
        "  goto home|about|projects|contact",
        "  fortune    — random dev wisdom",
        "  theme      — toggle dark/light mode",
        "  clear      — clear terminal",
      ];

    case "whoami":
      return [
        siteConfig.name,
        siteConfig.title,
        siteConfig.tagline,
        siteConfig.languages.join(" · "),
      ];

    case "skills":
      return skills.map((s) => {
        const level = s.proficiency === "learning" ? " · learning" : "";
        return `• ${s.name} (${s.category}${level})`;
      });

    case "projects":
      return projects.map(
        (p) => `• ${p.title} — ${p.technologies.join(", ")}`
      );

    case "socials":
      return [
        `GitHub:   ${siteConfig.github}`,
        `LinkedIn: ${siteConfig.linkedin}`,
        `Email:    ${siteConfig.email}`,
      ];

    case "contact":
      return [
        `Email: ${siteConfig.email}`,
        `Location: ${siteConfig.location}`,
        `Timezone: ${siteConfig.timezone}`,
        `GitHub: ${siteConfig.github}`,
        `LinkedIn: ${siteConfig.linkedin}`,
      ];

    case "about":
      return [bio.summary, ...bio.highlights.map((h) => `• ${h}`)];

    case "goto": {
      const target = args[0];
      const valid: SectionId[] = ["home", "about", "projects", "contact"];
      if (!target || !valid.includes(target as SectionId)) {
        return [`Unknown section. Try: ${valid.join(", ")}`];
      }
      onNavigate?.(target as SectionId);
      return [
        `Navigating to ${target === "home" ? "/" : `/${target}`}...`,
      ];
    }

    case "fortune":
      return randomFortune();

    case "theme":
      onThemeToggle?.();
      return ["Toggling theme..."];

    case "clear":
      return ["__CLEAR__"];

    default:
      return [
        `Command not found: ${cmd}`,
        'Type "help" for available commands.',
      ];
  }
}