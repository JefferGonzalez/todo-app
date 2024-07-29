import { columns } from '@/app/dashboard/columns'
import { DataTable } from '@/components/DataTable'
import Pagination from '@/components/Pagination'
import { config } from '@/next-auth.config'
import { getTasks } from '@/services/Tasks'
import { signOut } from '@/services/User'
import { Info, Tasks } from '@/types'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

interface Props {
  query: string
  status: string
  priority: string
  page: number
}

export default async function TasksTable({
  query,
  status,
  priority,
  page
}: Props) {
  const session = await getServerSession(config)

  if (!session?.user) {
    return null
  }

  const token = session.user.token

  const response = await getTasks(token, query, status, priority, page)

  const data = await response.json()

  if (!response.ok) {
    const statusCode = response.status

    if (statusCode === 401) {
      return redirect('/auth/logout')
    }

    if (statusCode === 400) {
      let text = 'No hay tareas para mostrar'

      let filter = ''

      return (
        <div className='flex justify-center items-center h-96'>
          <p className='text-xl font-bold'>{text + filter}</p>
        </div>
      )
    }
  }

  const { data: tasks, info }: { data: Tasks[]; info: Info } = data

  if (tasks.length === 0) {
    return (
      <div className='flex justify-center items-center h-96'>
        <p className='text-xl font-bold'>
          No hay tareas para mostrar, crea una nueva tarea
        </p>
      </div>
    )
  }

  return (
    <>
      <DataTable columns={columns} data={tasks} />

      {info.pages > 1 && (
        <footer className='my-4'>
          <Pagination
            pages={info.pages}
            maxPageNumberLimit={5}
            minPageNumberLimit={1}
          />
        </footer>
      )}
    </>
  )
}
