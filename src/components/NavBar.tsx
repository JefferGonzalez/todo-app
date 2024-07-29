'use client'

import { Button } from '@/components/ui/button'
import BoxsIcon from '@/icons/Boxs'
import { signOut as Logout } from '@/services/User'
import { showToastError } from '@/utils/errors'
import { handleSignOut } from '@/utils/logout'
import { LoaderIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { status, data: session } = useSession()

  const isSessionLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'

  const pathname = usePathname()

  const signOut = () => {
    if (!session?.user.token) return

    handleSignOut(session.user.token)
  }

  return (
    <nav className='flex items-center justify-between backdrop-blur-sm sticky py-4 top-0 z-40'>
      <Link
        href='/'
        className='text-sm sm:text-base md:text-xl flex items-center gap-2'
        title='QuickTask | Gestor de tareas'
      >
        <BoxsIcon className='size-8' />
        <span className='sr-only'>QuickTask | Gestor de tareas</span>
        QuickTask | Gestor de tareas
      </Link>

      <section className='flex items-center gap-4'>
        {pathname !== '/auth' && !isAuthenticated && (
          <Link href='/auth' className='text-sm' title='Iniciar sesión'>
            <Button className='flex gap-x-2'>
              <span className='sr-only'>Iniciar sesión</span>
              Iniciar sesión
              {isSessionLoading && (
                <LoaderIcon className='transition-all duration-1000 animate-spin' />
              )}
            </Button>
          </Link>
        )}

        {isAuthenticated && (
          <Button className='flex gap-x-2' onClick={signOut}>
            <span className='sr-only'>Cerrar sesión</span>
            Cerrar sesión
          </Button>
        )}
      </section>
    </nav>
  )
}
