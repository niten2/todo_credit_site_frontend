import * as React from 'react'
import gql from "graphql-tag"
import { graphql } from 'react-apollo'

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

class ListLoan extends React.Component<any, any> {

  render() {
    let { loans, loading, error } = this.props.loansQuery

    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <Page500 />
    }

    return (
      <div className="card">

        <div className="card-header">
          <i className="fa fa-align-justify" /> Loans
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
                        clientId={this.props.match.params.id}
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

export default graphql<any, any, any>(
  loansQuery, {
    name: "loansQuery" ,
    options: (props) => ({
      variables: {
        input: {
          client: props.match.params.id
        }
      }
    })
  }
)(ListLoan)
