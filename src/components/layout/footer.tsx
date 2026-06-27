import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm dark:bg-[#0a0a23]/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-heading text-lg font-bold">
              <span className="text-foreground">
                {siteConfig.name.split(" ")[0]}
              </span>{" "}
              <span className="text-cyan-400">
                {siteConfig.name.split(" ")[1]}
              </span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Full-Stack Developer passionate about creating innovative
              solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cyan-400"
            >
              GitHub
            </Link>
            <Link
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cyan-400"
            >
              LinkedIn
            </Link>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="transition-colors hover:text-cyan-400"
            >
              Email
            </Link>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <p>Last updated: June 2026</p>
        </div>
      </div>
    </footer>
  );
}