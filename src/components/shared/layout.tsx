import * as React from 'react'
import { Route } from 'react-router-dom'

import Header from 'src/components/shared/header'
import Sidebar from 'src/components/shared/sidebar'

class Layout extends React.Component<any, any> {
  render() {
    return (
      <div className="app">
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

export default ({component: Component, ...rest}) => {
  return (
    <Layout>
      <Route {...rest} render={(matchProps) => (<Component {...matchProps} />)} />
    </Layout>
  )
}
