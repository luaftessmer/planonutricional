import { exportarPDF } from '../utils/exportPdf'

function renderMarkdown(texto) {
  return texto.split('\n').map((linha, i) => {
    const trimmed = linha.trim()

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="text-lg font-bold text-zinc-900 mt-8 mb-3">
          {trimmed.replace(/^##\s*/, '').replace(/[\u{1F300}-\u{1FFFF}]/gu, '').trim()}
        </h2>
      )
    }

    if (trimmed === '---') {
      return <hr key={i} className="my-5 border-zinc-100" />
    }

    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      return (
        <p key={i} className="text-sm font-semibold text-zinc-800 mt-4 mb-1">
          {trimmed.replace(/\*\*/g, '')}
        </p>
      )
    }

    if (trimmed.startsWith('**') && trimmed.includes(':**')) {
      const match = trimmed.match(/^\*\*(.+?)\*\*:(.*)$/)
      if (match) {
        return (
          <p key={i} className="text-sm mt-1">
            <span className="font-semibold text-zinc-700">{match[1]}:</span>
            <span className="text-zinc-500">{match[2]}</span>
          </p>
        )
      }
    }

    if (trimmed.startsWith('- ')) {
      return (
        <li key={i} className="text-sm text-zinc-600 ml-4 list-disc leading-relaxed">
          {trimmed.slice(2)}
        </li>
      )
    }

    if (!trimmed) return <div key={i} className="h-1" />

    return (
      <p key={i} className="text-sm text-zinc-600 mt-1 leading-relaxed">
        {trimmed}
      </p>
    )
  })
}

export default function Results({ texto, dados }) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-zinc-900">Plano gerado</h2>
        <button
          onClick={() => exportarPDF({ texto, dados })}
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition"
        >
          Exportar PDF
        </button>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl px-6 py-5 shadow-sm text-left">
        {renderMarkdown(texto)}
      </div>
    </div>
  )
}
