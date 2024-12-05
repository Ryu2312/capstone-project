import { query } from '../db'
import { UsersData } from '../models/users-data.schema'

export class UserData {
  static async verifyData({ email }: { email: string }): Promise<UsersData> {
    return (await query('SELECT * FROM users WHERE email = $1', [email]))
      .rows[0]
  }
}
