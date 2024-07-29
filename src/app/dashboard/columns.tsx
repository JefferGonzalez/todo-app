'use client'

import Badge from '@/components/dashboard/Badge'
import DataTableRowActions from '@/components/dashboard/DataTableRowActions'
import { Tasks } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Tasks>[] = [
  {
    accessorKey: 'id',
    header: '#'
  },
  {
    accessorKey: 'title',
    header: 'Título'
  },
  {
    accessorKey: 'description',
    header: 'Descripción'
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.original.status

      const statusText = {
        pending: 'Pendiente',
        progress: 'En progreso',
        completed: 'Completado'
      }

      return <Badge variant={status}>{statusText[status]}</Badge>
    }
  },
  {
    accessorKey: 'priority',
    header: 'Prioridad',
    cell: ({ row }) => {
      const priority = row.original.priority

      const priorityText = {
        low: 'Baja',
        high: 'Alta'
      }

      return <Badge variant={priority}>{priorityText[priority]}</Badge>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
]
