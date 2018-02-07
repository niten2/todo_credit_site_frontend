import * as React from 'react'

class ViewLoan extends React.Component<any, any> {

  state = {
    attributes: [
      "sum",
      "total",
      "date_end",
    ]
  }

  render() {
    let { loan } = this.props
    let { attributes } = this.state

    return (
      <tr>
        {
          attributes.map((attribute, index) => {
            return (
              <td key={index}>
                {loan[attribute]}
              </td>
            )
          })
        }
      </tr>
    )
  }

}

export default ViewLoan
