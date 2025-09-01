'use client'

export default function DebugPage() {
  const checkConfig = async () => {
    try {
      const response = await fetch('/api/debug-config')
      const data = await response.json()
      console.log('调试信息:', data)
    } catch (error) {
      console.error('获取调试信息失败:', error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">调试面板</h1>
        
        <div className="bg-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">环境配置检查</h2>
          <button
            onClick={checkConfig}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            检查配置
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">调试说明</h2>
          <div className="space-y-3 text-slate-300">
            <p>1. 点击"检查配置"按钮查看当前环境变量状态</p>
            <p>2. 打开浏览器控制台查看详细日志</p>
            <p>3. 检查终端输出的后端日志</p>
            <p>4. 如果一直显示"AI生成中..."，请查看控制台错误信息</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">常见问题排查</h2>
          <div className="space-y-3 text-slate-300 text-sm">
            <div className="border-l-4 border-red-500 pl-4">
              <strong>网络连接错误:</strong> 检查 OPENAI_BASE_URL 是否正确
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <strong>认证失败:</strong> 检查 OPENAI_API_KEY 是否正确
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <strong>超时问题:</strong> DeepSeek API可能响应较慢，请耐心等待
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <strong>JSON解析失败:</strong> AI响应格式不正确，会自动使用fallback数据
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}