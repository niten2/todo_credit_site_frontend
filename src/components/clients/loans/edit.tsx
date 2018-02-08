import * as React from 'react'
import { set, lensProp } from 'ramda'
import { Link } from 'react-router-dom'

class EditLendClient extends React.Component<any, any> {

  state = {
    loan: {

    }
  }

  handleSetState = async (e) => {
    const { name, value } = e.target

    let loan = set(lensProp(name), value, this.state.loan)

    this.setState({ loan })
  }

  handleUpdate = async (e?: any) => {
    if (e) { e.preventDefault() }

    // const { client } = this.state

    // const options = {
    //   variables: {
    //     input: {
    //       id: client.id,
    //       full_name: client.full_name,
    //       email: client.email,
    //       passport: client.passport,
    //       phone: client.phone,
    //     }
    //   },
    //   refetchQueries: [{
    //     query: clientsQuery,
    //   }],
    // }

    // try {
    //   await this.props.updateClientQuery(options)

    //   Notification.success("update client")
    // } catch (err) {
    //   Notification.error(err.message)
    // }
  }

  render() {
    // let { client } = this.props

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

export default EditLendClient
