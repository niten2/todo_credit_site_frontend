import * as React from 'react'
import gql from "graphql-tag"
import { graphql, compose } from "react-apollo"
import { set, lensProp } from 'ramda'
import Spinner from 'src/components/shared/spinner'
import Page500 from 'src/components/shared/page500'

const meQuery = gql`
  query {
    me {
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

const updateMeQuery = gql`
  mutation updateUser($input: MeUpdateInput!) {
    updateUser(input: $input) {
      id
      name
      email
    }
  }
`

const ErrorMessage = (
  <div>
    <div className="text-danger text-center">
      Password and Password confirmation must match
    </div>
    <br />
  </div>
)

interface P {
  meQuery: {
    me: {
      name: string
      email: string
      password: string
      confirmPassword: string
    }
    loading: any
    error: any
  }

  updateMeQuery: {

  }
}

interface S {
  me: {
    name: string
  }
  errorPassword: boolean
}

class Profile extends React.Component<P, S> {
  // public state: S

  // constructor (props: any) {
  //   super(props)
  //   // this.state = { name: this.props.defaultName };
  // }

  state: {
    me: {
      name: ""
    },
    errorPassword: false,
  }

  componentWillReceiveProps(props: any) {
    const { me } = props.meQuery
    this.setState({ me })

    // let error = props.userQuery.error
    // if (error) { props.dispatch(Notification.error(error.message)) }
  }


  handleSetState = (e) => {
    const { name, value } = e.target

    this.setState({
      me: set(lensProp(name), value, this.state.me),
      errorPassword: false,
    })
  }

  updateUser = async () => {
    console.log(111)
    // const { user } = this.state
    // const { dispatch, updateUserQuery } = this.props

    // // if (user.password !== user.confirmPassword) {
    // //   this.setState({ errorPassword: true })
    // //   return null
    // // }

    // try {
    //   let result = await updateUserQuery({
    //     variables: {
    //       input: {
    //         name: user.name,
    //         email: user.email,
    //         password: user.password,
    //       }
    //     }
    //   })
    //   let { name, email } = result.data.updateUser
    //   dispatch(updateProfile({ name, email }))
    //   dispatch(Notification.success("update profile"))
    // } catch(error) {
    //   dispatch(Notification.error(error))
    // }
  }

  render() {
    let { me, loading, error } = this.props.meQuery
    // let { errorPassword } = this.state

    // console.log(errorPassword)

    let errorPassword = false

    // console.log(error)

    if (loading ) {
      return <Spinner />
    }

    if (error) {
      return <Page500 />
    }

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Profile</strong>
              </div>

              <div className="card-block">
                <form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label">Name</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Name"
                        value={me.name || ""}
                        onChange={this.handleSetState}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label">Email</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={me.email || ""}
                        onChange={this.handleSetState}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label">Password</label>
                    <div className="col-md-9">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={me.password || ""}
                        onChange={this.handleSetState}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label">Password Confirmation</label>
                    <div className="col-md-9">
                      <input
                        type="password"
                        className="form-control"
                        name="passwordConfirmation"
                        placeholder="Password Confirmation"
                        value={me.confirmPassword || ""}
                        onChange={this.handleSetState}
                      />
                    </div>
                  </div>

                  {errorPassword ? ErrorMessage : null}

                </form>
              </div>

              <div className="card-footer">
                <button
                  onClick={this.updateUser}
                  type="button"
                  className="btn btn-sm btn-primary"
                >
                  <i className="fa fa-dot-circle-o" /> Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql<any, any, any>(meQuery, {name: "meQuery"}),
  graphql<any, any, any>(updateMeQuery, {name: "updateMeQuery"}),
)(Profile)
