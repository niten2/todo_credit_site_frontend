import * as React from "react"
import gql from "graphql-tag"
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
import { set, lensProp } from 'ramda'
import Spinner from 'src/components/shared/spinner'
import Page500 from 'src/components/shared/page500'

const userQuery = gql`
  query user($id: ID!) {
    user(id: $id) {
      id

      full_name
      email
      login
      role
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
  }

  componentWillReceiveProps(props: any) {
    console.log(props.userQuery.user)
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
        }
      },
      refetchQueries: [{
        query: usersQuery,
      }],
    }

    try {
      let res = await this.props.updateUserQuery(options)

      console.log(res.data)
    } catch (err) {
      console.log(err)
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

  handleOnKeyPress = (target: any) => {
    if (target.charCode === 13) {
      this.handleUpdate()
    }
  }

  render() {
    let { loading, error } = this.props.userQuery

    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <Page500 />
    }

    let { user } = this.state

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
