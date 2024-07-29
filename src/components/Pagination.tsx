'use client'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { MAX_PAGINATION_ITEMS } from '@/Config'
import { usePathname, useSearchParams } from 'next/navigation'

interface Props {
  pages: number
  minPageNumberLimit: number
  maxPageNumberLimit: number
}

export default function Pagination({
  pages,
  minPageNumberLimit,
  maxPageNumberLimit
}: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const currentPage = Number(searchParams.get('page')) || 1

  const PAGINATION_ITEMS =
    pages > MAX_PAGINATION_ITEMS
      ? Array.from(
          { length: maxPageNumberLimit },
          (_, index) => index + minPageNumberLimit
        )
      : Array.from({ length: pages }, (_, index) => index + 1)

  const createPageURL = (page: string | number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())

    return `${pathname}?${params.toString()}`
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem hidden={currentPage === 1}>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            className='cursor-pointer'
          />
        </PaginationItem>
        {PAGINATION_ITEMS.map((item, index) => (
          <PaginationItem key={index.toString()}>
            <PaginationLink
              isActive={item === currentPage}
              href={createPageURL(item)}
              className={
                item === currentPage
                  ? 'text-neutral-900'
                  : 'text-neutral-500 cursor-pointer'
              }
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem hidden={currentPage === pages}>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            className='cursor-pointer'
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  )
}
