import { notFound } from "next/navigation";
import { PortfolioPage } from "@/components/portfolio-page";
import { isValidSection } from "@/lib/sections";

export default async function Page({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}) {
  const { section } = await params;

  if (section && section.length > 1) {
    notFound();
  }

  const segment = section?.[0];
  if (segment && !isValidSection(segment)) {
    notFound();
  }

  return <PortfolioPage />;
}