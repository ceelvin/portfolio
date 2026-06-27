"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { bio, journey, skills } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = ["All", "Frontend", "Backend", "Tools", "Learning"] as const;

const categoryColors: Record<string, string> = {
  Frontend: "border-cyan-400/30 bg-cyan-400/10 text-cyan-400",
  Backend: "border-violet-400/30 bg-violet-400/10 text-violet-300",
  Tools: "border-amber-400/30 bg-amber-400/10 text-amber-300",
};

function getSkillBadgeClass(skill: (typeof skills)[number]) {
  if (skill.proficiency === "learning") {
    return "border-dashed border-orange-400/40 bg-orange-400/5 text-orange-300";
  }
  return categoryColors[skill.category] ?? "";
}

export function About() {
  const [skillFilter, setSkillFilter] = useState<(typeof categories)[number]>("All");
  const [openJourney, setOpenJourney] = useState<number | null>(0);

  const filteredSkills =
    skillFilter === "All"
      ? skills
      : skillFilter === "Learning"
        ? skills.filter((s) => s.proficiency === "learning")
        : skills.filter((s) => s.category === skillFilter);

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              label="About"
              title="Who I Am"
              description={bio.summary}
            />

            <div className="mt-8 flex flex-wrap gap-2">
              {bio.highlights.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-cyan-400/30 bg-cyan-400/5 px-3 py-1 text-cyan-400"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {bio.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="cursor-default rounded-xl border border-border/60 bg-card/50 p-4 text-center transition-colors hover:border-cyan-400/30"
                >
                  <p className="font-heading text-2xl font-bold text-cyan-400">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl font-semibold">Skills</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Solid border = core · dashed = learning / project exposure
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSkillFilter(cat)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                    skillFilter === cat
                      ? "border-cyan-400/50 bg-cyan-400/15 text-cyan-400"
                      : "border-border/60 text-muted-foreground hover:border-cyan-400/30 hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <motion.div layout className="mt-4 flex flex-wrap gap-2">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge
                      variant="outline"
                      title={
                        skill.proficiency === "learning"
                          ? "Used in projects — still building depth"
                          : undefined
                      }
                      className={cn(
                        "cursor-default transition-shadow hover:shadow-md hover:shadow-cyan-500/10",
                        getSkillBadgeClass(skill)
                      )}
                    >
                      {skill.name}
                      {skill.proficiency === "learning" && (
                        <span className="ml-1 text-[10px] opacity-70">·</span>
                      )}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <h3 className="mt-12 font-heading text-xl font-semibold">
              My Journey
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Click a role to expand details
            </p>
            <div className="relative mt-6 space-y-0">
              <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
              {journey.map((item, i) => {
                const isOpen = openJourney === i;
                return (
                  <motion.div
                    key={`${item.title}-${item.year}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pb-3 pl-8 last:pb-0"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenJourney(isOpen ? null : i)}
                      className="group w-full rounded-lg py-2 text-left transition-colors hover:bg-card/50"
                    >
                      <span
                        className={cn(
                          "absolute left-0 top-3 size-3.5 rounded-full border-2 bg-background transition-colors",
                          isOpen
                            ? "border-cyan-400 bg-cyan-400/20"
                            : "border-cyan-400 group-hover:bg-cyan-400/10"
                        )}
                      />
                      <div className="flex items-center justify-between pr-2">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
                            {item.year}
                          </p>
                          <h4 className="mt-0.5 font-heading font-semibold text-foreground">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.company}
                          </p>
                        </div>
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 text-muted-foreground transition-transform",
                            isOpen && "rotate-180 text-cyan-400"
                          )}
                        />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-2 pt-1 text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                          <ul className="space-y-1.5 pb-4">
                            {item.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex gap-2 text-sm text-muted-foreground"
                              >
                                <span className="text-cyan-400">▸</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}