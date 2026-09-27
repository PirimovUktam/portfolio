import { Syne, Manrope } from "next/font/google";

export const displayFont = Syne({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});
