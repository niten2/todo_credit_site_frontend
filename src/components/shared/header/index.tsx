import * as React from 'react'
// import AuthUser from "./auth_user"

class Header extends React.Component<any, any> {

  state = {
    dropdownOpen: false
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  sidebarToggle = (e) => {
    e.preventDefault()
    document.body.classList.toggle('sidebar-hidden')
  }

  mobileSidebarToggle = (e) => {
    e.preventDefault()
    document.body.classList.toggle('sidebar-mobile-show')
  }

  asideToggle = (e) => {
    e.preventDefault()
    document.body.classList.toggle('aside-menu-hidden')
  }

  render() {
    return (
      <header className="app-header navbar">
        <button
          className="navbar-toggler mobile-sidebar-toggler d-lg-none"
          type="button"
          onClick={this.mobileSidebarToggle}
        >
          &#9776;
        </button>

        <a className="navbar-brand">Credit Site</a>

        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <button className="nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarToggle}>
              &#9776;
            </button>
          </li>
        </ul>

        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            User name &nbsp;
          </li>

          <li className="nav-item">
            User role &nbsp;
          </li>

          <li className="nav-item">
            Logout &nbsp;
          </li>

        </ul>

      </header>
    )
  }
}

export default Header
