import { useState } from 'react'
import CardErrors, {
  type UserError,
  type UserSuccess,
} from '../CardErrorsCardErrors/CardErrors'
import CardSuccess from '../CardSuccess/CardSuccess'

export default function FileRecords({
  registered,
}: {
  registered: { success: UserSuccess[]; failed: UserError[] }
}) {
  const [failedData, setFailedData] = useState(registered.failed)

  return (
    <div className="border w-full h-fit rounded-3xl flex flex-col justify-center items-center gap-4 p-8">
      <CardSuccess count={0} />
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
