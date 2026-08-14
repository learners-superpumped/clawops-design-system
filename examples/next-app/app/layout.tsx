import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@teamlearners/clawops-design-system/styles.css";
import "./page.css";

export const metadata: Metadata = {
  title: "ClawOps Design System",
  description: "Next.js integration example",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
