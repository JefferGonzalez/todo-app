import type { ISODateString } from 'next-auth'

export interface User {
  id: string
  name: string
  email: string
  created_at: ISODateString
  updated_at: ISODateString
  token: string
}

export interface Tasks {
  id: string
  title: string
  description: string
  status: 'pending' | 'progress' | 'completed'
  priority: 'low' | 'high'
}

export interface Info {
  pages: number
}

export interface Data {
  tasks: Tasks[]
  info: Info
}
