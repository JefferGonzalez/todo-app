'use client'

import { Task, TaskSchema } from '@/schemas/Task'
import { updateTask } from '@/services/Tasks'
import { Tasks } from '@/types'
import { showToastError } from '@/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import TaskForm from './TaskForm'

interface Props {
  task: Tasks
}

export default function UpdateTask({ task }: Props) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const form = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'low'
    },
    values: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status
    }
  })

  const handleSubmit = async (values: Task) => {
    if (!session?.user.token) return

    setLoading(true)

    try {
      const response = await updateTask(session.user.token, task.id, values)

      if (!response.ok) {
        const statusCode = response.status
        if (statusCode === 401) {
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

      setLoading(false)

      toast('🎉 Tarea actualizada correctamente')
    } catch (error) {
      setLoading(false)

      showToastError()
    }
  }

  return <TaskForm form={form} loading={loading} handleSubmit={handleSubmit} isEdit />
}
