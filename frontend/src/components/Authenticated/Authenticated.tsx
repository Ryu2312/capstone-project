import { useState } from 'react'
import { FORM_STATUS, FormStatusType } from '../../constantes'
import FormFile from '../FormFile/FormFile'
import FileRecords from '../FileRecords/FileRecords'
import { UserError, UserSuccess } from '../CardErrors'

export default function Authenticated() {
  const [formStatus, setFormStatus] = useState<FormStatusType>(FORM_STATUS.IDLE)
  const [registred, setRegistered] = useState<{
    success: UserSuccess[]
    failed: UserError[]
  }>({
    success: [],
    failed: [],
  })

  return (
    <>
      {formStatus === FORM_STATUS.READY_USAGE ? (
        <FileRecords registered={registred} />
      ) : (
        <FormFile
          setFormStatus={setFormStatus}
          formStatus={formStatus}
          setRegistered={setRegistered}
        />
      )}
    </>
  )
}
