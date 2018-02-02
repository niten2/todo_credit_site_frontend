import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from 'src/app'

const rootEl = document.getElementById('root') as HTMLElement

ReactDOM.render(
  <App />,
  rootEl
)

if (module.hot) {
  module.hot.accept('src/app', () => {
    const NextApp = require('src/app').default

    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}
