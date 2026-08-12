import type { Metadata } from "next";
import ChannelPage from "../components/ChannelPage";

export const metadata: Metadata = {
  title: "小说连载",
  description: "LemonLC 的小说连载与创作片段，保存《雾港来信》的故事章节。",
};

export default function NovelsPage() {
  return <ChannelPage channelKey="novels" />;
}
