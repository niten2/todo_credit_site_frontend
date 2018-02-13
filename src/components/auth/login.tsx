import * as React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import AuthProvider from "src/config/auth_provider"

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

const ErrorMessage = (props: { error: string | null }): any => {
  if (props.error) {
    return(
      <div>
        <div className="text-danger text-center">
          {props.error}
        </div>
        <br />
      </div>
    )
  } else {
    return <div />
  }
}

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

      // console.log(AuthProvider.saveToken.mock.calls)

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
      <div className="app flex-row">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div className="card-block">

                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>

                    <div className="row text-center">
                      <div className="col-6">
                        <p className="text-muted">
                          default login admin
                          <br />
                          login: admin
                          <br />
                          password: 12345
                        </p>
                      </div>

                      <div className="col-6">
                        <p className="text-muted">
                          default login manager
                          <br />
                          login: manager
                          <br />
                          password: 12345
                        </p>
                      </div>
                    </div>

                    <div className="row text-center">
                      <div className="col-12">
                        <p className="text-muted">
                          <a href="https://github.com/niten2/todo_credit_site_backend">
                            source code backend
                          </a>

                          <br />

                          <a href="https://github.com/niten2/todo_credit_site_frontend">
                            source code frontend
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-addon">
                        <i className="icon-user" />
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
                        <i className="icon-lock" />
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

export default graphql<any, any, any>(
  createToken, { name: "createToken" }
)(Login)
