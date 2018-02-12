// import settings from "src/config/settings"
import settings from "./settings"

class AuthProvider  {
  // public storage: any

  // constructor() {
    // this.storage = localStorage
    // TODO
    // this.storage = this.supportsHtml5Storage() ? localStorage : null
  // }

  // TODO
  // supportsHtml5Storage(): any {
  //   try {
  //     return 'localStorage' in window && window['localStorage'] !== null
  //   } catch (e) {
  //     return null
  //   }
  // }

  fetchToken(): string {
    const token = localStorage.getItem(settings.auth_session_storage_key)

    if (!token) { throw new Error("token not found") }

    return `Bearer ${token}`
  }

  token(): string {
    const token = localStorage.getItem(settings.auth_session_storage_key)

    if (!token) { throw new Error("token not found") }

    return token
  }

  saveToken(token: string): boolean {
    localStorage.setItem(settings.auth_session_storage_key, token)

    return true
  }

  saveRole(role: string): boolean {
    localStorage.setItem(settings.auth_session_storage_key_role, role)

    return true
  }

  removeToken(): boolean {
    localStorage.removeItem(settings.auth_session_storage_key)
    localStorage.removeItem(settings.auth_session_storage_key_role)

    return true
  }

  hasLogin(): boolean {
    return this.token() != null
  }

  isAdmin(): boolean {
    const role = localStorage.getItem(settings.auth_session_storage_key_role)

    return role === "admin"
  }

}

export default new AuthProvider()
