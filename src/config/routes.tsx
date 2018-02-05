import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { client } from 'src/config/apollo_client'

import { PrivateLayout, PrivateLayoutAdmin } from 'src/components/shared/layout'
import Page404 from 'src/components/shared/page404'
import Dashboard from 'src/components/dashboard'

import Login from 'src/components/auth/login'
import Profile from 'src/components/profile'

import User from 'src/components/users'
import NewUser from 'src/components/users/new'
import ShowUser from 'src/components/users/show'

import Client from 'src/components/clients'
import NewClient from 'src/components/clients/new'
import ShowClient from 'src/components/clients/show'

export default () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact={true} path="/login" component={Login}/>
          <PrivateLayout exact={true} path="/profile" component={Profile}/>

          <PrivateLayoutAdmin exact={true} path="/users" component={User}/>
          <PrivateLayoutAdmin exact={true} path="/users/new" component={NewUser}/>
          <PrivateLayoutAdmin exact={true} path="/users/:id" component={ShowUser}/>

          <PrivateLayout exact={true} path="/clients" component={Client}/>
          <PrivateLayout exact={true} path="/clients/new" component={NewClient}/>
          <PrivateLayout exact={true} path="/clients/:id" component={ShowClient}/>

          <PrivateLayout exact={true} path="/" name="Dashboard" component={Dashboard} />
          <PrivateLayout exact={true} path="/dashboard" name="Dashboard" component={Dashboard}/>

          <Route path="*" component={Page404}/>
        </Switch>
      </Router>
    </ApolloProvider>
  )
}
