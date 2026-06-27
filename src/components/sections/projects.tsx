"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { GithubIcon } from "@/components/ui/brand-icons";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const allTechs = [
  "All",
  ...Array.from(new Set(projects.flatMap((p) => p.technologies))).sort(),
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.technologies.includes(activeFilter)),
    [activeFilter]
  );

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Portfolio"
          title="Featured Projects"
          description="Filter by technology to explore relevant work."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {allTechs.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setActiveFilter(tech)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                activeFilter === tech
                  ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-400"
                  : "border-border/60 bg-card/50 text-muted-foreground hover:border-cyan-400/30 hover:text-foreground"
              )}
            >
              {tech}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="group h-full overflow-hidden border-border/60 bg-card/50 transition-all duration-300 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-500/5">
                  <div
                    className={cn(
                      "relative h-44 overflow-hidden bg-gradient-to-br",
                      project.gradient
                    )}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  </div>

                  <CardContent className="flex flex-col gap-4 p-6">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className={cn(
                            "cursor-pointer text-xs transition-colors",
                            activeFilter === tech && "bg-cyan-400/20 text-cyan-400"
                          )}
                          onClick={() => setActiveFilter(tech)}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto flex gap-2 pt-2">
                      {project.liveUrl && (
                        <Button
                          nativeButton={false}
                          render={
                            <Link
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          }
                          variant="outline"
                          size="sm"
                          className="flex-1 border-cyan-400/30 hover:bg-cyan-400/5"
                        >
                          <ExternalLink className="size-3.5" />
                          Live Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          nativeButton={false}
                          render={
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          }
                          variant="outline"
                          size="sm"
                          className={cn(
                            "border-cyan-400/30 hover:bg-cyan-400/5",
                            !project.liveUrl && "flex-1"
                          )}
                        >
                          <GithubIcon className="size-3.5" />
                          GitHub
                        </Button>
                      )}
                      {!project.liveUrl && !project.githubUrl && (
                        <span className="text-xs italic text-muted-foreground">
                          Internal / proprietary project
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            No projects match this filter.
          </p>
        )}
      </div>
    </section>
  );
}