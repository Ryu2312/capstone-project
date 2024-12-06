import { useState } from 'react'
import { APP_STATUS, AppStatusType } from '../../constantes'
import Header from '../Header/Header'
import Authenticated from '../Authenticated/Authenticated'
import Unauthorized from '../Unauthorized/Unauthorized'

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE)
  return (
    <div className="h-full w-full p-10">
      <Header appStatus={appStatus} setAppStatus={setAppStatus} />
      <main className="max-w-7xl w-full h-full flex justify-center">
        {appStatus === APP_STATUS.AUTHORIZED ? (
          <Authenticated />
        ) : (
          <Unauthorized appStatus={appStatus} setAppStatus={setAppStatus} />
        )}
      </main>
    </div>
  )
}

export default App
