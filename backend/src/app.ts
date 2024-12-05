import express from 'express'
import path from 'path'
import { usersRouter } from './routes/users.routes'

export const app = express()
export const _dirName = path.resolve('..', 'frontend', 'dist')

//Middlewares de express
app.use(express.json())
app.use(express.static(_dirName))

//Rutas
app.use(usersRouter)
