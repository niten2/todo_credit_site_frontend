import { compose, graphql } from 'react-apollo'
import gql from "graphql-tag"

const clientQuery = gql`
  query client($id: ID!) {
    client(id: $id) {
      id

      full_name
      email
      passport
      phone
      user
      mark_as_deleted
      total_sum_loans

      territory {
        id

        name
        rate
      }

      loans {
        id

        date_start
        date_end
      }
    }
  }
`

const updateClientQuery = gql`
  mutation updateClient($input: ClientUpdateInput!) {
    updateClient(input: $input) {
      id
      full_name
      email
      passport
      phone
    }
  }
`

const deleteClientQuery = gql`
  mutation deleteClient($input: IdInput!) {
    deleteClient(input: $input) {
      id
    }
  }
`

const territoriesQuery = gql`
  query {
    territories {
      id

      name
      rate
    }
  }
`

export const withData = compose(
  graphql<any, any, any>(
    clientQuery, {
      name: "clientQuery" ,
      options: (props) => ({
        variables: {
          id: props.match.params.id
        }
      })
    }
  ),
  graphql<any, any, any>(
    updateClientQuery, {
      name: "updateClientQuery",
    }
  ),
  graphql<any, any, any>(
    deleteClientQuery, {
      name: "deleteClientQuery",
    }
  ),
  graphql<any, any, any>(
    territoriesQuery, {
      name: "territoriesQuery" ,
    }
  ),
)
