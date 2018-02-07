import * as React from 'react'
import ViewLoan from "src/components/clients/loans/view"

class ListLoan extends React.Component<any, any> {

  render() {
    let { client } = this.props

    return (
      <div className="card">

        <div className="card-header">
          <i className="fa fa-align-justify" /> Client
        </div>


        <div className="card-block">
          <form className="form-2orizontal">

            <div className="form-group row">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">full_name</span>
                  {client.full_name}
                </div>
              </div>
            </div>

            <div className="card-block">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th className="text-center">Sum</th>
                    <th className="text-center">Total</th>
                    <th className="text-center">Date end</th>
                  </tr>
                </thead>
                <tbody>

                  { client.loans.map((loan, index) =>
                    <ViewLoan
                      key={index}
                      loan={loan}
                    />
                  )}

                </tbody>
              </table>
            </div>

          </form>
        </div>

      </div>
    )
  }

}

export default ListLoan
