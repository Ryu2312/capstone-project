import { NextFunction, Request, Response } from 'express'
import { formatIssues } from '../utils'
import { ZodError } from 'zod'

export class ApiError extends Error {
  status: number
  details?: Record<string, unknown>

  constructor(
    message: string,
    status: number,
    details?: Record<string, unknown>
  ) {
    super(message)
    this.status = status
    this.details = details
  }
}

export default function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(`Error handler!`)
  if (error instanceof ApiError) {
    res.status(error.status).json({
      ok: false,
      error: {
        message: error.message,
        details: error.details,
      },
    })
  } else if (error instanceof ZodError) {
    res.status(400).json({
      ok: false,
      error: {
        message: 'Error de validación',
        details: formatIssues(error.issues),
      },
    })
  } else {
    console.log(error)
    res.status(500).json({
      ok: false,
      error: {
        message: 'Error interno del servidor',
      },
    })
  }
}
