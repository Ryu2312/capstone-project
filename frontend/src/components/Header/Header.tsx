import { APP_STATUS, AppStatusType } from '../../constantes'

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
      className={`max-w-7xl w-full h-fit text-lg font-semibold p-4 ${
        appStatus === APP_STATUS.AUTHORIZED
          ? 'flex justify-between items-center'
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
