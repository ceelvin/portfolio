import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { PortfolioPage } from "@/components/portfolio-page";
import { siteTitle } from "@/data/site";
import { isValidSection } from "@/lib/sections";

export const metadata: Metadata = {
  title: {
    absolute: siteTitle,
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}) {
  const { section } = await params;

  if (!section || section.length === 0) {
    return <PortfolioPage />;
  }

  if (section.length === 1 && isValidSection(section[0])) {
    permanentRedirect(section[0] === "home" ? "/" : `/#${section[0]}`);
  }

  notFound();
}