// Estados del formulario
export const FORM_STATUS = {
  IDLE: 'idle', // Estado inicial
  ERROR: 'error', // Estado de error
  READY_UPLOAD: 'ready-upload', // Estado de preparación
  UPLOADING: 'uploading', // Estado de carga
  READY_USAGE: 'ready-usage', // Estado de uso
} as const

export type FormStatusType = (typeof FORM_STATUS)[keyof typeof FORM_STATUS]

// Estados de la app
export const APP_STATUS = {
  IDLE: 'idle', // Estado inicial
  ERROR: 'error', // Estado de error
  AUTHORIZED: 'authorized', // Estado de autorización
} as const

export type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS]
