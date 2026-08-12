import Link from "next/link";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { channels, posts } from "./content";

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#about">跳到个人介绍</a>
      <SiteHeader active="home" />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-visual" aria-hidden="true">
          <span className="hero-orbit orbit-one" />
          <span className="hero-orbit orbit-two" />
          <span className="hero-orbit orbit-three" />
          <span className="hero-axis axis-horizontal" />
          <span className="hero-axis axis-vertical" />
          <span className="hero-monogram">LC</span>
          <span className="hero-node node-one" />
          <span className="hero-node node-two" />
          <span className="hero-node node-three" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow"><span>LEMONLC / PERSONAL ARCHIVE</span> EST. 2026</p>
          <h1 id="hero-title">你好，我是 LemonLC。<br /><em>在技术与想象之间持续探索。</em></h1>
          <p className="hero-intro">
            我正在走向游戏客户端开发，持续学习现代 C++，也在把想法做成可以运行的作品。
            这里是我的个人主页，也是求职、学习与个人项目的入口。
          </p>
          <div className="hero-actions">
            <Link className="primary-action" href="/learning">查看学习路线 <span aria-hidden="true">→</span></Link>
            <a className="text-action" href="#channels">浏览全部分区</a>
          </div>
          <div className="mini-stats" aria-label="博客统计">
            <span><strong>{String(posts.length).padStart(2, "0")}</strong> 篇记录</span>
            <span><strong>03</strong> 个分区</span>
            <span><strong>∞</strong> 持续更新</span>
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

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="about-portrait" aria-hidden="true">
          <div className="portrait-halo" />
          <div className="portrait-orbit portrait-orbit-one" />
          <div className="portrait-orbit portrait-orbit-two" />
          <div className="portrait-monogram">LC</div>
          <span className="portrait-point point-one" />
          <span className="portrait-point point-two" />
          <span className="portrait-label">LEMONLC</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">ABOUT THE AUTHOR</p>
          <h2 id="about-title">关于我</h2>
          <p className="about-lead">
            一个正在走向游戏客户端开发、持续学习，也在认真完成个人作品的人。
          </p>
          <p>
            我相信复盘不是为了责怪过去的自己，而是为了让下一次选择更清醒；
            笔记也不是知识的终点，而是把陌生事物变成自己语言的过程。
          </p>
          <div className="status-strip">
            <span className="status-dot" aria-hidden="true" />
            <span><small>NOW</small> 求职准备中</span>
            <span><small>LEARNING</small> C++ · 游戏客户端</span>
            <span><small>PROJECT</small> GoGoGhost</span>
          </div>
        </div>
        <blockquote>
          “慢一点也没关系，<br />重要的是一直在写下一页。”
          <cite>— LemonLC</cite>
        </blockquote>
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
