import { LoginSchema } from '@/schemas/Login'
import * as z from 'zod'

const Schema = z.object({
  name: z.string().min(1, { message: 'Por favor, ingrese su nombre.' }),
  confirm_password: z
    .string()
    .min(1, { message: 'Por favor, confirme su contraseña.' })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
})

export const RegisterSchema = Schema.merge(LoginSchema).refine(
  (data) => data.password === data.confirm_password,
  {
    message: 'Las contraseñas no coinciden.',
    path: ['confirm_password']
  }
)

export type Register = z.infer<typeof RegisterSchema>
