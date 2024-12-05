import { UserData } from './schemas'

export type Success = {
  success: true
  data: UserData
}

export type ErrorDetails = {
  name?: string
  email?: string
  age?: string
}

export type Error = {
  success: false
  row?: number
  data: UserData
  details: ErrorDetails
}

export type Result = Success | Error
