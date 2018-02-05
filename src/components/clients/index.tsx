import * as React from 'react'
import ListClient from './list'
import { Link } from 'react-router-dom'

class Clients extends React.Component<any, any> {

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-block">
            <Link to={`/clients/new`}>
              <button type="button" className="btn btn-primary">
                New Client
              </button>
            </Link>
          </div>
        </div>

        <ListClient />
      </div>
    )
  }
}

export default Clients
