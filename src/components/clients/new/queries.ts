import gql from "graphql-tag"
import { graphql } from "react-apollo"

const createClientQuery = gql`
  mutation createClient($input: ClientCreateInput!) {
    createClient(input: $input) {
      id

      full_name
      email
      passport
      phone
    }
  }
`

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

export const withData = graphql<any, any, any>(
  createClientQuery, {
    name: "createClientQuery"
  }
)
