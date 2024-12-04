import { pool } from '..'
import bcrypt from 'bcrypt'

const createTableAndInsertUser = async () => {
  const name = 'testino'
  const email = 'testino@gmail.com'
  const password = await bcrypt.hash('123456', 10)
  const role = 'admin'

  try {
    const client = await pool.connect()

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        age INT CHECK (age > 0),
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT 'user'
      )
    `)

    await client.query(
      `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
    `,
      [name, email, password, role]
    )

    console.log('Table created and user added successfully!')
    client.release()
  } catch (error) {
    console.error('Error executing script:', error)
  } finally {
    pool.end()
  }
}

createTableAndInsertUser()
