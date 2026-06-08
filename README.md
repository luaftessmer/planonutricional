# Plano Alimentar IA

Aplicação web que gera planos alimentares personalizados com inteligência artificial, com base nos dados físicos e objetivo do usuário.

## Funcionalidades

- Plano alimentar gerado por IA para 4 objetivos diferentes
- Cálculo de IMC em tempo real
- Exportação do plano em PDF
- Interface limpa e responsiva

## Objetivos suportados

| Objetivo | Descrição |
|---|---|
| Emagrecimento | Déficit calórico controlado para perda de gordura |
| Ganho de Massa | Superávit moderado com foco em proteína |
| Recomposição Corporal | Perder gordura e ganhar músculo ao mesmo tempo |
| Manutenção de Peso | Equilíbrio calórico com alimentação saudável |

## Tecnologias

**Frontend**
- React 19
- Vite
- Tailwind CSS 4
- jsPDF

**Backend**
- Node.js + Express
- Groq API (modelo `llama-3.3-70b-versatile`)

## Estrutura do projeto

```
planonutricional/
├── src/
│   ├── components/
│   │   ├── UserForm.jsx      # Formulário de dados do usuário
│   │   ├── BmiCard.jsx       # Card de IMC calculado
│   │   └── Results.jsx       # Exibição do plano gerado
│   ├── utils/
│   │   ├── claudeApi.js      # Comunicação com o backend
│   │   ├── bmi.js            # Cálculo e classificação de IMC
│   │   └── exportPdf.js      # Geração do PDF
│   └── App.jsx
├── server/
│   ├── index.js              # API Express + integração Groq
│   ├── .env                  # Chave da API (não versionado)
│   └── package.json
└── package.json
```

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Conta na [Groq](https://console.groq.com) para obter uma API key gratuita

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/planonutricional.git
cd planonutricional
```

### 2. Configure o servidor

```bash
cd server
npm install
```

Crie um arquivo `.env` dentro da pasta `server/`:

```env
GROQ_API_KEY=sua_chave_aqui
```

Inicie o servidor:

```bash
npm start
```

O servidor ficará disponível em `http://localhost:3001`.

### 3. Configure o frontend

Em outro terminal, na raiz do projeto:

```bash
npm install
npm run dev
```

O frontend ficará disponível em `http://localhost:5173`.

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `GROQ_API_KEY` | Chave de acesso à API da Groq |
| `PORT` | Porta do servidor (padrão: `3001`) |

## Licença

MIT
