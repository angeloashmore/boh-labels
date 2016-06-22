import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import collections from 'modules/collections'
import filters from 'modules/filters'
import labels from 'modules/labels'
import queue from 'modules/queue'

export default combineReducers({
  collections,
  filters,
  labels,
  queue,
  routing
})
