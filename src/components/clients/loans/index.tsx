import * as React from "react"

import AuthProvider from 'src/config/auth_provider'
import NewLoan from 'src/components/clients/loans/new'
import ListLoans from 'src/components/clients/loans/list'

class IndexLoan extends React.Component<any, any> {

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

export default IndexLoan
