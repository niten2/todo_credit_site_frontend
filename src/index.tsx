import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'

const rootEl = document.getElementById('root') as HTMLElement

ReactDOM.render(
  <App />,
  rootEl
)

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default

    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}
