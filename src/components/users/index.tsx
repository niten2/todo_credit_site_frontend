import * as React from 'react'
import UserList from './list'

class Users extends React.Component<any, any> {

  render() {
    return (
      <div className="animated fadeIn">
        <UserList />
      </div>
    )
  }
}

export default Users
