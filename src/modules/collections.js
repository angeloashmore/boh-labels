import { handleActions } from 'redux-actions'
import { OrderedMap } from 'immutable'

export const LOAD_PENDING = 'boh-labels/collections/LOAD'
export const LOAD_FULFILLED = 'boh-labels/collections/LOAD_FULFILLED'
export const LOAD_REJECTED = 'boh-labels/collections/LOAD_REJECTED'

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

  [LOAD_FULFILLED]: (_state, { payload: collections }) => {
    const keyValuePairs = collections.map((x) => [x.id, x])
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
