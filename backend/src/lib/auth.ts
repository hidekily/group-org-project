import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../db/index.js"

export const auth = betterAuth({
    baseURL: process.env.BACKEND_URL || "http://localhost:3001",
    trustedOrigins: [
        "http://localhost:3000",
        process.env.FRONTEND_URL || ""
    ].filter(Boolean),
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    session: {
        updateAge: 60 * 60 * 24,
        expiresIn: 60 * 60 * 24 * 7,
        cookieCache: {
            enabled: false, // Desabilitar cache para debug
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
})