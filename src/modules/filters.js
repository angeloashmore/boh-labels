import typeToReducer from 'type-to-reducer'
import { createAction } from 'redux-actions'

const CLEAR_COLLECTION = 'boh-labels/filters/CLEAR_COLLECTION'
const CLEAR_QUERY = 'boh-labels/filters/CLEAR_QUERY'
const SET_COLLECTION = 'boh-labels/filters/SET_COLLECTION'
const SET_QUERY = 'boh-labels/filters/SET_QUERY'

const initialState = {
  collection: '',
  query: ''
}

export default typeToReducer({
  [CLEAR_COLLECTION]: ({ query }) => ({
    ...initialState,
    query
  }),

  [SET_COLLECTION]: (state, { payload: collection }) => ({
    ...state,
    collection
  }),

  [CLEAR_QUERY]: ({ collection }) => ({
    ...initialState,
    collection
  }),

  [SET_QUERY]: (state, { payload: query }) => ({
    ...state,
    query
  })
}, initialState)

export const clearCollection = createAction(CLEAR_COLLECTION)

export const clearQuery = createAction(CLEAR_QUERY)

export const setCollection = createAction(SET_COLLECTION)

export const setQuery = createAction(SET_QUERY)
