import { bio, projects, skills, siteConfig } from "@/data/site";

export function runTerminalCommand(
  input: string,
  onNavigate?: (section: string) => void,
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
        "  contact    — contact info",
        "  goto home|about|projects|contact",
        "  theme      — toggle dark/light mode",
        "  clear      — clear terminal",
      ];

    case "whoami":
      return [siteConfig.name, siteConfig.title, siteConfig.tagline];

    case "skills":
      return skills.map((s) => {
        const level =
          s.proficiency === "learning" ? " · learning" : "";
        return `• ${s.name} (${s.category}${level})`;
      });

    case "projects":
      return projects.map((p) => `• ${p.title} — ${p.technologies.join(", ")}`);

    case "contact":
      return [
        `Email: ${siteConfig.email}`,
        `Location: ${siteConfig.location}`,
        `GitHub: ${siteConfig.github}`,
        `LinkedIn: ${siteConfig.linkedin}`,
      ];

    case "about":
      return [bio.summary, ...bio.highlights.map((h) => `• ${h}`)];

    case "goto": {
      const target = args[0];
      const valid = ["home", "about", "projects", "contact"];
      if (!target || !valid.includes(target)) {
        return [`Unknown section. Try: ${valid.join(", ")}`];
      }
      onNavigate?.(target);
      return [
        `Navigating to ${target === "home" ? "/" : `/${target}`}...`,
      ];
    }

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