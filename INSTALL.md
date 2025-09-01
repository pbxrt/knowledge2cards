# 安装和配置指南

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制环境变量模板并配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入您的DeepSeek配置：

```env
OPENAI_API_KEY=your_deepseek_api_key_here
OPENAI_BASE_URL=https://api.deepseek.com/v1
```

### 3. 启动服务

```bash
npm run dev
```

访问 http://localhost:3000/cards-gen 开始使用！

## 获取 DeepSeek API Key

1. 访问 [DeepSeek平台](https://platform.deepseek.com/)
2. 创建账户或登录
3. 在API密钥页面创建新的API Key
4. 复制生成的API Key
5. 粘贴到`.env`文件的`OPENAI_API_KEY`字段

## 技术原理

本项目使用OpenAI SDK调用DeepSeek API，这是一种兼容性调用方式：

```typescript
// 使用OpenAI SDK，但调用DeepSeek服务
const completion = await openai.chat.completions.create({
  messages: [{ role: "system", content: "You are a helpful assistant." }],
  model: "deepseek-chat",
});
```

## 切换到其他兼容API

如果需要使用其他OpenAI兼容的API服务：

```env
# OpenAI官方
OPENAI_BASE_URL=https://api.openai.com/v1

# Azure OpenAI  
OPENAI_BASE_URL=https://your-resource.openai.azure.com/openai/deployments/your-deployment

# 其他兼容服务
OPENAI_BASE_URL=https://api.your-service.com/v1
```

## 模型配置

默认使用`deepseek-chat`模型。如需修改，编辑 `src/app/api/generate-cards/route.ts` 第212行：

```typescript
model: 'deepseek-chat',  // 可改为其他支持的模型
```

## 故障排除

### API密钥错误
确保`.env`文件中的API Key正确，无多余空格。

### 网络连接问题
检查`OPENAI_BASE_URL`是否正确，网络是否能访问。

### 模型不存在
确认您的账户可以访问指定的模型（如GPT-4）。

### 配额不足
检查DeepSeek账户余额和配额限制。

## 特性说明

- **智能卡片生成**：AI自动分析文章内容，生成1-6张精美卡片
- **现代化设计**：深色主题，渐变背景，响应式布局
- **一键导出**：将卡片导出为高质量PNG图片
- **容错机制**：AI响应失败时自动使用fallback数据
- **兼容性调用**：使用OpenAI SDK调用DeepSeek API

## 成本说明

使用DeepSeek API费用相对较低，具体收费标准请查看 [DeepSeek定价页面](https://platform.deepseek.com/pricing)。

DeepSeek的价格通常比OpenAI更优惠，生成一套卡片的成本约为OpenAI的1/10左右。