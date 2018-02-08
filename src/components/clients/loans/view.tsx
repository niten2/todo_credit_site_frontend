import * as React from 'react'
import * as moment from "moment"

import AuthProvider from 'src/config/auth_provider'
import { Link } from 'react-router-dom'

const EditLoanLink = (props) => (
  <td>
    <div className="card">
      <div className="card-block">
        <Link to={`/clients/${props.clientId}/loans/${props.loan.id}`}>
          <button type="button" className="btn btn-primary">
            edit
          </button>
        </Link>
      </div>
    </div>
  </td>
)

class ViewLoan extends React.Component<any, any> {

  state = {
    attributes: [
      "sum",
      "total",
      "date_end",
    ]
  }

  formatDate = (date: string) => {
    return moment(new Date(date)).format("MM/DD/YYYY")
  }

  render() {
    let { loan, clientId } = this.props
    let { attributes } = this.state

    return (
      <tr>
        {
          attributes.map((attribute, index) => {
            if (attribute === "date_end") {
              return (
                <td key={index}>
                  {this.formatDate(loan[attribute])}
                </td>
              )
            }

            return (
              <td key={index}>
                {loan[attribute]}
              </td>
            )
          })
        }

        {AuthProvider.isAdmin() ? <EditLoanLink loan={loan} clientId={clientId} /> : null}

      </tr>
    )
  }

}

export default ViewLoan
