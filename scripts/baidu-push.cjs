// 百度站长平台 API 推送
// 用法: node scripts/baidu-push.cjs

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const SITE = "https://zorplan.cn";
const TOKEN = "Ttm0IaUN06RbeK0i";
const API_URL = `http://data.zz.baidu.com/urls?site=${encodeURIComponent(SITE)}&token=${TOKEN}`;

// 从 dist 目录收集所有 URL
function collectURLs(distDir) {
  const urls = [`${SITE}/`, `${SITE}/categories/`];
  
  // 分类页
  const catsDir = path.join(distDir, "categories");
  if (fs.existsSync(catsDir)) {
    fs.readdirSync(catsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .forEach((d) => urls.push(`${SITE}/categories/${d.name}/`));
  }

  // 工具详情页
  const toolsDir = path.join(distDir, "tools");
  if (fs.existsSync(toolsDir)) {
    fs.readdirSync(toolsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .forEach((d) => urls.push(`${SITE}/tools/${d.name}/`));
  }

  return urls;
}

function push(urls) {
  const body = urls.join("\n");
  const url = new URL(API_URL);

  const options = {
    hostname: url.hostname,
    port: url.port || 80,
    path: url.pathname + url.search,
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
      "Content-Length": Buffer.byteLength(body),
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const result = { status: res.statusCode, body: data };
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            result.parsed = json;
          } catch {}
        }
        resolve(result);
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// Main
const distDir = path.join(__dirname, "..", "dist");
const urls = collectURLs(distDir);

console.log(`📤 准备推送 ${urls.length} 个 URL 到百度...`);
console.log(`   API: ${API_URL}`);

push(urls)
  .then((result) => {
    console.log(`   Status: ${result.status}`);
    const json = result.parsed;
    if (json) {
      if (json.success) {
        console.log(`   ✅ 成功推送: ${json.success} 条`);
      }
      if (json.remain) {
        console.log(`   📊 今日剩余: ${json.remain} 条`);
      }
      if (json.error) {
        console.log(`   ❌ 错误: ${json.message || JSON.stringify(json)}`);
      }
    } else {
      console.log(`   📝 响应: ${result.body}`);
    }
  })
  .catch((err) => {
    console.error(`   ❌ 推送失败: ${err.message}`);
  });
