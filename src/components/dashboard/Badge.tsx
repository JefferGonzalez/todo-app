import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  variant: 'pending' | 'progress' | 'completed' | 'low' | 'high'
}

const priorityColors = {
  pending: 'bg-yellow-200 text-yellow-800 border border-yellow-800',
  progress: 'bg-blue-200 text-blue-800 border border-blue-800',
  completed: 'bg-green-200 text-green-800 border border-green-800',
  low: 'bg-white text-gray-800 border border-gray-800',
  high: 'bg-red-200 text-red-800 border border-red-800'
}

export default function Badge({ variant, children }: Props) {
  return (
    <span
      className={`px-2 py-1 text-sm font-semibold rounded-full ${priorityColors[variant]}`}
    >
      {children}
    </span>
  )
}
