import { useState } from 'react'

export default function ApiKeyInput({ apiKey, onChange }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <label className="block text-sm font-semibold text-blue-800 mb-2">
        Chave da API Anthropic
      </label>
      <div className="flex gap-2">
        <input
          type={visible ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => onChange(e.target.value)}
          placeholder="sk-ant-..."
          className="flex-1 rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm text-blue-600 hover:bg-blue-100 transition"
        >
          {visible ? 'Ocultar' : 'Ver'}
        </button>
      </div>
      <p className="text-xs text-blue-600 mt-2">
        A chave fica apenas no seu navegador e nunca é enviada a terceiros.
      </p>
    </div>
  )
}
