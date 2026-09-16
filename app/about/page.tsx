import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import profileAvatar from "../assets/zuobimai-avatar.png";
import PageFrame from "../components/PageFrame";
import SectionNav from "../components/SectionNav";
import { authorName, featuredProject } from "../content";

export const metadata: Metadata = {
  title: "关于我",
  description: `${authorName}的个人介绍、学习理念和当前状态，在技术与想象之间持续探索。`,
};

const sections = [
  { id: "introduction", title: "个人介绍" },
  { id: "beliefs", title: "寄语与理念" },
  { id: "now", title: "当前状态" },
  { id: "next-chapter", title: "下一页" },
];

export default function AboutPage() {
  return <PageFrame active="about" title="关于我" intro="在技术与想象之间持续探索。">
    <div className="detail-layout">
      <SectionNav items={sections} />
      <div className="detail-body">
        <section id="introduction" className="personal-profile">
          <div><h2>你好，我是{authorName}。</h2>
            <p>我正在走向游戏客户端开发，持续学习现代 C++，也在把想法做成可以运行的作品。</p>
            <p>这里是我的个人主页，也是求职、学习与个人项目的入口。</p>
          </div>
          <Image className="personal-avatar" src={profileAvatar} alt={`${authorName}的头像`} width={200} height={200} unoptimized />
        </section>
        <section id="beliefs"><h2>寄语与理念</h2>
          <blockquote className="personal-quote"><p>“慢一点也没关系，重要的是一直在写下一页。”</p><cite>— {authorName}</cite></blockquote>
          <p>我相信复盘是为了让下一次选择更清醒，笔记则是把陌生事物变成自己语言的过程。</p>
        </section>
        <section id="now"><h2>当前状态</h2>
          <div className="unit-grid">
            <Link className="unit-card" href="/articles/series/practice-notes"><span className="tag">求职</span><h3>求职准备中</h3><p>面试准备、作品集整理与求职过程中的思考。</p><span className="quiet-link">查看手记目录 →</span></Link>
            <Link className="unit-card" href="/articles/series/cpp-client"><span className="tag">学习</span><h3>C++ · 游戏客户端</h3><p>从对象生命周期到工程设计，持续整理自己的学习路径。</p><span className="quiet-link">查看学习系列 →</span></Link>
            <Link className="unit-card" href="/projects/gogoghost"><span className="tag">项目</span><h3>{featuredProject.name}</h3><p>{featuredProject.title}</p><span className="quiet-link">查看代表项目 →</span></Link>
          </div>
        </section>
        <section id="next-chapter"><h2>下一页，正在书写。</h2>
          <p>这里会持续更新求职记录、学习笔记和个人项目 Demo。</p>
          <div className="action-row"><Link className="quiet-link" href="/articles">进入文章 →</Link><a className="quiet-link" href="https://github.com/lemonLCT" target="_blank" rel="noreferrer">访问 GitHub ↗</a></div>
        </section>
      </div>
    </div>
  </PageFrame>;
}
