import * as React from 'react'
import { Link } from 'react-router-dom'

class ViewClient extends React.Component<any, any> {

  state = {
    object: {},
    attributes: [
      "full_name",
      "email",
      "passport",
      "phone",
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
                to={`clients/${object.id}`}
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

export default ViewClient