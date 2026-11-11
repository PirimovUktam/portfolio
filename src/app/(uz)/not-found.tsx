import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export default function NotFound() {
  const copy = portfolio.ui.notFound;

  return (
    <main className="shell not-found-page" id="main-content">
      <p className="eyebrow">404</p>
      <h1>{copy.title.uz}</h1>
      <p>{copy.description.uz}</p>
      <Link href="/uz" className="text-link">{copy.backHome.uz} <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
