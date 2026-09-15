"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LegacyRedirect({ href }: { href: string }) {
  const router = useRouter();
  useEffect(() => { router.replace(href); }, [router, href]);
  return <p>内容已迁移。<Link className="quiet-link" href={href}>前往新入口 →</Link></p>;
}
