// interface Settings {
//   readonly env: string
//   readonly url_backend: string
//   readonly auth_session_storage_key: string
// }

// const settings: Settings = {
const settings: object = {
  env: process.env.NODE_ENV,
  url_backend: process.env.REACT_APP_URL_BACKEND,
  auth_session_storage_key: process.env.REACT_APP_AUTH_SESSION_STORAGE_KEY,
}

export default settings
