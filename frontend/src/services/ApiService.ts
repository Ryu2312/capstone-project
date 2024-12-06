export class ApiService {
  static async login(email: string, password: string) {
    const response = await fetch('http://localhost:5500/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const { error } = await response.json()
      throw new Error(error.message)
    }

    const { token } = await response.json()
    localStorage.setItem('token', token)
    return token
  }

  // Otros métodos como register, fetchUser, etc.
}
