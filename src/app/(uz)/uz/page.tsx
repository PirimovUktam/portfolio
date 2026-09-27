import { PortfolioPage } from "@/components/portfolio-page";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata("uz");

export default function UzbekHomePage() {
  return <PortfolioPage locale="uz" />;
}
