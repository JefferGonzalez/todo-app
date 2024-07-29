import { signOut as Logout } from '@/services/User'
import { showToastError } from '@/utils/errors'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'

export const handleSignOut = async (token: string) => {
  try {
    toast('👋 Cerrando sesión...')

    await Logout(token)

    await signOut()
  } catch (error) {
    showToastError()
  }
}
