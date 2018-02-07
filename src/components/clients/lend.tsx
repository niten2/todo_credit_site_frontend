import * as React from "react"
import gql from "graphql-tag"
import { graphql } from 'react-apollo'

import Spinner from 'src/components/shared/spinner'
import Page500 from 'src/components/shared/page500'

import ListLoans from 'src/components/clients/loans/list'
import CreateLoan from 'src/components/clients/loans/create'

const clientQuery = gql`
  query client($id: ID!) {
    client(id: $id) {
      id

      full_name
      email
      passport
      phone
      territory {
        name
        rate
      }
      user
      mark_as_deleted
      total_sum_loans

      loans {
        id

        sum
        total
        date_start
        date_end
      }
    }
  }
`

class LendClient extends React.Component<any, any> {

  render() {
    let { client, loading, error } = this.props.clientQuery

    if (loading) {
      return <Spinner />
    }

    if (error || !client) {
      console.log(1111, error, client)
      return <Page500 />
    }

    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">

            <ListLoans client={client} />
            <CreateLoan client={client} />

          </div>
        </div>
      </div>
    )
  }

}

export default graphql<any, any, any>(
  clientQuery, {
    name: "clientQuery" ,
    options: (props) => ({
      variables: {id: props.match.params.id}
    })
  }
)(LendClient)
