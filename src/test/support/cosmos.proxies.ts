// import createApolloProxy from 'react-cosmos-apollo-proxy'
import createApolloProxy from './proxy'

import createRouterProxy from 'react-cosmos-router-proxy'
import createLocalStorageProxy from 'react-cosmos-localstorage-proxy'

// import 'public/css/style.css'
import { typeDefs, mocks }  from 'src/test/support/graphql'

export default [
  createRouterProxy(),
  createLocalStorageProxy(),
  createApolloProxy({
    typeDefs,
    mocks
  })
]
