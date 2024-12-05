import { Request, Response, Router } from 'express'
import path from 'path'
import { _dirName } from '../app'

export const usersRouter = Router()

usersRouter.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(_dirName, 'index.html'))
})
