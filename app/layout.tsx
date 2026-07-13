import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "LemonLC'Blog｜把成长写成一场长期连载";
  const description = "LemonLC 的个人博客，记录求职、学习、项目复盘与小说创作。";

  return {
    title,
    description,
    authors: [{ name: "LemonLC" }],
    openGraph: {
      type: "website",
      locale: "zh_CN",
      url: origin,
      siteName: "LemonLC'Blog",
      title,
      description,
      images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "LemonLC'Blog 樱花日记风格预览" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
