'use client'

import MainAppHeader from '@/components/MainAppHeader'
import { Button } from '@/components/ui/button'
import { RocketIcon, StarIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { status } = useSession()

  const to = status === 'authenticated' ? '/dashboard' : '/auth'

  return (
    <section className='flex flex-col items-center justify-center py-20'>
      <MainAppHeader />

      <div className='flex gap-2'>
        <Link href={to} title='Pruébala gratis'>
          <Button className='flex justify-center gap-x-2'>
            <RocketIcon />
            <span className='sr-only'>Pruébala gratis</span>
            Pruébala gratis
          </Button>
        </Link>

        <Link
          title='Estrella en GitHub'
          href='https://github.com/JefferGonzalez/todo-app'
          rel='noopener noreferrer'
          target='_blank'
        >
          <Button className='flex justify-center gap-x-2'>
            <StarIcon />
            <span className='sr-only'>Estrella en GitHub</span>
            Estrella en GitHub
          </Button>
        </Link>
      </div>
    </section>
  )
}
