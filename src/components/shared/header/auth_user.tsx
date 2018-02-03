import * as React from 'react'
// import { connect } from 'react-redux'
// import { Link } from 'lib/nav_link'
// import { handleLogout } from 'actions/auth'
// import { Dropdown } from 'reactstrap'
// import Avatar from "./avatar.jpg"

class AuthUser extends React.Component<any, any> {

  state = {
    dropdownOpen: false
  }

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  logout = () => {
    // this.props.dispatch(handleLogout())
  }

  render() {
    // const { name } = this.props

    return (
      <li className="nav-item">
      sdfsdfsdf
      </li>
    )
  }
}

export default AuthUser
