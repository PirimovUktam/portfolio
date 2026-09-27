import { PortfolioPage } from "@/components/portfolio-page";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata("en");

export default function HomePage() {
  return <PortfolioPage locale="en" />;
}
