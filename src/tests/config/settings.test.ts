import settings from 'src/config/settings'

describe("", () => {
  it('should return valid values', () => {
    expect(settings).toEqual(
      expect.objectContaining({
        env: process.env.NODE_ENV,
        url_backend: process.env.REACT_APP_URL_BACKEND,
        auth_session_storage_key: process.env.REACT_APP_AUTH_SESSION_STORAGE_KEY,
      }),
    )
  })
})
