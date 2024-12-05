import assert from 'assert/strict'
import test from 'node:test'

test('Home', async () => {
  const response = await fetch('http://localhost:5500')

  assert.equal(response.status, 200, 'La respuesta debe tener estado 200')
})

//Endpoints de login
test('Login exitoso devuelve un token', async () => {
  const response = await fetch('http://localhost:5500/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'testino@gmail.com',
      password: '123456',
    }),
  })

  assert.strictEqual(response.status, 200)

  const data = await response.json()
  assert.strictEqual(typeof data.token, 'string')
})

test('Login con credenciales incorrectas devuelve un error', async () => {
  const response = await fetch('http://localhost:5500/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'user@hotmail.com',
      password: 'wrongpassword',
    }),
  })

  assert.strictEqual(response.status, 401)

  const data = await response.json()
  assert.strictEqual(data.error.message, 'Credenciales incorrectas')
})

//Endpoints de subida de archivos
test('Subida de archivo sin archivo adjunto devuelve un error', async () => {
  const response = await fetch('http://localhost:5500/upload', {
    method: 'POST',
  })

  assert.strictEqual(response.status, 400)
  const data = await response.json()
  assert.strictEqual(data.error.message, 'No se ha enviado un archivo')
})
