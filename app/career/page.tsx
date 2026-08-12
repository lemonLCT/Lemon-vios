import type { Metadata } from "next";
import ChannelPage from "../components/ChannelPage";

export const metadata: Metadata = {
  title: "求职手记",
  description: "LemonLC 的求职手记，记录面试准备、作品集整理与成长思考。",
};

export default function CareerPage() {
  return <ChannelPage channelKey="career" />;
}
