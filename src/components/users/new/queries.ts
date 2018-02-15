import gql from "graphql-tag"
import { compose, graphql } from "react-apollo"

const createUserQuery = gql`
  mutation createUser($input: UserCreateInput!) {
    createUser(input: $input) {
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

const territoriesQuery = gql`
  query {
    territories {
      id

      name
      rate
    }
  }
`

export const withData = compose (
  graphql<any, any, any>(
    createUserQuery, {
      name: "createUserQuery"
    }
  ),
  graphql<any, any, any>(
    territoriesQuery, {
      name: "territoriesQuery" ,
    }
  ),
  graphql<any, any, any>(
    usersQuery, {
      name: "usersQuery" ,
      skip: true,
    }
  ),
)
