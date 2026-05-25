# 🚀 AI工具导航 - AI Tools Navigator 2026

**50+ AI工具排行榜**，按国内/国外分类，覆盖 8 大品类。排名基于市场数据和用户评价。

## 📊 覆盖品类

| 品类 | 国外 | 国内 | 示例 |
|------|:--:|:--:|------|
| 💬 AI对话 | 4 | 9 | ChatGPT, DeepSeek, 豆包 |
| 🎨 AI绘画 | 4 | 5 | Midjourney, 即梦, 通义万相 |
| 🎬 AI视频 | 3 | 3 | Sora, 可灵, Seedance |
| 💻 AI编程 | 4 | 4 | Cursor, Claude Code, 文心快码 |
| ⚡ 应用构建 | 4 | - | Bolt.new, Lovable, v0 |
| 🎵 AI音频 | 3 | 1 | Suno, Udio, ElevenLabs |
| 🔍 AI搜索 | 1 | 2 | Perplexity, 秘塔, 纳米 |
| 📊 效率办公 | 3 | - | Notion AI, Gamma, Canva AI |

## 🛠 技术栈

- **框架**: [Astro 5](https://astro.build) - 纯静态生成，零 JS 负载
- **样式**: [TailwindCSS 3](https://tailwindcss.com)
- **内容**: Astro Content Collections (Markdown)
- **SEO**: 结构化数据 (Schema.org) + Sitemap + Meta标签
- **部署**: Cloudflare Pages（推荐）/ GitHub Pages

## 🚀 部署

### 方式一: Cloudflare Pages（推荐）

```bash
# 1. 推送到 GitHub
git init && git add . && git commit -m "Initial"
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main

# 2. 在 Cloudflare Pages 控制台
#    - 连接 GitHub 仓库
#    - 框架预设: Astro
#    - 构建命令: npm run build
#    - 输出目录: dist
#    - 点击部署
```

### 方式二: GitHub Pages

```bash
npm run build
# 将 dist/ 目录内容推送到 gh-pages 分支
```

## 📝 本地开发

```bash
npm install
npm run dev       # 开发服务器 http://localhost:4321
npm run build     # 生产构建 → dist/
npm run preview   # 预览构建产物
```

## 📈 添加工具

在 `src/content/tools/` 中创建 markdown 文件：

```md
---
name: "工具名称"
category: "chat"       # chat|image|video|code|audio|search|app-builder|productivity
region: "国内"         # 国内|国外
rank: 1
description: "一句话描述"
url: "https://..."
pricing: "免费"        # 免费|免费增值|付费
rating: 4.5
tags: ["标签1", "标签2"]
featured: true
---
## 简介

详细描述...

## 核心功能

- 功能1
- 功能2

## 价格

...

## 适合谁用

...
```

## 📄 许可证

MIT - 代码可自由使用。工具数据和排名为原创研究。
