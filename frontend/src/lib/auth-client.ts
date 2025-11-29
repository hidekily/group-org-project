import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3001',
  cookieOptions: {
    secure: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
  },
})

// ✅ Exportar hooks e funções
export const { 
  useSession, 
  signIn, 
  signOut, 
  signUp 
} = authClient
