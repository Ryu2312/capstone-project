import { Router } from 'express'
import path from 'path'
import { _dirName } from '../app'
import jwt from 'jsonwebtoken'
import { UsersService } from '../services/users.service'
import Busboy from 'busboy'
import Papa from 'papaparse'
import { Error, loginSchema, Result, Success } from '../models'
import { authenticateHandler } from '../middleware/authenticate'

export const usersRouter = Router()

// Pagina principal
usersRouter.get('/', (_req, res) => {
  res.sendFile(path.join(_dirName, 'index.html'))
})

// Login
usersRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const user = await UsersService.login(email, password)

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
})

// Subida de archivo csv de usuarios
usersRouter.post('/upload', authenticateHandler, (req, res, next) => {
  const busboy = Busboy({ headers: req.headers })
  const processingPromises: Promise<Success | Error>[] = []
  let row = 0

  busboy.on('file', (_fieldname, file, info) => {
    // Verificar el tipo del archivo
    if (info.mimeType !== 'text/csv') {
      res.status(400).json({
        ok: false,
        error: {
          message: 'El archivo debe ser de tipo CSV',
        },
      })
    }

    const papaStream = Papa.parse(Papa.NODE_STREAM_INPUT, {
      skipEmptyLines: true,
      dynamicTyping: true,
      header: true,
    })

    file.pipe(papaStream)

    papaStream.on('data', (chunk) => {
      processingPromises.push(UsersService.register({ chunk, row: ++row }))
    })

    papaStream.on('end', async () => {
      try {
        // Esperamos que todas las promesas se resuelvan
        const result = await Promise.all(processingPromises)

        const success = result
          .filter((item: Result) => item.success)
          .map((item: Success) => item.data)

        const failed = result
          .filter((item: Result) => !item.success)
          .map((item: Error) => ({
            row: item.row,
            data: item.data,
            details: item.details,
          }))

        res.status(201).json({ ok: true, success, failed })
      } catch (error) {
        next(error)
      }
    })

    papaStream.on('error', (error) => {
      next(error)
    })
  })

  req.pipe(busboy)
})

// Registro de usuario
usersRouter.post('/register', authenticateHandler, async (req, res, next) => {
  const { row, data } = req.body

  try {
    const result = await UsersService.register({ chunk: data, row })

    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})
