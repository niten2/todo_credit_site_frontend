import settings from "src/config/settings"

class AuthProvider  {
  fetchToken(): string | null {
    const token = localStorage.getItem(settings.auth_session_storage_key)

    if (token) {
      return `Bearer ${token}`
    } else {
      return null
    }
  }

  token(): string | null {
    const token = localStorage.getItem(settings.auth_session_storage_key)

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
