import type { Metadata } from "next";
import PageFrame from "../components/PageFrame";
import LegacyRedirect from "../components/LegacyRedirect";

export const metadata: Metadata = { title: "学习内容已迁移", robots: { index: false } };
export default function LearningPage() {
  return <PageFrame active="articles" title="学习内容已迁移" intro="C++ 学习路线已收录到文章系列。"><LegacyRedirect href="/articles/series/cpp-client#cpp-roadmap" /></PageFrame>;
}
