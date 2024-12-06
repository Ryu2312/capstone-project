import { useState } from 'react'
import { APP_STATUS, AppStatusType } from '../../constanst'

export default function Unauthorized({
  appStatus,
  setAppStatus,
}: {
  appStatus: string
  setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>
}) {
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('http://localhost:5500/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error.message)
      }

      const { token } = await response.json()
      localStorage.setItem('token', token)

      setAppStatus(APP_STATUS.AUTHORIZED)
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
        setAppStatus(APP_STATUS.ERROR)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
      <label htmlFor="email" className="flex flex-col gap-1">
        Email
        <input
          type="email"
          name="email"
          className="py-2 px-4 rounded-lg"
          required
        />
      </label>
      <label htmlFor="password" className="flex flex-col gap-1">
        Password
        <input
          type="password"
          name="password"
          className="py-2 px-4 rounded-lg"
          required
        />
      </label>
      <button>Login</button>
      {appStatus === APP_STATUS.ERROR && (
        <p className="text-center text-red-600">{errorMessage}</p>
      )}
    </form>
  )
}
