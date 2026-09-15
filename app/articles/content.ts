import { cppStages } from "../content";

export const articleCategories = [
  { key: "cpp", name: "C++" },
  { key: "engineering", name: "工程实践" },
  { key: "career", name: "求职手记" },
] as const;

export type Article = {
  slug: string;
  title: string;
  category: (typeof articleCategories)[number]["key"];
  summary: string;
  date: string;
  sections: { id: string; title: string; paragraphs: string[] }[];
};

// 仅登记有正文的文章；待写主题留在系列目录。
export const articles: Article[] = [{
  slug: "cpp-client-overview",
  title: "游戏客户端 C++：学习路径概览",
  category: "cpp",
  summary: "从对象生命周期到工程设计，梳理六个学习阶段的重点，以及每个知识主题在游戏客户端中的应用方向。",
  date: "2026-07-13",
  sections: cppStages.map((stage) => ({
    id: stage.id,
    title: stage.title,
    paragraphs: [stage.note, ...stage.topics.map((topic) => `${topic.title}：${topic.focus}。客户端应用：${topic.clientUse}。`)],
  })),
}];

export const series = [
  { slug: "cpp-client", title: "游戏客户端 C++", summary: "六个阶段，从对象与资源管理走向工程设计。", articleSlugs: ["cpp-client-overview"] },
  { slug: "practice-notes", title: "学习与求职手记", summary: "学习方法、面试准备与作品集整理。", articleSlugs: [] as string[] },
];

export const plannedNotes = [
  { id: "interview-map", title: "前端面试地图：从基础到现场", note: "基础、工程化、浏览器与现场表达。" },
  { id: "three-layer-notes", title: "把复杂知识学薄：我的三层笔记法", note: "从原始材料到自己的解释，再到可以复用的清单。" },
  { id: "portfolio", title: "作品集不是项目仓库", note: "用问题、选择和结果讲清一个项目。" },
];
