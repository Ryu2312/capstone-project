import { NextFunction, Request, Response, Router } from 'express'
import path from 'path'
import { _dirName } from '../app'
import jwt from 'jsonwebtoken'
import { loginSchema } from '../models/users-data.schema'
import { UsersService } from '../services/users.service'

export const usersRouter = Router()

usersRouter.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(_dirName, 'index.html'))
})

usersRouter.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = loginSchema.parse(req.body)
      const user = await UsersService.login(email, password)
      console.log('user verificado', user)
      const payload = {
        role: user.role,
      }

      const token = jwt.sign(payload, process.env.JWTSECRETKEY as string, {
        expiresIn: '4000m',
      })

      res.status(200).json({
        ok: true,
        token,
      })
    } catch (error) {
      next(error)
    }
  }
)
