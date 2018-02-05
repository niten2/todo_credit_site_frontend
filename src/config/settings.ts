interface Settings {
  readonly env: string | undefined
  readonly backend_url: string | undefined
  readonly auth_session_storage_key: string | undefined
  readonly auth_session_storage_key_role: string | undefined
}

const settings: Settings = {
  env: process.env.NODE_ENV,
  backend_url: process.env.REACT_APP_BACKEND_URL,
  auth_session_storage_key: process.env.REACT_APP_AUTH_SESSION_STORAGE_KEY,
  auth_session_storage_key_role: `${process.env.REACT_APP_AUTH_SESSION_STORAGE_KEY}_role`,
}

export default settings
