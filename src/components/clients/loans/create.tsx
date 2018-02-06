import * as React from "react"
import * as moment from "moment"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import gql from "graphql-tag"
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
import { set, lensProp } from 'ramda'

import Notification from 'src/config/notification'
import authProvider from 'src/config/auth_provider'

const clientQuery = gql`
  query client($id: ID!) {
    client(id: $id) {
      id

      full_name
      email
      passport
      phone
      territory
      user
      mark_as_deleted
      total_sum_loans

      loans {
        id

        sum
        date_start
        date_end
      }
    }
  }
`

const createLoanQuery = gql`
  mutation createLoan($input: LoanCreateInput!) {
    createLoan(input: $input) {
      id
      sum
      date_start
      date_end
      client
    }
  }
`

class LendClient extends React.Component<any, any> {

  state = {
    loan: {
      sum: "",
      date_start: moment(),
      date_end: moment().add(30, "days"),
      client: "",
    },
  }

  handleSetState = (e) => {
    const { name, value } = e.target
    this.setState({
      loan: set(lensProp(name), value, this.state.loan)
    })
  }

  handleCreate = async (e?: any) => {
    if (e) { e.preventDefault() }

    const { loan } = this.state

    const options = {
      variables: {
        input: {
          sum: loan.sum,
          date_start: loan.date_start,
          date_end: loan.date_end,
          client: this.props.client.id,
        }
      },
      refetchQueries: [{
        query: clientQuery,
        variables: {
          id: this.props.client.id
        },
      }],
    }

    try {
      await this.props.createLoanQuery(options)

      Notification.success("create loan")
    } catch (err) {
      Notification.error(err.message)
    }
  }

  handleOnKeyPress = (target: any) => {
    if (target.charCode === 13) {
      this.handleCreate()
    }
  }

  handleDatePickerDateStart = (value: any): void => {
    this.setState({
      loan: set(lensProp("date_start"), value, this.state.loan)
    })
  }

  handleDatePickerDateEnd = (value: any): void => {
    this.setState({
      loan: set(lensProp("date_end"), value, this.state.loan)
    })
  }

  render() {
    // let { client } = this.props
    let { loan } = this.state

    if (authProvider.isAdmin()) {
      return <div />
    }

    return (
      <div className="card">

        <div className="card-header">
          <i className="fa fa-align-justify" /> Create Loan
        </div>

        <div className="card-block">
          <form className="form-2orizontal">

            <div className="form-group row">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">sum</span>
                  <Input
                    name="sum"
                    placeholder="sum"
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
                  <span className="input-group-addon">date_start</span>
                  <DatePicker
                    selected={loan.date_start}
                    onChange={this.handleDatePickerDateStart}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">territory</span>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">date end</span>
                  <DatePicker
                    selected={loan.date_end}
                    onChange={this.handleDatePickerDateEnd}
                  />
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">summary</span>
                  summary (calculate value)
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

export default compose(
  graphql<any, any, any>(
    createLoanQuery, {
      name: "createLoanQuery"
    }
  ),
)(LendClient)
