import * as React from "react"
import gql from "graphql-tag"
import { compose, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
import { set, lensProp } from 'ramda'

import Notification from 'src/config/notification'
import Spinner from 'src/components/shared/spinner'
import Page500 from 'src/components/shared/page500'

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
      date_start: "",
      date_end: "",
      client: "",
    },
    // client: {
    //   id: "",
    //   full_name: "",
    //   email: "",
    //   passport: "",
    //   phone: "",
    // },
    // roles: [
    //   {value: "manager"},
    //   {value: "admin"}
    // ]
  }

  // componentWillReceiveProps(props: any) {
  //   this.setState({ client: props.clientQuery.client })
  // }

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
          client: loan.client,
        }
      },
      refetchQueries: [{
        query: clientQuery,
      }],
    }

    try {
      let z = await this.props.createLoanQuery(options)
      console.log(z)

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

  render() {
    let { client, loading, error } = this.props.clientQuery
    let { loan } = this.state

    console.log(client)

    if (loading) {
      return <Spinner />
    }

    if (error || !client) {
      return <Page500 />
    }

    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">

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

                  LIST loans

                </form>
              </div>

            </div>


            <div className="card">

              <div className="card-header">
                <i className="fa fa-align-justify" /> Lend
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
                        <Input
                          name="date_start"
                          placeholder="date_start"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                          value={loan.date_start}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">territory</span>
                        territory koeff
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">date end</span>
                        <Input
                          name="date_end"
                          placeholder="date_end"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                          value={loan.date_end}
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


          </div>
        </div>
      </div>
    )
  }

}

export default compose(
  graphql<any, any, any>(
    clientQuery, {
      name: "clientQuery" ,
      options: (props) => ({
        variables: {id: props.match.params.id}
      })
    }
  ),
  graphql<any, any, any>(
    createLoanQuery, {
      name: "createLoanQuery"
    }
  ),
)(LendClient)
