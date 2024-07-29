import GitHubIcon from '@/icons/GitHub'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='sticky bottom-0 w-full py-4'>
      <div className='container max-w-[1100px] flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <span className='text-base sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-zinc-600 to-zinc-400'>
            Hecho con Next.js y Laravel
          </span>
        </div>

        <Link
          href='https://github.com/JefferGonzalez/todo-app'
          title='GitHub'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHubIcon className='size-8' />
          <span className='sr-only'>GitHub</span>
        </Link>
      </div>
    </footer>
  )
}
