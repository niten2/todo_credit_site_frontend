import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { client } from 'src/config/apollo_client'

import Layout from 'src/components/shared/layout'
import Page404 from 'src/components/shared/page404'
import Dashboard from 'src/components/dashboard'

import Login from 'src/components/auth/login'
import User from 'src/components/users'
import Client from 'src/components/clients'
import Profile from 'src/components/profile'

export default () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Layout exact={true} path="/login" component={Login}/>

          <Layout exact={true} path="/users" component={User}/>
          <Layout exact={true} path="/clients" component={Client}/>
          <Layout exact={true} path="/profile" component={Profile}/>

          <Layout path="/" name="Dashboard" component={Dashboard}/>
          <Layout path="/dashboard" name="Dashboard" component={Dashboard}/>

          <Layout path="*" component={Page404}/>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}
