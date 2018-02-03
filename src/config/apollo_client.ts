import { ApolloClient } from "apollo-client"
import { setContext } from "apollo-link-context"
import { onError } from 'apollo-link-error'
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

import AuthProvider from "src/config/auth_provider"
import settings from "src/config/settings"

const httpLink = createHttpLink({
  uri: settings.backend_url,
})

const errorLink = onError(({ networkError, graphQLErrors }) => {

  console.log(111111111111111, "after error")

  // if (networkError && networkError.statusCode === 401) {
  //   console.log(111111111111111, "after error")
  // }
})

const middlewareLink = setContext(() => ({
  headers: {
    authorization: AuthProvider.fetchToken(),
  }
}))

const link = (middlewareLink.concat(httpLink)).concat(errorLink)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

// const httpLink = createHttpLink({ uri: '/graphql' });


// use with apollo-client



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

