import * as React from 'react'
import gql from "graphql-tag"
import { compose, graphql } from 'react-apollo'

import AuthProvider from 'src/config/auth_provider'
import Spinner from 'src/components/shared/spinner'
import Page500 from 'src/components/shared/page500'

import ViewLoan from "src/components/clients/loans/list/view"
import { ClientInfo } from "src/components/clients/loans/list/components"

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

const withData = compose(
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
)

class ListLoan extends React.Component<any, any> {

  render() {
    let loansResponse = this.props.loansQuery
    let clientResponse = this.props.clientQuery

    if (loansResponse.loading || clientResponse.loading) {
      return <Spinner />
    }

    if (loansResponse.error || clientResponse.error) {
      return <Page500 />
    }

    const loans = loansResponse.loans
    const client = clientResponse.client

    return (
      <div className="container-fluid">
        <ClientInfo client={client}/>

        <div className="card">
          <div className="card-header">
            <i className="fa fa-align-justify" />
            List Loans
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
      </div>
    )
  }

}

export default withData(ListLoan)
