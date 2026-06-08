export async function gerarPlano({ peso, altura, idade, sexo, objetivo }) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gerar-plano`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ peso, altura, idade, sexo, objetivo }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error || `Erro ${response.status} no servidor`)
  }

  const data = await response.json()
  return data.texto
}
