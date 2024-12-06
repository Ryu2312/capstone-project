import useForm from '../hooks/useForm'

export default function CardErrors({ userError }: { userError: UserError }) {
  const { row, data, details } = userError

  const name = useForm({ type: 'text', initialValue: data.name })
  const email = useForm({ type: 'email', initialValue: data.email })
  const age = useForm({ type: 'number', initialValue: data.age || '' })

  const handleSubmit = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        row,
        data: {
          name: name.value,
          email: email.value,
          age: age.value === '' ? null : age.value,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

    const response = await fetch('http://localhost:5500/register', options)

    if (!response.ok) {
      const { row, data, details } = await response.json()
      console.log(row, data, details)
    }
    console.log(response)
    const data = await response.json()
    console.log(data)
  }

  return (
    <div className="grid grid-cols-[0.5fr,3fr,3fr,0.5fr,2fr] gap-6 p-2 w-full items-baseline">
      <span>{userError.row}</span>

      <label>
        <input
          className=" border w-full rounded-lg p-2"
          name="name"
          {...name}
        />
        {details.name && (
          <span className="text-red-600 p-1">{details.name}</span>
        )}
      </label>
      <label>
        <input
          className=" border w-full rounded-lg p-2"
          name="email"
          {...email}
        />
        {details.email && (
          <span className="text-red-600 p-1">{details.email}</span>
        )}
      </label>
      <label>
        <input className=" border w-full rounded-lg p-2" name="age" {...age} />
        {details.age && <span className="text-red-600 p-1">{details.age}</span>}
      </label>

      <button onClick={handleSubmit}>Retry</button>
    </div>
  )
}

export interface UserError {
  row: number
  data: { name: string; email: string; age: number | null }
  details: { name?: string; email?: string; age?: string }
}

export interface UserSuccess {
  id: number
  name: string
  email: string
  age: number | null
}
