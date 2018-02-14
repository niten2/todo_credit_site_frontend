import * as React from "react"

import AuthProvider from 'src/config/auth_provider'
import ListLoans from 'src/components/clients/loans/list'
import NewLoan from 'src/components/clients/loans/new'

class IndexLoan extends React.Component<{}, {}> {

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
