export const SECTIONS = ["home", "about", "projects", "contact"] as const;

export type SectionId = (typeof SECTIONS)[number];

export function sectionToPath(section: SectionId): string {
  return section === "home" ? "/" : `/${section}`;
}

export function pathToSection(pathname: string): SectionId {
  const segment = pathname === "/" ? "home" : pathname.replace(/^\//, "").split("/")[0];
  if (isValidSection(segment)) return segment;
  return "home";
}

export function isValidSection(value: string | undefined): value is SectionId {
  return SECTIONS.includes(value as SectionId);
}

export function hrefToSectionId(href: string): SectionId {
  if (href === "/" || href === "") return "home";
  const segment = href.replace(/^\//, "").replace(/^#/, "").split("/")[0];
  return isValidSection(segment) ? segment : "home";
}