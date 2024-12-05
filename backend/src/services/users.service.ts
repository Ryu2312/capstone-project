import { UserData } from '../data/users.data'
import { ApiError } from '../middleware/error-handler'
import bcrypt from 'bcrypt'

export class UsersService {
  //Función para loguearse
  static async login(email: string, password: string) {
    //comprobamos que exista el usuario
    const user = await UserData.verifyData({ email })
    if (!user) {
      throw new ApiError('Email Incorrecto', 401)
    }
    //verificamos su password
    const isvalid = await bcrypt.compare(password, user.password)
    if (!isvalid) {
      throw new ApiError('Password Incorrecto', 401)
    }

    return user
  }
}
