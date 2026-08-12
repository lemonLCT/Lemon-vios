import type { Metadata } from "next";
import ChannelPage from "../components/ChannelPage";

export const metadata: Metadata = {
  title: "项目复盘",
  description: "LemonLC 的项目复盘，记录项目背景、技术取舍、问题根因与改进经验。",
};

export default function ProjectsPage() {
  return <ChannelPage channelKey="projects" />;
}
