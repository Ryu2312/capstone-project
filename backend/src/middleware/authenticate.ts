import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ApiError } from './error-handler'

export function authenticateHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return next(new ApiError('No autorizado', 401))
    }

    const payload = jwt.verify(token, process.env.JWTSECRETKEY as string) as {
      role: string
      iat: number
      exp: number
    }

    req.role = payload.role

    next()
  } catch (error) {
    return next(new ApiError('No autorizado', 401))
  }
}

declare global {
  namespace Express {
    interface Request {
      role: string
    }
  }
}
