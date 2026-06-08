const OBJETIVOS = [
  {
    value: 'emagrecimento',
    label: 'Emagrecimento',
    desc: 'Perda de gordura com déficit calórico controlado',
  },
  {
    value: 'massa',
    label: 'Ganho de Massa',
    desc: 'Mais músculo e força com superávit calórico moderado',
  },
  {
    value: 'recomposicao',
    label: 'Recomposição Corporal',
    desc: 'Perder gordura e ganhar músculo ao mesmo tempo',
  },
  {
    value: 'manutencao',
    label: 'Manutenção de Peso',
    desc: 'Manter o peso atual com equilíbrio e saúde',
  },
]

function formatarAltura(valor) {
  const digits = valor.replace(/\D/g, '').slice(0, 3)
  if (digits.length <= 1) return digits
  if (digits.length === 2) return `${digits[0]},${digits[1]}`
  return `${digits[0]},${digits[1]}${digits[2]}`
}

export default function UserForm({ dados, onChange, onSubmit, loading }) {
  const inputClass =
    'w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition'
  const labelClass = 'block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5'

  const handleAltura = (e) => {
    const formatado = formatarAltura(e.target.value)
    const digits = formatado.replace(/\D/g, '')
    const cm = digits.length === 3 ? parseInt(digits, 10) : ''
    onChange('alturaDisplay', formatado)
    onChange('altura', cm)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Peso (kg)</label>
          <input
            type="number"
            min="20"
            max="300"
            step="0.1"
            placeholder="70"
            className={inputClass}
            required
            value={dados.peso}
            onChange={(e) => onChange('peso', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Altura (m)</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="1,75"
            maxLength={4}
            className={inputClass}
            required
            value={dados.alturaDisplay || ''}
            onChange={handleAltura}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Idade</label>
          <input
            type="number"
            min="10"
            max="120"
            placeholder="30"
            className={inputClass}
            required
            value={dados.idade}
            onChange={(e) => onChange('idade', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Sexo</label>
          <select
            className={inputClass}
            required
            value={dados.sexo}
            onChange={(e) => onChange('sexo', e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Objetivo</label>
        <div className="grid grid-cols-1 gap-2">
          {OBJETIVOS.map((obj) => {
            const selecionado = dados.objetivo === obj.value
            return (
              <label
                key={obj.value}
                className={`flex items-start gap-4 rounded-xl border px-4 py-3 cursor-pointer transition ${
                  selecionado
                    ? 'border-zinc-900 bg-zinc-900 text-white'
                    : 'border-zinc-200 bg-white hover:border-zinc-400'
                }`}
              >
                <input
                  type="radio"
                  name="objetivo"
                  value={obj.value}
                  checked={selecionado}
                  onChange={(e) => onChange('objetivo', e.target.value)}
                  className="hidden"
                  required
                />
                <div
                  className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selecionado ? 'border-white' : 'border-zinc-400'
                  }`}
                >
                  {selecionado && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${selecionado ? 'text-white' : 'text-zinc-900'}`}>
                    {obj.label}
                  </p>
                  <p className={`text-xs mt-0.5 ${selecionado ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {obj.desc}
                  </p>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-zinc-900 py-3 text-white text-sm font-semibold hover:bg-zinc-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? 'Gerando seu plano...' : 'Gerar Plano Alimentar'}
      </button>
    </form>
  )
}
