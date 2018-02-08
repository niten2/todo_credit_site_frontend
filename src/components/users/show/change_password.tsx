import * as React from "react"
import gql from "graphql-tag"
import { compose, graphql } from 'react-apollo'
import { Input } from 'reactstrap'
import { set, lensProp } from 'ramda'

import Notification from 'src/config/notification'

const updateUserQuery = gql`
  mutation updateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      id
      full_name
      email
      login
      password
      role
      phone
      territory
      blocked
    }
  }
`

const ErrorMessage = (props: { error: string | null }): any => {
  if (props.error || props.error !== "") {
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

class ChangePasswordUser extends React.Component<any, any> {

  state = {
    user: {
      password: "",
      confirmPassword: "",
    },
    error: null,
  }

  handleSetState = (e) => {
    const { name, value } = e.target
    this.setState({
      user: set(lensProp(name), value, this.state.user)
    })
  }

  handleUpdate = async (e?: any) => {
    if (e) { e.preventDefault() }

    const { user } = this.state
    const { userId } = this.props


    if (user.password !== user.confirmPassword) {
      this.setState({error: "password and confirm password do not match"})
      return
    }

    if (user.password === "") {
      this.setState({error: "password should be present"})
      return
    }

    const options = {
      variables: {
        input: {
          id: userId,
          password: user.password,
        }
      },
    }

    try {
      await this.props.updateUserQuery(options)

      this.setState({error: null})
      Notification.success("update password")
    } catch (err) {
      Notification.error(err.message)
    }
  }

  handleOnKeyPress = (target: any) => {
    if (target.charCode === 13) {
      this.handleUpdate()
    }
  }

  render() {
    let { user } = this.state

    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">

            <div className="card">

              <div className="card-header">
                <i className="fa fa-align-justify" /> Change password
              </div>

              <div className="card-block">
                <form className="form-2orizontal">

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">password</span>
                        <Input
                          name="password"
                          type="password"
                          placeholder="password"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                          value={user.password}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">confirm password</span>
                        <Input
                          name="confirmPassword"
                          type="password"
                          placeholder="confirm password"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                          value={user.confirmPassword}
                        />
                      </div>
                    </div>
                  </div>

                  <ErrorMessage error={this.state.error} />

                  <div className="form-actions">
                    <button
                      className="btn btn-primary"
                      onClick={this.handleUpdate}
                    >
                      Save changes
                    </button>
                  </div>
                </form>

              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default compose(
  graphql<any, any, any>(
    updateUserQuery, {
      name: "updateUserQuery"
    }
  ),
)(ChangePasswordUser)
