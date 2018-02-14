import settings from "src/config/settings"

class AuthProvider  {
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
