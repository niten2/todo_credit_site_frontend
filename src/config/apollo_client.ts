import { ApolloClient } from "apollo-client"
// import { setContext } from "apollo-link-context"
// import { onError } from 'apollo-link-error'
// import AuthProvider from "src/config/auth_provider"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

import settings from "src/config/settings"

const httpLink = createHttpLink({
  uri: settings.backend_url,
})

// const errorLink = onError(({ networkError, graphQLErrors }) => {
//   console.log(1111111111)
//   // TODO

//   // if (networkError && networkError.statusCode === 401) {
//   //   console.log(111111111111111, "after error")
//   // }
// })

// const middlewareLink = setContext(() => ({
//   headers: {
//     authorization: AuthProvider.fetchToken(),
//   }
// }))

const link = httpLink
// const link = (middlewareLink.concat(httpLink)).concat(errorLink)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})
