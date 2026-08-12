import Image from "next/image";
import Link from "next/link";
import projectPoster from "../public/media/gogoghost-poster.jpg";
import profileAvatar from "./assets/zuobimai-avatar.png";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { authorName, channels, featuredProject, posts } from "./content";

const latestCareerPost = posts.find((post) => post.category === "求职手记")!;
const featuredLearningPost = posts.find((post) => post.category === "学习笔记" && post.featured)
  ?? posts.find((post) => post.category === "学习笔记")!;

const homeHighlights = [
  {
    key: "career",
    mark: "01",
    channel: "求职手记",
    meta: `${latestCareerPost.date} · ${latestCareerPost.readTime}`,
    title: latestCareerPost.title,
    excerpt: latestCareerPost.excerpt,
    href: "/career",
    cta: "查看求职手记",
  },
  {
    key: "learning",
    mark: "02",
    channel: "学习笔记",
    meta: `${featuredLearningPost.date} · ${featuredLearningPost.readTime}`,
    title: featuredLearningPost.title,
    excerpt: featuredLearningPost.excerpt,
    href: "/learning#cpp-roadmap",
    cta: "查看学习路线",
  },
  {
    key: "projects",
    mark: "03",
    channel: "个人项目",
    meta: "UNITY · C#",
    title: featuredProject.name,
    excerpt: featuredProject.summary,
    href: "/projects",
    cta: "查看项目演示",
  },
] as const;

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#profile">跳到个人介绍</a>
      <SiteHeader active="home" />

      <section className="hero" id="profile" aria-labelledby="hero-title">
        <div className="hero-visual" aria-hidden="true">
          <span className="hero-orbit orbit-one" />
          <span className="hero-orbit orbit-two" />
          <span className="hero-orbit orbit-three" />
          <span className="hero-axis axis-horizontal" />
          <span className="hero-axis axis-vertical" />
          <span className="hero-monogram">佐</span>
          <span className="hero-node node-one" />
          <span className="hero-node node-two" />
          <span className="hero-node node-three" />
        </div>

        <div className="hero-profile">
          <div className="hero-avatar-column">
            <div className="hero-avatar-frame">
              <span className="hero-avatar-orbit" aria-hidden="true" />
              <Image
                className="hero-avatar"
                src={profileAvatar}
                alt={`${authorName}的头像`}
                sizes="(max-width: 760px) 68vw, (max-width: 1080px) 34vw, 360px"
                preload
              />
              <span className="hero-avatar-label">{authorName}</span>
            </div>
            <blockquote className="hero-quote">
              “慢一点也没关系，重要的是一直在写下一页。”
              <cite>— {authorName}</cite>
            </blockquote>
          </div>

          <div className="hero-copy">
            <p className="eyebrow"><span>{authorName} / PERSONAL ARCHIVE</span> EST. 2026</p>
            <h1 id="hero-title">你好，我是{authorName}。<br /><em>在技术与想象之间持续探索。</em></h1>
            <p className="hero-intro">
              我正在走向游戏客户端开发，持续学习现代 C++，也在把想法做成可以运行的作品。
              这里是我的个人主页，也是求职、学习与个人项目的入口。
            </p>
            <p className="hero-about">
              我相信复盘是为了让下一次选择更清醒，笔记则是把陌生事物变成自己语言的过程。
            </p>
            <div className="status-strip hero-status" aria-label="当前状态">
              <span className="status-dot" aria-hidden="true" />
              <span><small>NOW</small> 求职准备中</span>
              <span><small>LEARNING</small> C++ · 游戏客户端</span>
              <span><small>PROJECT</small> {featuredProject.name}</span>
            </div>
            <div className="hero-actions">
              <Link className="primary-action" href="/learning">查看学习路线 <span aria-hidden="true">→</span></Link>
              <a className="text-action" href="#highlights">浏览精选内容</a>
            </div>
            <div className="mini-stats" aria-label="博客统计">
              <span><strong>{String(posts.length).padStart(2, "0")}</strong> 篇记录</span>
              <span><strong>03</strong> 个分区</span>
              <span><strong>∞</strong> 持续更新</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll" aria-hidden="true"><span /> SCROLL TO EXPLORE</div>
      </section>

      <section className="channels" id="channels" aria-labelledby="channels-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CHAPTER INDEX</p>
            <h2 id="channels-title">从哪个分区开始？</h2>
          </div>
          <p>三类内容拥有各自的页面，可以随时通过顶部导航切换。</p>
        </div>
        <div className="channel-grid">
          {channels.map((channel) => (
            <Link className="channel-card" href={channel.href} key={channel.key}>
              <span className="channel-number">{channel.mark}</span>
              <span className="channel-symbol" aria-hidden="true">{channel.symbol}</span>
              <strong>{channel.name}</strong>
              <small>{channel.note}</small>
              <span className="channel-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-highlights" id="highlights" aria-labelledby="highlights-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FEATURED CONTENT</p>
            <h2 id="highlights-title">先看一眼，最近在做什么。</h2>
          </div>
          <p>每个分区选择一项代表内容，快速了解我的学习方向、求职准备和项目实践。</p>
        </div>

        <div className="highlight-grid">
          {homeHighlights.map((highlight) => (
            <Link className={`highlight-card highlight-card-${highlight.key}`} href={highlight.href} key={highlight.key}>
              {highlight.key === "projects" && (
                <span className="highlight-project-image">
                  <Image
                    src={projectPoster}
                    alt={`${featuredProject.name}游戏演示画面`}
                    sizes="(max-width: 760px) 100vw, (max-width: 1080px) 50vw, 34vw"
                  />
                </span>
              )}
              <span className="highlight-card-body">
                <span className="highlight-meta">
                  <span>{highlight.mark} / {highlight.channel}</span>
                  <span>{highlight.meta}</span>
                </span>
                <strong>{highlight.title}</strong>
                <span className="highlight-excerpt">{highlight.excerpt}</span>
                <span className="highlight-link">{highlight.cta} <span aria-hidden="true">↗</span></span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="newsletter" aria-labelledby="newsletter-title">
        <div>
          <span className="newsletter-mark" aria-hidden="true">✉</span>
          <p className="eyebrow">NEXT CHAPTER</p>
          <h2 id="newsletter-title">下一页，正在书写。</h2>
          <p>这里会持续更新求职记录、学习笔记和个人项目 Demo。</p>
        </div>
        <Link href="/learning">进入学习笔记 <span aria-hidden="true">→</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
