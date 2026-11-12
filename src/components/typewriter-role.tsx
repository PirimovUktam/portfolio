"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/data/portfolio";

const ROLE_PHRASES: Record<Locale, readonly string[]> = {
  en: [
    "Mobile & Full-Stack Engineer · Applied AI",
    "Flutter & Dart Cross-Platform Architect",
    "Next.js & Supabase Full-Stack Developer",
    "Grounded Gemini & LLM Systems Builder",
  ],
  uz: [
    "Mobil va Full-Stack dasturçi · Amaliy AI",
    "Flutter va Dart kross-platforma muhandisi",
    "Next.js va Supabase Full-Stack dasturçi",
    "Gemini va amaliy AI tizimlari muhandisi",
  ],
};

type TypewriterRoleProps = {
  locale: Locale;
  staticText: string;
  phrases?: readonly string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
};

export function TypewriterRole({
  locale,
  staticText,
  phrases: customPhrases,
  typingSpeed = 32,
  deletingSpeed = 16,
  pauseMs = 2200,
}: TypewriterRoleProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(staticText);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = useMemo(() => {
    const source = customPhrases ?? ROLE_PHRASES[locale];
    return [
      staticText,
      ...source.filter((phrase) => phrase !== staticText),
    ];
  }, [customPhrases, locale, staticText]);

  useEffect(() => {
    if (document.getElementById("top")?.dataset.motion === "off") {
      return;
    }

    const currentPhrase = phrases[phraseIndex] ?? staticText;
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseMs);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 260);
    }

    return () => clearTimeout(timer);
  }, [deletingSpeed, displayedText, isDeleting, pauseMs, phraseIndex, phrases, staticText, typingSpeed]);

  return (
    <span className="typewriter-container">
      <span className="typewriter-text">{displayedText}</span>
      <span aria-hidden="true" className="typewriter-cursor" />
    </span>
  );
}
