"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { articleCategories, articles } from "./content";

export default function ArticleLibrary() {
  const params = useSearchParams();
  const category = params.get("category") ?? "all";
  const query = params.get("q") ?? "";
  const normalized = query.trim().toLowerCase();
  const filtered = articles.filter((article) => (category === "all" || article.category === category)
    && (!normalized || `${article.title} ${article.summary}`.toLowerCase().includes(normalized)));
  function categoryHref(key: string) {
    const next = new URLSearchParams();
    if (key !== "all") next.set("category", key);
    if (query) next.set("q", query);
    return `/articles${next.size ? `?${next}` : ""}`;
  }
  return <>
    <nav className="filter-links" aria-label="文章分类">
      {[{ key: "all", name: "全部" }, ...articleCategories].map((item) => <Link key={item.key} href={categoryHref(item.key)} aria-current={category === item.key ? "true" : undefined} scroll={false}>{item.name}</Link>)}
    </nav>
    <form className="article-search" role="search">
      <label htmlFor="article-query">搜索文章</label>
      {category !== "all" && <input type="hidden" name="category" value={category} />}
      <input key={query} id="article-query" name="q" type="search" defaultValue={query} placeholder="输入标题或关键词" />
      <button className="solid-link" type="submit">搜索</button>
    </form>
    <p aria-live="polite">{filtered.length} 篇可阅读文章</p>
    <div className="article-results">
      {filtered.map((article) => <Link className="unit-card" key={article.slug} href={`/articles/${article.slug}`}>
        <span className="tag">{articleCategories.find((item) => item.key === article.category)?.name} · <time dateTime={article.date}>{article.date}</time></span>
        <h2>{article.title}</h2><p>{article.summary}</p><span className="quiet-link">阅读全文 →</span>
      </Link>)}
      {filtered.length === 0 && <div className="notice"><h2>{query ? "没有找到匹配文章" : "这个分类还没有发布文章"}</h2><p>可以浏览其他分类，或在系列目录查看待补充的主题。</p><Link className="quiet-link" href="/articles">清除筛选</Link></div>}
    </div>
  </>;
}
