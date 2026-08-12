"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { channels, cppStages, posts, type ChannelKey } from "../content";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

type ChannelPageProps = {
  channelKey: ChannelKey;
};

export default function ChannelPage({ channelKey }: ChannelPageProps) {
  const channel = channels.find((item) => item.key === channelKey)!;
  const [query, setQuery] = useState("");
  const [activeCppStage, setActiveCppStage] = useState(cppStages[0].id);
  const currentCppStage = cppStages.find((stage) => stage.id === activeCppStage) ?? cppStages[0];

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (post.category !== channel.name) return false;
      return !normalized || `${post.title} ${post.excerpt}`.toLowerCase().includes(normalized);
    });
  }, [channel.name, query]);

  return (
    <main>
      <a className="skip-link" href="#channel-content">跳到{channel.name}内容</a>
      <SiteHeader active={channel.key} />

      <section className={`channel-hero channel-hero-${channel.key}`} aria-labelledby="channel-title">
        <div>
          <p className="eyebrow"><span>{channel.eyebrow}</span> {channel.mark} / 04</p>
          <h1 id="channel-title">{channel.title}</h1>
          <p>{channel.intro}</p>
        </div>
        <aside aria-label={`${channel.name}概览`}>
          <span aria-hidden="true">{channel.symbol}</span>
          <strong>{String(filteredPosts.length).padStart(2, "0")}</strong>
          <small>篇已整理内容</small>
        </aside>
      </section>

      {channel.key === "learning" && (
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
            <a href="#channel-content">查看学习笔记 <span aria-hidden="true">↓</span></a>
          </div>
        </section>
      )}

      <section className="latest channel-content" id="channel-content" aria-labelledby="latest-title">
        <div className="section-heading latest-heading">
          <div>
            <p className="eyebrow">{channel.eyebrow}</p>
            <h2 id="latest-title">{channel.name}</h2>
          </div>
          <label className="search-field">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <span className="sr-only">搜索{channel.name}</span>
            <input
              type="search"
              placeholder={`搜索${channel.name}…`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="filter-row">
          <span className="channel-label">{channel.note}</span>
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
                  <span className="post-status">整理中</span>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">☁</span>
            <h3>这一页还是空白</h3>
            <p>换个关键词再试试吧。</p>
            <button type="button" onClick={() => setQuery("")}>清除搜索</button>
          </div>
        )}
      </section>

      <section className="channel-switcher" aria-labelledby="channel-switcher-title">
        <div>
          <p className="eyebrow">CHAPTER SWITCHER</p>
          <h2 id="channel-switcher-title">继续翻到哪一页？</h2>
        </div>
        <div>
          {channels.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={item.key === channel.key ? "page" : undefined}
            >
              <span>{item.mark}</span>
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
