import { notFound } from "next/navigation";
import { PortfolioPage } from "@/components/portfolio-page";
import { isValidSection } from "@/lib/sections";

export default async function SectionLayout({
  params,
}: {
  params: Promise<{ section?: string[] }>;
}) {
  const { section } = await params;

  if (section && section.length > 0) {
    if (section.length !== 1 || !isValidSection(section[0])) {
      notFound();
    }
  }

  return <PortfolioPage />;
}