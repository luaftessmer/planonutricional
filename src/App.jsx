import { useState } from 'react'
import BmiCard from './components/BmiCard'
import UserForm from './components/UserForm'
import Results from './components/Results'
import { gerarPlano } from './utils/claudeApi'

const DADOS_INICIAIS = {
  peso: '',
  altura: '',
  alturaDisplay: '',
  idade: '',
  sexo: '',
  objetivo: '',
}

export default function App() {
  const [dados, setDados] = useState(DADOS_INICIAIS)
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  const handleChange = (campo, valor) => {
    setDados((prev) => ({ ...prev, [campo]: valor }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro(null)
    setLoading(true)
    setResultado(null)
    try {
      const texto = await gerarPlano(dados)
      setResultado(texto)
    } catch (err) {
      setErro(err.message || 'Erro ao gerar o plano. Verifique se o servidor está rodando.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-4 py-12">
      <div className="max-w-xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-zinc-900 leading-tight">Seu plano alimentar personalizado</h1>
          <p className="text-zinc-500 mt-2 text-sm">Preencha os dados abaixo e receba uma dieta montada para o seu objetivo.</p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-7 shadow-sm">
          <BmiCard peso={Number(dados.peso)} altura={Number(dados.altura)} />
          <UserForm
            dados={dados}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
          />
          {erro && (
            <div className="mt-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {erro}
            </div>
          )}
        </div>

        {resultado && <Results texto={resultado} dados={dados} />}
      </div>
    </div>
  )
}
