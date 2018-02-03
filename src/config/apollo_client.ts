import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import settings from "src/config/settings"

const httpLink = createHttpLink({
  uri: settings.backend_url,
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})

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

