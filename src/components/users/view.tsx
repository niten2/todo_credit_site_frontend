import * as React from 'react'
// import gql from "graphql-tag"

// const deleteUserQuery = gql`
//   mutation deleteUser($input: IdInput!) {
//     deleteUser(input: $input) {
//       id
//     }
//   }
// `

class UserView extends React.Component<any, any> {

  state = {
    object: {},
    attributes: [
      "id",
      "email",
      "login",
      "role",
    ]
  }

  // handleDestroy = async () => {
  //   const { dispatch, refetch, object, deleteClientQuery } = this.props

  //   try {
  //     await deleteClientQuery({
  //       variables: {
  //         input: {
  //           id: object.id
  //         }
  //       },
  //     })
  //     refetch()
  //     dispatch(Notification.success("update"))
  //   } catch (err) {
  //     dispatch(Notification.error(err.message))
  //   }
  // }

  render() {
    let { object } = this.props
    let { attributes } = this.state

    return (
      <tr>
        {attributes.map((attribute, index) =>
          <td key={index}>{object[attribute]}</td>
        )}
      </tr>
    )
  }

}

export default UserView
// export default graphql<any, any, any>(
//   deleteClientQuery, {name: "deleteClientQuery"}
// )(ClientView)
