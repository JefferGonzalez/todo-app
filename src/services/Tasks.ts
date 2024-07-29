import { TASKS_URL } from '@/Config'
import { Task } from '@/schemas/Task'

export const getTasks = async (
  token: string,
  query: string,
  status: string,
  priority: string,
  page: number
) => {
  const url = new URL(TASKS_URL)

  if (query) {
    url.searchParams.append('query', query)
  }

  if (status) {
    url.searchParams.append('status', status)
  }

  if (priority) {
    url.searchParams.append('priority', priority)
  }
  if (page > 0) {
    url.searchParams.append('page', (page - 1).toString())
  }

  return fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

export const getTask = (token: string, id: string) => {
  return fetch(`${TASKS_URL}/${id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

export const createTask = (token: string, task: Task) => {
  return fetch(TASKS_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task)
  })
}

export const updateTask = (token: string, id: string, task: Task) => {
  return fetch(`${TASKS_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task)
  })
}

export const deleteTask = (token: string, id: string) => {
  return fetch(`${TASKS_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}
