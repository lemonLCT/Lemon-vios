import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import projectPoster from "../../public/media/gogoghost-poster.jpg";
import PageFrame from "../components/PageFrame";
import { featuredProject } from "../content";

export const metadata: Metadata = { title: "项目", description: "游戏客户端作品与开发实践，查看项目演示、功能模块和源码。" };
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const orcaVideoPath = `${basePath}/media/orca-pathfinding-demo.mp4`;

export default function ProjectsPage() {
  return <PageFrame active="projects" title="项目" intro="从可运行的作品，了解我如何串联功能与游戏体验。">
    <section className="content-block" aria-labelledby="project-list"><h2 id="project-list">个人作品 · 01</h2>
      <Link className="project-entry" href="/projects/gogoghost">
        <Image src={projectPoster} alt="GoGoGhost 游戏演示画面" sizes="(max-width: 760px) 100vw, 60vw" unoptimized />
        <div><span className="tag">UNITY · C# · 独立开发</span><h3>{featuredProject.name}</h3><p>{featuredProject.title}</p><p>{featuredProject.summary}</p><span className="quiet-link">进入项目详情 →</span></div>
      </Link>
    </section>
    <section className="content-block" aria-labelledby="orca-demo"><h2 id="orca-demo">技术 Demo · 02</h2>
      <p>ORCA 游戏寻路演示，展示多单位移动时的局部避障与群体导航效果。</p>
      <div className="project-video-shell">
        <div className="project-video-topline"><span>ORCA PATHFINDING DEMO</span><span>GAME CLIENT · NAVIGATION</span></div>
        <video className="project-video" controls playsInline preload="metadata" aria-label="ORCA 游戏寻路 Demo 演示视频"><source src={orcaVideoPath} type="video/mp4" />你的浏览器暂不支持视频播放。</video>
      </div>
      <p><a className="quiet-link" href={orcaVideoPath} target="_blank" rel="noreferrer">单独打开演示视频 ↗</a></p>
    </section>
  </PageFrame>;
}
