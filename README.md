# LemonLC'Blog

一个以二次元樱花日记为视觉风格的个人博客，用来记录游戏客户端开发、C++ 学习、求职准备、项目复盘和小说创作。

## 在线访问

- 网站地址：[https://lemonlct.github.io/Lemon-vios/](https://lemonlct.github.io/Lemon-vios/)
- GitHub 仓库：[https://github.com/lemonLCT/Lemon-vios](https://github.com/lemonLCT/Lemon-vios)

## 主要内容

- **游戏客户端 C++ 成长路线**：整理自个人 Notion「知识库」，包含 6 个学习阶段和 20 个核心主题。
- **求职手记**：记录面试准备、作品集整理和求职过程中的思考。
- **学习笔记**：沉淀 C++、游戏客户端和工程实践相关知识。
- **项目复盘**：整理项目背景、技术选择、问题根因和改进经验。
- **小说连载**：保存个人创作的故事和章节。
- **独立内容分区**：求职手记、学习笔记、项目复盘和小说连载分别拥有独立页面。
- **分区内搜索**：可以在当前内容分区中通过关键词检索文章。
- **响应式布局**：适配桌面端、平板和手机浏览。

## C++ 学习路线

网站中的 C++ 专题按照以下顺序组织：

1. 对象与资源管理
2. 对象模型与回调
3. STL 与泛型编程
4. 构建与底层语义
5. 并发与性能
6. 工程设计

每个知识点都补充了在游戏客户端中的应用场景，例如资源生命周期、事件回调、异步加载、帧循环性能、对象池和模块边界。

> Notion 只作为个人知识来源，线上网站不会直接读取或公开 Notion 页面。需要更新内容时，在项目代码中同步整理后的笔记。

## 技术栈

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- vinext / Vite
- GitHub Actions
- GitHub Pages

## 环境要求

- Node.js `>= 22.13.0`
- npm

建议将 npm 缓存放在 D 盘，以减少 C 盘占用：

```powershell
$env:npm_config_cache = "D:\Code\environment\npm-cache"
```

## 本地运行

项目默认保存在：

```text
D:\Code\OriginCode\LemonLC-Blog
```

进入项目并安装依赖：

```powershell
cd D:\Code\OriginCode\LemonLC-Blog
npm ci
```

启动开发服务器：

```powershell
npm run dev
```

终端会显示本地访问地址，使用浏览器打开即可预览。

## 构建命令

### GitHub Pages 静态构建

```powershell
npm run build:pages
```

该命令使用 Next.js 生成静态网站，构建产物位于 `out/` 目录。

### vinext 兼容构建

```powershell
npm run build
```

该命令用于验证项目在 vinext / Vite 构建流程下是否正常。

### 代码检查

```powershell
npm run lint
```

## 项目结构

```text
LemonLC-Blog/
├─ app/
│  ├─ page.tsx          # 默认个人主页与四个内容分区入口
│  ├─ content.ts        # 共享内容数据和 C++ 学习路线
│  ├─ career/           # 求职手记页面
│  ├─ learning/         # 学习笔记和 C++ 路线页面
│  ├─ projects/         # 项目复盘页面
│  ├─ novels/           # 小说连载页面
│  ├─ components/       # 共享导航、页脚和分区页面结构
│  ├─ globals.css       # 全局样式与响应式布局
│  └─ layout.tsx        # 网站元数据和页面布局
├─ public/
│  └─ og.png            # 社交平台分享预览图
├─ .github/workflows/
│  └─ deploy-pages.yml  # GitHub Pages 自动部署流程
├─ next.config.ts       # Next.js 与 GitHub Pages 路径配置
├─ package.json         # 依赖和项目命令
└─ README.md
```

## 更新网站内容

主要内容集中在 `app/content.ts`：

- `cppStages`：C++ 学习路线、主题说明和游戏客户端应用场景。
- `posts`：最近更新中的文章列表。
- `channels`：博客四个内容分区及其路由。

视觉样式和移动端适配位于 `app/globals.css`。修改完成后，建议先运行：

```powershell
npm run build:pages
```

构建通过后再提交代码。

## 自动部署

项目使用 GitHub Actions 发布到 GitHub Pages：

1. 将代码推送到 `main` 分支。
2. GitHub Actions 自动安装依赖并执行 `npm run build:pages`。
3. `out/` 中的静态文件会自动发布到 GitHub Pages。
4. 部署成功后，可通过网站地址访问最新版本。

也可以在 GitHub 仓库的 **Actions** 页面手动运行部署工作流。

## 作者

LemonLC —— 正在学习 C++ 与游戏客户端开发，也在持续记录项目和故事。
