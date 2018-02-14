import gql from "graphql-tag"
import { compose, graphql } from 'react-apollo'

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

export const withData = compose(
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
