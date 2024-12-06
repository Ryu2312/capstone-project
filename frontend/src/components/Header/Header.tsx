import { APP_STATUS, AppStatusType } from '../../constanst'

export default function Header({
  appStatus,
  setAppStatus,
}: {
  appStatus: string
  setAppStatus: React.Dispatch<React.SetStateAction<AppStatusType>>
}) {
  const handleLogout = () => {
    localStorage.removeItem('token')
    setAppStatus(APP_STATUS.IDLE)
  }

  return (
    <header
      className={`max-w-7xl w-full h-fit text-lg font-semibold pb-10 ${
        appStatus === APP_STATUS.AUTHORIZED
          ? 'flex justify-between items-center gap-4'
          : 'text-center'
      }`}
    >
      <h1>Sistema de Carga de Datos</h1>
      {appStatus === APP_STATUS.AUTHORIZED && (
        <button className="h-fit" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  )
}
