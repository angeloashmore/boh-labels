import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import collections from 'reducers/collections'
import labels from 'reducers/labels'
import queue from 'reducers/queue'

export default combineReducers({
  collections,
  labels,
  queue,
  routing
})
