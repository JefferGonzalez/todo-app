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
import { Register } from '@/schemas/Register'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<Register>
  handleSubmit: (values: Register) => void
}

export default function RegisterForm({ form, handleSubmit }: Props) {
  return (
    <div className='rounded-lg border border-neutral-900 w-full max-w-md mx-auto p-5'>
      <h1 className='text-2xl font-bold text-center'>
        Bienvenido a nuestra plataforma
      </h1>
      <p className='text-center'>
        Regístrese con su nombre, correo y contraseña para acceder a su cuenta.
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
              name='name'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='John Doe'
                      className='bg-neutral-900 border-neutral-950'
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
              name='email'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='m@example.com'
                      className='bg-neutral-900 border-neutral-950'
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
              name='confirm_password'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='********'
                      className='bg-neutral-900 border-neutral-950'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </section>

          <Separator />

          <Button type='submit' className='w-full'>
            Registrarse
          </Button>
        </form>
      </Form>
    </div>
  )
}
