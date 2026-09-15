import Image from "next/image";
import Link from "next/link";
import projectPoster from "../public/media/gogoghost-poster.jpg";
import profileAvatar from "./assets/zuobimai-avatar.png";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { authorName, featuredProject } from "./content";
import { articles } from "./articles/content";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#profile">跳到个人介绍</a>
      <SiteHeader active="home" />
      <main className="portfolio">
        <section className="profile-intro" id="profile">
          <div>
            <p className="section-kicker">{authorName} / GAME CLIENT DEVELOPMENT</p>
            <h1>把想法，<br />做成可以体验的作品。</h1>
            <p>你好，我是{authorName}。我正在走向游戏客户端开发，用 Unity 制作游戏，持续学习现代 C++，记录项目中的实践与思考。</p>
            <div className="action-row">
              <Link className="solid-link" href="/projects/gogoghost">查看代表项目 →</Link>
              <Link className="quiet-link" href="/articles">阅读文章</Link>
            </div>
          </div>
          <Image className="profile-portrait" src={profileAvatar} alt={`${authorName}的头像`} sizes="(max-width: 760px) 160px, 280px" unoptimized preload />
        </section>
        <section className="content-block" aria-labelledby="featured-title">
          <div className="block-heading"><div><p className="section-kicker">SELECTED WORK / 01</p><h2 id="featured-title">代表项目</h2></div><Link className="quiet-link" href="/projects">全部项目 →</Link></div>
          <Link className="project-entry" href="/projects/gogoghost">
            <Image src={projectPoster} alt="GoGoGhost 第三人称战斗演示画面" sizes="(max-width: 760px) 100vw, 60vw" unoptimized />
            <div><span className="tag">UNITY · C# · 独立开发</span><h3>{featuredProject.name}</h3><p>{featuredProject.title}</p><p>{featuredProject.summary}</p><span className="quiet-link">查看演示与功能模块 →</span></div>
          </Link>
        </section>
        <section className="content-block" aria-labelledby="practice-title">
          <div className="block-heading"><div><p className="section-kicker">PRACTICE</p><h2 id="practice-title">能力背后的实践</h2></div></div>
          <div className="unit-grid">
            <Link className="unit-card" href="/projects/gogoghost#combat"><span className="tag">游戏体验</span><h3>战斗与成长</h3><p>角色战斗、武器反馈与敌人波次，串成可演示的游戏流程。</p><span className="quiet-link">查看战斗模块 →</span></Link>
            <Link className="unit-card" href="/projects/gogoghost#interface"><span className="tag">客户端交互</span><h3>界面与状态</h3><p>通过 HUD、菜单和存档流程，连接游戏状态与玩家操作。</p><span className="quiet-link">查看界面模块 →</span></Link>
            <Link className="unit-card" href="/articles/series/cpp-client"><span className="tag">持续学习</span><h3>现代 C++</h3><p>围绕生命周期、并发与工程设计，整理客户端方向的学习顺序。</p><span className="quiet-link">查看系列目录 →</span></Link>
          </div>
        </section>
        <section className="content-block" aria-labelledby="reading-title">
          <div className="block-heading"><div><p className="section-kicker">READING</p><h2 id="reading-title">精选文章</h2></div><Link className="quiet-link" href="/articles">全部文章 →</Link></div>
          {articles.slice(0, 1).map((article) => <Link className="unit-card" href={`/articles/${article.slug}`} key={article.slug}><span className="tag">学习路径 · 系列导读</span><h3>{article.title}</h3><p>{article.summary}</p><span className="quiet-link">阅读全文 →</span></Link>)}
        </section>
        <section className="contact-block" id="contact">
          <div><p className="section-kicker">KEEP IN TOUCH</p><h2>从作品开始认识我。</h2><p>更多源码与持续更新的项目，见 GitHub。</p></div>
          <a className="solid-link" href="https://github.com/lemonLCT" target="_blank" rel="noreferrer">访问 GitHub ↗</a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
