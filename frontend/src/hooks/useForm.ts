import { useState } from 'react'

export default function useForm({
  type,
  initialValue,
}: {
  type: string
  initialValue: string | number
}) {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return { type, value, onChange }
}
