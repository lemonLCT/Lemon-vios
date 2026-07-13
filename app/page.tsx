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
  href?: string;
};

type CppTopic = {
  number: string;
  title: string;
  focus: string;
  clientUse: string;
};

type CppStage = {
  id: string;
  label: string;
  title: string;
  note: string;
  topics: CppTopic[];
};

const cppStages: CppStage[] = [
  {
    id: "ownership",
    label: "STAGE 01",
    title: "对象与资源管理",
    note: "先把生命周期和所有权学扎实，才能安全地管理纹理、文件、句柄与场景对象。",
    topics: [
      { number: "01", title: "对象生命周期", focus: "初始化方式、存储期、构造与析构顺序", clientUse: "判断场景对象、组件和资源句柄何时创建与释放" },
      { number: "02", title: "拷贝构造、拷贝赋值、析构", focus: "Rule of Three、Five 与 Zero", clientUse: "正确封装纹理、缓冲区等不可随意复制的资源" },
      { number: "03", title: "左值、右值、移动语义", focus: "值类别、std::move 与资源转移", clientUse: "把临时帧数据和加载结果低成本送入队列" },
      { number: "04", title: "RAII 和所有权", focus: "用对象生命周期自动管理资源", clientUse: "封装文件、锁、Socket 和图形 API 句柄" },
      { number: "05", title: "智能指针", focus: "unique_ptr、shared_ptr、weak_ptr", clientUse: "区分实体拥有关系与事件系统中的弱观察关系" },
    ],
  },
  {
    id: "object-model",
    label: "STAGE 02",
    title: "对象模型与回调",
    note: "理解动态派发、对象布局与回调成本，构建清晰而不过度抽象的客户端接口。",
    topics: [
      { number: "06", title: "继承、多态、虚析构", focus: "动态派发与多态删除", clientUse: "设计可安全扩展的组件、渲染对象和状态接口" },
      { number: "07", title: "虚表、多继承与对象布局", focus: "虚指针、基类子对象与指针调整", clientUse: "理解引擎 ABI、序列化与对象尺寸成本" },
      { number: "08", title: "Lambda、函数对象、std::function", focus: "捕获、类型擦除与调用开销", clientUse: "实现输入回调、事件总线和异步任务完成通知" },
    ],
  },
  {
    id: "generic",
    label: "STAGE 03",
    title: "STL 与泛型编程",
    note: "选择合适的数据结构，并用现代 C++ 把可复用能力放进编译期约束中。",
    topics: [
      { number: "09", title: "STL 容器与迭代器失效", focus: "容器结构、复杂度与失效规则", clientUse: "为 ECS、场景树和热路径数据选择合适存储" },
      { number: "10", title: "泛型算法与迭代器体系", focus: "算法、容器与迭代器能力", clientUse: "整理资源列表、实体筛选和数据转换流程" },
      { number: "11", title: "模板推导、特化、可变参数", focus: "模板推导、偏特化与折叠表达式", clientUse: "构建组件系统、数学类型和通用消息分发" },
      { number: "12", title: "类型萃取、SFINAE、Concepts", focus: "编译期类型信息与接口约束", clientUse: "让渲染与资源接口在编译期暴露错误" },
      { number: "13", title: "引用折叠与完美转发", focus: "转发引用和 std::forward", clientUse: "工厂创建组件时保留参数值类别并减少拷贝" },
    ],
  },
  {
    id: "toolchain",
    label: "STAGE 04",
    title: "构建与底层语义",
    note: "从异常保证一路下潜到链接和内存布局，掌握客户端工程最常见的底层边界。",
    topics: [
      { number: "14", title: "异常安全与 noexcept", focus: "基本、强与不抛异常保证", clientUse: "保护帧循环稳定性，并理解容器扩容时的移动选择" },
      { number: "15", title: "编译、链接、ODR、动态库", focus: "从源码到可执行文件的完整链路", clientUse: "拆分引擎模块、插件和平台动态库" },
      { number: "16", title: "内存布局、对齐与未定义行为", focus: "padding、悬垂引用、越界与严格别名", clientUse: "对齐 GPU 缓冲区和网络数据，并用 Sanitizer 查错" },
    ],
  },
  {
    id: "performance",
    label: "STAGE 05",
    title: "并发与性能",
    note: "性能优化从证据出发：先理解同步与缓存，再讨论任务系统、对象池和无锁结构。",
    topics: [
      { number: "17", title: "多线程、锁、条件变量", focus: "线程同步、临界区与谓词等待", clientUse: "实现资源异步加载、任务系统和线程安全队列" },
      { number: "18", title: "原子操作与 C++ 内存模型", focus: "data race、happens-before 与 memory order", clientUse: "处理渲染/逻辑线程间的状态同步和轻量队列" },
      { number: "19", title: "CPU 缓存、对象池、内存池", focus: "局部性、false sharing 与分配开销", clientUse: "稳定帧时间，降低高频实体与粒子分配成本" },
    ],
  },
  {
    id: "architecture",
    label: "STAGE 06",
    title: "工程设计",
    note: "把模式当成依赖与生命周期的语言，而不是需要背诵的类图。",
    topics: [
      { number: "20", title: "工程设计与设计模式", focus: "策略、观察者、工厂、RAII Guard 与 PImpl", clientUse: "拆分渲染后端、输入系统、游戏状态和平台层边界" },
    ],
  },
];

const categories: { name: Category; mark: string; note: string }[] = [
  { name: "全部", mark: "✦", note: "所有连载" },
  { name: "求职手记", mark: "01", note: "面试与成长" },
  { name: "学习笔记", mark: "02", note: "知识整理" },
  { name: "项目复盘", mark: "03", note: "经验与教训" },
  { name: "小说连载", mark: "04", note: "幻想故事" },
];

const posts: Post[] = [
  {
    category: "学习笔记",
    title: "游戏客户端 C++：从对象生命周期到工程设计",
    excerpt: "整理自 Notion「知识库」的 20 个 C++ 主题，并把每个知识点映射到资源管理、事件回调、帧循环性能和客户端架构。",
    date: "2026.07.13",
    readTime: "12 分钟",
    number: "EP. 022",
    featured: true,
    href: "#cpp-roadmap",
  },
  {
    category: "求职手记",
    title: "前端面试地图：从基础到现场",
    excerpt: "把零散的面试题重新整理成一张可执行的路线图：基础、工程化、浏览器与现场表达。",
    date: "2026.07.12",
    readTime: "8 分钟",
    number: "EP. 021",
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
  const [activeCppStage, setActiveCppStage] = useState(cppStages[0].id);

  const currentCppStage = cppStages.find((stage) => stage.id === activeCppStage) ?? cppStages[0];

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
          <a href="#cpp-roadmap">C++ 路线</a>
          <a href="#latest">最新笔记</a>
          <a href="#channels">内容频道</a>
          <a href="#about">关于我</a>
        </nav>
        <a className="header-cta" href="#cpp-roadmap">开始学习 <span aria-hidden="true">↗</span></a>
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
            <a className="primary-action" href="#cpp-roadmap">查看 C++ 路线 <span aria-hidden="true">→</span></a>
            <a className="text-action" href="#about">先认识 LemonLC</a>
          </div>
          <div className="mini-stats" aria-label="博客统计">
            <span><strong>25</strong> 篇记录</span>
            <span><strong>04</strong> 个频道</span>
            <span><strong>∞</strong> 持续更新</span>
          </div>
        </div>

        <div className="hero-collage" aria-label="博客内容预览">
          <div className="tape tape-top" aria-hidden="true" />
          <article className="feature-paper">
            <div className="paper-topline">
              <span>本周推荐</span>
              <span>NO. 022</span>
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
            <p className="feature-kicker">C++ ROADMAP / GAME CLIENT</p>
            <h2>从对象生命周期<br />到客户端架构</h2>
            <p>把 Notion 里的 20 个 C++ 主题，整理成一条面向游戏客户端的成长路线。</p>
          </article>
          <aside className="margin-note">
            <span aria-hidden="true">♡</span>
            <strong>今日状态</strong>
            <p>在学习现代 C++，也在搭建自己的游戏客户端知识树。</p>
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

      <section className="cpp-roadmap" id="cpp-roadmap" aria-labelledby="cpp-roadmap-title">
        <div className="cpp-roadmap-intro">
          <div>
            <p className="eyebrow">NOTION KNOWLEDGE BASE · C++</p>
            <h2 id="cpp-roadmap-title">游戏客户端 C++ 成长路线</h2>
            <p>
              从 Notion「知识库」整理而来。按照语言语义、资源管理、泛型、底层、并发性能与工程设计逐层推进，
              每个知识点都对应一个真实的游戏客户端使用场景。
            </p>
          </div>
          <div className="cpp-roadmap-stats" aria-label="C++ 学习路线统计">
            <span><strong>20</strong><small>核心主题</small></span>
            <span><strong>06</strong><small>学习阶段</small></span>
            <span><strong>C++</strong><small>客户端方向</small></span>
          </div>
        </div>

        <div className="cpp-stage-tabs" role="tablist" aria-label="C++ 学习阶段">
          {cppStages.map((stage) => (
            <button
              type="button"
              role="tab"
              key={stage.id}
              id={`tab-${stage.id}`}
              aria-selected={activeCppStage === stage.id}
              aria-controls={`panel-${stage.id}`}
              className={activeCppStage === stage.id ? "cpp-stage-tab active" : "cpp-stage-tab"}
              onClick={() => setActiveCppStage(stage.id)}
            >
              <span>{stage.label}</span>
              <strong>{stage.title}</strong>
            </button>
          ))}
        </div>

        <div
          className="cpp-stage-panel"
          id={`panel-${currentCppStage.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentCppStage.id}`}
        >
          <div className="cpp-stage-heading">
            <div>
              <span>{currentCppStage.label}</span>
              <h3>{currentCppStage.title}</h3>
            </div>
            <p>{currentCppStage.note}</p>
          </div>
          <div className="cpp-topic-grid">
            {currentCppStage.topics.map((topic) => (
              <article className="cpp-topic-card" key={topic.number}>
                <div className="cpp-topic-number">C++ / {topic.number}</div>
                <h4>{topic.title}</h4>
                <dl>
                  <div>
                    <dt>学习重点</dt>
                    <dd>{topic.focus}</dd>
                  </div>
                  <div>
                    <dt>客户端连接</dt>
                    <dd>{topic.clientUse}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>

        <div className="cpp-roadmap-footnote">
          <span aria-hidden="true">✦</span>
          <p><strong>学习节奏：</strong>第一轮建立概念与最小样例，第二轮补代码实验，第三轮结合项目与面试题形成可复述答案。</p>
          <a href="#latest">查看学习笔记 <span aria-hidden="true">↓</span></a>
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
                {post.href ? (
                  <a className="read-button" href={post.href} aria-label={`阅读《${post.title}》`}>
                    <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <button type="button" className="read-button" aria-label={`阅读《${post.title}》`}>
                    <span aria-hidden="true">→</span>
                  </button>
                )}
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
