import * as React from 'react'
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import UserView from './view'
import Spinner from 'src/components/shared/spinner'
import Page500 from 'src/components/shared/page500'

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

interface P {
  usersQuery: {
    users: [object]
    loading: any
    error: any
  }
}

interface S {
}

class UserList extends React.Component<P, S> {

  render() {
    let { users, loading, error } = this.props.usersQuery

    if (loading ) {
      return <Spinner />
    }

    if (error) {
      return <Page500 />
    }

    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">
            <div className="card">

              <div className="card-header">
                <i className="fa fa-align-justify" /> Users
              </div>

              <div className="card-block">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th className="text-center">Id</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Login</th>
                      <th className="text-center">Role</th>
                    </tr>
                  </thead>
                  <tbody>

                    { users.map((object, index) =>
                      <UserView
                        key={index}
                        object={object}
                      />
                    )}

                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default graphql<any, any, any>(
	usersQuery, {name: "usersQuery"}
)(UserList)
