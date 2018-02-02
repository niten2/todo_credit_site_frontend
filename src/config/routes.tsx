import * as React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from 'src/store'

import { ApolloProvider } from 'react-apollo'
// import * as reactApollo from 'react-apollo'

// import { ConnectedRouter } from 'react-router-redux'
// import { history, configureStore } from 'src/store'
// import { configureStore } from 'src/store'
// import { Route, Redirect, Switch } from 'react-router-dom'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { client } from 'src/config/apollo_client'


// import { loadConfig } from "actions/auth"

// shared
import Layout from 'src/components/shared/layout'
import Dashboard from 'src/components/dashboard'
import Page404 from 'src/components/shared/page404'


import Login from 'src/components/auth/login'
// interface test extends IntrinsicAttributes {





export default () => {
  const store: any = configureStore()




  // const client = configureClient()
  // store.dispatch(loadConfig())

  return (
    <Provider store={store}>
			<ApolloProvider client={client}>
				<Router>
          <Switch>
            <Layout exact={true} path="/login" component={Login}/>

						<Layout path="/" name="Dashboard" component={Dashboard}/>
						<Layout path="/dashboard" name="Dashboard" component={Dashboard}/>
            <Layout path="*" component={Page404}/>
          </Switch>
				</Router>
			</ApolloProvider>
    </Provider>
  )
}

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
