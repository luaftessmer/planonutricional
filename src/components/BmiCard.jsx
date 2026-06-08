import { calcularIMC, classificarIMC } from '../utils/bmi'

export default function BmiCard({ peso, altura }) {
  const imc = calcularIMC(peso, altura)
  if (!imc) return null

  const { label } = classificarIMC(imc)

  return (
    <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 mb-5">
      <div>
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">IMC</p>
        <p className="text-2xl font-bold text-zinc-900 mt-0.5">{imc.toFixed(1)}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-zinc-700">{label}</p>
        <p className="text-xs text-zinc-400 mt-0.5">{peso}kg · {altura}cm</p>
      </div>
    </div>
  )
}
