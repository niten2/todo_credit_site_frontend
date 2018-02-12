// import settings from "src/config/settings"
import settings from "./settings"

class AuthProvider  {
  public storage: any

  constructor() {
    this.storage = localStorage
    // TODO
    // this.storage = this.supportsHtml5Storage() ? localStorage : null
  }

  // TODO
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
    const token = this.storage.getItem(settings.auth_session_storage_key)
    return token
  }

  saveToken(token: string): boolean {
    if (!this.storage) { return false }

    this.storage.setItem(settings.auth_session_storage_key, token)
    return true
  }

  saveRole(role: string): boolean {
    this.storage.setItem(settings.auth_session_storage_key_role, role)
    return true
  }

  removeToken(): boolean {
    if (!this.storage) { return false }

    this.storage.removeItem(settings.auth_session_storage_key)
    this.storage.removeItem(settings.auth_session_storage_key_role)
    return true
  }

  hasLogin(): boolean {
    return this.token() != null
  }

  isAdmin(): boolean {
    const role = this.storage.getItem(settings.auth_session_storage_key_role)
    return role === "admin"
  }

}

export default new AuthProvider()
