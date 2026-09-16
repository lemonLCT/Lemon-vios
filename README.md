# 佐比麦的个人网站

以游戏客户端求职作品展示为首页主线，文章与系列承载长期知识积累。

## 在线访问

- [GitHub Pages](https://lemonlct.github.io/Lemon-vios/)
- [GitHub 仓库](https://github.com/lemonLCT/Lemon-vios)

## 页面职责

| 入口 | 职责 | 内容层级 |
| --- | --- | --- |
| 首页 `/` | 个人定位、代表项目、能力证据与精选文章 | 摘要链接到详情 |
| 项目 `/projects` | 作品索引 | 项目卡片 → `/projects/gogoghost` → 功能章节 |
| 文章 `/articles` | 统一阅读入口 | 分类筛选 → 独立文章，或系列目录 → 章节 |
| 关于我 `/about` | 原个人主页的介绍、寄语与当前状态 | 个人介绍 → 寄语与理念 → 当前状态 → 下一页 |

C++、工程实践、求职手记是文章分类，不是独立功能页面。
筛选通过查询参数保存，例如 `/articles?category=cpp`；搜索使用 `q` 参数。
系列收在 `/articles/series` 下，用来组织章节顺序和待写主题。
项目与系列各章节具有稳定锚点，例如 `/projects/gogoghost#weapons`、`/articles/series/cpp-client#topic-05`。

旧的 `/learning` 与 `/career` 保留迁移入口，在浏览器中跳转至新位置，不再进入一级导航。

## 内容维护

- `app/content.ts`：作者、代表项目和原有 C++ 阶段材料。
- `app/articles/content.ts`：已发布文章正文、分类、系列顺序与待写手记。
- `app/articles/[slug]/page.tsx`：文章详情、目录、分类回链、同系列翻页与同类文章。
- `app/articles/series/`：系列索引、学习阶段和待补充主题。
- `app/projects/gogoghost/page.tsx`：项目详情与演示。
- `app/about/page.tsx`：个人介绍、寄语、学习理念与当前状态，保留原个人主页内容。
- `app/components/`：公共导航、页框、页内目录和旧地址迁移。
- `app/structure.css`：新结构的布局、字体和移动端适配；保留原站点色彩与公共样式。

只有有完整正文的文章才能加入 `articles`。原 C++ 路线说明已整理为一篇路径概览；
20 个知识主题与原来 3 篇未完成手记只在系列目录显示“正文待补充”。
新文章加入所属系列的 `articleSlugs` 后，详情页会按该顺序提供前后篇链接。
项目深入文章发布后，可从对应项目章节建立链接；不要链接到不存在的草稿页面。

项目视频展示已有体验，测试代码存在不等于测试已通过。涉及效果、性能或测试结果时，补充对应验证证据再发布。
目前未提供公开简历或邮箱，使用已确认的 GitHub 账号作为联系入口。

## 开发与验证

技术栈：Next.js、React、TypeScript、vinext / Vite。Node.js 要求 `>=22.13.0`。
沿用现有依赖和锁文件。

```powershell
npm ci
npm run dev
npm run lint
npm test
```

GitHub Pages 会在 Actions 中构建静态站点。本地等价检查：

```powershell
$env:GITHUB_ACTIONS = "true"
$env:GITHUB_REPOSITORY = "lemonLCT/Lemon-vios"
npm run build:pages
node --test tests/static-links.test.mjs
```

这些环境变量只在当前 PowerShell 进程生效。开发或构建 Sites 前，使用未设置这些变量的新终端。
静态检查覆盖页面、章节锚点、图片和视频的仓库前缀路径。
`npm test` 构建 Worker 并检查四个导航入口、页面职责、文章发布门槛及旧地址兼容。

## 发布

推送 `main` 后，GitHub Actions 将 `out/` 发布到 GitHub Pages。
Sites 沿用 `.openai/hosting.json` 的现有站点，使用 `npm run build` 的 Worker 产物。
两种构建保留各自的路径配置，不修改现有托管受众。
