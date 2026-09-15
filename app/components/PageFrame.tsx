import Link from "next/link";
import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function PageFrame({ active, title, intro, breadcrumbs = [], children }: {
  active: "projects" | "articles";
  title: string;
  intro: string;
  breadcrumbs?: { label: string; href: string }[];
  children: ReactNode;
}) {
  return <>
    <a className="skip-link" href="#page-content">跳到主要内容</a>
    <SiteHeader active={active} />
    <main className="portfolio" id="page-content">
      <header className="page-intro">
        <nav className="breadcrumbs" aria-label="面包屑">
          <Link href="/">首页</Link>
          {breadcrumbs.map((item) => <span key={item.href}> / <Link href={item.href}>{item.label}</Link></span>)}
          <span aria-current="page"> / {title}</span>
        </nav>
        <p className="section-kicker">{active === "projects" ? "PROJECTS" : "ARTICLES"}</p>
        <h1>{title}</h1><p>{intro}</p>
      </header>
      {children}
    </main>
    <SiteFooter />
  </>;
}
