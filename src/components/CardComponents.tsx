// 各种图标组件
const BookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25A8.966 8.966 0 0 1 18 3.75c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
)

const LightBulbIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>
)

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.563.563 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
)

const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
)

const CodeBracketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
  </svg>
)

const ClipboardDocumentListIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
  </svg>
)

interface Card {
  id: number
  title: string
  type: 'cover' | 'concept' | 'feature' | 'data' | 'code' | 'summary'
  content: any
}

interface CardComponentProps {
  card: Card
  index: number
}

// 封面卡片组件
export const CoverCard = ({ card }: { card: Card }) => (
  <div className="text-center">
    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
      <BookIcon className="w-12 h-12 text-white" />
    </div>
    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
      {card.content.mainTitle}
    </h1>
    <p className="text-2xl text-slate-300 mb-6">{card.content.subtitle}</p>
    <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed mb-8">{card.content.description}</p>
    
    {card.content.keywords && (
      <div className="flex flex-wrap justify-center gap-3">
        {card.content.keywords.map((keyword: string, idx: number) => (
          <span key={idx} className="px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-full text-sm font-medium text-indigo-300">
            {keyword}
          </span>
        ))}
      </div>
    )}
  </div>
)

// 概念卡片组件
export const ConceptCard = ({ card }: { card: Card }) => (
  <div>
    <div className="flex items-center gap-4 mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
        <LightBulbIcon className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl font-bold">{card.title}</h2>
    </div>
    
    <p className="text-slate-300 mb-8 text-lg leading-relaxed">{card.content.definition}</p>
    
    {card.content.keyPoints && (
      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-200">关键要点：</h3>
        <div className="space-y-3">
          {card.content.keyPoints.map((point: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-slate-300 leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      </div>
    )}
    
    {card.content.highlights && (
      <div className="flex flex-wrap gap-2">
        {card.content.highlights.map((highlight: string, idx: number) => (
          <span key={idx} className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-sm text-emerald-300">
            #{highlight}
          </span>
        ))}
      </div>
    )}
  </div>
)

// 特性卡片组件
export const FeatureCard = ({ card }: { card: Card }) => (
  <div>
    <div className="flex items-center gap-4 mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
        <StarIcon className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl font-bold">{card.title}</h2>
    </div>
    
    <p className="text-slate-300 mb-8 text-lg">{card.content.description}</p>
    
    {card.content.features && (
      <div className="grid gap-4 mb-8">
        {card.content.features.map((feature: string, idx: number) => (
          <div key={idx} className="bg-slate-700/30 rounded-xl p-4 border-l-4 border-blue-400">
            <p className="text-slate-300">{feature}</p>
          </div>
        ))}
      </div>
    )}
    
    {card.content.benefits && (
      <div>
        <h3 className="text-xl font-semibold text-slate-200 mb-4">主要优势：</h3>
        <div className="space-y-3">
          {card.content.benefits.map((benefit: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2"></div>
              <span className="text-slate-300">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)

// 数据卡片组件
export const DataCard = ({ card }: { card: Card }) => (
  <div>
    <div className="flex items-center gap-4 mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
        <ChartBarIcon className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl font-bold">{card.title}</h2>
    </div>
    
    {card.content.metrics && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {card.content.metrics.map((metric: any, idx: number) => (
          <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-center border border-slate-600/30">
            <div className="text-3xl font-bold text-orange-400 mb-2">{metric.value}</div>
            <div className="text-slate-300">{metric.label}</div>
          </div>
        ))}
      </div>
    )}
    
    {card.content.description && (
      <p className="text-slate-300 text-lg">{card.content.description}</p>
    )}
  </div>
)

// 代码卡片组件
export const CodeCard = ({ card }: { card: Card }) => (
  <div>
    <div className="flex items-center gap-4 mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
        <CodeBracketIcon className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl font-bold">{card.title}</h2>
    </div>
    
    <p className="text-slate-300 mb-6 text-lg">{card.content.description}</p>
    
    <div className="bg-slate-900/80 rounded-xl border border-slate-600/30 overflow-hidden">
      <div className="flex items-center justify-between bg-slate-800/50 px-4 py-2 border-b border-slate-600/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="text-slate-400 text-sm">{card.content.language}</span>
      </div>
      <pre className="p-6 text-sm leading-relaxed overflow-x-auto">
        <code className="text-slate-300">{card.content.code}</code>
      </pre>
    </div>
  </div>
)

// 总结卡片组件
export const SummaryCard = ({ card }: { card: Card }) => (
  <div>
    <div className="flex items-center gap-4 mb-8">
      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
        <ClipboardDocumentListIcon className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl font-bold">{card.title}</h2>
    </div>
    
    {card.content.summary && (
      <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20 rounded-xl p-6 mb-8">
        <p className="text-slate-300 text-lg leading-relaxed">{card.content.summary}</p>
      </div>
    )}
    
    {card.content.conclusions && card.content.conclusions.length > 0 && (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-200 mb-4">核心结论：</h3>
        <div className="space-y-3">
          {card.content.conclusions.map((conclusion: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full mt-2"></div>
              <span className="text-slate-300">{conclusion}</span>
            </div>
          ))}
        </div>
      </div>
    )}
    
    {card.content.recommendations && (
      <div>
        <h3 className="text-xl font-semibold text-slate-200 mb-4">建议：</h3>
        <div className="grid gap-3">
          {card.content.recommendations.map((rec: string, idx: number) => (
            <div key={idx} className="bg-slate-700/30 rounded-lg p-3 border-l-4 border-pink-400">
              <p className="text-slate-300">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)

// 主卡片组件
export const CardComponent = ({ card, index }: CardComponentProps) => {
  const getCardContent = () => {
    switch (card.type) {
      case 'cover':
        return <CoverCard card={card} />
      case 'concept':
        return <ConceptCard card={card} />
      case 'feature':
        return <FeatureCard card={card} />
      case 'data':
        return <DataCard card={card} />
      case 'code':
        return <CodeCard card={card} />
      case 'summary':
        return <SummaryCard card={card} />
      default:
        return <ConceptCard card={card} />
    }
  }

  return (
    <div
      id={`card-${card.id}`}
      className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-3xl border border-slate-600/30 p-10 shadow-2xl hover:shadow-purple-500/5 transition-all duration-300 min-h-[500px] flex flex-col justify-center"
    >
      {getCardContent()}
    </div>
  )
}