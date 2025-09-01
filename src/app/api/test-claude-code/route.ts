import { query } from '@anthropic-ai/claude-code';
import { NextRequest, NextResponse } from 'next/server'

// 卡片生成的系统Prompt
const SYSTEM_PROMPT = `你是一个专业的知识卡片设计师，擅长将文章内容转换为精美的可视化知识卡片。

## 任务要求：
1. 分析输入的文章内容，提取关键信息点
2. 根据内容复杂度和长度，生成3-6张知识卡片
3. 每张卡片都必须包含一个清晰的标题和富文本HTML内容
4. 第一张卡片必须是封面卡片，高度总结整个主题，不要有过多文字

## 卡片设计规范：
- 使用现代化深色主题设计风格
- 采用Tailwind CSS样式系统
- 支持渐变背景、圆角边框、阴影效果
- 合理使用图标、颜色搭配和层次结构
- **重要**: 卡片专门为手机端设计，宽度固定为375px，一律按照手机端屏幕来适配布局和字体大小
- 不需要考虑PC端和iPad端的适配，所有设计元素都针对手机端优化

## 卡片类型建议：
1. **封面卡片**: 主题标题 + 核心概念介绍 + 关键词标签
2. **概念解释卡片**: 核心概念定义 + 要点列表
3. **特性展示卡片**: 主要特点 + 优势列表
4. **示例演示卡片**: 实际应用案例或代码示例
5. **数据对比卡片**: 性能数据、统计信息或对比分析
6. **总结建议卡片**: 关键结论 + 实践建议

## HTML样式要求：
- 基础容器：\`bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-3xl p-8 min-h-[500px]\`
- 标题样式：\`text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent\`
- 图标容器：\`w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center\`
- 列表项：\`flex items-center gap-3 text-slate-300 mb-4\`
- 标签样式：\`px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm text-blue-300\`
- **模块间距要求**：\`mb-8\` 或 \`mb-6\` 用于主要模块之间，\`mb-4\` 用于列表项之间，\`mb-3\` 用于小元素间距

## 输出格式：
**必须**返回完整的JSON格式，包含cards数组，每个card对象包含：
- id: 数字ID
- title: 卡片标题（简洁的中文）  
- content: 完整的HTML字符串（包含所有Tailwind样式）

## 重要要求：
- **必须只返回纯JSON格式，不要添加任何解释文字或代码块标记**
- **禁止使用\`\`\`json\`\`\`代码块包裹，直接返回JSON对象**
- **必须返回完整的JSON对象**，确保所有括号和引号都正确闭合
- 如果内容太长，优先减少卡片数量而不是截断内容
- HTML内容必须是完整的、可直接渲染的富文本
- 样式必须使用Tailwind CSS类名
- 内容要准确提取文章要点，不要编造信息
- 保持专业性和美观性的平衡
- 每张卡片内容要相对独立但又相互关联
- **关键：确保模块之间有足够的纵向间距，使用 mb-6、mb-8 等类名，避免模块挨得太近**
- 立即以JSON开始，格式：{"cards": [{"id": 1, "title": "标题", "content": "<div>...</div>"}]}`


export async function POST(request: NextRequest) {
  const { content } = await request.json();

  const wordCount = content.length;

  const queryParams = {
    prompt: `请分析以下文章内容并生成知识卡片：

**文章内容**：
${content}

**生成要求**：
1. 根据内容长度生成合适数量的卡片（建议${wordCount > 1000 ? '5-6' : wordCount > 500 ? '4-5' : '3-4'}张）
2. 第一张必须是封面卡片，提炼主题和核心概念
3. 后续卡片按逻辑顺序组织内容要点
4. 每张卡片的HTML内容要完整且美观
5. 确保所有信息都来自原文，不要添加外部信息
6. **特别注意：在HTML中使用充足的纵向间距（mb-6、mb-8），确保各个内容模块之间不会挨得太近**

请返回标准的JSON格式，包含cards数组。`,
    options: {
      customSystemPrompt: SYSTEM_PROMPT,
    }
  };

  let aiResponse = '';

  for await (const message of query(queryParams)) {
    console.log('Message type:', message.type);

    if (message.type === 'assistant') {
      // 获取AI助手的回复内容
      const content = message.message.content;
      if (Array.isArray(content)) {
        // 处理内容数组，提取文本内容
        for (const block of content) {
          if (block.type === 'text') {
            aiResponse += block.text;
          }
        }
      } else if (typeof content === 'string') {
        aiResponse += content;
      }
      console.log('AI回复长度:', aiResponse.length);
      console.log(aiResponse);
    } else if (message.type === 'system') {
      console.log('System message:', message);
    }
  }

  // 从回复中提取JSON内容
  function extractJson(text: string): { cards: Array<{ id: number; title: string; content: string }> } {
    // 尝试找到第一个完整的JSON对象
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // 如果都失败，直接解析整个文本
    return JSON.parse(text);
  }

  // 解析AI返回的JSON格式卡片数据
  try {
    if (aiResponse.trim()) {
      const cards = extractJson(aiResponse);
      return NextResponse.json({
        success: true,
        cards: cards.cards || cards
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'AI没有返回任何内容'
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'AI返回内容解析失败',
      rawResponse: aiResponse,
      parseError: (error as Error).message
    });
  }
}