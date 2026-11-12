"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, Bot, Code2, Cpu, Database, Layers, Smartphone, Sparkles } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { DepthScene } from "@/components/depth-scene";
import { ResponsiveImage } from "@/components/responsive-image";
import { projectPath } from "@/lib/routes";

type ModeId = "mobile" | "fullstack" | "ai";

type CockpitMode = {
  id: ModeId;
  code: string;
  tabLabel: { en: string; uz: string };
  fileName: string;
  langBadge: string;
  headline: { en: string; uz: string };
  lines: { num: string; code: string; accent?: boolean }[];
  nodes: { label: string; value: string }[];
  featuredSlug: string;
  featuredName: string;
};

const COCKPIT_MODES: CockpitMode[] = [
  {
    id: "mobile",
    code: "01",
    tabLabel: { en: "Flutter Mobile", uz: "Flutter Mobil" },
    fileName: "lib/features/roadmap/bilimyol_cubit.dart",
    langBadge: "DART · FLUTTER 3",
    headline: {
      en: "Cross-platform iOS & Android apps with clean state architecture",
      uz: "Toza arxitektura asosida iOS va Android kross-platforma ilovalar",
    },
    lines: [
      { num: "01", code: "class AdaptiveRoadmapController extends StateNotifier<RoadmapState> {" },
      { num: "02", code: "  final SupabaseClient _db; // Shared cloud backend" },
      { num: "03", code: "  final YolchiAiService _ai; // Mistake explanation engine", accent: true },
      { num: "04", code: "  Future<void> evaluateSkillGap(StudentAttempt attempt) async {" },
      { num: "05", code: "    final feedback = await _ai.explainInPlainLanguage(attempt);", accent: true },
      { num: "06", code: "    state = state.unlockNextTopic(feedback.masteryScore);" },
      { num: "07", code: "  }" },
      { num: "08", code: "}" },
    ],
    nodes: [
      { label: "UI Engine", value: "Flutter · 60fps" },
      { label: "State", value: "Riverpod / BLoC" },
      { label: "Targets", value: "iOS · Android · Web" },
    ],
    featuredSlug: "bilimyol-smart-edu",
    featuredName: "BilimYöl Smart Edu",
  },
  {
    id: "fullstack",
    code: "02",
    tabLabel: { en: "Full-Stack & DB", uz: "Full-Stack va Baza" },
    fileName: "src/server/supabase/rls_architecture.sql",
    langBadge: "NEXT.JS · POSTGRES",
    headline: {
      en: "Unified Supabase & PostgreSQL backends with Row-Level Security",
      uz: "PostgreSQL RLS himoyasiga ega yagona Supabase va Next.js tizimlari",
    },
    lines: [
      { num: "01", code: "-- Unified multi-role access policy (Student / Teacher / Parent)" },
      { num: "02", code: "CREATE POLICY \"role_scoped_learning_access\" ON learner_progress" },
      { num: "03", code: "  FOR SELECT USING (", accent: true },
      { num: "04", code: "    auth.uid() = student_id OR is_assigned_teacher(auth.uid())", accent: true },
      { num: "05", code: "  );" },
      { num: "06", code: "// Next.js 16 App Router · Static & Edge verified pipeline" },
      { num: "07", code: "export const runtime = 'edge'; // Zero-cold-start API sync" },
      { num: "08", code: "await supabase.rpc('sync_mastery_graph', { learnerId });", accent: true },
    ],
    nodes: [
      { label: "Frontend", value: "Next.js · React 19" },
      { label: "Database", value: "PostgreSQL · RLS" },
      { label: "Realtime", value: "Supabase Sync" },
    ],
    featuredSlug: "bilimyol-smart-edu",
    featuredName: "BilimYöl Cloud Core",
  },
  {
    id: "ai",
    code: "03",
    tabLabel: { en: "Applied AI & Bots", uz: "Amaliy AI va Bot" },
    fileName: "src/ai/lexhub_statutory_assistant.ts",
    langBadge: "GEMINI · LLM RAG",
    headline: {
      en: "Grounded AI tutors, Uzbekistan legal drafting & Telegram bots",
      uz: "AI ustoz, qonunchilik asosida hujjat tayyorlash va Telegram botlar",
    },
    lines: [
      { num: "01", code: "export async function draftLegalDocument(issue: CitizenCase) {" },
      { num: "02", code: "  const statutes = await matchUzbekistanCodes(issue.topic);", accent: true },
      { num: "03", code: "  return gemini.generateStructuredDraft({" },
      { num: "04", code: "    grounding: statutes, // Verified statutory articles", accent: true },
      { num: "05", code: "    locale: issue.locale, // UZ / EN bilingual output" },
      { num: "06", code: "    format: 'official_petition_or_claim'," },
      { num: "07", code: "  });" },
      { num: "08", code: "}" },
    ],
    nodes: [
      { label: "LLM Core", value: "Gemini · Grounded" },
      { label: "LegalTech", value: "LexHub Drafts" },
      { label: "Automation", value: "Telegram Bot API" },
    ],
    featuredSlug: "lexhub",
    featuredName: "LexHub Legal AI",
  },
];

export function HeroCockpit({ locale }: { locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { profile } = portfolio;

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % COCKPIT_MODES.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [paused]);

  const active = COCKPIT_MODES[activeIndex] ?? COCKPIT_MODES[0];

  return (
    <div
      className="cockpit-wrapper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <DepthScene>
        <div className="cockpit-surface">
          {/* Top Identity Bar */}
          <div className="cockpit-identity">
            <div className="cockpit-user">
              <div className="cockpit-avatar">
                <ResponsiveImage
                  image={profile.image}
                  locale={locale}
                  sizes="3.25rem"
                />
                <span className="cockpit-avatar-dot" aria-hidden="true" />
              </div>
              <div>
                <div className="cockpit-name-row">
                  <strong className="cockpit-name">{profile.name}</strong>
                  <span className="cockpit-verified">SYS.ARCHITECT</span>
                </div>
                <p className="cockpit-meta">
                  {profile.location[locale]} · UTC+5 · Flutter / Next.js / AI
                </p>
              </div>
            </div>

            <div className="cockpit-award-pill" title="National AI Hackathon Finalist">
              <Award aria-hidden="true" size={14} />
              <span>{locale === "uz" ? "AI Xakaton Finalchisi" : "AI Hackathon Finalist"}</span>
            </div>
          </div>

          {/* Interactive 3-Domain Mode Switcher */}
          <div
            className="cockpit-tabs"
            role="tablist"
            aria-label={locale === "uz" ? "Muhandislik qatlamlari" : "Engineering layers"}
          >
            {COCKPIT_MODES.map((mode, idx) => {
              const selected = idx === activeIndex;
              return (
                <button
                  aria-selected={selected}
                  className={selected ? "cockpit-tab cockpit-tab--active" : "cockpit-tab"}
                  key={mode.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setPaused(true);
                  }}
                  role="tab"
                  type="button"
                >
                  {mode.id === "mobile" && <Smartphone aria-hidden="true" size={14} />}
                  {mode.id === "fullstack" && <Database aria-hidden="true" size={14} />}
                  {mode.id === "ai" && <Bot aria-hidden="true" size={14} />}
                  <span>{mode.tabLabel[locale]}</span>
                </button>
              );
            })}
          </div>

          {/* Code & System Architecture Window */}
          <div className="cockpit-editor">
            <div className="cockpit-editor-bar">
              <span className="cockpit-file">
                <Code2 aria-hidden="true" size={13} />
                {active.fileName}
              </span>
              <span className="cockpit-lang-badge">{active.langBadge}</span>
            </div>

            <p className="cockpit-headline">{active.headline[locale]}</p>

            <pre className="cockpit-code" aria-label={active.fileName}>
              <code>
                {active.lines.map((line) => (
                  <span
                    className={line.accent ? "cockpit-code-line cockpit-code-line--accent" : "cockpit-code-line"}
                    key={line.num}
                  >
                    <span className="cockpit-line-num" aria-hidden="true">
                      {line.num}
                    </span>
                    <span className="cockpit-line-text">{line.code}</span>
                  </span>
                ))}
              </code>
            </pre>
          </div>

          {/* Bottom Telemetry Nodes & Project Link */}
          <div className="cockpit-footer">
            <div className="cockpit-nodes">
              {active.nodes.map((node) => (
                <div className="cockpit-node" key={node.label}>
                  <span className="cockpit-node-label">{node.label}</span>
                  <strong className="cockpit-node-val">{node.value}</strong>
                </div>
              ))}
            </div>

            <div className="cockpit-status-row">
              <span className="cockpit-live-indicator">
                <Cpu aria-hidden="true" size={13} />
                {locale === "uz"
                  ? "Jonli loyiha arxitekturasi:"
                  : "Live architecture in:"}
              </span>
              <Link className="cockpit-project-link" href={projectPath(locale, active.featuredSlug)}>
                <Sparkles aria-hidden="true" size={13} />
                <span>{active.featuredName}</span>
                <Layers aria-hidden="true" size={13} />
              </Link>
            </div>
          </div>
        </div>
      </DepthScene>

      <figcaption className="hero-caption eyebrow">
        <span>SYS. 01 / INTERACTIVE ARCHITECTURE</span>
        <span>FLUTTER · NEXT.JS · SUPABASE · AI</span>
      </figcaption>
    </div>
  );
}
