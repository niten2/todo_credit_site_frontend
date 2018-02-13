import * as React from "react"
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "react-apollo"
import { InMemoryCache } from "apollo-cache-inmemory"
import { SchemaLink } from "apollo-link-schema"
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools"

const globalAny: any = global

export default function createApolloProxy(options: any): any {
  const { typeDefs, mocks } = options

  const schema = makeExecutableSchema({ typeDefs })

  addMockFunctionsToSchema({
    schema,
    mocks,
    preserveResolvers: true
  })

  const apolloCache = new InMemoryCache(globalAny.__APOLLO_STATE__)

  const client = new ApolloClient({
    cache: apolloCache,
    link: new SchemaLink({ schema })
  })

  class ApolloProxy extends React.Component<any, any> {

    render() {
      const { value: NextProxy, next } = this.props.nextProxy;

      return (
        <ApolloProvider client={client}>
          <NextProxy {...this.props} nextProxy={next()} />
        </ApolloProvider>
      )
    }
  }

  return ApolloProxy
}
