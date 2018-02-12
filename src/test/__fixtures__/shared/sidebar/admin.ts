import Sidebar from "src/components/shared/sidebar"

// const auth_session_storage_key = process.env.REACT_APP_AUTH_SESSION_STORAGE_KEY

export default {
  component: Sidebar,
  url: "/sidebar",
  localStorage: {
    credit_site_frontend_test: "foobar-token",
    credit_site_frontend_test_role: "admin",
  }
}
