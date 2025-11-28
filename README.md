# Synk  Instruções básicas

Projeto dividido em duas pastas: `backend/` e `frontend/`.

Pré-requisitos
- Docker
- Node.js
- pnpm (ou npm/yarn)

1) Configure variáveis de ambiente
Crie `.env.local` na raiz com a URL do banco:

```
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
```

2) Inicie o banco (docker)

```powershell
docker compose up -d
```

3) Backend

```powershell
cd backend
pnpm install
pnpm dev
```

4) Frontend (outro terminal)

```powershell
cd frontend
pnpm install
pnpm dev
```

Comandos úteis
- Parar containers: `docker compose down`
- Gerar + aplicar migrations (backend):

```powershell
cd backend
pnpm db:generate
pnpm db:push
```

Notas
- O frontend usa Vite; ver `frontend/vite.config.ts` para configurações de proxy.
- O backend contém Drizzle ORM em `backend/src/db`.

Pronto  arquivo simples com o mínimo para rodar o projeto localmente.
