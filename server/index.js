require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Groq = require('groq-sdk')

const app = express()
const client = new Groq({ apiKey: process.env.GROQ_API_KEY })

app.use(cors({ origin: ['http://localhost:5173', 'https://planonutricional-rjcjs14nf-luaftessmers-projects.vercel.app'] }))
app.use(express.json())

const OBJETIVOS = {
  emagrecimento: {
    nome: 'Emagrecimento (Perda de gordura)',
    instrucao: 'O foco é criar um déficit calórico moderado (entre 300 e 500 kcal abaixo do gasto diário estimado). Priorize alimentos com bastante proteína para preservar músculo, muito vegetal e fibra para saciedade, e reduza alimentos ultraprocessados e açúcar. Distribua bem as refeições para evitar fome excessiva.',
  },
  massa: {
    nome: 'Ganho de Massa Muscular',
    instrucao: 'O foco é um superávit calórico moderado (entre 200 e 400 kcal acima do gasto diário estimado). Priorize proteína alta (pelo menos 2g por kg de peso), carboidratos para energia nos treinos e gorduras boas. Distribua a proteína ao longo do dia em todas as refeições.',
  },
  recomposicao: {
    nome: 'Recomposição Corporal',
    instrucao: 'O foco é manter as calorias próximas ao gasto diário (nem déficit nem superávit grande). Priorize proteína muito alta para preservar e ganhar músculo ao mesmo tempo que perde gordura. Prefira carboidratos de qualidade (batata-doce, arroz, aveia) e gorduras boas. É um processo mais lento, então o plano deve ser sustentável no longo prazo.',
  },
  manutencao: {
    nome: 'Manutenção de Peso',
    instrucao: 'O foco é manter as calorias iguais ao gasto diário estimado. O plano deve ser equilibrado, variado e fácil de seguir no dia a dia. Distribua bem os macronutrientes: proteína moderada-alta, carboidratos de qualidade, gorduras boas. Priorize consistência e prazer nas refeições.',
  },
}

app.post('/api/gerar-plano', async (req, res) => {
  const { peso, altura, idade, sexo, objetivo } = req.body

  if (!peso || !altura || !idade || !sexo || !objetivo) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando.' })
  }

  const alturaM = (altura / 100).toFixed(2)
  const imc = (peso / (alturaM * alturaM)).toFixed(1)
  const obj = OBJETIVOS[objetivo]

  const prompt = `Você é um nutricionista especializado. Com base nos dados abaixo, crie um plano alimentar completo e personalizado em português, com linguagem simples e direta.

Dados do usuário:
- Peso: ${peso} kg
- Altura: ${altura} cm (${alturaM} m)
- IMC: ${imc}
- Idade: ${idade} anos
- Sexo: ${sexo === 'masculino' ? 'Masculino' : 'Feminino'}
- Objetivo: ${obj.nome}

Diretrizes para este objetivo: ${obj.instrucao}

Use apenas alimentos simples e acessíveis no dia a dia brasileiro: frango (peito, coxa), carne vermelha (patinho, acém, músculo), ovo, atum, feijão, arroz, batata-doce, batata inglesa, macarrão, pão integral, aveia, banana, maçã, laranja, leite, iogurte natural, queijo, azeite, alface, tomate, brócolis, cenoura, abobrinha. Evite suplementos, alimentos importados ou de difícil acesso.

Gere exatamente neste formato:

## Plano Alimentar — ${obj.nome}

**Calorias diárias estimadas:** [valor] kcal
**Proteínas:** [valor] g | **Carboidratos:** [valor] g | **Gorduras:** [valor] g

---

**Café da manhã:**
- [alimento + porção]
- [alimento + porção]

**Lanche da manhã:**
- [alimento + porção]

**Almoço:**
- [alimento + porção]
- [alimento + porção]
- [alimento + porção]

**Lanche da tarde:**
- [alimento + porção]

**Jantar:**
- [alimento + porção]
- [alimento + porção]

---

**Dicas importantes:**
- [dica prática 1]
- [dica prática 2]
- [dica prática 3]

**O que evitar:**
- [alimento ou hábito 1]
- [alimento ou hábito 2]
- [alimento ou hábito 3]`

  try {
    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    })

    res.json({ texto: completion.choices[0].message.content })
  } catch (err) {
    console.error('Erro na API Groq:', err.message)
    res.status(500).json({ error: err.message || 'Erro ao gerar o plano.' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
