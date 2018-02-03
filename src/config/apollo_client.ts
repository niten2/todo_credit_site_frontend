import { ApolloClient } from "apollo-client"
import { setContext } from "apollo-link-context"
import { onError } from 'apollo-link-error'
import AuthProvider from "src/config/auth_provider"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

import settings from "src/config/settings"

const httpLink = createHttpLink({
  uri: settings.backend_url,
})

const errorLink = onError(({ networkError, graphQLErrors }) => {

  if (graphQLErrors) {
    graphQLErrors.map((error) => {
      console.log("ERROR", error.message)
    })
  }

  if (networkError) {
    console.log(networkError)
  }

})

const middlewareLink = setContext(() => ({
  headers: {
    authorization: AuthProvider.fetchToken(),
  }
}))

const link = middlewareLink.concat(errorLink.concat(httpLink))

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})
