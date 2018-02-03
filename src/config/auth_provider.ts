import settings from "src/config/settings"

// interface AuthProviderType {
//   // storage: any

//   supportsHtml5Storage: () => boolean
//   fetchToken: () => string
//   token: () => string
//   saveToken: (token: string) => boolean
//   hasLogin: () => boolean

// }

// class AuthProvider implements AuthProviderType {
class AuthProvider  {
  public storage: any

  constructor() {
    this.storage = localStorage
    // this.storage = this.supportsHtml5Storage() ? localStorage : null
  }

  // supportsHtml5Storage(): any {
  //   try {
  //     return 'localStorage' in window && window['localStorage'] !== null
  //   } catch (e) {
  //     return null
  //   }
  // }

  fetchToken(): string {
    const token = this.storage && this.storage.getItem(settings.auth_session_storage_key)
    return `Bearer ${token}`
  }

  token(): string {
    const token = this.storage && this.storage.getItem(settings.auth_session_storage_key)
    return token
  }

  saveToken(token: string): boolean {
    if (!this.storage || !token) { return false }

    this.storage.setItem(settings.auth_session_storage_key, token)
    return true
  }

  removeToken(): boolean {
    if (!this.storage) { return false }

    this.storage.removeItem(settings.auth_session_storage_key)
    return true
  }

  hasLogin(): boolean {
    return this.token() != null
  }

}

export default new AuthProvider()
