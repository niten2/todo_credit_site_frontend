import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import { client } from 'src/config/apollo_client'

import { withPublicUrl } from 'src/config/settings'

import { PrivateLayout, PrivateLayoutAdmin, PrivateLayoutManager } from 'src/components/shared/layout'
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

import IndexLoansClient from 'src/components/clients/loans'
import EditLoanClient from 'src/components/clients/loans/edit'

export default () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Switch>
          <Route exact={true} path={withPublicUrl("/login")} component={Login}/>
          <Route exact={true} path={withPublicUrl("/404")} component={Page404}/>

          <PrivateLayout exact={true} path={withPublicUrl("/profile")} component={Profile}/>

          <PrivateLayoutAdmin exact={true} path={withPublicUrl("/users")} component={User}/>
          <PrivateLayoutAdmin exact={true} path={withPublicUrl("/users/new")} component={NewUser}/>
          <PrivateLayoutAdmin exact={true} path={withPublicUrl("/users/:id")} component={ShowUser}/>

          <PrivateLayout exact={true} path={withPublicUrl("/clients")} component={Client}/>
          <PrivateLayoutManager exact={true} path={withPublicUrl("/clients/new")} component={NewClient}/>
          <PrivateLayout exact={true} path={withPublicUrl("/clients/:id")} component={ShowClient}/>

          <PrivateLayout exact={true} path={withPublicUrl("/clients/:id/loans")} component={IndexLoansClient}/>

          <PrivateLayoutAdmin
            exact={true}
            path={withPublicUrl("/clients/:id/loans/:loanId")}
            component={EditLoanClient}
          />

          <PrivateLayout exact={true} path={withPublicUrl("/")} component={Dashboard} />
          <PrivateLayout exact={true} path={withPublicUrl("/dashboard")} component={Dashboard}/>

          <Redirect to={withPublicUrl("/404")} />
        </Switch>
      </HashRouter>
    </ApolloProvider>
  )
}
