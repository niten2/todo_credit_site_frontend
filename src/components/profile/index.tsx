import * as React from 'react'
import gql from "graphql-tag"
import { graphql, compose } from "react-apollo"
// import UserView from './view'
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

interface P {
  meQuery: {
    me: [object]
    loading: any
    error: any
  }

  updateMeQuery: {

  }
}

interface S {
}

class Profile extends React.Component<P, S> {

  handleSetState = (e) => {
    const { name, value } = e.target

    this.setState({
      user: set(lensProp(name), value, this.state.user),
      errorPassword: false,
    })
  }

  render() {
    let { me, loading, error } = this.props.meQuery

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
                        value={user.name || ""}
                        onChange={ this.handleSetState }
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
                        value={user.email || ""}
                        onChange={ this.handleSetState }
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
                        value={user.password || ""}
                        onChange={ this.handleSetState }
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
                        value={user.confirmPassword || ""}
                        onChange={ this.handleSetState }
                      />
                    </div>
                  </div>

                  { errorPassword ? ErrorMessage : null }

                </form>
              </div>

              <div className="card-footer">
                <button
                  onClick={ this.updateUser }
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
  graphql<any, any, any>(
    meQuery, {name: "meQuery"},
    updateMeQuery, {name: "updateMeQuery"},
  )(Profile)
)
