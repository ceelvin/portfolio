import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    return <PortfolioPage />;
  }

  notFound();
}