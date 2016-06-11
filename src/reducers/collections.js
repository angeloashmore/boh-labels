import typeToReducer from 'type-to-reducer'
import Immutable from 'immutable'

import * as types from 'actions/actionTypes'

const initialState = {
  error: null,
  isPending: false,
  isRejected: false,
  items: Immutable.Map()
}

export default typeToReducer({
  [types.COLLECTIONS.GET_COLLECTIONS]: {
    PENDING: (state) => ({
      ...initialState,
      isPending: true
    }),

    FULFILLED: (state, action) => ({
      ...initialState,
      items: Immutable.Map(action.payload.map((item) => [item.id, item]))
    }),

    REJECTED: (state, action) => ({
      ...initialState,
      error: action.payload,
      isRejected: true,
      items: state.collections
    })
  }
}, initialState)
