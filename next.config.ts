import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  return {
    // Export validation in next dev treats unknown dynamic slugs as build errors.
    output: phase === PHASE_DEVELOPMENT_SERVER ? undefined : "export",
    trailingSlash: true,
    images: { unoptimized: true },
    poweredByHeader: false,
    agentRules: false,
    experimental: { globalNotFound: true },
  };
}
