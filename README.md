# Cockpit

Organizar o dia de trabalho de um Tech Lead.

> Em construção — Sprint 0 concluída (fundação do repositório). Roadmap nos milestones do GitHub.

## Stack

- API: NestJS 12 (ESM) · TypeScript · Vitest · oxlint
- Web: React 19 · Vite 8 · TypeScript
- Monorepo: npm workspaces · Husky · commitlint · lint-staged · GitHub Actions

## Estrutura

- `apps/api` — API NestJS (porta 3000)
- `apps/web` — SPA React (porta 5173)
- `docs/adr` — decisões de arquitetura

## Como rodar

Pré-requisito: Node 24 (ver `.nvmrc`).

1. `npm install` na raiz (instala os dois apps; há um único `package-lock.json`)
2. `npm run dev` — sobe API e web juntos
3. API em <http://localhost:3000> · web em <http://localhost:5173>

## Scripts da raiz

| Script          | O que faz               |
| --------------- | ----------------------- |
| `npm run dev`   | API e web em modo watch |
| `npm run build` | build dos dois apps     |
| `npm run lint`  | oxlint nos dois apps    |
| `npm run test`  | testes unitários        |

## Como contribuir

Branch curta a partir da `main` → Conventional Commits → PR com CI verde → squash merge.

## Decisões de arquitetura

Ver [`docs/adr`](docs/adr).

## Licença

[MIT](LICENSE)
