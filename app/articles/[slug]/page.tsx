import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageFrame from "../../components/PageFrame";
import SectionNav from "../../components/SectionNav";
import { articles, articleCategories, series } from "../content";

export const dynamicParams = false;
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return { title: article?.title, description: article?.summary };
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const collection = series.find((item) => item.articleSlugs.includes(slug));
  const siblings = collection?.articleSlugs ?? [];
  const position = siblings.indexOf(slug);
  const previous = articles.find((item) => item.slug === siblings[position - 1]);
  const next = articles.find((item) => item.slug === siblings[position + 1]);
  const related = articles.filter((item) => item.category === article.category && item.slug !== slug);
  return <PageFrame active="articles" title={article.title} intro={article.summary} breadcrumbs={[{ label: "文章", href: "/articles" }]}>
    <div className="detail-layout"><SectionNav items={article.sections} /><article className="detail-body">
      <div className="article-navigation"><Link className="quiet-link" href={`/articles?category=${article.category}`}>{articleCategories.find((item) => item.key === article.category)?.name}</Link><time dateTime={article.date}>{article.date}</time></div>
      {article.sections.map((section) => <section id={section.id} key={section.id}><h2><a href={`#${section.id}`}>{section.title}</a></h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
      {collection && <aside className="notice"><h2>所属系列：{collection.title}</h2><p>查看章节顺序和待补充的知识主题。</p><Link className="quiet-link" href={`/articles/series/${collection.slug}`}>返回系列目录 →</Link></aside>}
      <nav className="article-navigation" aria-label="系列文章翻页">
        {previous && <Link href={`/articles/${previous.slug}`}>← {previous.title}</Link>}
        {next && <Link href={`/articles/${next.slug}`}>{next.title} →</Link>}
      </nav>
      {related.length > 0 && <section><h2>同类文章</h2>{related.map((item) => <p key={item.slug}><Link className="quiet-link" href={`/articles/${item.slug}`}>{item.title}</Link></p>)}</section>}
      <Link className="quiet-link" href={`/articles?category=${article.category}`}>← 返回同类文章</Link>
    </article></div>
  </PageFrame>;
}
