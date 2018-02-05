import * as React from 'react'
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import ViewClient from './view'
import Spinner from 'src/components/shared/spinner'
import Page500 from 'src/components/shared/page500'

const clientsQuery = gql`
  query {
    clients {
      id

      full_name
      email
      passport
      phone
    }
  }
`

class ListClient extends React.Component<any, any> {

  render() {
    let { clients, loading, error } = this.props.clientsQuery

    if (loading ) {
      return <Spinner />
    }

    if (error) {
      return <Page500 />
    }

    console.log(clients)

    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">
            <div className="card">

              <div className="card-header">
                <i className="fa fa-align-justify" /> Clients
              </div>

              <div className="card-block">
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th className="text-center">Id</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Passport</th>
                      <th className="text-center">Phone</th>
                    </tr>
                  </thead>
                  <tbody>

                    { clients.map((object, index) =>
                      <ViewClient
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
  clientsQuery, {name: "clientsQuery"}
)(ListClient)
