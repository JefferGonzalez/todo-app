'use client'

import RegisterForm from '@/components/auth/RegisterForm'
import { Register, RegisterSchema } from '@/schemas/Register'
import { register } from '@/services/User'
import { showToastError } from '@/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function RegisterPage() {
  const form = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  })

  const handleSubmit = async (values: Register) => {
    try {
      const response = await register(values)

      if (!response.ok) {
        const statusCode = response.status

        if (statusCode === 400) {
          const { errors } = await response.json()

          Object.keys(errors).forEach((key) => {
            const field = key as keyof Register
            const message = errors[field]

            form.setError(field, { type: 'pattern', message })
          })
        }

        return
      }

      form.reset()

      toast('🎉 Usuario registrado con éxito', {
        action: {
          label: 'Iniciar Sesión',
          onClick: () => {
            window.location.href = '/auth'
          }
        }
      })
    } catch (error) {
      showToastError()
    }
  }

  return (
    <section className='flex flex-col items-center justify-center'>
      <RegisterForm form={form} handleSubmit={handleSubmit} />

      <p className='mt-5'>
        ¿Ya tienes una cuenta?{' '}
        <Link href='/auth' className='font-bold text-primary-500'>
          Iniciar Sesión
        </Link>
      </p>
    </section>
  )
}
