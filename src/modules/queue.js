import typeToReducer from 'type-to-reducer'
import { createAction } from 'redux-actions'
import Immutable from 'immutable'

const ADD = 'boh-labels/queue/ADD'
const ADD_MULTIPLE = 'boh-labels/queue/ADD_MULTIPLE'
const REMOVE = 'boh-labels/queue/REMOVE'
const REMOVE_ALL = 'boh-labels/queue/REMOVE_ALL'
const CHANGE_QUANTITY = 'boh-labels/queue/CHANGE_QUANTITY'

const initialState = {
  items: Immutable.OrderedMap()
}

export default typeToReducer({
  [ADD]: ({ items }, { payload: id }) => ({
    items: items.set(id, items.get(id, 0) + 1)
  }),

  [ADD_MULTIPLE]: ({ items }, { payload: ids }) => {
    ids.forEach((id) => {
      items = items.set(id, items.get(id, 0) + 1)
    })

    return { items }
  },

  [REMOVE]: ({ items }, { payload: id }) => ({
    items: items.delete(id)
  }),

  [REMOVE_ALL]: () => (initialState),

  [CHANGE_QUANTITY]: ({ items }, { payload }) => {
    const { id, quantity } = payload
    const parsedQuantity = Number.parseInt(quantity)

    let modifiedItems

    if (parsedQuantity > 0) {
      modifiedItems = items.set(id, parsedQuantity)
    } else {
      modifiedItems = items.delete(id)
    }

    return {
      items: modifiedItems
    }
  }
}, initialState)

export const add = createAction(ADD)

export const addMultiple = createAction(ADD_MULTIPLE)

export const removeAll = createAction(REMOVE_ALL)

export const remove = createAction(REMOVE)

export const changeQuantity = createAction(CHANGE_QUANTITY)
