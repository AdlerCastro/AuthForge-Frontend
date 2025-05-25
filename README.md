# 🖥️ AuthForge - Frontend

Interface web do sistema **AuthForge**, um gerenciador de autenticação e controle de usuários. Desenvolvido com **Next.js 15 (App Router)**, utiliza Server Actions, React Query e React Table para uma experiência moderna, fluida e com foco em segurança e performance.

🔗 Repositório da API:  
👉 [AuthForge Backend](https://github.com/AdlerCastro/AuthForge.git)

---

## ⚙️ Tecnologias e Padrões Utilizados

- **Next.js 15 (App Router)** – Renderização otimizada com suporte a Server Actions
- **TypeScript** – Segurança e produtividade no desenvolvimento
- **Tailwind CSS** – Estilização utilitária de alto desempenho
- **ShadCN UI** – Componentes acessíveis e baseados em Radix UI
- **React Query (TanStack)** – Controle de estados assíncronos e cache
- **React Table (TanStack)** – Tabelas reativas e escaláveis
- **Zod** – Validação de esquemas e tipos
- **Axios** – Cliente HTTP para comunicação com a API
- **Lucide React** – Ícones vetoriais personalizáveis
- **JWT** – Autenticação segura baseada em token
- **ESLint + Prettier** – Padrão de código consistente e automatizado

---

## 🧱 Padrão de Projeto

O projeto segue o **Atomic Design** e está organizado em:

```bash
src/
├── actions/             # Server Actions (autenticação, usuários, etc.)
├── app/                 # Páginas estruturadas por layout (App Router)
│   ├── (auth)/          # Áreas protegidas por autenticação
│   │   ├── home/
│   │   └── users/
│   ├── (without-auth)/  # Rotas públicas (login, registro)
│   ├── layout.tsx       # Layout raiz
│   └── globals.css      # Estilos globais
├── components/          # Componentes reutilizáveis (atomic design)
├── config/              # Configurações globais
├── enum/                # Enums da aplicação
├── hooks/               # Custom hooks (ex: useSession)
├── lib/                 # Funções utilitárias e instâncias
├── schemas/             # Esquemas de validação Zod
├── service/             # Instâncias Axios e serviços
├── types/               # Tipagens compartilhadas
├── utils/               # Funções auxiliares
└── middleware.ts        # Middleware de proteção de rotas
```

---

## 🚀 Funcionalidades

- 🔐 **Autenticação via JWT** com cookies HttpOnly
- ✅ **Proteção de rotas** via middleware do Next.js (`middleware.ts`)
- 👥 **Dashboard de usuários** com ações administrativas (editar/deletar)
- 🔄 **Atualização automática** após ações via React Query
- 🧠 **Renderização Server-Side** com `server actions`
- 🧪 Integração contínua com GitHub Actions
- 🔒 **Controle de permissões**: apenas administradores veem ações

---

## 🧪 CI/CD – GitHub Actions

```yaml
# .github/workflows/ci.yml
name: Continuous Integration

on:
  push:
    branches: [main]
  pull_request:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest
    environment: .ENV
    strategy:
      matrix:
        node-version: [22]

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Check formatting
        run: pnpm run format:fix

      - name: Lint
        run: pnpm run lint

      - name: Run build
        run: pnpm build
        env:
          API_URL: ${{ secrets.API_URL }}
```

---

## 🧪 Scripts disponíveis

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --check --ignore-path .gitignore .",
  "format:fix": "prettier --write --ignore-path .gitignore ."
}
```

---

## ⚡ Como executar localmente

```bash
pnpm install
pnpm dev
```

> Certifique-se de configurar o arquivo `.env` com a variável `API_URL=http://localhost:3333`

---

## 🧱 Requisitos

- Node.js `>= 18.18.0`
- PNPM `>= 9.6.0`
- Backend rodando localmente em `http://localhost:3333`

---

## 👨‍💻 Desenvolvido por

**Adler Castro**  
Projeto AuthForge — 2025  
🧠🚀