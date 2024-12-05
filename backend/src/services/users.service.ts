import { UsersData } from '../data/users.data'
import { ApiError } from '../middleware/error-handler'
import bcrypt from 'bcrypt'
import { Result, UserData } from '../models'
import { processUser } from '../utils'

export class UsersService {
  //Función para loguearse
  static async login(email: string, password: string) {
    //comprobamos que exista el usuario
    const user = await UsersData.verifyData(email)
    if (!user) {
      throw new ApiError('Credenciales incorrectas', 401)
    }

    //verificamos su password
    const isvalid = await bcrypt.compare(password, user.password)
    if (!isvalid) {
      throw new ApiError('Credenciales incorrectas', 401)
    }

    return user
  }

  //Función para registrar usuarios
  static async register({
    chunk,
    row,
  }: {
    chunk: UserData
    row: number
  }): Promise<Result> {
    try {
      const result = await processUser(chunk)

      if (!result.success) {
        return {
          ...result,
          row,
        }
      }

      // Si todo es válido, hasheamos la contraseña y guardamos en la base de datos
      const hashedPassword = await bcrypt.hash(result.data.password, 10)
      const user = await UsersData.insertData({
        ...result.data,
        password: hashedPassword,
      })

      return {
        success: true,
        data: user,
      }
    } catch (error) {
      // Retorno consistente en caso de error inesperado
      return {
        success: false,
        row,
        data: chunk,
        details: {
          email: 'Error desconocido al procesar esta fila',
          name: 'Error desconocido al procesar esta fila',
          age: 'Error desconocido al procesar esta fila',
        },
      }
    }
  }
}
