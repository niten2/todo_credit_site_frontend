import gql from "graphql-tag"
import { compose, graphql } from 'react-apollo'

// const clientQuery = gql`
//   query client($id: ID!) {
//     client(id: $id) {
//       id

//       territory {
//         name
//         rate
//       }
//     }
//   }
// `

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

const createLoanQuery = gql`
  mutation createLoan($input: LoanCreateInput!) {
    createLoan(input: $input) {
      id
    }
  }
`

const calculateLoanQuery = gql`
  mutation calculateLoan($input: LoanCalculateInput!) {
    calculateLoan(input: $input) {
      total
    }
  }
`

export const withData = compose(
  // graphql<any, any, any>(
  //   clientQuery, {
  //     name: "clientQuery" ,
  //     options: (props) => ({
  //       variables: {
  //         id: props.match.params.id
  //       },
  //       fetchPolicy: "network-only",
  //     })
  //   },
  // ),

  // graphql<any, any, any>(
  //   loansQuery, {
  //     name: "loansQuery" ,
  //     options: (props) => ({
  //       variables: {
  //         input: {
  //           client: props.client.id,
  //         }
  //       },
  //       skip: true,
  //     })
  //   },
  // ),

  graphql<any, any, any>(
    createLoanQuery, {
      name: "createLoanQuery",
      options: (props) => ({
        refetchQueries: [{
          query: loansQuery,
          variables: {
            input: {
              client: props.client.id,
            }
          },
        }],
      }),
    }
  ),

  graphql<any, any, any>(
    calculateLoanQuery, {
      name: "calculateLoanQuery"

    }
  ),


  // graphql<any, any, any>(
  //   loansQuery, {
  //     name: "loansQuery",
  //     skip: true,
  //   }
  // ),
)
