import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";

const exportRoot = new URL("../out/", import.meta.url);
const origin = "https://pirimov.uz";

function readExport(file) {
  return readFile(new URL(file, exportRoot), "utf8");
}

test("the home and project pages publish matching URLs for both languages", async () => {
  const sitemap = await readExport("sitemap.xml");
  const entries = sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  const projects = await readdir(new URL("projects/", exportRoot), { withFileTypes: true });
  const projectPaths = projects
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("__next."))
    .map((entry) => `/projects/${entry.name}/`);
  assert.ok(projectPaths.length, "No project pages were exported");
  assert.equal(entries.length, (projectPaths.length + 1) * 2, "Wrong number of sitemap entries");

  for (const enPath of ["/", ...projectPaths]) {
    const uzPath = `/uz${enPath}`;
    const alternates = { en: origin + enPath, uz: origin + uzPath, "x-default": origin + enPath };
    for (const [locale, path] of [["en", enPath], ["uz", uzPath]]) {
      const html = await readExport(`${path.slice(1)}index.html`);
      const url = origin + path;
      const entry = entries.find((item) => item.includes(`<loc>${url}</loc>`));
      assert.ok(entry, `Missing sitemap entry for ${path}`);
      assert.ok(html.includes(`<html lang="${locale}"`), `Missing page language at ${path}`);
      assert.ok(html.includes(`<link rel="canonical" href="${url}"`), `Wrong canonical at ${path}`);
      assert.ok(html.includes(`<meta property="og:url" content="${url}"`), `Wrong social URL at ${path}`);
      for (const [language, href] of Object.entries(alternates)) {
        assert.ok(html.includes(`<link rel="alternate" hrefLang="${language}" href="${href}"`), `Wrong ${language} alternate at ${path}`);
        assert.ok(entry.includes(`<xhtml:link rel="alternate" hreflang="${language}" href="${href}"`), `Wrong ${language} sitemap alternate at ${path}`);
      }
    }
  }
  const robots = await readExport("robots.txt");
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "Wrong robots.txt sitemap URL");
});

test("unmatched routes have a bilingual, non-indexable fallback", async () => {
  const fallback = await readExport("404.html");
  assert.ok(fallback.includes('<html lang="en"'), "Missing fallback page language");
  assert.ok(fallback.includes('lang="uz"'), "Missing Uzbek fallback copy");
  assert.ok(fallback.includes('<meta name="robots" content="noindex"'), "Fallback page is indexable");
  assert.ok(fallback.includes('href="/"'), "Missing English homepage link");
  assert.ok(fallback.includes('href="/uz/"'), "Missing Uzbek homepage link");
});
