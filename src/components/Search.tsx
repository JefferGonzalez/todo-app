'use client'

import { Input } from '@/components/ui/input'
import { DEBOUNCE_TIME } from '@/Config'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface Props {
  placeholder: string
  className?: string
}

const debounce = (fn: Function, delay: number) => {
  let intervalId: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(intervalId)
    intervalId = setTimeout(() => fn(...args), delay)
  }
}

export default function Search({ placeholder, className }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (value: string) => {
    debouncedSearch(value)
  }

  const debouncedSearch = debounce((value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set('query', value)
    } else {
      params.delete('query')
    }

    params.set('page', '1')

    replace(`${pathname}?${params.toString()}`)
  }, DEBOUNCE_TIME)

  return (
    <div className={`flex items-center gap-2 p-2 rounded-lg ${className}`}>
      <SearchIcon />
      <Input
        type='search'
        placeholder={placeholder}
        className='bg-neutral-900 border-neutral-950'
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  )
}
