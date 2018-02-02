// // import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
// // import { createStore, applyMiddleware } from 'redux'
import { createStore } from 'redux'
// // import { routerMiddleware } from 'react-router-redux'

// // import reducers from 'src/reducers'
// // import { logger } from 'middleware'

export const history = createHistory()

// export const configureStore = (state?: any) => {
//   // const middleware = routerMiddleware(history)

//   // return createStore(
//   //   reducers,
//   //   state,
//   //   // applyMiddleware(middleware, thunk, logger)
//   //   // applyMiddleware(middleware, thunk)
//   // )

//   return createStore(
//     {},
//     {},
//     // applyMiddleware(middleware, thunk, logger)
//     // applyMiddleware(middleware, thunk)
//   )

// }

function counter(state: any, action: any) {
	if (typeof state === 'undefined') {
		return 0
	}
	switch (action.type) {
		case 'INCREMENT':
			return state + 1
		case 'DECREMENT':
			return state - 1
		default:
			return state
	}
}

export const configureStore = () => {
	return  createStore(counter, {})
}
