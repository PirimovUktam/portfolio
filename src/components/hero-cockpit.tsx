"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Award,
  Bot,
  Cpu,
  Database,
  Layers,
  Play,
  Scale,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { DepthScene } from "@/components/depth-scene";
import { ResponsiveImage } from "@/components/responsive-image";
import { projectPath } from "@/lib/routes";

type NodeId = "bilimyol" | "lexhub" | "architecture" | "hackathon";

type EcosystemNode = {
  id: NodeId;
  code: string;
  position: "tl" | "tr" | "bl" | "br";
  badge: { en: string; uz: string };
  title: string;
  metric: string;
  metricLabel: { en: string; uz: string };
  stack: string[];
  flow: [string, string, string];
  summary: { en: string; uz: string };
  slug?: string;
  certificateUrl?: string;
};

const NODES: EcosystemNode[] = [
  {
    id: "bilimyol",
    code: "NODE 01",
    position: "tl",
    badge: { en: "EdTech · AI Tutor", uz: "EdTech · AI Ustoz" },
    title: "BilimYöl Smart Edu",
    metric: "Yölçi AI",
    metricLabel: { en: "Adaptive Skill Map", uz: "Moslashuvchan Xarita" },
    stack: ["React", "Flutter", "Supabase", "Gemini"],
    flow: ["Diagnostic Test", "Skill Graph RPC", "Yölçi AI Tutor"],
    summary: {
      en: "Diagnoses student knowledge gaps and explains mistakes step-by-step via Gemini AI across web & mobile.",
      uz: "O'quvchi bilimidagi bo'shliqlarni aniqlab, Yölçi AI orqali xatolarni qadam-baqadam tushuntiruvchi platforma.",
    },
    slug: "bilimyol-smart-edu",
  },
  {
    id: "lexhub",
    code: "NODE 02",
    position: "tr",
    badge: { en: "LegalTech · RAG", uz: "LegalTech · AI" },
    title: "LexHub Legal AI",
    metric: "UZ Codes",
    metricLabel: { en: "Statutory Grounding", uz: "Qonunchilik Asosi" },
    stack: ["Flutter", "Dart", "PostgreSQL", "LLM"],
    flow: ["Citizen Case", "Statutory Match", "Petition Draft"],
    summary: {
      en: "Matches everyday legal issues to Uzbekistan legislation and drafts formal petitions & claims.",
      uz: "Fuqarolar muammosini O'zbekiston qonun moddalari bilan bog'lab, rasmiy ariza va da'vo loyihasini tuzadi.",
    },
    slug: "lexhub",
  },
  {
    id: "architecture",
    code: "NODE 03",
    position: "bl",
    badge: { en: "Core Stack", uz: "Asosiy Tizim" },
    title: "Mobile + Cloud Core",
    metric: "60 FPS",
    metricLabel: { en: "Cross-Platform Sync", uz: "Kross-Platforma" },
    stack: ["Next.js 16", "TypeScript", "Riverpod", "RLS"],
    flow: ["Flutter / Next.js", "Supabase Auth & RLS", "Edge Functions"],
    summary: {
      en: "Single shared PostgreSQL & Supabase backend powering native-feel iOS, Android, and web clients simultaneously.",
      uz: "iOS, Android va veb ilovalarni bitta himoyalangan PostgreSQL va Supabase bulutli bazasida birlashtiruvchi arxitektura.",
    },
    slug: "cosmoplus",
  },
  {
    id: "hackathon",
    code: "NODE 04",
    position: "br",
    badge: { en: "Recognition", uz: "E'tirof" },
    title: "AI Hackathon Finalist",
    metric: "TOP TIER",
    metricLabel: { en: "Qarshi Stage · 2026", uz: "Qarshi Bosqichi · 2026" },
    stack: ["Product Vision", "System Design", "Live MVP", "AI Pitch"],
    flow: ["Problem Discovery", "Full-Stack + AI MVP", "Jury Defense"],
    summary: {
      en: "Selected as Qarshi stage finalist at the National AI Hackathon for engineering BilimYöl Smart Edu end-to-end.",
      uz: "BilimYöl Smart Edu loyihasini g'oyadan ishchi MVP darajasigacha yaratib, Milliy AI Xakatoni finaliga chiqdim.",
    },
    certificateUrl: "/images/recognition/oktam-pirimov-national-ai-hackathon-qarshi.pdf",
  },
];

const BEAM_PATHS: Record<EcosystemNode["position"], string> = {
  tl: "M 300 135 C 235 135, 200 68, 120 58",
  tr: "M 300 135 C 365 135, 400 68, 480 58",
  bl: "M 300 135 C 235 135, 200 202, 120 212",
  br: "M 300 135 C 365 135, 400 202, 480 212",
};

export function HeroCockpit({ locale }: { locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pulseCount, setPulseCount] = useState(1);
  const { profile } = portfolio;

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % NODES.length);
      setPulseCount((c) => c + 1);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const active = NODES[activeIndex] ?? NODES[0];

  function handleSelect(index: number) {
    setActiveIndex(index);
    setPaused(true);
    setPulseCount((c) => c + 1);
  }

  function triggerSimulation() {
    setPaused(false);
    setActiveIndex((prev) => (prev + 1) % NODES.length);
    setPulseCount((c) => c + 1);
  }

  return (
    <div
      className="nexus-wrapper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <DepthScene>
        <div className="nexus-stage" data-active-pos={active.position}>
          {/* Top Telemetry Bar */}
          <div className="nexus-topbar">
            <div className="nexus-sys-title">
              <span className="nexus-live-dot" aria-hidden="true" />
              <span>NEURAL PRODUCT ECOSYSTEM // v2.6</span>
            </div>
            <button
              className="nexus-sim-btn"
              onClick={triggerSimulation}
              type="button"
            >
              <Play aria-hidden="true" size={11} />
              <span>{locale === "uz" ? "Oqimni aylantirish" : "Cycle Neural Flow"}</span>
            </button>
          </div>

          {/* 3D Constellation Grid: 4 Floating Nodes + Central Architect Core */}
          <div className="nexus-constellation" role="tablist" aria-label="Product Ecosystem Nodes">
            {/* Geometrically Locked Neural & Orbital SVG Canvas */}
            <svg
              aria-hidden="true"
              className="nexus-svg-canvas"
              preserveAspectRatio="none"
              viewBox="0 0 600 270"
            >
              <defs>
                <radialGradient id="nexusCoreGlow" cx="50%" cy="50%" r="48%">
                  <stop offset="0%" stopColor="#d7f74d" stopOpacity="0.32" />
                  <stop offset="48%" stopColor="#10b981" stopOpacity="0.09" />
                  <stop offset="100%" stopColor="#181419" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Radial Aura Centered at (300, 135) */}
              <circle cx="300" cy="135" r="145" fill="url(#nexusCoreGlow)" />

              {/* Concentric Radar & Telemetry Rings Centered at (300, 135) */}
              <circle
                className="nexus-orbit-outer"
                cx="300"
                cy="135"
                r="118"
                fill="none"
                stroke="rgba(215, 247, 77, 0.16)"
                strokeDasharray="4 8"
                strokeWidth="1.2"
              />
              <circle
                className="nexus-orbit-mid"
                cx="300"
                cy="135"
                r="88"
                fill="none"
                stroke="rgba(246, 240, 232, 0.12)"
                strokeDasharray="20 10 4 10"
                strokeWidth="1.1"
              />
              <circle
                className="nexus-orbit-inner"
                cx="300"
                cy="135"
                r="60"
                fill="none"
                stroke="rgba(215, 247, 77, 0.38)"
                strokeDasharray="8 5"
                strokeWidth="1.5"
              />

              {/* 4 Neural Curved Data Pathways */}
              {(["tl", "tr", "bl", "br"] as const).map((pos) => {
                const isBeamActive = active.position === pos;
                return (
                  <g key={pos}>
                    <path
                      className={isBeamActive ? "nexus-beam nexus-beam--active" : "nexus-beam"}
                      d={BEAM_PATHS[pos]}
                      fill="none"
                      stroke={isBeamActive ? "#d7f74d" : "rgba(215, 247, 77, 0.28)"}
                    />
                    {isBeamActive && (
                      <circle r="4" fill="#d7f74d">
                        <animateMotion
                          dur="1.15s"
                          path={BEAM_PATHS[pos]}
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Central Holographic Architect Core */}
            <div className="nexus-core" key={pulseCount}>
              <div className="nexus-core-ring" aria-hidden="true" />
              <div className="nexus-core-pulse" aria-hidden="true" />
              <div className="nexus-core-avatar">
                <ResponsiveImage
                  image={profile.image}
                  locale={locale}
                  sizes="5.5rem"
                />
              </div>
              <div className="nexus-core-tag">
                <Sparkles aria-hidden="true" size={11} />
                <span>ÖKTAM PIRIMOV</span>
              </div>
              <span className="nexus-core-sub">AI · MOBILE · FULL-STACK</span>
            </div>

            {/* 4 Orbiting Interactive Product / Engineering Cards */}
            {NODES.map((node, index) => {
              const isSelected = index === activeIndex;
              return (
                <button
                  aria-selected={isSelected}
                  className={
                    isSelected
                      ? `nexus-node nexus-node--${node.position} nexus-node--active`
                      : `nexus-node nexus-node--${node.position}`
                  }
                  key={node.id}
                  onClick={() => handleSelect(index)}
                  role="tab"
                  type="button"
                >
                  <div className="nexus-node-head">
                    <span className="nexus-node-code">{node.code}</span>
                    <span className="nexus-node-badge">
                      {node.id === "bilimyol" && <Bot aria-hidden="true" size={12} />}
                      {node.id === "lexhub" && <Scale aria-hidden="true" size={12} />}
                      {node.id === "architecture" && <Smartphone aria-hidden="true" size={12} />}
                      {node.id === "hackathon" && <Award aria-hidden="true" size={12} />}
                      {node.badge[locale]}
                    </span>
                  </div>

                  <strong className="nexus-node-title">{node.title}</strong>

                  <div className="nexus-node-metric-row">
                    <span className="nexus-node-metric">{node.metric}</span>
                    <span className="nexus-node-metric-label">{node.metricLabel[locale]}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Live Telemetry & Architecture Flow Deck */}
          <div className="nexus-inspector" aria-live="polite">
            <div className="nexus-inspector-top">
              <div className="nexus-inspector-title-group">
                <span className="nexus-inspector-pill">
                  <Activity aria-hidden="true" size={12} />
                  {active.code} · ACTIVE TELEMETRY
                </span>
                <h3 className="nexus-inspector-heading">{active.title}</h3>
              </div>

              {active.slug && (
                <Link className="nexus-launch-btn" href={projectPath(locale, active.slug)}>
                  <span>{locale === "uz" ? "Arxitekturani ko'rish" : "Inspect Case Study"}</span>
                  <ArrowUpRight aria-hidden="true" size={14} />
                </Link>
              )}

              {active.certificateUrl && (
                <a
                  className="nexus-launch-btn"
                  href={active.certificateUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>{locale === "uz" ? "Sertifikat (PDF)" : "Certificate (PDF)"}</span>
                  <ArrowUpRight aria-hidden="true" size={14} />
                </a>
              )}
            </div>

            <p className="nexus-inspector-desc">{active.summary[locale]}</p>

            {/* Live 3-Stage Execution Pipeline */}
            <div className="nexus-pipeline">
              {active.flow.map((step, i) => (
                <div className="nexus-pipe-step" key={step}>
                  <span className="nexus-pipe-num">0{i + 1}</span>
                  <span className="nexus-pipe-text">{step}</span>
                  {i < active.flow.length - 1 && (
                    <Zap aria-hidden="true" className="nexus-pipe-bolt" size={12} />
                  )}
                </div>
              ))}
            </div>

            {/* Stack Micro-Pills */}
            <div className="nexus-stack-bar">
              <span className="nexus-stack-label">
                <Cpu aria-hidden="true" size={12} />
                {locale === "uz" ? "Texnologik o'zak:" : "Runtime stack:"}
              </span>
              <div className="nexus-stack-list">
                {active.stack.map((item) => (
                  <span className="nexus-stack-chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DepthScene>

      <figcaption className="hero-caption eyebrow">
        <span>
          <Layers aria-hidden="true" style={{ display: "inline", marginRight: "0.35rem" }} size={12} />
          NEURAL ECOSYSTEM // ÖKTAM PIRIMOV
        </span>
        <span>
          <Database aria-hidden="true" style={{ display: "inline", marginRight: "0.35rem" }} size={12} />
          FLUTTER · NEXT.JS · SUPABASE · GEMINI AI
        </span>
      </figcaption>
    </div>
  );
}
