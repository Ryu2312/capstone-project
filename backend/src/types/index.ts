export interface Success {
  id?: number
  name: string
  email: string
  age?: number
  password?: string
  role?: 'user' | 'admin'
}

export interface Errors {
  row: number
  data: Success
  details: Details
}

export interface Details {
  name?: string
  email?: string
  age?: number
}

export interface Data {
  success: Success[]
  errors: Errors[]
}
