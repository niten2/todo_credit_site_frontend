import * as React from "react"
import gql from "graphql-tag"
import Select from 'react-select'
import { graphql } from "react-apollo"
import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
import { set, lensProp } from 'ramda'

import Notification from 'src/config/notification'

const createUserQuery = gql`
  mutation createUser($input: UserCreateInput!) {
    createUser(input: $input) {
      id

      full_name
      email
      login
      password
      role
      phone
      territory
    }
  }
`

const usersQuery = gql`
  query {
    users {
      id

      email
      login
      role
    }
  }
`

class UserNew extends React.Component<any, any> {

  state = {
    user: {
      full_name: null,
      login: null,
      password: null,
      email: null,
      role: "manager",
      phone: null,
      territory: null,
    },
    roles: [
      {value: "manager"},
      {value: "admin"}
    ]
  }

  handleSetState = (e) => {
    const { name, value } = e.target
    let { user } = this.state

    user[name] = value
    this.setState({ user })
  }

  changeSelect = (value) => {
    let setClient = set(lensProp("role"), value.value)
    this.setState({ user: setClient(this.state.user) })
  }

  handleCreate = async (e?: any) => {
    if (e) { e.preventDefault() }
    const { user } = this.state

    const options = {
      variables: {
        input: {
          full_name: user.full_name,
          email: user.email,
          login: user.login,
          password: user.password,
          role: user.role,
          phone: user.phone,
          territory: user.territory,
        }
      },
      refetchQueries: [{
        query: usersQuery,
      }],
    }

    try {
      await this.props.createUserQuery(options)
      Notification.success("create user")

      this.setState({
        user: {
          full_name: null,
          login: null,
          password: null,
          email: null,
          role: "manager",
          phone: null,
          territory: null,
        }
      })

    } catch (err) {
      Notification.error(err.message)
    }
  }

  handleOnKeyPress = (target: any) => {
    if (target.charCode === 13) {
      this.handleCreate()
    }
  }

  render() {
    let { user, roles } = this.state

    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">

            <div className="card">

              <div className="card-header">
                <i className="fa fa-align-justify" /> Simple Table
              </div>

              <div className="card-block">
                <form className="form-2orizontal">

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">full_name</span>
                        <Input
                          name="full_name"
                          placeholder="full_name"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">email</span>
                        <Input
                          name="email"
                          placeholder="email"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">login</span>
                        <Input
                          name="login"
                          placeholder="login"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">password</span>
                        <Input
                          name="password"
                          placeholder="password"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">phone</span>
                        <Input
                          name="phone"
                          placeholder="phone"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">Status</span>
                          <Select
                            name="role"
                            labelKey="value"
                            valueKey="value"
                            className="form-control"
                            options={roles}
                            value={user.role}
                            onChange={this.changeSelect}
                          />
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      className="btn btn-primary"
                      onClick={this.handleCreate}
                    >
                      Save changes
                    </button>

                    &nbsp;

                    <Link to="/users">
                      <button
                        className="btn btn-default"
                      >
                        Cancel
                      </button>
                    </Link>
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

export default graphql<any, any, any>(
  createUserQuery, { name: "createUserQuery" }
)(UserNew)
