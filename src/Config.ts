const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api'

export const NODE_ENV = process.env.NODE_ENV ?? 'development'

export const LOGIN_URL = `${API_URL}/auth/login`
export const REGISTER_URL = `${API_URL}/auth/register`
export const PROFILE_URL = `${API_URL}/auth/profile`
export const LOGOUT_URL = `${API_URL}/auth/logout`

export const TASKS_URL = `${API_URL}/tasks`

export const AUTH_SECRET = process.env.NEXTAUTH_SECRET ?? 'secret'

export const MAX_PAGINATION_ITEMS = 5

export const MIN_PAGE_NUMBER_LIMIT = 1
export const MAX_PAGE_NUMBER_LIMIT = 5

export const DEBOUNCE_TIME = 300
