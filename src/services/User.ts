import { LOGIN_URL, LOGOUT_URL, PROFILE_URL, REGISTER_URL } from '@/Config'
import type { Register } from '@/schemas/Register'

export const login = async (data: any) => {
  return fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const register = async (data: Register) => {
  return fetch(REGISTER_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const getUser = async (token: string) => {
  return fetch(PROFILE_URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

export const signOut = async (token: string) => {
  return fetch(LOGOUT_URL, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}
