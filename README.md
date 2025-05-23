# 🖥️ AuthForge - Frontend

Interface web do sistema **AuthForge**, responsável pela autenticação de usuários, gerenciamento de perfis e consumo da API REST. Este projeto foi desenvolvido com **Next.js 15 (App Router)**, integrando autenticação via **JWT**, estilização com **Tailwind CSS**, e consumo de dados com **React Query (TanStack)**.

🔗 API Backend disponível em:  
👉 [AuthForge Backend Repository](https://github.com/AdlerCastro/AuthForge.git)

---

## 📦 Tecnologias Utilizadas

- **Next.js 15** – Framework React com suporte a App Router
- **TypeScript** – Tipagem estática
- **Tailwind CSS** – Estilização utilitária
- **React Query (TanStack)** – Cache e controle de estados assíncronos
- **Axios** – Cliente HTTP para requisições à API
- **JWT** – Autenticação baseada em token
- **ESLint + Prettier** – Padronização de código
- **CI/CD** – Integração contínua com GitHub Actions

---

## ⚙️ Funcionalidades

- Tela de login integrada com a API `/sign-in`
- Formulário de cadastro com validações
- Área autenticada com proteção de rota (guard)
- Atualização de dados pessoais (`/me`)
- Dashboard com informações do usuário
- Controle de permissões baseado em cargo (`admin` ou `user`)

---

## 📜 Scripts

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

## 🚀 Rodando Localmente

```bash
# Instale as dependências
pnpm install

# Execute o projeto em modo de desenvolvimento
pnpm dev
```

> O frontend se conecta por padrão à URL da API `http://localhost:3333`. Verifique suas variáveis `.env`.

---

## 🧪 Integração Contínua

Este repositório utiliza **GitHub Actions** para validar a qualidade do código a cada push ou PR:

- Verificação de formatação (`Prettier`)
- Lint com ESLint
- Build da aplicação

### Arquivo: `.github/workflows/ci.yml`

```yaml
name: Frontend CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
      - develop

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [22]

    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
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
        run: pnpm run format

      - name: Lint
        run: pnpm run lint

      - name: Build
        run: pnpm run build
```

---

## 📁 Estrutura de Pastas

```
authforge-frontend/
├── app/                # Estrutura App Router (Next.js 15)
├── components/         # Componentes reutilizáveis
├── hooks/              # Hooks personalizados (ex: useAuth)
├── services/           # Axios + React Query
├── styles/             # Tailwind config e globals
├── public/             # Assets estáticos
├── .env.example        # Variáveis de ambiente
```

---

## ✅ Requisitos

- Node.js `>= 18.18.0`
- PNPM `>= 9.6.0`
- API Backend rodando em `http://localhost:3333`

---

## 📜 Autoria

Este projeto foi idealizado e desenvolvido por **Adler Castro**. Todos os direitos reservados.

---

> Desenvolvido por Adler Castro 🧠🚀
