# Plano Alimentar IA

Aplicação web que gera planos alimentares personalizados com inteligência artificial, com base nos dados físicos e objetivo do usuário.

## Funcionalidades

- Geração de plano alimentar via IA com base em peso, altura, idade e sexo
- Cálculo e classificação de IMC em tempo real
- 4 objetivos nutricionais distintos com diretrizes específicas
- Exportação do plano em PDF formatado

## Objetivos suportados

| Objetivo | Estratégia |
|---|---|
| Emagrecimento | Déficit calórico de 300–500 kcal, alto teor de proteína e fibra |
| Ganho de Massa | Superávit de 200–400 kcal, proteína mínima de 2g/kg |
| Recomposição Corporal | Calorias próximas ao gasto, proteína elevada |
| Manutenção de Peso | Equilíbrio calórico com macros balanceados |

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS 4 |
| Backend | Node.js, Express 5 |
| IA | Groq API — modelo `llama-3.3-70b-versatile` |
| PDF | jsPDF |

## Estrutura

```
planonutricional/
├── src/
│   ├── components/
│   │   ├── UserForm.jsx       # Formulário principal
│   │   ├── BmiCard.jsx        # Exibição do IMC calculado
│   │   └── Results.jsx        # Renderização do plano gerado
│   └── utils/
│       ├── claudeApi.js       # Chamada ao backend
│       ├── bmi.js             # Cálculo e classificação de IMC
│       └── exportPdf.js       # Geração e download do PDF
└── server/
    └── index.js               # API REST + prompt + integração Groq
```

## Como rodar

### Pré-requisitos

- Node.js 18+
- API key gratuita da [Groq](https://console.groq.com)

### Backend

```bash
cd server
npm install
```

Crie o arquivo `server/.env`:

```env
GROQ_API_KEY=sua_chave_aqui
```

```bash
npm start
```

Servidor disponível em `http://localhost:3001`.

### Frontend

```bash
npm install
npm run dev
```

Frontend disponível em `http://localhost:5173`.

## Variáveis de ambiente

| Variável | Descrição | Padrão |
|---|---|---|
| `GROQ_API_KEY` | Chave da API Groq | — |
| `PORT` | Porta do servidor | `3001` |

## Licença

MIT
