import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Analytics — CMS Platform",
  description: "Real-time content performance analytics and audience insights for the multi-tenant CMS platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
