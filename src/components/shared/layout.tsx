import * as React from 'react'
import * as NotificationSystem from 'react-notification-system'
import { Redirect, Route } from 'react-router-dom'

import UIStore from 'src/store'
import AuthProvider from "src/config/auth_provider"
import Header from 'src/components/shared/header'
import Sidebar from 'src/components/shared/sidebar'

class LayoutComponent extends React.Component<any, any> {

  notification = (ref) => {
    UIStore.notificationSystem = ref
  }

  render() {
    return (
      <div className="app">
        <NotificationSystem ref={this.notification} allowHTML={true} />
        <Header {...this.props}/>

        <div className="app-body">
          <Sidebar {...this.props}/>

          <main className="main">
            <div className="container-fluid">

              {this.props.children}

            </div>
          </main>
        </div>

      </div>
    )
  }
}

export const Layout = ({component: Component, ...rest}) => {
  return (
    <LayoutComponent>
      <Route {...rest} render={(matchProps) => (<Component {...matchProps} />)} />
    </LayoutComponent>
  )
}

export const PrivateLayout = ({component: Component, ...rest}) => {
  if (AuthProvider.hasLogin()) {
    return (
      <LayoutComponent>
        <Route {...rest} render={(matchProps) => (<Component {...matchProps} />)} />
      </LayoutComponent>
    )
  } else {
    return <Redirect to='/login' />
  }
}

export const PrivateLayoutAdmin = ({component: Component, ...rest}) => {
  if (AuthProvider.hasLogin() && AuthProvider.isAdmin()) {
    return (
      <LayoutComponent>
        <Route {...rest} render={(matchProps) => (<Component {...matchProps} />)} />
      </LayoutComponent>
    )
  } else {
    return <Redirect to='/dashboard' />
  }
}

export const PrivateLayoutManager = ({component: Component, ...rest}) => {
  if (AuthProvider.hasLogin() && !AuthProvider.isAdmin()) {
    return (
      <LayoutComponent>
        <Route {...rest} render={(matchProps) => (<Component {...matchProps} />)} />
      </LayoutComponent>
    )
  } else {
    return <Redirect to='/dashboard' />
  }
}
