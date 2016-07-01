import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from 'modules'

const logger = createLogger()

const promise = promiseMiddleware()

const router = routerMiddleware(hashHistory)

const enhancer = compose(
  applyMiddleware(thunk, promise, router, logger)
)

export default (initialState) => (
  createStore(rootReducer, initialState, enhancer)
)
