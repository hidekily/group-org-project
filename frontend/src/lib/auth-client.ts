import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3001',
  sessionToken: {
    cookieOptions: {
      sameSite: 'lax',
      secure: false, // Em produção com HTTPS: true
      maxAge: 60 * 60 * 24 * 7, 
    }
  }
})

export const { 
  useSession, 
  signIn, 
  signOut, 
  signUp 
} = authClient