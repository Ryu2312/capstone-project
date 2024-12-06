import { useState } from 'react'
import CardErrors, {
  type UserError,
  type UserSuccess,
} from '../CardErrors/CardErrors'
import CardSuccess from '../CardSuccess/CardSuccess'
import { FORM_STATUS, FormStatusType } from '../../constanst'

export default function FileRecords({
  registered,
  setFormStatus,
}: {
  registered: { success: UserSuccess[]; failed: UserError[] }
  setFormStatus: React.Dispatch<React.SetStateAction<FormStatusType>>
}) {
  const [failedData, setFailedData] = useState(registered.failed)

  return (
    <div className="relative border w-full h-fit rounded-3xl flex flex-col justify-center items-center gap-4 p-8">
      <CardSuccess count={0} />
      <button
        onClick={() => setFormStatus(FORM_STATUS.IDLE)}
        className="absolute top-4 right-4"
      >
        New File
      </button>
      <p className="text-xl">
        The {`(${registered.failed.length})`} records listed below encountered
        errors. Please rectify these issues and retry.
      </p>

      <div className="grid grid-cols-[0.5fr,3fr,3fr,2.6fr] gap-6 w-full font-semibold text-lg">
        <span>Row</span>
        <span>Name</span>
        <span>Email</span>
        <span className="col-span-2.5">Age</span>
      </div>
      {failedData.map((user: UserError) => (
        <CardErrors
          key={user.row}
          userError={user}
          setFailedData={setFailedData}
        />
      ))}
    </div>
  )
}
