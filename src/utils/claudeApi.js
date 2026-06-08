const OBJETIVOS = {
  corrida: 'corrida (endurance e resistência cardiovascular)',
  musculacao: 'musculação (hipertrofia e ganho de massa muscular)',
  natacao: 'natação (resistência e técnica aquática)',
  ciclismo: 'ciclismo (potência e resistência aeróbica)',
  emagrecimento: 'emagrecimento geral (déficit calórico e perda de gordura)',
}

export async function gerarPlano({ peso, altura, idade, sexo, objetivo }) {
  const response = await fetch('http://localhost:3001/api/gerar-plano', {
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
