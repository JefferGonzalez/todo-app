'use client'

import LoginForm from '@/components/auth/LoginForm'
import { Login, LoginSchema } from '@/schemas/Login'
import { showToastError } from '@/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function AuthPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = async (values: Login) => {
    setLoading(true)

    try {
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      })

      if (!response?.ok) {
        const error = response?.error

        if (!error) {
          toast('🚨 Ha ocurrido un error inesperado')
        } else {
          const errors = JSON.parse(error)

          Object.keys(errors).forEach((key) => {
            const field = key as keyof Login
            const message = errors[field]

            form.setError(field, { type: 'pattern', message })
          })
        }

        setLoading(false)

        return
      }

      setLoading(false)

      form.reset()

      toast('🎉 Bienvenido de vuelta')

      router.push('/dashboard')
    } catch (error) {
      setLoading(false)

      showToastError()
    }
  }

  return (
    <section className='flex flex-col items-center justify-center'>
      <LoginForm form={form} handleSubmit={handleSubmit} loading={loading} />

      <p className='mt-5'>
        ¿No tienes una cuenta?{' '}
        <Link href='/auth/register' className='font-bold text-primary-500'>
          Regístrate
        </Link>
      </p>
    </section>
  )
}
