import * as React from 'react'
import { Link } from 'react-router-dom'

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

  render() {
    let { object } = this.props
    let { attributes } = this.state

    return (
      <tr>
        {attributes.map((attribute, index) => {
          return (
            <td key={index}>
              <Link
                to={`users/${object.id}`}
              >
                {object[attribute]}
              </Link>
            </td>
          )
        }
        )}
      </tr>
    )
  }

}

export default UserView
