'use client'

import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren<{}> {}

export default function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}
