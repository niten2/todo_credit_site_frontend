// import { ApolloClient } from 'apollo-client'
// // import { ApolloClient, createNetworkInterface } from 'react-apollo'
// import authProvider from 'src/config/auth_provider'

// const addToken = {
//   applyMiddleware(req, next) {
//     if (!req.options.headers) {
//       req.options.headers = {}
//     }
//     req.options.headers.authorization = authProvider.fetchToken()
//     next()
//   }
// }

// const removeToken = {
//   applyAfterware({ response }, next) {
//     if (response.status === 401) {
//       authProvider.removeToken()
//     }
//     next()
//   }
// }

// export const configureClient = () => {
//   const networkInterface = createNetworkInterface({ uri: settings.urlBackend })

//   networkInterface.use([ addToken ])
//   networkInterface.useAfter([ removeToken ])

//   return new ApolloClient({
//     networkInterface: networkInterface,
//     dataIdFromObject: o => o.id,
//   })
// }

// import * as React from 'react';
// import { render } from 'react-dom';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import settings from "src/config/settings"
// console.log(process.env.NODE_ENV)
// console.log(process.env.REACT_APP_BACKEND_URL)

// import { ApolloProvider } from 'react-apollo'

// import { App } from './App';

const httpLink = createHttpLink({
  uri: settings.backend_url,
  // uri: 'https://mpjk0plp9.lp.gql.zone/graphql',
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})
