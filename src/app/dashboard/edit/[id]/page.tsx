import UpdateTask from '@/components/dashboard/UpdateTask'
import { Button } from '@/components/ui/button'
import { config } from '@/next-auth.config'
import { getTask } from '@/services/Tasks'
import { Separator } from '@radix-ui/react-separator'
import { UndoDotIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const session = await getServerSession(config)

  if (!session?.user) {
    return null
  }

  const token = session.user.token

  const response = await getTask(token, params.id)

  const data = await response.json()

  if (!response.ok) {
    const statusCode = response.status

    if (statusCode === 401) {
      return redirect('/auth/logout')
    }

    if (statusCode === 404) {
      return notFound()
    }
  }

  const task = data.data

  return (
    <>
      <header className='flex justify-between items-center'>
        <h2 className='text-2xl md:text-4xl font-extrabold mt-2'>
          Actualizar tarea: {task.title}
        </h2>
        <Link href='/dashboard'>
          <Button className='flex gap-2' title='Ver todas las tareas'>
            <span className='sr-only'>Ver todas las tareas</span>
            <UndoDotIcon />
            <span className='hidden sm:inline-block'>Ver todas las tareas</span>
          </Button>
        </Link>
      </header>

      <Separator className='my-4' />

      <UpdateTask task={task} />
    </>
  )
}
