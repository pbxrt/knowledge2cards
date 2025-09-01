import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  console.log('🔍 [调试] 检查环境配置')
  
  const hasApiKey = !!process.env.OPENAI_API_KEY
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
  const apiKeyLength = process.env.OPENAI_API_KEY?.length || 0
  
  const config = {
    hasApiKey,
    baseUrl,
    apiKeyLength: apiKeyLength > 0 ? `${apiKeyLength}字符` : '未设置',
    apiKeyPreview: hasApiKey 
      ? `${process.env.OPENAI_API_KEY?.substring(0, 8)}...` 
      : '未设置',
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV || 'development'
  }
  
  console.log('🔍 [调试] 配置状态:', config)
  
  return NextResponse.json(config)
}