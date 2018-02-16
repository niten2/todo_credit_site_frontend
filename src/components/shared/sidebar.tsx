import * as React from 'react'
import { NavLink } from 'react-router-dom'
import AuthProvider from "src/config/auth_provider"

const LinkUser = () => {
  if (AuthProvider.isAdmin()) {
    return (
      <li className="nav-item">
        <NavLink
          to={'/users'}
          className="nav-link"
          activeClassName="active"
        >
          <i className="icon-diamond" /> Users
        </NavLink>
      </li>
    )
  } else {
    return <div />
  }
}

class Sidebar extends React.Component<any, any> {
  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">

            <li className="nav-item">
              <NavLink
                to={'/dashboard'}
                className="nav-link"
                activeClassName="active"
              >
                <i className="icon-speedometer" />
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={'/profile'}
                className="nav-link"
                activeClassName="active"
              >
                <i className="icon-diamond" /> Profile
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={'/clients'}
                className="nav-link"
                activeClassName="active"
              >
                <i className="icon-diamond" /> Clients
              </NavLink>
            </li>

            <LinkUser />
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar
