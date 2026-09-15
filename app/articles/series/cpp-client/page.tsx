import type { Metadata } from "next";
import Link from "next/link";
import PageFrame from "../../../components/PageFrame";
import SectionNav from "../../../components/SectionNav";
import { cppStages } from "../../../content";

export const metadata: Metadata = { title: "游戏客户端 C++ 系列", description: "六个阶段、二十个知识主题，查看系列导读与待补充章节。" };
export default function CppSeries() {
  return <PageFrame active="articles" title="游戏客户端 C++" intro="6 个阶段 · 20 个知识主题 · 1 篇导读已发布" breadcrumbs={[{ label: "文章", href: "/articles" }, { label: "系列", href: "/articles/series" }]}>
    <div className="detail-layout" id="cpp-roadmap"><SectionNav items={[{ id: "overview", title: "系列导读" }, ...cppStages]} /><div className="detail-body">
      <section id="overview"><h2>系列导读</h2><Link className="unit-card" href="/articles/cpp-client-overview"><span className="tag">已发布 · C++</span><h3>游戏客户端 C++：学习路径概览</h3><p>先了解各阶段的重点与客户端应用，再按目录补充知识细节。</p><span className="quiet-link">阅读全文 →</span></Link></section>
      {cppStages.map((stage) => <section id={stage.id} key={stage.id}><span className="tag">{stage.label}</span><h2><a href={`#${stage.id}`}>{stage.title}</a></h2>
        <ol className="series-list">{stage.topics.map((topic) => <li className="series-item" id={`topic-${topic.number}`} key={topic.number}>
          <div><h3><a href={`#topic-${topic.number}`}>{topic.number} / {topic.title}</a></h3><span className="pending-label">正文待补充</span></div>
          <p>{topic.focus}</p>
        </li>)}</ol>
      </section>)}
      <nav className="article-navigation" aria-label="继续浏览"><Link className="quiet-link" href="/articles/series">← 全部系列</Link><Link className="quiet-link" href="/articles?category=cpp">C++ 分类文章 →</Link></nav>
    </div></div>
  </PageFrame>;
}
