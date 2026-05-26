const fs = require("fs");
const matter = require("gray-matter");
const path = require("path");

const newDescs = {
  "chatgpt": "全球第一的AI助手，写文章、写代码、做分析，一个对话框全搞定。设计师和打工人的生产力标配。",
  "claude": "Anthropic出品，写东西最像真人，代码能力霸榜。适合写论文、审合同、重构代码等对准确性要求高的场景。",
  "gemini": "Google出品，看视频、读图片、搜信息全能干。绑着Gmail和YouTube，Google全家桶用户闭眼入。",
  "grok": "马斯克的AI，说话不拐弯，图片生成无审查。X/Twitter深度玩家首选，风格大胆敢说。",
  "deepseek": "推理最强的国产大模型，API便宜到按分算。程序员和研究员人手一个，开源能自己部署。",
  "doubao": "国内最多人用的AI，写文案翻译拍照识图都行。日常随身助手，完全免费无任何付费墙。",
  "tongyi": "阿里出品，企业办公场景最强。绑钉钉，企业协作、数据分析、文档处理一条龙。",
  "kimi": "一口气读20万字的长文杀手。大学生看论文、律师看合同、分析师看财报，丢进去直接问。",
  "wenxin": "百度出品，中文理解最老牌。国学古文、诗词创作、国内知识查询，百度搜索无缝衔接。",
  "yuanbao": "腾讯出品，微信生态打通。公众号写作、智能体创建、多语言翻译，腾讯全家桶用户顺手用。",
  "zhipu": "清华系技术派，GLM模型自研底子最厚。科研和学术场景首选，代码和逻辑推理硬核。",
  "xunfei": "科大讯飞出品，语音识别中国第一。做课件、练口语、开会上字幕，教育场景没对手。",
  "midjourney": "AI绘画的奔驰，写实质感其他工具追不上。设计师出图首选，V7版本细节炸裂。",
  "dalle": "OpenAI出品，跟ChatGPT一个对话框里就能画。指令理解最准，想画什么说什么就行。",
  "stable-diffusion": "最强开源绘画模型，免费无限制。能装在自己电脑上跑，炼丹玩家和隐私敏感场景唯一选择。",
  "nanobanana": "Google出品，构图和文字渲染最稳。海报、菜单、带字的图片场景，别家画不好字它行。",
  "jimeng": "国内最火的AI绘画，中文一句话就能出图。小红书配图、朋友圈封面、短视频素材，新手30秒上手。",
  "wanxiang": "阿里出品，电商图片场景最强。虚拟模特换装、商品图批量生成，开网店的都在用。",
  "qiyu": "国风AI绘画天花板，专精新中式美学。汉服设计、文创图案、国潮插画，别的工具画不出这个味。",
  "yige": "百度出品，古诗词转图片绝了。传统文化、国风插画、文博创意，国学底蕴最深。",
  "hunyuan-image": "腾讯出品，微信小程序就能画。自拍转写真、照片改风格，朋友圈社交分享体验最好。",
  "sora": "AI视频的iPhone时刻，画质和真实感断层领先。专业影视概念和广告片创作，质量没对手。",
  "runway": "AI视频老牌先驱，编辑能力最强。抠像、跟踪、调色一站式，视频后期工作流全包。",
  "kling": "国内AI视频天花板，最长能出2分钟。电商带货视频一键生成，快手创作者标配。",
  "seedance": "字节出品，冯骥说它地表最强。一张图就能生成多镜头视频，短视频创作者兴奋剂。",
  "pika": "轻量AI视频工具，界面像美图秀秀一样简单。特效滤镜丰富，新手入门无压力。",
  "vidu": "生数科技出品，角色一致性做得好。同一角色在不同镜头里不崩脸，适合做系列视频。",
  "hailuo": "MiniMax出品，AI语音和音乐都行。配音、有声书、播客制作，声音自然度国产最佳。",
  "cursor": "程序员的新欢，写代码像有个人在旁边帮你按Tab。改Bug、重构、写文档全在编辑器里完成。",
  "claude-code": "Anthropic的终端编程助手，54%开发者市场份额。命令行里直接指挥AI干活，自主修Bug一把好手。",
  "copilot": "微软出品，跟VS Code原生集成。代码补全+Agent模式双管齐下，.NET和Azure生态首选。",
  "windsurf": "Codeium出品，自主Agent能力强。实时感知项目上下文，免费版体验也好，Cursor的强力对手。",
  "deepseek-coder": "开源编程模型，API便宜还能自己部署。公司采购不用走审批，开发者自己就能集成。",
  "comate": "百度出品，8项IDC评测满分。唯一完整Coding Agent形态，企业级团队协作支持。",
  "marscode": "字节出品，IDE里免费用。新手学编程的最佳搭子，错误提示说人话不拽术语。",
  "tongyi-lingma": "阿里出品，中文开发环境体验第一。VS Code和JetBrains都能装，阿里云开发者生态打通。",
  "bolt": "一句话生成一个网站，真的能跑。产品原型验证的核武器，想法到可用应用只要几分钟。",
  "lovable": "AI写应用里UI最漂亮的。生成的应用设计感在线，适合C端产品原型和MVP快速验证。",
  "v0": "Vercel出品，专攻前端组件。生成的React/Tailwind代码直接能粘到自己项目里，前端开发加速器。",
  "replit": "编程+AI+部署一体，浏览器里搞定一切。Agent模式能自己写代码自己部署，全栈新手的游乐场。",
  "suno": "AI写歌之王，10秒一首完整歌曲。短视频BGM、播客片头、独立音乐人出Demo，V5.5人声已经分不清真假。",
  "udio": "音质最高的AI音乐，48kHz高保真。追求音质听得出来差别，支持分轨下载专业混音。",
  "elevenlabs": "AI语音克隆全球最强。录几秒声音就能完美复刻，配音、有声书、多语言内容本地化必备。",
  "perplexity": "AI搜索的ChatGPT时刻。每次回答都带引用来源，不会瞎编。做调研、查资料的终极工具。",
  "metaso": "国产AI搜索最强，学术论文一键深读。找文献、写综述、查资料效率翻10倍，没有广告。",
  "nano-ai-search": "360出品，中文搜索覆盖最广的AI引擎。常规信息查询、新闻热点跟踪，免费够用。",
  "tiangong": "昆仑万维出品，AI搜索+AI音乐+AI写作全包。一个工具干三件事，不想装一堆App的好选择。",
  "notion-ai": "Notion内置AI，记笔记的时候顺手用。写会议纪要、润色文章、翻译内容，知识管理+AI二合一。",
  "gamma": "AI做PPT最强工具，一句话生成精美演示。模板比同事手做的还好看，汇报再也不熬夜改排版。",
  "canva-ai": "Canva内置AI，设计模板多到用不完。社交媒体图、海报、视频封面，不用学设计也能做出好东西。",
};

const toolsDir = path.join(__dirname, "..", "src", "content", "tools");
const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith(".md"));

let count = 0;
files.forEach((file) => {
  const slug = file.replace(".md", "");
  const newDesc = newDescs[slug];
  if (!newDesc) {
    console.warn(`⚠ 跳过 ${slug} (无新描述)`);
    return;
  }
  const filePath = path.join(toolsDir, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const oldDesc = parsed.data.description;
  parsed.data.description = newDesc;
  const out = matter.stringify(parsed.content || "", parsed.data);
  fs.writeFileSync(filePath, out, "utf8");
  console.log(`✅ ${slug}: ${newDesc.substring(0, 40)}...`);
  count++;
});

console.log(`\n🎉 更新了 ${count} 个工具的描述`);
