import * as React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
import Notification from 'src/config/notification'

const createClientQuery = gql`
  mutation createClient($input: ClientCreateInput!) {
    createClient(input: $input) {
      id

      full_name
      email
      passport
      phone
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

class NewClient extends React.Component<any, any> {

  state = {
    client: {
      full_name: "",
      email: "",
      passport: "",
      phone: "",
    },
    roles: [
      {value: "manager"},
      {value: "admin"}
    ]
  }

  handleSetState = (e) => {
    const { name, value } = e.target
    let { client } = this.state

    client[name] = value
    this.setState({ client })
  }

  handleCreate = async (e?: any) => {
    if (e) { e.preventDefault() }
    const { client } = this.state

    const options = {
      variables: {
        input: {
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
      await this.props.createClientQuery(options)
      Notification.success("update client")

      this.setState({
        client: {
          full_name: "",
          email: "",
          passport: "",
          phone: "",
        }
      })
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
    return (
      <div className="container-fluid">
        <div className="animated fadeIn">

          <div className="row">
            <div className="col-lg-12">

              <div className="card">

                <div className="card-header">
                  <i className="fa fa-align-justify" /> New Client
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
                          />
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
      </div>
    )
  }

}

export default graphql<any, any, any>(
  createClientQuery, {
    name: "createClientQuery"
  }
)(NewClient)
