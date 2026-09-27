import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/project-page";
import { portfolio } from "@/data/portfolio";
import { buildPageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolio.projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return buildPageMetadata("en", project);
}

export default async function ProjectRoute({ params }: PageProps) {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectPage locale="en" project={project} />;
}
