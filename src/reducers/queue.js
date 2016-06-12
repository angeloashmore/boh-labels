import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import * as types from 'actions/actionTypes'

const initialState = {
  items: Immutable.OrderedMap()
}

export default handleActions({
  [types.QUEUE.ADD_LABEL]: ({ items }, { payload: id }) => ({
    items: items.set(id, items.get(id, 0) + 1)
  }),

  [types.QUEUE.ADD_LABELS]: ({ items }, { payload: ids }) => {
    ids.forEach((id) => items = items.set(id, items.get(id, 0) + 1))

    return { items }
  },

  [types.QUEUE.REMOVE_ALL_LABELS]: () => initialState,

  [types.QUEUE.REMOVE_LABEL]: ({ items }, { payload: id }) => ({
    items: items.delete(id)
  }),

  [types.QUEUE.UPDATE_QUANTITY]: ({ items }, { payload }) => {
    const quantity = Number.parseInt(payload.quantity)

    let modifiedItems

    if (quantity > 0) {
      modifiedItems = items.set(payload.id, quantity)
    } else {
      modifiedItems = items.delete(payload.id)
    }

    return {
      items: modifiedItems
    }
  }
}, initialState)
