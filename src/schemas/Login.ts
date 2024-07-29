import * as z from 'zod'

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Por favor, ingrese su correo electrónico.' })
    .email({ message: 'Por favor, ingrese un correo electrónico válido.' }),
  password: z
    .string()
    .min(1, { message: 'Por favor, ingrese su contraseña.' })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
})

export type Login = z.infer<typeof LoginSchema>
