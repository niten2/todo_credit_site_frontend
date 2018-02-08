import * as React from 'react'
import AuthProvider from 'src/config/auth_provider'
import { Link } from 'react-router-dom'

const EditLoanLink = (props) => {
  if (AuthProvider.isAdmin()) {
    return (
      <div className="card">
        <div className="card-block">
          <Link to={`/clients/${props.loanId}/lend/edit`}>
            <button type="button" className="btn btn-primary">
              edit
            </button>
          </Link>
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

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
        <EditLoanLink loanId={loan.id}/>
      </tr>
    )
  }

}

export default ViewLoan
