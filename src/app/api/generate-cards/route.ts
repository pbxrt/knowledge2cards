import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { query } from '@anthropic-ai/claude-code';

// 卡片类型定义
export interface Card {
  id: number
  title: string
  content: string // 富文本HTML内容
}

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
})

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
- 标题样式：\`text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent\`
- 图标容器：\`w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center\`
- 列表项：\`flex items-center gap-3 text-slate-300\`
- 标签样式：\`px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm text-blue-300\`

## 输出格式：
**必须**返回完整的JSON格式，包含cards数组，每个card对象包含：
- id: 数字ID
- title: 卡片标题（简洁的中文）  
- content: 完整的HTML字符串（包含所有Tailwind样式）

## 重要要求：
- **必须返回完整的JSON对象**，确保所有括号和引号都正确闭合
- 如果内容太长，优先减少卡片数量而不是截断内容
- HTML内容必须是完整的、可直接渲染的富文本
- 样式必须使用Tailwind CSS类名
- 内容要准确提取文章要点，不要编造信息
- 保持专业性和美观性的平衡
- 每张卡片内容要相对独立但又相互关联
- JSON格式示例：{"cards": [{"id": 1, "title": "标题", "content": "<div>...</div>"}]}`

// 用户内容分析Prompt生成函数
function generateUserPrompt(content: string): string {
  const wordCount = content.length
  const sentenceCount = content.split(/[.!?。！？]/).filter(s => s.trim().length > 0).length
  
  return `请分析以下文章内容并生成知识卡片：

**文章内容**：
${content}

**内容统计**：
- 字符数：${wordCount}
- 句子数：${sentenceCount}

**生成要求**：
1. 根据内容长度生成合适数量的卡片（建议${wordCount > 1000 ? '5-6' : wordCount > 500 ? '4-5' : '3-4'}张）
2. 第一张必须是封面卡片，提炼主题和核心概念
3. 后续卡片按逻辑顺序组织内容要点
4. 每张卡片的HTML内容要完整且美观
5. 确保所有信息都来自原文，不要添加外部信息

请返回标准的JSON格式，包含cards数组。`
}

// 生成模拟卡片数据的函数
function generateMockCards(content: string): Card[] {
  const wordCount = content.length
  const title = content.length > 50 ? content.substring(0, 50).replace(/[<>"&]/g, '') + '...' : content.replace(/[<>"&]/g, '')
  const summary = content.length > 200 ? content.substring(0, 200).replace(/[<>"&]/g, '') + '...' : content.replace(/[<>"&]/g, '')
  
  const cards: Card[] = [
    {
      id: 1,
      title: '主题概览',
      content: `<div class="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-3xl p-8 min-h-[500px] flex flex-col justify-center">
        <div class="text-center">
          <div class="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ${title}
          </h1>
          <p class="text-2xl text-slate-300 mb-6">知识要点总结</p>
          <p class="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed mb-8">${summary}</p>
          <div class="flex flex-wrap justify-center gap-3">
            <span class="px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-full text-sm font-medium text-indigo-300">
              共 ${wordCount} 字符
            </span>
            <span class="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full text-sm font-medium text-purple-300">
              AI生成
            </span>
          </div>
        </div>
      </div>`
    }
  ]
  
  // 根据内容长度添加更多卡片
  if (wordCount > 200) {
    cards.push({
      id: 2,
      title: '核心概念',
      content: `<div class="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-3xl p-8 min-h-[500px]">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold">核心概念</h2>
        </div>
        
        <p class="text-slate-300 mb-8 text-lg leading-relaxed">${content.substring(0, 150).replace(/[<>"&]/g, '')}...</p>
        
        <div class="space-y-4 mb-8">
          <h3 class="text-xl font-semibold text-slate-200">关键要点：</h3>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-2 flex-shrink-0"></div>
              <span class="text-slate-300 leading-relaxed">内容包含丰富的信息和知识点</span>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-2 flex-shrink-0"></div>
              <span class="text-slate-300 leading-relaxed">结构清晰，逻辑性强</span>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-2 flex-shrink-0"></div>
              <span class="text-slate-300 leading-relaxed">适合学习和理解相关主题</span>
            </div>
          </div>
        </div>
      </div>`
    })
  }
  
  if (wordCount > 500) {
    cards.push({
      id: 3,
      title: '详细分析',
      content: `<div class="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-3xl p-8 min-h-[500px]">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold">详细分析</h2>
        </div>
        
        <div class="grid gap-4 mb-8">
          <div class="bg-slate-700/30 rounded-xl p-4 border-l-4 border-blue-400">
            <p class="text-slate-300">内容深度分析显示这是一份有价值的资料</p>
          </div>
          <div class="bg-slate-700/30 rounded-xl p-4 border-l-4 border-cyan-400">
            <p class="text-slate-300">包含了多个层面的信息和见解</p>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-blue-300 mb-3">内容特点</h3>
          <p class="text-slate-300">基于AI分析，这份内容具有很好的学习价值和参考意义。</p>
        </div>
      </div>`
    })
  }
  
  return cards
}

export async function POST(request: NextRequest) {
  console.log('🚀 [API] 开始处理卡片生成请求')
  
  try {
    const { content } = await request.json()
    console.log('📝 [API] 接收到文章内容，长度:', content?.length || 0)
    
    if (!content || content.trim().length === 0) {
      console.log('❌ [API] 文章内容为空')
      return NextResponse.json(
        { error: '请提供文章内容' },
        { status: 400 }
      )
    }

    if (!process.env.OPENAI_API_KEY) {
      console.log('❌ [API] 未配置API密钥')
      return NextResponse.json(
        { error: '未配置OpenAI API Key' },
        { status: 500 }
      )
    }
    
    console.log('🔑 [API] API配置检查通过')
    console.log('🌐 [API] Base URL:', process.env.OPENAI_BASE_URL)
    console.log('📊 [API] 准备调用DeepSeek API...')
    
    // 调用DeepSeek API生成卡片（使用OpenAI SDK）
    console.log('⏱️ [API] 开始调用DeepSeek API，模型: deepseek-chat')
    const startTime = Date.now()
    
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: generateUserPrompt(content)
        }
      ],
      max_tokens: 8000, // 增加最大token限制
      temperature: 0.0,
      response_format: { type: "json_object" } // 要求返回JSON格式
    })
    
    const endTime = Date.now()
    const duration = endTime - startTime
    console.log(`✅ [API] DeepSeek API调用完成，耗时: ${duration}ms`)
    console.log('📊 [API] Token统计:', completion.usage)

    // 解析DeepSeek的响应
    const responseText = completion.choices[0]?.message?.content || ''
    console.log('📄 [API] 收到响应，内容长度:', responseText.length)
    console.log('📄 [API] 响应内容预览:', responseText.substring(0, 200) + '...')
    
    // 尝试从响应中提取JSON
    let parsedResponse
    try {
      console.log('🔍 [API] 开始解析JSON响应...')
      console.log('📋 [API] 响应文本末尾检查:', responseText.slice(-50))
      
      // 检查响应是否被截断
      const isJsonComplete = responseText.trim().endsWith('}') || responseText.trim().endsWith(']}')
      console.log('🔍 [API] JSON是否完整:', isJsonComplete)
      
      if (!isJsonComplete) {
        console.log('⚠️ [API] 检测到JSON响应被截断，尝试修复...')
        // 如果JSON被截断，尝试找到最后完整的卡片
        let repairedJson = responseText
        
        // 找到最后一个完整的卡片结束位置
        const lastCompleteCard = responseText.lastIndexOf('}')
        if (lastCompleteCard > 0) {
          // 截取到最后完整的卡片
          repairedJson = responseText.substring(0, lastCompleteCard + 1)
          // 确保JSON结构完整
          if (!repairedJson.includes('"cards"')) {
            throw new Error('无法修复截断的JSON')
          }
          // 添加缺失的结构
          if (!repairedJson.endsWith(']}')) {
            repairedJson += ']}'
          }
        }
        console.log('🔧 [API] 修复后的JSON长度:', repairedJson.length)
      }
      
      // 查找JSON内容（可能被包裹在代码块中）
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      const jsonStr = jsonMatch ? jsonMatch[0] : responseText
      console.log('📋 [API] 提取的JSON字符串长度:', jsonStr.length)
      
      parsedResponse = JSON.parse(jsonStr)
      console.log('✅ [API] JSON解析成功，卡片数量:', parsedResponse.cards?.length || 0)
    } catch (parseError) {
      console.error('❌ [API] 解析DeepSeek响应失败:', parseError)
      console.error('🔍 [API] 响应长度:', responseText.length)
      console.error('🔍 [API] 响应开头100字符:', responseText.substring(0, 100))
      console.error('🔍 [API] 响应结尾100字符:', responseText.slice(-100))
      console.log('🔄 [API] 使用fallback模式生成卡片...')
      
      // 如果JSON解析失败，返回模拟数据作为fallback
      const fallbackCards = generateMockCards(content)
      console.log('📦 [API] 生成fallback卡片数量:', fallbackCards.length)
      
      return NextResponse.json({
        success: true,
        cards: fallbackCards,
        metadata: {
          totalCards: fallbackCards.length,
          contentLength: content.length,
          generatedAt: new Date().toISOString(),
          fallbackMode: true,
          note: 'AI响应被截断或解析失败，使用fallback数据',
          originalResponseLength: responseText.length
        }
      })
    }

    // 验证响应格式
    if (!parsedResponse.cards || !Array.isArray(parsedResponse.cards)) {
      console.error('❌ [API] AI响应格式不正确，缺少cards数组')
      console.log('🔍 [API] 解析后的响应结构:', Object.keys(parsedResponse))
      throw new Error('AI响应格式不正确')
    }

    console.log('🎉 [API] 卡片生成成功!')
    console.log('📊 [API] 最终统计: 生成', parsedResponse.cards.length, '张卡片')
    
    return NextResponse.json({
      success: true,
      cards: parsedResponse.cards,
      metadata: {
        totalCards: parsedResponse.cards.length,
        contentLength: content.length,
        generatedAt: new Date().toISOString(),
        model: 'deepseek-chat',
        tokensUsed: completion.usage?.total_tokens || 0
      }
    })
    
  } catch (error: any) {
    console.error('💥 [API] 生成卡片失败:', error.message)
    console.error('🔍 [API] 错误详情:', error)
    console.error('📊 [API] 错误类型:', error.constructor.name)
    
    // 网络或API调用相关错误的特殊处理
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.error('🌐 [API] 网络连接错误，检查Base URL配置')
    } else if (error.status === 401 || error.status === 403) {
      console.error('🔑 [API] 认证失败，检查API密钥')
    } else if (error.status === 429) {
      console.error('⚡ [API] API调用频率限制')
    } else if (error.status >= 500) {
      console.error('🚨 [API] DeepSeek服务器错误')
    }
    
    return NextResponse.json(
      { 
        error: '生成卡片时发生错误', 
        details: error.message,
        type: error.constructor.name,
        status: error.status || 'unknown'
      },
      { status: 500 }
    )
  }
}