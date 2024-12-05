import { UsersData } from '../data/users.data'
import { ApiError } from '../middleware/error-handler'
import bcrypt from 'bcrypt'

export class UsersService {
  //Función para loguearse
  static async login(email: string, password: string) {
    //comprobamos que exista el usuario
    const user = await UsersData.verifyData({ email })
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
}
