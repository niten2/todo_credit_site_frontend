import * as React from "react"
import gql from "graphql-tag"
import Select from 'react-select'
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
import { set, lensProp } from 'ramda'

import Notification from 'src/config/notification'
import Spinner from 'src/components/shared/spinner'
import Page500 from 'src/components/shared/page500'

const userQuery = gql`
  query user($id: ID!) {
    user(id: $id) {
      id

      full_name
      email
      login
      phone
      role
      territory
    }
  }
`

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
    }
  }
`

const deleteUserQuery = gql`
  mutation deleteUser($input: IdInput!) {
    deleteUser(input: $input) {
      id
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
const territoriesQuery = gql`
  query {
    territories {
      id

      name
      rate
    }
  }
`

class ShowUser extends React.Component<any, any> {

  state = {
    user: {
      id: "",
      full_name: "",
      email: "",
      login: "",
      role: "",
      phone: "",
      territory: "",
    },
    roles: [
      {value: "manager"},
      {value: "admin"}
    ]
  }

  componentWillReceiveProps(props: any) {
    this.setState({ user: props.userQuery.user })
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

    const options = {
      variables: {
        input: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          login: user.login,
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
      await this.props.updateUserQuery(options)
      Notification.success("update user")
    } catch (err) {
      Notification.error(err.message)
    }
  }

  handleDelete = async (e?: any) => {
    if (e) { e.preventDefault() }

    const { user } = this.state

    const options = {
      variables: {
        input: {
          id: user.id
        }
      },
      refetchQueries: [{
        query: usersQuery,
      }],
    }

    try {
      await this.props.deleteUserQuery(options)
      this.props.history.push("/users")
    } catch (err) {
      console.log(err)
    }
  }

  changeSelectRole = (value) => {
    let setClient = set(lensProp("role"), value.value)
    this.setState({ user: setClient(this.state.user) })
  }

  changeSelectTerritory = (value) => {
    let setClient = set(lensProp("territory"), value.id)

    this.setState({ user: setClient(this.state.user) })
  }

  handleOnKeyPress = (target: any) => {
    if (target.charCode === 13) {
      this.handleUpdate()
    }
  }

  render() {
    let { loading, error } = this.props.userQuery
    let { territories } = this.props.territoriesQuery


    if (loading || this.props.territoriesQuery.loading) {
      return <Spinner />
    }

    if (error || this.props.territoriesQuery.error) {
      return <Page500 />
    }

    let { user, roles } = this.state

    console.log(this.state)

    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">

            <div className="card">

              <div className="card-header">
                <i className="fa fa-align-justify" /> User
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
                          value={user.full_name}
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
                          value={user.email}
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
                          value={user.login}
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
                          value={user.phone}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">Role</span>
                        <Select
                          name="role"
                          labelKey="value"
                          valueKey="value"
                          className="form-control"
                          options={roles}
                          value={user.role}
                          onChange={this.changeSelectRole}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">Territory</span>
                        <Select
                          name="role"
                          labelKey="rate"
                          valueKey="id"
                          className="form-control"
                          options={territories}
                          value={user.territory}
                          onChange={this.changeSelectTerritory}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      className="btn btn-primary"
                      onClick={this.handleUpdate}
                    >
                      Save changes
                    </button>

                    {" "}

                    <button
                      className="btn btn-primary"
                      onClick={this.handleDelete}
                    >
                      Delete
                    </button>

                    {" "}

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

export default compose(
  graphql<any, any, any>(
    userQuery, {
      name: "userQuery" ,
      options: (props) => ({
        variables: {id: props.match.params.id}
      })
    }
  ),
  graphql<any, any, any>(
    territoriesQuery, {
      name: "territoriesQuery" ,
      options: (props) => ({
        variables: {id: props.match.params.id}
      })
    }
  ),
  graphql<any, any, any>(
    updateUserQuery, {
      name: "updateUserQuery"
    }
  ),
  graphql<any, any, any>(
    deleteUserQuery, {
      name: "deleteUserQuery"
    }
  ),
)(ShowUser)
