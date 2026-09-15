import type { Metadata } from "next";
import PageFrame from "../components/PageFrame";
import LegacyRedirect from "../components/LegacyRedirect";

export const metadata: Metadata = { title: "求职手记已迁移", robots: { index: false } };
export default function CareerPage() {
  return <PageFrame active="articles" title="求职手记已迁移" intro="求职手记现在是文章中的一个分类。"><LegacyRedirect href="/articles?category=career" /></PageFrame>;
}
