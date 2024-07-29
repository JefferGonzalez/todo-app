'use client'

import { signOut as Logout } from '@/services/User'
import { LoaderIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function LogoutPage() {
  const { data: session } = useSession()

  useEffect(() => {
    const logout = async () => {
      if (!session?.user.token) return

      await Logout(session.user.token)

      await signOut({ callbackUrl: '/' })
    }

    logout()
  }, [session])

  return (
    <>
      <h1 className='text-2xl md:text-4xl font-extrabold mt-2'>
         Cerrando sesión...
      </h1>
      <LoaderIcon className='w-12 h-12 text-primary-500 animate-spin' />
    </>
  )
}
