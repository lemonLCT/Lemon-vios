import Link from "next/link";
import { authorName } from "../content";

type SiteHeaderProps = {
  active: "home" | "projects" | "articles" | "about";
};

export default function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${authorName}个人主页`}>
        <span className="brand-seal" aria-hidden="true">佐</span>
        <span>
          <strong>{authorName}</strong>
          <small>PERSONAL ARCHIVE</small>
        </span>
      </Link>

      <nav aria-label="主导航">
        <Link href="/" aria-current={active === "home" ? "page" : undefined}>首页</Link>
        {([{ key: "projects", href: "/projects", name: "项目" }, { key: "articles", href: "/articles", name: "文章" }, { key: "about", href: "/about", name: "关于我" }] as const).map((channel) => (
          <Link
            key={channel.key}
            href={channel.href}
            aria-current={active === channel.key ? "page" : undefined}
          >
            {channel.name}
          </Link>
        ))}
      </nav>

      <Link className="header-cta" href="/projects/gogoghost">
        查看代表项目 <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}
