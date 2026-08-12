import Link from "next/link";
import { authorName, channels, type ChannelKey } from "../content";

type SiteHeaderProps = {
  active: "home" | ChannelKey;
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
        <Link href="/" aria-current={active === "home" ? "page" : undefined}>个人主页</Link>
        {channels.map((channel) => (
          <Link
            key={channel.key}
            href={channel.href}
            aria-current={active === channel.key ? "page" : undefined}
          >
            {channel.name}
          </Link>
        ))}
      </nav>

      <Link className="header-cta" href="/learning">
        EXPLORE <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}
