import { query } from '../db'
import { UserData } from '../models/schemas'

export class UsersData {
  static async verifyData(email: string): Promise<UserData> {
    return (await query('SELECT * FROM users WHERE email = $1', [email]))
      .rows[0]
  }

  static async insertData(data: UserData): Promise<UserData> {
    if (data.age) {
      return (
        await query(
          'INSERT INTO users (name, email, password, age, role) VALUES ($1, $2, $3, $4, $5) RETURNING name, email,age',
          [data.name, data.email, data.password, data.age, data.role]
        )
      ).rows[0]
    }

    return (
      await query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING name, email',
        [data.name, data.email, data.password, data.role]
      )
    ).rows[0]
  }
}
