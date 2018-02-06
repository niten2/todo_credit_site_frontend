import * as React from 'react'

class ViewLoan extends React.Component<any, any> {

  state = {
    attributes: [
      "sum",
      "date_end",
    ]
  }

  render() {
    let { object } = this.props
    let { attributes } = this.state

    return (
      <tr>
        {
          attributes.map((attribute, index) => {
            return (
              <td key={index}>
                {object[attribute]}
              </td>
            )
          })
        }
      </tr>
    )
  }

}

export default ViewLoan
