import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { client } from 'src/config/apollo_client'

// NOTE shared
import Layout from 'src/components/shared/layout'
import Dashboard from 'src/components/dashboard'
import Page404 from 'src/components/shared/page404'

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

// import { Provider } from 'react-redux'
// import { configureStore } from 'src/store'
// import * as reactApollo from 'react-apollo'

// import { ConnectedRouter } from 'react-router-redux'
// import { history, configureStore } from 'src/store'
// import { configureStore } from 'src/store'
// import { Route, Redirect, Switch } from 'react-router-dom'

// import { loadConfig } from "actions/auth"

// const store: any = configureStore()
// const client = configureClient()
// store.dispatch(loadConfig())


// return (
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <ApolloProvider store={store} client={client}>

//         <Switch>

//           <Layout exact path="/dashboard" name="Dashboard" component={Dashboard}/>

//           <Redirect exact from="/" to="/dashboard"/>
//           <Layout path="*" component={Page404}/>
//         </Switch>

//       </ApolloProvider>
//     </ConnectedRouter>
//   </Provider>
// )
