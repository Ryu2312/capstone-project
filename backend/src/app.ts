import express from 'express'
import path from 'path'
import { usersRouter } from './routes/users.routes'
import errorHandler from './middleware/error-handler'
import cors from 'cors'

export const app = express()
export const _dirName = path.resolve('..', 'frontend', 'dist')

//Middlewares de express
app.use(express.json())
app.use(express.static(_dirName))
app.use(cors())

//Rutas
app.use(usersRouter)

//Manejo de errores
app.use(errorHandler)
