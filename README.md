# AI知识卡片生成器

[图片预览](./public/知识卡片-Next.js%20Fetch%20API-1%20(1).png)

基于Claude AI的智能知识卡片生成工具，能够将任意文章内容转换为精美的可视化知识卡片。

## ✨ 功能特点

- 🤖 **AI智能分析**: 使用Claude AI自动分析文章内容，提取关键信息
- 🎨 **现代化设计**: 采用深色主题，支持渐变背景和现代UI设计
- 📝 **富文本渲染**: 使用Tailwind CSS生成美观的HTML卡片内容
- 🖼️ **一键导出**: 支持将卡片导出为高质量PNG图片
- 📱 **响应式布局**: 完美适配各种屏幕尺寸
- ⚡ **实时生成**: 快速处理文本内容，秒级生成卡片

## 🔧 技术栈

- **前端框架**: Next.js 15 + TypeScript
- **样式系统**: Tailwind CSS 4
- **AI模型**: DeepSeek-Chat (使用OpenAI SDK调用)
- **图片导出**: html2canvas
- **开发环境**: Node.js 18+

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd explain-cards
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
# 复制环境变量模板
# 国内使用 claude code 有点麻烦，我使用的是 aicodemirror.com 的镜像，可以通过下列邀请链接注册，你我均可获得积分奖励，介意的话，直接把 invotecode 部分去掉即可😂
# https://www.aicodemirror.com/register?invitecode=1EYY2S
ANTHROPIC_BASE_URL=https://api.aicodemirror.com/api/claudecode
ANTHROPIC_API_KEY=
ANTHROPIC_AUTH_TOKEN=
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000/cards-gen](http://localhost:3000/cards-gen) 开始使用。

## 📖 使用说明

1. **输入内容**: 在输入框中粘贴或输入文章内容（建议200字符以上）
2. **AI生成**: 点击"生成卡片"按钮，AI将自动分析内容并生成知识卡片
3. **预览卡片**: 查看生成的卡片，每张卡片都有独特的设计和内容
4. **导出图片**: 点击"导出卡片"按钮，将所有卡片保存为PNG图片

## 🎯 卡片类型

AI会根据文章内容自动生成以下类型的卡片：

- **封面卡片**: 主题标题 + 核心概念介绍
- **概念解释卡片**: 核心概念定义 + 要点列表  
- **特性展示卡片**: 主要特点 + 优势说明
- **示例演示卡片**: 实际应用案例或代码示例
- **数据对比卡片**: 性能数据、统计信息对比
- **总结建议卡片**: 关键结论 + 实践建议

## 🔧 API配置

### DeepSeek API配置

需要获取DeepSeek API密钥：

1. 访问 [DeepSeek平台](https://platform.deepseek.com/)
2. 创建账户并获取API Key
3. 将API Key配置到.env文件的`OPENAI_API_KEY`字段中
4. 设置`OPENAI_BASE_URL`为`https://api.deepseek.com/v1`

### 技术说明

本项目使用OpenAI SDK调用DeepSeek API，这是一种常见的兼容性调用方式：

```typescript
const completion = await openai.chat.completions.create({
  messages: [{ role: "system", content: "You are a helpful assistant." }],
  model: "deepseek-chat",
});
```

### 其他兼容API

如果需要切换到其他OpenAI兼容的API服务，可以修改：

```env
# OpenAI官方
OPENAI_BASE_URL=https://api.openai.com/v1

# Azure OpenAI
OPENAI_BASE_URL=https://your-resource.openai.azure.com/openai/deployments/your-deployment

# 其他兼容服务
OPENAI_BASE_URL=https://your-compatible-api.com/v1
```

并在代码中相应修改模型名称。

## 📁 项目结构

```
explain-cards/
├── src/
│   ├── app/
│   │   ├── api/generate-cards/    # API路由
│   │   ├── cards-gen/            # 主页面
│   │   └── globals.css           # 全局样式
│   └── components/               # React组件
├── reference-imgs/               # 设计参考图片
├── CLAUDE.md                    # 设计规范文档
└── README.md                    # 项目文档
```

## 🎨 设计规范

详细的设计规范请参考 [CLAUDE.md](./CLAUDE.md) 文件，包含：

- 视觉风格定义
- 卡片设计原则
- Tailwind CSS样式规范
- 用户体验流程

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

此项目基于 MIT 许可证开源。

## 🔗 相关链接

- [DeepSeek](https://www.deepseek.com/) - AI模型提供方
- [DeepSeek平台](https://platform.deepseek.com/) - API控制台
- [OpenAI SDK](https://github.com/openai/openai-node) - 使用的SDK库
- [Next.js](https://nextjs.org/) - React框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [snapdom](https://github.com/zumerlab/snapdom/) - 截图工具