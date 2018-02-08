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

const updateClientQuery = gql`
  mutation updateClient($input: ClientUpdateInput!) {
    updateClient(input: $input) {
      id
      full_name
      email
      passport
      phone
    }
  }
`

const deleteClientQuery = gql`
  mutation deleteClient($input: IdInput!) {
    deleteClient(input: $input) {
      id
    }
  }
`

const clientsQuery = gql`
  query {
    clients {
      id

      full_name
      email
      passport
      phone
    }
  }
`

class ShowClient extends React.Component<any, any> {

  state = {
    client: {
      id: "",
      full_name: "",
      email: "",
      passport: "",
      phone: "",
      total_sum_loans: null,
    },
    roles: [
      {value: "manager"},
      {value: "admin"}
    ]
  }

  componentWillReceiveProps(props: any) {
    this.setState({ client: props.clientQuery.client })
  }

  handleSetState = (e) => {
    const { name, value } = e.target
    this.setState({
      client: set(lensProp(name), value, this.state.client)
    })
  }

  handleUpdate = async (e?: any) => {
    if (e) { e.preventDefault() }

    const { client } = this.state

    const options = {
      variables: {
        input: {
          id: client.id,
          full_name: client.full_name,
          email: client.email,
          passport: client.passport,
          phone: client.phone,
        }
      },
      refetchQueries: [{
        query: clientsQuery,
      }],
    }

    try {
      await this.props.updateClientQuery(options)

      Notification.success("update client")
    } catch (err) {
      Notification.error(err.message)
    }
  }

  handleDelete = async (e?: any) => {
    if (e) { e.preventDefault() }

    const { client } = this.state

    const options = {
      variables: {
        input: {
          id: client.id
        }
      },
      refetchQueries: [{
        query: clientsQuery,
      }],
    }

    try {
      await this.props.deleteClientQuery(options)
      this.props.history.push("/clients")
    } catch (err) {
      console.log(err)
    }
  }

  changeSelect = (value) => {
    let setClient = set(lensProp("role"), value.value)
    this.setState({ client: setClient(this.state.client) })
  }

  handleOnKeyPress = (target: any) => {
    if (target.charCode === 13) {
      this.handleUpdate()
    }
  }

  render() {
    let { loading, error } = this.props.clientQuery
    let { client } = this.state

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
                        <Input
                          name="full_name"
                          placeholder="full_name"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                          value={client.full_name}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">email</span>
                        <Input
                          name="email"
                          placeholder="email"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                          value={client.email}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">passport</span>
                        <Input
                          name="passport"
                          placeholder="passport"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                          value={client.passport}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">phone</span>
                        <Input
                          name="phone"
                          placeholder="phone"
                          onChange={this.handleSetState}
                          onKeyPress={this.handleOnKeyPress}
                          value={client.phone}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <div className="input-group">
                        <span className="input-group-addon">total_sum_loans</span>
                        {client.total_sum_loans}
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      className="btn btn-primary"
                      onClick={this.handleUpdate}
                    >
                      Save changes
                    </button>

                    {" "}

                    <button
                      className="btn btn-primary"
                      onClick={this.handleDelete}
                    >
                      Delete
                    </button>

                    {" "}

                    <Link to={`/clients/${client.id}/loans`}>
                      <button
                        className="btn btn-default"
                      >
                        loans
                      </button>
                    </Link>

                    {" "}

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
    updateClientQuery, {
      name: "updateClientQuery"
    }
  ),
  graphql<any, any, any>(
    deleteClientQuery, {
      name: "deleteClientQuery"
    }
  ),
)(ShowClient)
