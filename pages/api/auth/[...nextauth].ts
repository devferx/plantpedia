import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const options: NextAuthOptions = {
  theme: {
    colorScheme: 'dark',
  },
  debug: true,
  session: {},
  jwt: {},
  secret: process.env.AUTH_PLATZI_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Platzi',
      credentials: {
        // input html5
        password: {
          type: 'password',
          label: 'Nunca pares de...',
        },
      },
      async authorize(credentials) {
        // Conectar API
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/platzi`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        // JSON rta API
        const user = await res.json()

        // return user ?? null
        if (res.ok && user) {
          return user
        }

        return null
      },
    }),
  ],
}

export default NextAuth(options)
