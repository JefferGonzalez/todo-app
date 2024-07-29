import * as z from 'zod'

export const TaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Por favor, ingrese un título.' })
    .max(255, { message: 'El título debe tener menos de 255 caracteres.' }),
  description: z.string().optional().default(''),
  status: z
    .enum(['pending', 'progress', 'completed'], {
      message: 'Por favor, seleccione un estado.',
      required_error: 'Por favor, seleccione un estado.'
    }),
  priority: z.enum(['low', 'high']).optional().default('low')
})

export type Task = z.infer<typeof TaskSchema>
