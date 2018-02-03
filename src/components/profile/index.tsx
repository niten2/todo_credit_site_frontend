import * as React from 'react'
import gql from "graphql-tag"
import Spinner from 'src/components/shared/spinner'
import Page500 from 'src/components/shared/page500'
import { graphql, compose } from "react-apollo"
import { set, lensProp } from 'ramda'

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
  mutation updateMe($input: MeUpdateInput!) {
    updateMe(input: $input) {
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

interface P {
  meQuery: {
    me: {
      full_name: string
      email: string
      login: string
      password: string
      role: string
      phone: string
      territory: string
    }
    loading: any
    error: any
  }

  updateMeQuery: any
}

interface S {
  me: {
    full_name: string
    email: string
    login: string
    password: string
    role: string
    phone: string
    territory: string
  }
}

class Profile extends React.Component<P, S> {
  public state: S = {
    me: {
      full_name: "",
      email: "",
      login: "",
      password: "",
      role: "",
      phone: "",
      territory: "",
    },
  }

  componentWillReceiveProps(props: P) {
    this.setState({ me: props.meQuery.me })
  }

  handleSetState = (e) => {
    const { name, value } = e.target
    this.setState({
      me: set(lensProp(name), value, this.state.me)
    })
  }

  updateUser = async () => {
    const { me } = this.state

    const options = {
      variables: {
        input: {
          full_name: me.full_name,
          email: me.email,
          login: me.login,
          role: me.role,
          phone: me.phone,
          territory: me.territory,
        }
      }
    }

    try {
      let res = await this.props.updateMeQuery(options)

      console.log(res.data.updateMe)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    let { loading, error } = this.props.meQuery
    let { me } = this.state

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
                    <label className="col-md-3 form-control-label">Full name</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="full_name"
                        placeholder="full_name"
                        value={me.full_name || ""}
                        onChange={this.handleSetState}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label">Login</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="login"
                        placeholder="login"
                        value={me.login || ""}
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
                    <label className="col-md-3 form-control-label">Phone</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        placeholder="phone"
                        value={me.phone || ""}
                        onChange={this.handleSetState}
                      />
                    </div>
                  </div>

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
