import type { Metadata } from "next";
import ChannelPage from "../components/ChannelPage";

export const metadata: Metadata = {
  title: "个人项目",
  description: "LemonLC 的个人项目与游戏客户端 Demo，展示 GoGoGhost 的实际运行效果与开发能力。",
};

export default function ProjectsPage() {
  return <ChannelPage channelKey="projects" />;
}
