import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'

import { createStore, applyMiddleware } from 'redux'
import createLoggerMiddleware from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import {
  routerMiddleware as createRouterMiddleware,
  syncHistoryWithStore
} from 'react-router-redux'

import routes from 'routes'
import rootReducer from 'modules'
import rootSaga from 'sagas'

// Load fetch() to environment
import 'whatwg-fetch'

// Load global CSS
import 'app-reset'
import 'app.css'

const loggerMiddleware = createLoggerMiddleware()
const routerMiddleware = createRouterMiddleware(hashHistory)
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, sagaMiddleware, routerMiddleware)
)
const history = syncHistoryWithStore(hashHistory, store)
sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('react-root')
)
