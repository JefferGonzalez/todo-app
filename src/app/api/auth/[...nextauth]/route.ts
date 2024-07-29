import NextAuth from 'next-auth/next'
import { config } from '@/next-auth.config'

const nextAuth = NextAuth(config)

export { nextAuth as GET, nextAuth as POST }
