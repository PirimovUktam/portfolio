import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export default function NotFound() {
  const copy = portfolio.ui.notFound;

  return (
    <main className="container not-found-page" id="main-content">
      <p className="eyebrow">404</p>
      <h1 className="display-heading">{copy.title.en}</h1>
      <p>{copy.description.en}</p>
      <Link href="/" className="text-link">{copy.backHome.en} <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
