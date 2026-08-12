import type { Metadata } from "next";
import { authorName } from "./content";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lemonLCT.github.io/Lemon-vios";
const siteName = `${authorName}的个人博客`;
const title = `${siteName}｜把成长写成一场长期连载`;
const description = `${authorName}的个人主页，记录游戏客户端开发、C++ 学习、求职准备与个人项目。`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s｜${siteName}`,
  },
  description,
  authors: [{ name: authorName }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName,
    title,
    description,
    images: [{ url: `${siteUrl}/og.png`, width: 1536, height: 1024, alt: `${siteName}淡蓝科技风格预览` }],
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
