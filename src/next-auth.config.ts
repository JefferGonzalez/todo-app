import { AUTH_SECRET, NODE_ENV } from '@/Config'
import { login } from '@/services/User'
import { User } from '@/types'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const config: AuthOptions = {
  pages: { signIn: '/auth' },
  secret: AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const response = await login(credentials)
        const data = await response.json()

        if (!response.ok) {
          const statusCode = response.status

          if (statusCode === 400) {
            const { errors } = data

            throw new Error(JSON.stringify(errors))
          }

          if (statusCode === 401) {
            const errors = {
              email: 'Credenciales inválidas',
              password: 'Credenciales inválidas'
            }

            throw new Error(JSON.stringify(errors))
          }
        }

        const user = data.user

        if (response.ok && user) {
          return user
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User
      }

      return token
    },
    async session({ session, token }) {
      session.user = token.user

      return session
    }
  },
  debug: NODE_ENV === 'development'
}
