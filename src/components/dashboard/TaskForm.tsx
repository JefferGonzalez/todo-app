import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Task } from '@/schemas/Task'
import { LoaderIcon, Save } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<Task>
  loading: boolean
  isEdit?: boolean
  handleSubmit: (values: Task) => void
}

export default function TaskForm({
  form,
  loading,
  isEdit = false,
  handleSubmit
}: Props) {
  const buttonText = isEdit ? 'Actualizar' : 'Guardar'

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='mt-5 space-y-4'
      >
        <section className='space-y-2'>
          <FormField
            control={form.control}
            name='title'
            render={({ field, fieldState }) => (
              <FormItem>
                <Label>Titulo</Label>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Escribe el titulo de la tarea'
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

        <section className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <article className='col-span-2'>
            <FormField
              control={form.control}
              name='description'
              render={({ field, fieldState }) => (
                <FormItem>
                  <Label>Descripción (Opcional)</Label>
                  <Textarea
                    id='description'
                    placeholder='Escribe la descripción de la tarea'
                    className='bg-neutral-900 border-neutral-950 mt-2'
                    rows={5}
                    disabled={loading}
                    {...field}
                  />

                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </article>

          <aside className='flex flex-col space-y-2'>
            <FormField
              control={form.control}
              name='status'
              render={({ field, fieldState }) => (
                <FormItem>
                  <Label>Estado</Label>
                  <select
                    id='status'
                    className='bg-neutral-900 border-neutral-950 w-full h-10 rounded-lg mt-2 px-3 py-2'
                    disabled={loading}
                    {...field}
                  >
                    <option value=''>Seleccionar</option>
                    <option value='pending'>Pendiente</option>
                    <option value='progress'>En progreso</option>
                    <option value='completed'>Completado</option>
                  </select>

                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='priority'
              render={({ field, fieldState }) => (
                <FormItem>
                  <Label>Prioridad (Opcional)</Label>
                  <select
                    className='bg-neutral-900 border-neutral-950 w-full h-10 rounded-lg mt-2 px-3 py-2'
                    disabled={loading}
                    {...field}
                  >
                    <option value='low'>Baja</option>
                    <option value='high'>Alta</option>
                  </select>

                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </aside>
        </section>

        <Button type='submit' className='flex gap-x-2' disabled={loading}>
          {buttonText}
          {loading ? (
            <LoaderIcon className='transition-all duration-1000 animate-spin' />
          ) : (
            <Save />
          )}
        </Button>
      </form>
    </Form>
  )
}
