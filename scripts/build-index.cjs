// 构建前生成搜索索引 JSON
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const toolsDir = path.join(__dirname, "..", "src", "content", "tools");
const outputPath = path.join(__dirname, "..", "public", "tools-index.json");

const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith(".md"));

const tools = files.map((file) => {
  const raw = fs.readFileSync(path.join(toolsDir, file), "utf8");
  const { data } = matter(raw);
  return {
    slug: file.replace(".md", ""),
    name: data.name || "",
    desc: data.description || "",
    cat: data.category || "",
    tags: (data.tags || []).join(" "),
    rank: data.rank || 99,
  };
});

fs.writeFileSync(outputPath, JSON.stringify(tools), "utf8");
console.log(`✅ 生成搜索索引: ${tools.length} 个工具 -> tools-index.json`);
