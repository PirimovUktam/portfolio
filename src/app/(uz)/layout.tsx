import type { ReactNode } from "react";
import type { Viewport } from "next";
import { bodyFont, displayFont } from "@/lib/fonts";
import "@/app/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#181419",
};

export default function UzbekLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uz" data-scroll-behavior="smooth">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
