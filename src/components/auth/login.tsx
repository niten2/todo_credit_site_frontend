import * as React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"

import AuthProvider from "src/config/auth_provider"
import { Info, ErrorMessage } from "src/components/auth/components"

interface P {
  createToken: (options: object) => Promise<any>
  history: any
}

interface S {
  login: string
  password: string
  error: string | null
}

const createToken = gql`
  mutation createToken($input: TokenCreateInput!) {
    createToken(input: $input) {
      token
      user {
        role
      }
    }
  }
`

const withData = graphql<any, any, any>(
  createToken, {
    name: "createToken"
  }
)

class Login extends React.Component<P, S> {

  state = {
    login: 'admin',
    password: '12345',
    error: null,
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
      let response = await this.props.createToken(options)

      const token = response.data.createToken.token
      const role = response.data.createToken.user.role

      AuthProvider.saveToken(token)
      AuthProvider.saveRole(role)

      this.props.history.push('/dashboard')

    } catch (err) {
      this.setState({ error: err.message })
    }
  }

  handleOnKeyPress = (target: any) => {
    if (target.charCode === 13) {
      this.handleLogin()
    }
  }

  render () {
    let { error } = this.state

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
                          className="btn btn-primary px-4"
                          onClick={this.handleLogin}
                        >
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
