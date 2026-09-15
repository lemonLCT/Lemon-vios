import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import PageFrame from "../components/PageFrame";
import ArticleLibrary from "./ArticleLibrary";

export const metadata: Metadata = { title: "文章", description: "阅读技术与实践文章，按主题筛选，或沿系列目录学习。" };
export default function ArticlesPage() {
  return <PageFrame active="articles" title="文章" intro="记录知识、实践与思考。按主题寻找内容，沿系列目录逐步深入。">
    <section className="content-block" aria-labelledby="article-list"><div className="block-heading"><h2 id="article-list">已发布文章</h2><Link className="quiet-link" href="/articles/series">系列目录 →</Link></div>
      <Suspense fallback={<p>正在读取文章筛选条件…</p>}><ArticleLibrary /></Suspense>
    </section>
  </PageFrame>;
}
