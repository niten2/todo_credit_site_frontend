import * as React from "react"

import ListLoans from 'src/components/clients/loans/list'
import NewLoan from 'src/components/clients/loans/new'

import AuthProvider from 'src/config/auth_provider'

class LoanClient extends React.Component<any, any> {

  render() {
    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">

            <ListLoans {...this.props} />
            {!AuthProvider.isAdmin() ? <NewLoan {...this.props} /> : null}

          </div>
        </div>
      </div>
    )
  }

}

export default LoanClient
