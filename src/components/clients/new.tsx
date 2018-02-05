import * as React from "react"
import gql from "graphql-tag"
import { graphql } from "react-apollo"
import { Link } from 'react-router-dom'
import { Input } from 'reactstrap'
import { set, lensProp } from 'ramda'

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

  changeSelect = (value) => {
    let setClient = set(lensProp("role"), value.value)
    this.setState({ client: setClient(this.state.client) })
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
      let res = await this.props.createClientQuery(options)

      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  handleOnKeyPress = (target: any) => {
    if (target.charCode === 13) {
      this.handleCreate()
    }
  }

  render() {
    return (
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
    )
  }

}

export default graphql<any, any, any>(
  createClientQuery, { name: "createClientQuery" }
)(NewClient)
