import * as React from "react"
import * as moment from "moment"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
import { set, lensProp } from 'ramda'

import Notification from 'src/config/notification'
import Spinner from 'src/components/shared/spinner'
import Page500 from 'src/components/shared/page500'
import { withData } from 'src/components/clients/loans/new/queries'

class NewLoan extends React.Component<any, any> {

  state = {
    loan: {
      sum: "",
      date_start: moment(),
      date_end: moment().add(30, "days"),
      client: "",
      total: 0,
    },
  }

  handleSetState = async (e) => {
    const { name, value } = e.target

    let loan = set(lensProp(name), value, this.state.loan)
    let calculateLoan = await this.handleCaclulateLoan(loan)

    this.setState({ loan: calculateLoan })
  }

  handleCreate = async (e?: any) => {
    if (e) { e.preventDefault() }

    const { loan } = this.state
    let { client } = this.props.clientQuery

    const options = {
      variables: {
        input: {
          sum: loan.sum,
          date_start: loan.date_start,
          date_end: loan.date_end,
          client: client.id,
        }
      },
      refetchQueries: [{
        query: this.props.loansQuery,
        variables: {
          input: {
            client: client.id,
          }
        }
      }],
    }

    try {
      await this.props.createLoanQuery(options)

      Notification.success("create loan")

      this.setState({
        loan: {
          sum: "",
          date_start: moment(),
          date_end: moment().add(30, "days"),
          client: "",
          total: 0,
        },
      })

    } catch (err) {
      Notification.error(err.message)
    }
  }

  handleCaclulateLoan = async (loan: any) => {
    let { client } = this.props.clientQuery
    let loanRes

    if (loan.sum === 0 || loan.sum === undefined || loan.sum === "" || loan.sum === null) {
      loanRes = set(lensProp("total"), 0, loan)
      return loanRes
    }

    const options = {
      variables: {
        input: {
          sum: loan.sum,
          date_start: loan.date_start,
          date_end: loan.date_end,
          client: client.id,
        }
      }
    }

    try {
      let res = await this.props.calculateLoanQuery(options)
      const total = res.data.calculateLoan.total

      loanRes = set(lensProp("total"), total, loan)
    } catch (err) {
      Notification.error(err.message)
    }

    return loanRes
  }

  handleOnKeyPress = (target: any) => {
    if (target.charCode === 13) {
      this.handleCreate()
    }
  }

  handleDatePickerDateStart = async (value: any) => {
    let loan = set(lensProp("date_start"), value, this.state.loan)
    let calculateLoan = await this.handleCaclulateLoan(loan)

    this.setState({ loan: calculateLoan })
  }

  handleDatePickerDateEnd = async (value: any) => {
    let loan = set(lensProp("date_end"), value, this.state.loan)
    let calculateLoan = await this.handleCaclulateLoan(loan)

    this.setState({ loan: calculateLoan })
  }

  render() {
    let { client, loading, error } = this.props.clientQuery
    let { loan } = this.state

    if (loading) {
      return <Spinner />
    }

    if (error) {
      return <Page500 />
    }

    let rate = client && client.territory ? client.territory.rate : "territory not found"
    let total = loan && loan.total ? loan.total : "total not calculate"

    return (
      <div className="card">

        <div className="card-header">
          <i className="fa fa-align-justify" />
          Create Loan
        </div>

        <div className="card-block">
          <form className="form-2orizontal">

            <div className="form-group row">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">Sum</span>
                  <Input
                    name="sum"
                    placeholder="sum"
                    type="number"
                    onChange={this.handleSetState}
                    onKeyPress={this.handleOnKeyPress}
                    value={loan.sum}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">Date start</span>
                  <DatePicker
                    className="form-control width100"
                    selected={loan.date_start}
                    onChange={this.handleDatePickerDateStart}
                  />
                </div>
              </div>
            </div>


            <div className="form-group row">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">Date end</span>
                  <DatePicker
                    className="form-control width100"
                    selected={loan.date_end}
                    onChange={this.handleDatePickerDateEnd}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">Territory</span>
                  <div className="form-control">
                    {rate}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">Summary</span>
                  <div className="form-control">
                    {total}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                className="btn btn-primary"
                onClick={this.handleCreate}
              >
                Save changes
              </button>

              &nbsp;

              <Link to="/clients">
                <button
                  className="btn btn-default"
                >
                  Cancel
                </button>
              </Link>
            </div>

          </form>
        </div>

      </div>
    )
  }

}

export default withData(NewLoan)
