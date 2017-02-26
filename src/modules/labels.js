import { handleActions } from 'redux-actions'
import { OrderedMap } from 'immutable'

export const LOAD_PENDING = 'boh-labels/labels/LOAD_PENDING'
export const LOAD_FULFILLED = 'boh-labels/labels/LOAD_FULFILLED'
export const LOAD_REJECTED = 'boh-labels/labels/LOAD_REJECTED'

const initialState = {
  error: null,
  isPending: false,
  isRejected: false,
  items: OrderedMap()
}

export default handleActions({
  [LOAD_PENDING]: () => ({
    ...initialState,
    isPending: true
  }),

  [LOAD_FULFILLED]: (_state, { payload: labels }) => {
    const keyValuePairs = labels.map((label) => [label.id, label])
    const items = OrderedMap(keyValuePairs)

    return {
      ...initialState,
      items
    }
  },

  [LOAD_REJECTED]: ({ items }, { payload: error }) => ({
    ...initialState,
    error,
    isRejected: true,
    items
  })
}, initialState)
