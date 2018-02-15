// import createRouterProxy from 'react-cosmos-router-proxy'
// import createLocalStorageProxy from 'react-cosmos-localstorage-proxy'
// import createApolloProxy from './react_cosmos_apollo_proxy'

// import 'public/css/style.css'
// import { typeDefs, mocks }  from 'src/test/support/graphql'

// export default [
//   createApolloProxy({
//     typeDefs,
//     mocks,
//   }),
//   createRouterProxy(),
//   createLocalStorageProxy(),
// ]


console.log(process.env.NODE_ENV)
console.log(process.env.PUBLIC_URL)


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactCosmosRouterProxy = require('react-cosmos-router-proxy');

var _reactCosmosRouterProxy2 = _interopRequireDefault(_reactCosmosRouterProxy);

var _reactCosmosLocalstorageProxy = require('react-cosmos-localstorage-proxy');

var _reactCosmosLocalstorageProxy2 = _interopRequireDefault(_reactCosmosLocalstorageProxy);

var _react_cosmos_apollo_proxy = require('./react_cosmos_apollo_proxy');

var _react_cosmos_apollo_proxy2 = _interopRequireDefault(_react_cosmos_apollo_proxy);

var _graphql = require('src/test/support/graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [(0, _react_cosmos_apollo_proxy2.default)({
  typeDefs: _graphql.typeDefs,
  mocks: _graphql.mocks
}), (0, _reactCosmosRouterProxy2.default)(), (0, _reactCosmosLocalstorageProxy2.default)()];
