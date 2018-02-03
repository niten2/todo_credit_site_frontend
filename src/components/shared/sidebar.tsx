import * as React from 'react'
import { NavLink } from 'react-router-dom'

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
                Dashboard <span className="badge badge-info">NEW</span>
              </NavLink>
            </li>

            <li className="nav-title">
              Services
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

            <li className="nav-item">
              <NavLink
                to={'/users'}
                className="nav-link"
                activeClassName="active"
              >
                <i className="icon-diamond" /> Users
              </NavLink>
            </li>

          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar
