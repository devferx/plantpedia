import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

const options: NextAuthOptions = {
  theme: {
    colorScheme: 'dark',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    // Use JWT to manage sessions since we aren't using a Database
    strategy: 'jwt',
    maxAge: 60 * 15, // 15 min
  },
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
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
}

export default NextAuth(options)
