FROM node:20-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código
COPY . .

# Build TypeScript
RUN npm run build

# Expor porta
EXPOSE 3001

# Comando para rodar
CMD ["node", "dist/index.js"]
