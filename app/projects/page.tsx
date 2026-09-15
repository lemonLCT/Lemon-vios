import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import projectPoster from "../../public/media/gogoghost-poster.jpg";
import PageFrame from "../components/PageFrame";
import { featuredProject } from "../content";

export const metadata: Metadata = { title: "项目", description: "游戏客户端作品与开发实践，查看项目演示、功能模块和源码。" };

export default function ProjectsPage() {
  return <PageFrame active="projects" title="项目" intro="从可运行的作品，了解我如何串联功能与游戏体验。">
    <section className="content-block" aria-labelledby="project-list"><h2 id="project-list">个人作品 · 01</h2>
      <Link className="project-entry" href="/projects/gogoghost">
        <Image src={projectPoster} alt="GoGoGhost 游戏演示画面" sizes="(max-width: 760px) 100vw, 60vw" unoptimized />
        <div><span className="tag">UNITY · C# · 独立开发</span><h3>{featuredProject.name}</h3><p>{featuredProject.title}</p><p>{featuredProject.summary}</p><span className="quiet-link">进入项目详情 →</span></div>
      </Link>
    </section>
  </PageFrame>;
}
