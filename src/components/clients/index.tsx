import * as React from 'react'
import ListClient from './list'
import { Link } from 'react-router-dom'
import AuthProvider from "src/config/auth_provider"

const NewClientLink = () => {
  if (!AuthProvider.isAdmin()) {
    return (
      <div className="card">
        <div className="card-block">
          <Link to={`/clients/new`}>
            <button type="button" className="btn btn-primary">
              New Client
            </button>
          </Link>
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

class ClientIndex extends React.Component<any, any> {
  render() {
    return (
      <div className="animated fadeIn">
        <NewClientLink />

        <ListClient />
      </div>
    )
  }
}

export default ClientIndex
