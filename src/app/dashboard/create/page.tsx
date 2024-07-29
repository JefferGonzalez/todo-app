'use client'

import TaskForm from '@/components/dashboard/TaskForm'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Task, TaskSchema } from '@/schemas/Task'
import { createTask } from '@/services/Tasks'
import { showToastError } from '@/utils/errors'
import { handleSignOut } from '@/utils/logout'
import { zodResolver } from '@hookform/resolvers/zod'
import { UndoDotIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function CreatePage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const form = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'low'
    }
  })

  const handleReset = () => {
    form.reset()

    const $status = document.querySelector('#status') as HTMLInputElement
    if ($status) {
      $status.value = ''
    }
  }

  const handleSubmit = async (values: Task) => {
    if (!session?.user.token) return

    setLoading(true)

    try {
      const response = await createTask(session.user.token, values)

      if (!response.ok) {
        const statusCode = response.status
        if (statusCode === 401) {
          handleSignOut(session.user.token)
        } else {
          if (statusCode === 400) {
            const { errors } = await response.json()

            Object.keys(errors).forEach((key) => {
              const field = key as keyof Task
              const message = errors[field]

              form.setError(field, { type: 'pattern', message })
            })
          }
        }

        setLoading(false)

        return
      }

      handleReset()

      setLoading(false)

      toast('🎉 Tarea creada exitosamente')
    } catch (error) {
      setLoading(false)

      showToastError()
    }
  }

  return (
    <Fragment>
      <header className='flex justify-between items-center'>
        <h2 className='text-2xl md:text-4xl font-extrabold mt-2'>
          Crear nueva tarea
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

      <TaskForm form={form} loading={loading} handleSubmit={handleSubmit} />
    </Fragment>
  )
}
