'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { deleteTask } from '@/services/Tasks'
import { Tasks } from '@/types'
import { showToastError } from '@/utils/errors'
import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Props<TData> {
  row: Row<TData>
}

export default function DataTableRowActions<TData>({ row }: Props<TData>) {
  const { data: session } = useSession()

  const router = useRouter()

  const handleDeleteTask = async () => {
    if (!session?.user.token) return

    const task = row.original as Tasks

    try {
      const response = await deleteTask(session.user.token, task.id)

      if (!response.ok) {
        const statusCode = response.status

        if (statusCode === 401) {
        }
        if (statusCode === 404) {
          toast('🙃 Tarea no encontrada, por favor recargue la página')
        }
        return
      }

      toast('🗑️ Tarea eliminada correctamente')

      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      showToastError()
    }
  }

  const handleEditTask = () => {
    const task = row.original as Tasks

    router.push(`/dashboard/edit/${task.id}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Abrir menú de acciones para la tarea</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='bg-black border-neutral-950 text-neutral-100'
        align='end'
      >
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='focus:bg-neutral-950 focus:text-neutral-100 cursor-pointer'
          onClick={handleEditTask}
        >
          Actualizar tarea
        </DropdownMenuItem>
        <DropdownMenuItem
          className='focus:bg-neutral-950 focus:text-neutral-100 cursor-pointer'
          onClick={handleDeleteTask}
        >
          Eliminar tarea
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
