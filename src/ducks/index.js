import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import collections from 'ducks/collections'
import labels from 'ducks/labels'
import queue from 'ducks/queue'

export default combineReducers({
  collections,
  labels,
  queue,
  routing
})
