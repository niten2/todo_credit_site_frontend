import * as React from "react"

import AuthProvider from "src/config/auth_provider"
import { Info, ErrorMessage } from "src/components/auth/components"
import { withData } from "src/components/auth/queries"

interface P {
  createToken: (options: object) => Promise<any>
  history: any
}

interface S {
  login: string
  password: string
  error: string | null
  loading: boolean
}

class Login extends React.Component<P, S> {

  state = {
    login: 'admin',
    password: '12345',
    error: null,
    loading: false,
  }

  handleSetState = (e) => {
    const { name, value } = e.target
    let variable = {}

    variable[name] = value

    this.setState(variable)
  }

  handleLogin = async () => {
    const { login, password } = this.state

    const options = {
      variables: {
        input: {
          login: login,
          password: password,
        }
      }
    }

    try {
      this.setState({ loading: true })
      let response = await this.props.createToken(options)

      const token = response.data.createToken.token
      const role = response.data.createToken.user.role

      AuthProvider.saveToken(token)
      AuthProvider.saveRole(role)

      this.props.history.push("dashboard")
    } catch (err) {
      this.setState({ loading: false })
      this.setState({ error: err.message })
    }
  }

  handleOnKeyPress = (target: any) => {
    if (target.charCode === 13) {
      this.handleLogin()
    }
  }

  render () {
    let { error, loading } = this.state

    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div className="card-block">

                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>

                    <Info />

                    <div className="input-group mb-3">
                      <span className="input-group-addon">
                        <i className="fa fa-user-o" />
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Login"
                        name="login"
                        onChange={this.handleSetState}
                        onKeyPress={this.handleOnKeyPress}
                        value={this.state.login}
                      />
                    </div>

                    <div className="input-group mb-4">
                      <span className="input-group-addon">
                        <i className="fa fa-lock" />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={this.handleSetState}
                        onKeyPress={this.handleOnKeyPress}
                        value={this.state.password}
                      />
                    </div>

                    <ErrorMessage error={error} />

                    <div className="row">
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={this.handleLogin}
                        >
                          {loading ? <i className="fa fa-refresh fa-spin margin-rigth-0-5rem" /> : null}

                          Login
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default withData(Login)
