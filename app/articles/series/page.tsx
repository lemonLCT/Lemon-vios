import type { Metadata } from "next";
import Link from "next/link";
import PageFrame from "../../components/PageFrame";
import { series } from "../content";

export const metadata: Metadata = { title: "文章系列", description: "按学习顺序组织文章与待补充主题。" };
export default function SeriesIndex() {
  return <PageFrame active="articles" title="文章系列" intro="沿着一个主题，逐篇阅读。" breadcrumbs={[{ label: "文章", href: "/articles" }]}>
    <section className="content-block" aria-label="系列列表"><div className="unit-grid">
      {series.map((item) => <Link className="unit-card" href={`/articles/series/${item.slug}`} key={item.slug}><span className="tag">{item.articleSlugs.length} 篇已发布</span><h2>{item.title}</h2><p>{item.summary}</p><span className="quiet-link">查看系列目录 →</span></Link>)}
    </div></section>
  </PageFrame>;
}
