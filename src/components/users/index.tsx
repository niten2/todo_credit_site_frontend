import * as React from 'react'
import { Link } from 'react-router-dom'
import UserList from 'src/components/users/list'

const NewUserLink = () => (
  <div className="card">
    <div className="card-block">
      <Link to={`/users/new`}>
        <button type="button" className="btn btn-primary">
          New User
        </button>
      </Link>
    </div>
  </div>
)

class IndexUser extends React.Component<{}, {}> {
  render() {
    return (
      <div className="container-fluid">
        <div className="animated fadeIn">
          <NewUserLink />
          <UserList />
        </div>
      </div>
    )
  }
}

export default IndexUser
