import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Login } from '@/schemas/Login'
import { LoaderIcon, LogIn } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<Login>
  loading: boolean
  handleSubmit: (values: Login) => void
}

export default function LoginForm({ form, loading, handleSubmit }: Props) {
  return (
    <div className='rounded-lg border border-neutral-900 w-full max-w-md mx-auto p-5'>
      <h1 className='text-2xl font-bold text-center'>Bienvenido de vuelta</h1>
      <p className='text-center'>
        Ingrese su correo y contraseña para acceder a su cuenta.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='mt-5 space-y-4'
          noValidate
        >
          <section className='space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='m@example.com'
                      className='bg-neutral-900 border-neutral-950'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </section>
          <section className='space-y-2'>
            <FormField
              control={form.control}
              name='password'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='********'
                      className='bg-neutral-900 border-neutral-950'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </section>

          <Separator />

          <Button type='submit' className='w-full flex gap-x-2' disabled={loading}>
            Iniciar sesión
            {loading ? (
              <LoaderIcon className='transition-all duration-1000 animate-spin' />
            ) : (
              <LogIn />
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
