import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3001', // URL do seu backend
})

// Exportar hooks úteis
export const { useSession, signIn, signOut, signUp } = authClient