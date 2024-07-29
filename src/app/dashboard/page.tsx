import Search from '@/components/Search'
import TasksTable from '@/components/TasksTable'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { PlusSquareIcon } from 'lucide-react'
import Link from 'next/link'
import { Fragment, Suspense } from 'react'
import { PriorityFilter, StatusFilter } from './filters'

export default async function DashboardPage({
  searchParams
}: {
  searchParams?: {
    query?: string
    status?: string
    priority?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ''
  const status = searchParams?.status || ''
  const priority = searchParams?.priority || ''
  const currentPage = Number(searchParams?.page) || 1

  return (
    <Fragment>
      <header className='flex justify-between items-center'>
        <h2 className='text-2xl md:text-4xl font-extrabold mt-2'>Dashboard</h2>
        <Link href='/dashboard/create'>
          <Button className='flex gap-2' title='Create a new slug'>
            <span className='sr-only'>Crear nueva tarea</span>
            <PlusSquareIcon />
            <span className='hidden sm:inline-block'>Crear nueva tarea</span>
          </Button>
        </Link>
      </header>
      <Separator className='mt-4' />

      <section className='flex gap-x-4 px-1'>
        <Search placeholder='Buscar tareas por titulo' className='flex-1' />

        <StatusFilter />

        <PriorityFilter />
      </section>

      <Suspense
        key={status + currentPage}
        fallback={
          <Skeleton className='h-96 bg-neutral-900 border-neutral-950 rounded-lg' />
        }
      >
        <TasksTable
          query={query}
          status={status}
          priority={priority}
          page={currentPage}
        />
      </Suspense>
    </Fragment>
  )
}
