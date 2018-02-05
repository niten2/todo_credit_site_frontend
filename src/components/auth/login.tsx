import * as React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import authProvider from "src/config/auth_provider"

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

const ErrorMessage = (props: any) => {
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

interface P {
  createToken: (options: object) => Promise<any>
  history: any
}

interface S {
  login: string
  password: string
  error: string | null
}

class Login extends React.Component<P, S> {

  state = {
    login: 'admin',
    password: '12345',
    error: null,
  }

  signinUser = async () => {
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

      authProvider.saveToken(token)
      authProvider.saveRole(role)

      this.props.history.push('/dashboard')

    } catch (err) {
      this.setState({ error: err.message })
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
                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="icon-user" /></span>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Login"
                        name="login"
                        onChange={(e) => this.setState({login: e.target.value})}
                        value={this.state.login}
                      />

                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-addon"><i className="icon-lock" /></span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}
                      />

                    </div>

                    <ErrorMessage error={error} />

                    <div className="row">

                      <div className="col-6">
                        <button
                          onClick={this.signinUser}
                          type="button"
                          className="btn btn-primary px-4"
                        >
                          Login
                        </button>
                      </div>

                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-link px-0">Forgot password?</button>
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
