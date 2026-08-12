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
        <div className="floating-petal petal-one" aria-hidden="true" />
        <div className="floating-petal petal-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span>LEMONLC&apos;S NOTEBOOK</span> 个人主页</p>
          <h1 id="hero-title">你好，我是 LemonLC。<br /><em>欢迎来到我的长期连载。</em></h1>
          <p className="hero-intro">
            我正在走向游戏客户端开发，持续学习现代 C++，也没有放弃写故事。
            这里是我的个人主页，也是求职、学习、项目与创作记录的入口。
          </p>
          <div className="hero-actions">
            <Link className="primary-action" href="/learning">查看学习路线 <span aria-hidden="true">→</span></Link>
            <a className="text-action" href="#channels">浏览全部分区</a>
          </div>
          <div className="mini-stats" aria-label="博客统计">
            <span><strong>{String(posts.length).padStart(2, "0")}</strong> 篇记录</span>
            <span><strong>04</strong> 个分区</span>
            <span><strong>∞</strong> 持续更新</span>
          </div>
        </div>

        <div className="hero-collage" aria-label="个人主页内容预览">
          <div className="tape tape-top" aria-hidden="true" />
          <article className="feature-paper">
            <div className="paper-topline">
              <span>PERSONAL FILE</span>
              <span>NO. 001</span>
            </div>
            <div className="feature-illustration" aria-hidden="true">
              <span className="sun-disc" />
              <span className="window-line line-a" />
              <span className="window-line line-b" />
              <span className="desk-block" />
              <span className="plant-stem" />
              <span className="plant-leaf leaf-a" />
              <span className="plant-leaf leaf-b" />
              <span className="spark spark-a">✦</span>
              <span className="spark spark-b">✧</span>
            </div>
            <p className="feature-kicker">GAME CLIENT / C++ / WRITING</p>
            <h2>学习、构建，<br />也认真记录。</h2>
            <p>把走过的路整理成可以回看、复述，也能继续生长的个人档案。</p>
          </article>
          <aside className="margin-note">
            <span aria-hidden="true">♡</span>
            <strong>今日状态</strong>
            <p>在学习现代 C++，也在搭建自己的游戏客户端知识树。</p>
          </aside>
          <div className="round-sticker" aria-hidden="true">HELLO<br />WORLD</div>
          <div className="tape tape-bottom" aria-hidden="true" />
        </div>
      </section>

      <section className="channels" id="channels" aria-labelledby="channels-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CHAPTER INDEX</p>
            <h2 id="channels-title">从哪个分区开始？</h2>
          </div>
          <p>四类记录现在拥有各自的页面，可以随时通过顶部导航切换。</p>
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
          <div className="portrait-face">
            <span className="hair hair-left" />
            <span className="hair hair-right" />
            <span className="eye eye-left" />
            <span className="eye eye-right" />
            <span className="smile" />
          </div>
          <span className="portrait-flower flower-one">✿</span>
          <span className="portrait-flower flower-two">✦</span>
          <span className="portrait-label">LEMONLC</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">ABOUT THE AUTHOR</p>
          <h2 id="about-title">关于我</h2>
          <p className="about-lead">
            一个正在走向游戏客户端开发、持续学习，也没有放弃写故事的人。
          </p>
          <p>
            我相信复盘不是为了责怪过去的自己，而是为了让下一次选择更清醒；
            笔记也不是知识的终点，而是把陌生事物变成自己语言的过程。
          </p>
          <div className="status-strip">
            <span className="status-dot" aria-hidden="true" />
            <span><small>NOW</small> 求职准备中</span>
            <span><small>LEARNING</small> C++ · 游戏客户端</span>
            <span><small>WRITING</small> 《雾港来信》</span>
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
          <p>这里会持续更新新的学习笔记、项目复盘和小说章节。</p>
        </div>
        <Link href="/learning">进入学习笔记 <span aria-hidden="true">→</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
