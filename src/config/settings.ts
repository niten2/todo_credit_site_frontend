// import Settings from "lib/settings"

interface Settings {
  readonly env: string
  readonly url_backend: string
}

const settings: Settings = {
  env: process.env.NODE_ENV,
  url_backend: process.env.REACT_APP_URL_BACKEND,
}

export default settings
