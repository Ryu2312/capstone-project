import { query } from '../db'
import { UserData } from '../models/users-data.schema'

export class UsersData {
  static async verifyData({ email }: { email: string }): Promise<UserData> {
    return (await query('SELECT * FROM users WHERE email = $1', [email]))
      .rows[0]
  }
}
