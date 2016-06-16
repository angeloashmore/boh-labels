import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import 'app-reset'

import routes from 'routes'
import configureStore from 'store/configureStore'

// Load fetch() to environment
import 'whatwg-fetch'

// Load global CSS
import 'app.css'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('react-root')
)
