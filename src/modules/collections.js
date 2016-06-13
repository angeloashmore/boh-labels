import typeToReducer from 'type-to-reducer'
import { createAction } from 'redux-actions'
import Immutable from 'immutable'

const LOAD = 'boh-labels/collections/LOAD'

const initialState = {
  error: null,
  isPending: false,
  isRejected: false,
  items: Immutable.Map()
}

export default typeToReducer({
  [LOAD]: {
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

export const load = createAction(LOAD, async () => {
  const result = await Promise.resolve([
    {
      id: 1,
      title: 'MacBook',
      label_ids: [1, 2, 3]
    },
    {
      id: 2,
      title: 'MacBook Air',
      label_ids: [4, 5, 6]
    },
    {
      id: 3,
      title: 'MacBook Pro',
      label_ids: [7]
    },
    {
      id: 4,
      title: 'MacBook Pro with Retina Display',
      label_ids: [8]
    }
  ])

  return result
})
