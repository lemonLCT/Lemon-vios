import type { Metadata } from "next";
import Link from "next/link";
import PageFrame from "../../../components/PageFrame";
import SectionNav from "../../../components/SectionNav";
import { plannedNotes } from "../../content";

export const metadata: Metadata = { title: "学习与求职手记系列", description: "学习方法、面试准备和作品集整理的待写目录。" };
export default function PracticeSeries() {
  return <PageFrame active="articles" title="学习与求职手记" intro="这些主题正在整理，完整正文发布后会加入文章列表。" breadcrumbs={[{ label: "文章", href: "/articles" }, { label: "系列", href: "/articles/series" }]}>
    <div className="detail-layout"><SectionNav items={plannedNotes} /><div className="detail-body">
      {plannedNotes.map((item) => <section id={item.id} key={item.id}><span className="pending-label">正文待补充</span><h2><a href={`#${item.id}`}>{item.title}</a></h2><p>{item.note}</p></section>)}
      <Link className="quiet-link" href="/articles/series">← 全部系列</Link>
    </div></div>
  </PageFrame>;
}
