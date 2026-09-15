import type { Metadata } from "next";
import Link from "next/link";
import PageFrame from "../../components/PageFrame";
import SectionNav from "../../components/SectionNav";
import { featuredProject } from "../../content";

export const metadata: Metadata = { title: "GoGoGhost", description: featuredProject.summary };
const sections = [
  { id: "overview", title: "项目概览" }, { id: "demo", title: "演示视频" },
  { id: "combat", title: "战斗与武器" }, { id: "interface", title: "界面与交互" },
  { id: "save", title: "存档与单局流程" }, { id: "evidence", title: "验证与源码" },
];
// Next.js 会替换构建时环境变量；Sites 使用站点根路径。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const videoPath = `${basePath}/media/${featuredProject.videoFile}`;

export default function ProjectDetail() {
  return <PageFrame active="projects" title="GoGoGhost" intro={featuredProject.title} breadcrumbs={[{ label: "项目", href: "/projects" }]}>
    <div className="detail-layout">
      <SectionNav items={sections} />
      <div className="detail-body">
        <section id="overview"><h2>项目概览</h2><p>{featuredProject.description}</p>
          <dl className="fact-list">{featuredProject.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
        </section>
        <section id="demo"><h2>演示视频</h2><p>第三人称战斗、武器与成长反馈，以及 HUD 和菜单交互。视频时长 {featuredProject.duration}。</p>
          <video controls playsInline preload="metadata" poster={`${basePath}/media/${featuredProject.posterFile}`} aria-label="GoGoGhost 游戏 Demo 演示视频"><source src={videoPath} type="video/mp4" />你的浏览器暂不支持视频播放。</video>
          <p><a className="quiet-link" href={videoPath} target="_blank" rel="noreferrer">单独打开演示视频 ↗</a></p>
        </section>
        <section id="combat"><h2>战斗与武器</h2><div className="unit-grid">
          <article className="unit-card" id="weapons"><h3><a href="#weapons">武器与投射物</a></h3><p>武器基类处理弹药和开火节奏，枪械、近战与法杖提供不同的攻击方式。卡槽组件负责卡牌装备及效果。</p></article>
          <article className="unit-card" id="progression"><h3><a href="#progression">敌人与成长</a></h3><p>敌人波次连接战斗节奏，经验与升级选项连接局内成长，强化结果反馈到玩家与武器属性。</p></article>
        </div></section>
        <section id="interface"><h2>界面与交互</h2><div className="unit-grid">
          <article className="unit-card" id="hud"><h3><a href="#hud">战斗 HUD</a></h3><p>显示生命、武器、弹药与经验状态。玩家状态与视图刷新分别由对应组件承担。</p></article>
          <article className="unit-card" id="menus"><h3><a href="#menus">菜单与面板</a></h3><p>主菜单、暂停、设置、背包和结算面板对应不同游戏状态，UI 管理器负责面板加载、缓存和开关。</p></article>
        </div></section>
        <section id="save"><h2>存档与单局流程</h2><p>检查点聚合波次、背包、玩家、强化与武器状态；单局流程协调器按依赖顺序恢复数据，再推进战斗波次。</p><p>存档数据结构与本地文件存储分开，便于定位状态采集、恢复和读写各自的职责。</p></section>
        <section id="evidence"><h2>验证与源码</h2><p>演示视频用于查看已有游戏体验。仓库另有针对界面、成长和单局流程的测试代码；测试范围与执行结果以仓库记录为准。</p>
          <a className="solid-link" href="https://github.com/lemonLCT/GoGoGhost" target="_blank" rel="noreferrer">查看 GoGoGhost 源码 ↗</a>
        </section>
        <nav className="article-navigation" aria-label="继续浏览"><Link className="quiet-link" href="/projects">← 全部项目</Link><Link className="quiet-link" href="/articles">技术文章 →</Link></nav>
      </div>
    </div>
  </PageFrame>;
}
