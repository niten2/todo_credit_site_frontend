import * as React from "react"

import ListLoans from 'src/components/clients/loans/list'
import NewLoan from 'src/components/clients/loans/new'

class LoanClient extends React.Component<any, any> {

  render() {
    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">

            <ListLoans {...this.props} />
            <NewLoan />

          </div>
        </div>
      </div>
    )
  }

}

export default LoanClient
