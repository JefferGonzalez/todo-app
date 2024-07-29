'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const StatusFilter = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('status', value)
    } else {
      params.delete('status')
    }

    params.set('page', '1')

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      className='bg-neutral-900 border-neutral-950 h-10 rounded-lg mt-2 px-3 py-2'
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={searchParams.get('status')?.toString()}
    >
      <option value=''>Seleccionar estado</option>
      <option value='pending'>Pendiente</option>
      <option value='progress'>En progreso</option>
      <option value='completed'>Completado</option>
    </select>
  )
}

export const PriorityFilter = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('priority', value)
    } else {
      params.delete('priority')
    }

    params.set('page', '1')

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      className='bg-neutral-900 border-neutral-950 h-10 rounded-lg mt-2 px-3 py-2'
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={searchParams.get('priority')?.toString()}
    >
      <option value=''>Seleccionar prioridad</option>
      <option value='low'>Baja</option>
      <option value='high'>Alta</option>
    </select>
  )
}
