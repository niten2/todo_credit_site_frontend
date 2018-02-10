import * as React from 'react'
import gql from "graphql-tag"
import { compose, graphql } from 'react-apollo'

import AuthProvider from 'src/config/auth_provider'
import Spinner from 'src/components/shared/spinner'
import Page500 from 'src/components/shared/page500'
import ViewLoan from "src/components/clients/loans/view"

const loansQuery = gql`
  query loans($input: LoansInput) {
    loans(input: $input) {
      id
      sum
      date_start
      date_end
      total
    }
  }
`

const clientQuery = gql`
  query client($id: ID!) {
    client(id: $id) {
      id
      full_name
    }
  }
`

class ListLoan extends React.Component<any, any> {

  render() {
    let { loans, loading, error } = this.props.loansQuery

    let loadingClient = this.props.clientQuery.loading
    let errorClient = this.props.clientQuery.error
    let client = this.props.clientQuery.client

    if (loading || loadingClient) {
      return <Spinner />
    }

    if (error || errorClient) {
      return <Page500 />
    }

    return (
      <div className="card">

        <div className="card-header">
          <i className="fa fa-align-justify" /> Loans, client full name = {client.full_name}
        </div>

        <div className="card-block">
          <form className="form-2orizontal">

            <div className="card-block">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th className="text-center">Sum</th>
                    <th className="text-center">Total</th>
                    <th className="text-center">Date end</th>
                    {AuthProvider.isAdmin() ? <th className="text-center">Edit</th> : null}
                  </tr>
                </thead>

                <tbody>
                  {
                    loans.map((loan, index) =>
                      <ViewLoan
                        key={index}
                        loan={loan}
                        clientId={client.id}
                      />
                    )
                  }
                </tbody>
              </table>
            </div>

          </form>
        </div>

      </div>
    )
  }

}

export default compose (
  graphql<any, any, any>(
    loansQuery, {
      name: "loansQuery" ,
      options: (props) => ({
        variables: {
          input: {
            client: props.match.params.id
          }
        }
      })
    },
  ),
  graphql<any, any, any>(
    clientQuery, {
      name: "clientQuery" ,
      options: (props) => ({
        variables: {
          id: props.match.params.id
        }
      })
    },
  ),
)(ListLoan)
