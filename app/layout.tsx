import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lemonLCT.github.io/Lemon-vios";
const title = "LemonLC'Blog｜把成长写成一场长期连载";
const description = "LemonLC 的个人博客，记录求职、学习、项目复盘与小说创作。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: "LemonLC" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "LemonLC'Blog",
    title,
    description,
    images: [{ url: `${siteUrl}/og.png`, width: 1536, height: 1024, alt: "LemonLC'Blog 樱花日记风格预览" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
