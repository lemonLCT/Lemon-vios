"use client";

import { useMemo, useState } from "react";

type Category = "全部" | "求职手记" | "学习笔记" | "项目复盘" | "小说连载";

type Post = {
  category: Exclude<Category, "全部">;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  number: string;
  featured?: boolean;
};

const categories: { name: Category; mark: string; note: string }[] = [
  { name: "全部", mark: "✦", note: "所有连载" },
  { name: "求职手记", mark: "01", note: "面试与成长" },
  { name: "学习笔记", mark: "02", note: "知识整理" },
  { name: "项目复盘", mark: "03", note: "经验与教训" },
  { name: "小说连载", mark: "04", note: "幻想故事" },
];

const posts: Post[] = [
  {
    category: "求职手记",
    title: "前端面试地图：从基础到现场",
    excerpt: "把零散的面试题重新整理成一张可执行的路线图：基础、工程化、浏览器与现场表达。",
    date: "2026.07.12",
    readTime: "8 分钟",
    number: "EP. 021",
    featured: true,
  },
  {
    category: "项目复盘",
    title: "把一个失败项目拆开重做",
    excerpt: "不回避失误：从需求漂移、技术债到交付节奏，记录一次真正有用的失败复盘。",
    date: "2026.07.08",
    readTime: "11 分钟",
    number: "EP. 020",
  },
  {
    category: "小说连载",
    title: "雾港来信・第一章",
    excerpt: "潮声漫过没有名字的站台，而那封迟到了七年的信，终于抵达雾港。",
    date: "2026.07.03",
    readTime: "14 分钟",
    number: "VOL. 01",
  },
  {
    category: "学习笔记",
    title: "把复杂知识学薄：我的三层笔记法",
    excerpt: "从原始材料到自己的解释，再到可以复用的清单，让每一轮学习都留下可检索的成果。",
    date: "2026.06.28",
    readTime: "6 分钟",
    number: "EP. 019",
  },
  {
    category: "求职手记",
    title: "作品集不是项目仓库",
    excerpt: "用问题、选择和结果讲清一个项目，让招聘者在三分钟内看见你的判断力。",
    date: "2026.06.20",
    readTime: "7 分钟",
    number: "EP. 018",
  },
  {
    category: "小说连载",
    title: "雾港来信・序章",
    excerpt: "入夜之后，灯塔只为不存在的船亮起。有人说，那是雾港在等待旧日归来。",
    date: "2026.06.14",
    readTime: "9 分钟",
    number: "VOL. 00",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("全部");
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      const categoryMatches = activeCategory === "全部" || post.category === activeCategory;
      const queryMatches =
        !normalized ||
        `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(normalized);
      return categoryMatches && queryMatches;
    });
  }, [activeCategory, query]);

  const chooseCategory = (category: Category) => {
    setActiveCategory(category);
    document.getElementById("latest")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      <a className="skip-link" href="#latest">跳到文章列表</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="LemonLC'Blog 首页">
          <span className="brand-seal" aria-hidden="true">L</span>
          <span>
            <strong>LemonLC&apos;Blog</strong>
            <small>PERSONAL ARCHIVE · SINCE 2026</small>
          </span>
        </a>
        <nav aria-label="主导航">
          <a href="#latest">最新笔记</a>
          <a href="#channels">内容频道</a>
          <a href="#about">关于我</a>
        </nav>
        <a className="header-cta" href="#latest">开始阅读 <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="floating-petal petal-one" aria-hidden="true" />
        <div className="floating-petal petal-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span>LEMONLC&apos;S NOTEBOOK</span> 第 001 册</p>
          <h1 id="hero-title">把成长写成<br /><em>一场长期连载。</em></h1>
          <p className="hero-intro">
            这里收录求职路上的思考、学习时留下的笔记、项目结束后的复盘，
            还有那些在深夜慢慢长成的故事。
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#latest">阅读最新篇章 <span aria-hidden="true">→</span></a>
            <a className="text-action" href="#about">先认识 LemonLC</a>
          </div>
          <div className="mini-stats" aria-label="博客统计">
            <span><strong>24</strong> 篇记录</span>
            <span><strong>04</strong> 个频道</span>
            <span><strong>∞</strong> 持续更新</span>
          </div>
        </div>

        <div className="hero-collage" aria-label="博客内容预览">
          <div className="tape tape-top" aria-hidden="true" />
          <article className="feature-paper">
            <div className="paper-topline">
              <span>本周推荐</span>
              <span>NO. 021</span>
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
            <p className="feature-kicker">CAREER NOTE / 08 MIN</p>
            <h2>前端面试地图：<br />从基础到现场</h2>
            <p>把焦虑变成路线，把准备变成一次可以回看的成长记录。</p>
          </article>
          <aside className="margin-note">
            <span aria-hidden="true">♡</span>
            <strong>今日状态</strong>
            <p>在准备下一次面试，也在认真写故事。</p>
          </aside>
          <div className="round-sticker" aria-hidden="true">NEW<br />NOTE</div>
          <div className="tape tape-bottom" aria-hidden="true" />
        </div>
      </section>

      <section className="channels" id="channels" aria-labelledby="channels-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CHAPTER INDEX</p>
            <h2 id="channels-title">从哪个章节开始？</h2>
          </div>
          <p>每一种记录，都是同一段成长的不同侧面。</p>
        </div>
        <div className="channel-grid">
          {categories.slice(1).map((category) => (
            <button
              type="button"
              className="channel-card"
              key={category.name}
              onClick={() => chooseCategory(category.name)}
              aria-label={`筛选${category.name}`}
            >
              <span className="channel-number">{category.mark}</span>
              <span className="channel-symbol" aria-hidden="true">
                {category.name === "求职手记" ? "✦" : category.name === "学习笔记" ? "⌁" : category.name === "项目复盘" ? "↺" : "☾"}
              </span>
              <strong>{category.name}</strong>
              <small>{category.note}</small>
              <span className="channel-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="latest" id="latest" aria-labelledby="latest-title">
        <div className="section-heading latest-heading">
          <div>
            <p className="eyebrow">RECENT UPDATES</p>
            <h2 id="latest-title">最近更新</h2>
          </div>
          <label className="search-field">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <span className="sr-only">搜索文章</span>
            <input
              type="search"
              placeholder="搜索笔记或故事…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="filter-row" aria-label="文章分类筛选">
          {categories.map((category) => (
            <button
              type="button"
              key={category.name}
              className={activeCategory === category.name ? "filter-button active" : "filter-button"}
              aria-pressed={activeCategory === category.name}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
          <span className="result-count" aria-live="polite">{filteredPosts.length} 篇</span>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="post-list">
            {filteredPosts.map((post) => (
              <article className={post.featured ? "post-card featured" : "post-card"} key={post.title}>
                <div className="post-index">
                  <span>{post.number}</span>
                  <i aria-hidden="true" />
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span>{post.category}</span>
                    <time>{post.date}</time>
                    <span>{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
                <button type="button" className="read-button" aria-label={`阅读《${post.title}》`}>
                  <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">☁</span>
            <h3>这一页还是空白</h3>
            <p>换个关键词，或看看其他频道吧。</p>
            <button type="button" onClick={() => { setQuery(""); setActiveCategory("全部"); }}>清除筛选</button>
          </div>
        )}
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
          <h2 id="about-title">你好，我是 LemonLC。</h2>
          <p className="about-lead">
            一个正在找工作、持续学习，也没有放弃写故事的人。
          </p>
          <p>
            我相信复盘不是为了责怪过去的自己，而是为了让下一次选择更清醒；
            笔记也不是知识的终点，而是把陌生事物变成自己语言的过程。
          </p>
          <div className="status-strip">
            <span className="status-dot" aria-hidden="true" />
            <span><small>NOW</small> 求职准备中</span>
            <span><small>LEARNING</small> 前端工程化</span>
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
        <a href="#latest">回到最近更新 <span aria-hidden="true">↑</span></a>
      </section>

      <footer>
        <div className="footer-brand">LemonLC&apos;Blog <span>✿</span></div>
        <p>记录真实的成长，也收藏想象的世界。</p>
        <p>© 2026 LemonLC · Made with patience &amp; curiosity.</p>
      </footer>
    </main>
  );
}
