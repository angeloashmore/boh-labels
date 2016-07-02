import typeToReducer from 'type-to-reducer'
import { createAction } from 'redux-actions'
import Immutable from 'immutable'

const ADD = 'boh-labels/queue/ADD'
const ADD_MULTIPLE = 'boh-labels/queue/ADD_MULTIPLE'
const REMOVE = 'boh-labels/queue/REMOVE'
const REMOVE_ALL = 'boh-labels/queue/REMOVE_ALL'
const CHANGE_QUANTITY = 'boh-labels/queue/CHANGE_QUANTITY'

const initialState = {
  items: Immutable.OrderedMap(),
  size: 0
}

const calculateSize = (queue) => {
  return queue.reduce((a, b) => (a + b), 0)
}

export default typeToReducer({
  [ADD]: ({ items: origItems }, { payload: id }) => {
    const items = origItems.set(id, origItems.get(id, 0) + 1)

    return {
      items,
      size: calculateSize(items)
    }
  },

  [ADD_MULTIPLE]: ({ items }, { payload: ids }) => {
    ids.forEach((id) => {
      items = items.set(id, items.get(id, 0) + 1)
    })

    return {
      items,
      size: calculateSize(items)
    }
  },

  [REMOVE]: ({ items: origItems, size }, { payload: id }) => {
    const items = origItems.delete(id)

    return {
      items,
      size: calculateSize(items)
    }
  },

  [REMOVE_ALL]: () => (initialState),

  [CHANGE_QUANTITY]: ({ items: origItems }, { payload }) => {
    const { id, quantity } = payload
    const parsedQuantity = Number.parseInt(quantity)

    let items

    if (parsedQuantity > 0) {
      items = origItems.set(id, parsedQuantity)
    } else {
      items = origItems.delete(id)
    }

    return {
      items,
      size: calculateSize(items)
    }
  }
}, initialState)

export const add = createAction(ADD)

export const addMultiple = createAction(ADD_MULTIPLE)

export const removeAll = createAction(REMOVE_ALL)

export const remove = createAction(REMOVE)

export const changeQuantity = createAction(CHANGE_QUANTITY)
