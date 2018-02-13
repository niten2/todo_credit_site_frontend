import createApolloProxy from 'react-cosmos-apollo-proxy'
// import createApolloProxy from './react_apollo_proxy'
import createRouterProxy from 'react-cosmos-router-proxy'
import createLocalStorageProxy from 'react-cosmos-localstorage-proxy'

import 'public/css/style.css'
import { typeDefs, mocks }  from 'src/test/support/graphql'

export default [
  createRouterProxy(),
  createLocalStorageProxy(),
  createApolloProxy({
    typeDefs,
    mocks
  })
]

// // NOTE use es5 for jest and cosmos
// Object.defineProperty(exports, "__esModule", {
//   value: true
// });

// var _reactCosmosApolloProxy = require('react-cosmos-apollo-proxy');
// // var _reactCosmosApolloProxy = require('./react_apollo_proxy');

// var _reactCosmosApolloProxy2 = _interopRequireDefault(_reactCosmosApolloProxy);

// var _reactCosmosRouterProxy = require('react-cosmos-router-proxy');

// var _reactCosmosRouterProxy2 = _interopRequireDefault(_reactCosmosRouterProxy);

// var _reactCosmosLocalstorageProxy = require('react-cosmos-localstorage-proxy');

// var _reactCosmosLocalstorageProxy2 = _interopRequireDefault(_reactCosmosLocalstorageProxy);

// // require('public/css/style.css');

// var _graphql = require('src/test/support/graphql');

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// exports.default = [(0, _reactCosmosRouterProxy2.default)(), (0, _reactCosmosLocalstorageProxy2.default)(), (0, _reactCosmosApolloProxy2.default)({
//   typeDefs: _graphql.typeDefs,
//   mocks: _graphql.mocks
// })];
