# 🚀 Guia de Deploy - Synk Project

## Índice
1. [Deploy do Backend + Database (Railway)](#1-deploy-do-backend--database-railway)
2. [Deploy do Frontend (Vercel)](#2-deploy-do-frontend-vercel)
3. [Configurar Google OAuth](#3-configurar-google-oauth)
4. [Testar](#4-testar)

---

## 1. Deploy do Backend + Database (Railway)

### Passo 1: Criar conta no Railway
1. Acesse: https://railway.app
2. Clique em **"Start a New Project"**
3. Faça login com GitHub

### Passo 2: Criar projeto
1. Clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Conecte seu repositório GitHub (precisa fazer push do código primeiro)
4. Selecione o repositório `siteGrup`

### Passo 3: Adicionar PostgreSQL
1. No projeto Railway, clique em **"+ New"**
2. Selecione **"Database" → "PostgreSQL"**
3. O Railway vai criar automaticamente o banco

### Passo 4: Configurar variáveis de ambiente do Backend
1. Clique no serviço do Backend
2. Vá em **"Variables"**
3. Adicione as seguintes variáveis:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
PORT=3001
NODE_ENV=production
```

**IMPORTANTE**: Clique no `${{Postgres.DATABASE_URL}}` - o Railway vai autocompletar com a URL do banco!

### Passo 5: Configurar deploy
1. Ainda no Backend, vá em **"Settings"**
2. Em **"Root Directory"**, coloque: `synk/backend`
3. Em **"Start Command"**, coloque: `npm run dev`
4. Clique em **"Deploy"**

### Passo 6: Obter URL do Backend
1. Após o deploy, clique no serviço Backend
2. Vá em **"Settings" → "Networking"**
3. Clique em **"Generate Domain"**
4. Copie a URL (exemplo: `https://synk-backend-production.up.railway.app`)
5. **GUARDE ESSA URL!** Você vai usar no frontend

### Passo 7: Rodar migrações do banco
1. No Railway, clique no serviço Backend
2. Vá em **"Deploy"** (aba)
3. Clique nos 3 pontinhos → **"Connect Shell"**
4. Execute: `npm run db:push`

---

## 2. Deploy do Frontend (Vercel)

### Passo 1: Criar conta no Vercel
1. Acesse: https://vercel.com
2. Faça login com GitHub

### Passo 2: Importar projeto
1. Clique em **"Add New..." → "Project"**
2. Selecione seu repositório GitHub
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `synk/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Passo 3: Configurar variáveis de ambiente
1. Em **"Environment Variables"**, adicione:

```env
VITE_API_URL=https://synk-backend-production.up.railway.app
```

(Use a URL do Railway que você copiou antes!)

### Passo 4: Deploy
1. Clique em **"Deploy"**
2. Aguarde o build (1-2 minutos)
3. Você vai receber uma URL tipo: `https://siteGrup.vercel.app`

---

## 3. Configurar Google OAuth

### Atualizar URLs no Google Cloud Console

1. Acesse: https://console.cloud.google.com
2. Vá em **"APIs & Services" → "Credentials"**
3. Clique no seu OAuth 2.0 Client ID
4. Em **"Authorized JavaScript origins"**, adicione:
   ```
   https://siteGrup.vercel.app
   https://synk-backend-production.up.railway.app
   ```

5. Em **"Authorized redirect URIs"**, adicione:
   ```
   https://synk-backend-production.up.railway.app/api/auth/callback/google
   ```

6. Clique em **"Save"**

### Atualizar código do backend

Você precisa atualizar os arquivos do backend para usar as URLs de produção.

**Backend: `src/lib/auth.ts`**
```typescript
export const auth = betterAuth({
    baseURL: process.env.RAILWAY_PUBLIC_DOMAIN
        ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
        : "http://localhost:3001",
    trustedOrigins: [
        "http://localhost:3000",
        process.env.FRONTEND_URL || "https://siteGrup.vercel.app"
    ],
    // ... resto da configuração
})
```

**Backend: `src/index.ts` (CORS)**
```typescript
const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    process.env.FRONTEND_URL || 'https://siteGrup.vercel.app'
]

res.setHeader('Access-Control-Allow-Origin', req.headers.origin || ALLOWED_ORIGINS[0])
```

**Frontend: `src/lib/auth-client.ts`**
```typescript
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  // ... resto
})
```

---

## 4. Testar

1. Acesse sua URL do Vercel: `https://siteGrup.vercel.app`
2. Clique em **"Login com Google"**
3. Faça login
4. Veja se seu nome aparece no navbar
5. Teste criar/deletar capítulos de manwha

---

## 🎉 Pronto!

Seu site está no ar gratuitamente!

### URLs Importantes:
- **Frontend**: https://siteGrup.vercel.app
- **Backend**: https://synk-backend-production.up.railway.app
- **Database**: Gerenciado pelo Railway

### Próximos Passos (Opcional):
1. Comprar um domínio personalizado (ex: synk.com.br)
2. Conectar domínio no Vercel (grátis)
3. Adicionar sistema de roles/admin
4. Implementar analytics

---

## 💰 Custos

**TUDO GRÁTIS!** ✅
- Railway: 500h/mês grátis (suficiente para hobby)
- Vercel: Ilimitado para projetos pessoais
- PostgreSQL: Incluído no Railway

Se o projeto crescer muito, Railway cobra ~$5/mês depois de 500h.

---

## 🔧 Troubleshooting

### Backend não inicia
- Verifique as variáveis de ambiente
- Veja os logs no Railway (aba "Deployments")

### Login não funciona
- Verifique se atualizou as URLs no Google Cloud Console
- Verifique se VITE_API_URL está correto no Vercel

### CORS Error
- Verifique se adicionou a URL do Vercel em `trustedOrigins` no backend
- Verifique se o CORS está configurado para aceitar a origem do frontend

---

## 📝 Notas

- Sempre faça `git push` antes de fazer redeploy
- Railway faz auto-deploy quando você faz push no GitHub
- Vercel também faz auto-deploy
- Para ver logs: Railway → Deployments → View Logs
