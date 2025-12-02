FROM node:20-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos do backend
WORKDIR /app/backend
COPY backend/package.json backend/pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código do backend
COPY backend/ ./

# Build TypeScript
RUN pnpm run build

# Expor porta
EXPOSE 3001

# Comando para rodar
CMD ["node", "dist/index.js"]
