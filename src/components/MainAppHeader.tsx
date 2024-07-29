import { Fragment } from 'react'

export default function MainAppHeader() {
  return (
    <Fragment>
      <header className='flex items-center gap-x-2'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 to-zinc-400'>
          Organiza finalmente tu trabajo y tu vida con QuickTask.
        </h1>
      </header>
      <p className='text-md text-center text-neutral-400 py-4'>
        Una aplicación para gestionar tareas y listas de pendientes que
        simplificará tanto tu rutina como la de tu equipo.
      </p>
    </Fragment>
  )
}
