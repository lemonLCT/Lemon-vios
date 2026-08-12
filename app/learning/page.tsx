import type { Metadata } from "next";
import ChannelPage from "../components/ChannelPage";

export const metadata: Metadata = {
  title: "学习笔记",
  description: "LemonLC 的现代 C++、游戏客户端和工程实践学习笔记。",
};

export default function LearningPage() {
  return <ChannelPage channelKey="learning" />;
}
