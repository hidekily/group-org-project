FROM node:20-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar package files
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código
COPY . .

# Build TypeScript
RUN pnpm run build

# Expor porta
EXPOSE 3001

# Comando para rodar
CMD ["node", "dist/index.js"]
