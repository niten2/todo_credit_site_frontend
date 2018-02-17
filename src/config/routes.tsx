import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { client } from 'src/config/apollo_client'

import { PrivateLayout, PrivateLayoutAdmin, PrivateLayoutManager } from 'src/components/shared/layout'
import Dashboard from 'src/components/dashboard'
import Page404 from 'src/components/shared/page404'

import Login from 'src/components/auth/login'
import Profile from 'src/components/profile'

import User from 'src/components/users'
import NewUser from 'src/components/users/new'
import ShowUser from 'src/components/users/show'

import Client from 'src/components/clients'
import NewClient from 'src/components/clients/new'
import ShowClient from 'src/components/clients/show'

import IndexLoansClient from 'src/components/clients/loans'
import EditLoanClient from 'src/components/clients/loans/edit'

export default () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Switch>
          <Route exact={true} path="/login" component={Login}/>
          <Route exact={true} path="/404" component={Page404}/>
          <PrivateLayout exact={true} path="/" component={Dashboard} />
          <PrivateLayout exact={true} path="/dashboard" component={Dashboard}/>

          <PrivateLayout exact={true} path="/profile" component={Profile}/>

          <PrivateLayoutAdmin exact={true} path="/users" component={User}/>
          <PrivateLayoutAdmin exact={true} path="/users/new" component={NewUser}/>
          <PrivateLayoutAdmin exact={true} path="/users/:id" component={ShowUser}/>

          <PrivateLayout exact={true} path="/clients" component={Client}/>
          <PrivateLayoutManager exact={true} path="/clients/new" component={NewClient}/>
          <PrivateLayout exact={true} path="/clients/:id" component={ShowClient}/>

          <PrivateLayout exact={true} path="/clients/:id/loans" component={IndexLoansClient}/>
          <PrivateLayoutAdmin exact={true} path="/clients/:id/loans/:loanId" component={EditLoanClient}/>

          <Redirect to="/404" />
        </Switch>
      </HashRouter>
    </ApolloProvider>
  )
}
