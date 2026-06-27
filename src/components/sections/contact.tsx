"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);
  const mailtoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Portfolio contact")}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Contact"
          title="Let's Work Together"
          description="Have a project in mind or want to connect? Send me a message — I'd love to hear from you."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-2"
          >
            <Card className="border-border/60 bg-card/50">
              <CardContent className="space-y-6 p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-cyan-400/10 p-2.5 text-cyan-400">
                    <Mail className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <a
                      href={mailtoHref}
                      className="text-sm text-muted-foreground transition-colors hover:text-cyan-400"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-cyan-400/10 p-2.5 text-cyan-400">
                    <MapPin className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Location
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {siteConfig.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    nativeButton={false}
                    render={
                      <Link
                        href={siteConfig.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub profile"
                      />
                    }
                    variant="outline"
                    size="icon"
                    className="border-cyan-400/30 hover:bg-cyan-400/5"
                  >
                    <GithubIcon />
                  </Button>
                  <Button
                    nativeButton={false}
                    render={
                      <Link
                        href={siteConfig.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                      />
                    }
                    variant="outline"
                    size="icon"
                    className="border-cyan-400/30 hover:bg-cyan-400/5"
                  >
                    <LinkedinIcon />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm text-emerald-400">
                Available for new opportunities
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="border-border/60 bg-card/50">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        autoComplete="name"
                        className="border-border/60 bg-background focus-visible:border-cyan-400/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                        className="border-border/60 bg-background focus-visible:border-cyan-400/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      required
                      rows={5}
                      className="resize-none border-border/60 bg-background focus-visible:border-cyan-400/50"
                    />
                  </div>

                  {status === "success" && (
                    <p
                      role="status"
                      className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-400"
                    >
                      Message sent successfully! I&apos;ll get back to you soon.
                    </p>
                  )}

                  {status === "error" && (
                    <div
                      role="alert"
                      className="space-y-4 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-4"
                    >
                      <p className="text-sm text-amber-200">
                        The form couldn&apos;t send your message right now. Email
                        me directly instead — I&apos;ll still get it.
                      </p>
                      <Button
                        nativeButton={false}
                        render={<a href={mailtoHref} />}
                        size="lg"
                        className="w-full bg-cyan-500 font-semibold text-navy-950 hover:bg-cyan-400 sm:w-auto"
                      >
                        <Mail className="size-4" />
                        Email {siteConfig.email}
                      </Button>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="w-full bg-cyan-500 font-semibold text-navy-950 hover:bg-cyan-400 sm:w-auto"
                    >
                      <Send className="size-4" />
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground sm:text-right">
                      Or{" "}
                      <a
                        href={mailtoHref}
                        className="font-medium text-cyan-400 underline-offset-2 hover:underline"
                      >
                        email me directly
                      </a>
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}