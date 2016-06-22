import typeToReducer from 'type-to-reducer'
import { createAction } from 'redux-actions'

const CLEAR_QUERY = 'boh-labels/filters/CLEAR_QUERY'
const SET_QUERY = 'boh-labels/filters/SET_QUERY'

const initialState = {
  query: ''
}

export default typeToReducer({
  [CLEAR_QUERY]: () => (initialState),

  [SET_QUERY]: (action, { payload }) => ({
    query: payload
  })
}, initialState)

export const clearQuery = createAction(CLEAR_QUERY)

export const setQuery = createAction(SET_QUERY)
