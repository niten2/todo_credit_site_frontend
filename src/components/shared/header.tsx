import * as React from 'react'
import gql from "graphql-tag"
import { withApollo, graphql } from "react-apollo"
import Spinner from 'src/components/shared/spinner'
import { withRouter } from 'react-router'
import AuthProvider from "src/config/auth_provider"

const meQuery = gql`
  query {
    me {
      login
      role
    }
  }
`

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

  handleLogout = () => {
    AuthProvider.removeToken()

    this.props.client.resetStore()
    this.props.history.push('/login')

    console.log("logout")
  }

  render() {
    let { me, loading } = this.props.meQuery

    if (loading ) {
      return <Spinner />
    }

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
            {me && me.login} &nbsp;
          </li>

          <li className="nav-item">
            {me && me.role} &nbsp;
          </li>

          <li onClick={this.handleLogout} className="nav-item pointer">
            Logout &nbsp;&nbsp;
          </li>

        </ul>

      </header>
    )
  }
}

export default withRouter(
  withApollo(
    graphql<any, any, any>(
      meQuery, {name: "meQuery"}
    )(Header)
  )
)
