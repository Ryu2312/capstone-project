import { ZodIssue } from 'zod'
import { UsersData } from '../data/users.data'
import { formDataSchema, Result, UserData } from '../models'

// Función para formatear issues de zod
export function formatIssues(errors: ZodIssue[]) {
  const errorList = errors.map((error) => [error.path, error.message])
  return Object.fromEntries(errorList)
}

// Función para procesar cada fila
export async function processUser(user: UserData): Promise<Result> {
  // Validar datos
  const { success, error, data } = formDataSchema.safeParse(user)

  // Procesar problemas de validación
  if (!success) {
    const details = formatIssues(error.issues)

    // Verificar email solo si no hay errores previos en el campo
    if (!details.email) {
      const userExists = await UsersData.verifyData(user.email)
      if (userExists) {
        details.email = 'Email ya registrado'
      }
    }

    return { success: false, data: user, details }
  }

  // Verificar email si Success es true
  const userExists = await UsersData.verifyData(data.email)
  if (userExists) {
    return {
      success: false,
      data,
      details: { email: 'Email ya registrado' },
    }
  }

  return {
    success: true,
    data,
  }
}
