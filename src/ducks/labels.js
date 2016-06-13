import typeToReducer from 'type-to-reducer'
import { createAction } from 'redux-actions'
import Immutable from 'immutable'

const LOAD = 'boh-labels/labels/LOAD'

const initialState = {
  error: null,
  isPending: false,
  isRejected: false,
  items: Immutable.Map()
}

export default typeToReducer({
  [LOAD]: {
    PENDING: (state, action) => ({
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
      items: state.labels
    })
  }
}, initialState)

export const load = createAction(LOAD, async () => {
  const result = await Promise.resolve([
    {
      id: 1,
      metadata: ['MacBook', '1.1GHz', '4GB', '128GB'],
      title: 'MJY32LL/A'
    },
    {
      id: 2,
      metadata: ['MacBook', '1.1GHz', '4GB', '128GB'],
      title: 'MJY32LL/A'
    },
    {
      id: 3,
      metadata: ['MacBook', '1.1GHz', '4GB', '128GB'],
      title: 'MJY32LL/A'
    },
    {
      id: 4,
      metadata: ['MacBook', '1.1GHz', '4GB', '128GB'],
      title: 'MJY32LL/A'
    },
    {
      id: 5,
      metadata: ['MacBook', '1.1GHz', '4GB', '128GB'],
      title: 'MJY32LL/A'
    },
    {
      id: 6,
      metadata: ['MacBook', '1.1GHz', '4GB', '128GB'],
      title: 'MJY32LL/A'
    },
    {
      id: 7,
      metadata: ['MacBook', '1.1GHz', '4GB', '128GB'],
      title: 'MJY32LL/A'
    },
    {
      id: 8,
      metadata: ['MacBook', '1.1GHz', '4GB', '128GB'],
      title: 'MJY32LL/A'
    }
  ])

  return result
})
