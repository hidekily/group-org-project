import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../db/index.ts"

export const auth = betterAuth({
    baseURL: "http://localhost:3001",
    trustedOrigins: ["http://localhost:3000"],
    database: drizzleAdapter(db, {
        provider: "pg", 
    }),
    session: {
        updateAge: 60 * 60 * 24,
        expiresIn: 60 * 60 * 24 * 7,
        cookieCache:{
            enabled: true,
            maxAge: 60 * 60 * 24
        }
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
})