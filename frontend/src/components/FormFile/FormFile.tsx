import { useEffect } from 'react'
import { FORM_STATUS, FormStatusType } from '../../constanst'
import useForm from '../../hooks/useForm'
import { UserError, UserSuccess } from '../CardErrorsCardErrors/CardErrors'

export default function FormFile({
  setFormStatus,
  formStatus,
  setRegistered,
}: {
  setFormStatus: React.Dispatch<React.SetStateAction<FormStatusType>>
  formStatus: string
  setRegistered: React.Dispatch<
    React.SetStateAction<{ success: UserSuccess[]; failed: UserError[] }>
  >
}) {
  const { value, ...rest } = useForm({ type: 'file', initialValue: '' })

  useEffect(() => {
    if (value) {
      setFormStatus(FORM_STATUS.READY_UPLOAD)
    } else {
      setFormStatus(FORM_STATUS.IDLE)
    }
  }, [value])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('http://localhost:5500/upload', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (!response.ok) {
      const { error } = await response.json()
      throw new Error(error.message)
    }

    const { success, failed } = await response.json()
    setRegistered({ success, failed })
    setFormStatus(FORM_STATUS.READY_USAGE)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border w-full h-[75vh] rounded-3xl flex flex-col justify-center items-center gap-4"
    >
      <h2 className="text-xl">Selecciona un archivo de carga</h2>
      <div className="flex gap-4 items-center mb-5">
        <input
          id="file-input"
          name="file"
          className="hidden"
          accept="text/csv"
          value={value}
          {...rest}
        />
        <label htmlFor="file-input" id={'file-input'}>
          Chose File
        </label>
        <span>{value || 'No file chosen'}</span>
      </div>
      {formStatus === FORM_STATUS.READY_UPLOAD && (
        <button className="text-xl">Upload File</button>
      )}
    </form>
  )
}
