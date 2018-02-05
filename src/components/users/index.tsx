import * as React from 'react'
import UserList from './list'
import { Link } from 'react-router-dom'

class Users extends React.Component<any, any> {

  render() {
    return (
      <div className="animated fadeIn">

        <div className="card">
          <div className="card-block">
            <Link to={`/users/new`}>
              <button type="button" className="btn btn-primary">
                New User
              </button>
            </Link>
          </div>
        </div>


        <UserList />
      </div>
    )
  }
}

export default Users
