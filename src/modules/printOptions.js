import typeToReducer from 'type-to-reducer'
import { createAction } from 'redux-actions'

const SET_TEMPLATE = 'boh-labels/filters/SET_TEMPLATE'

const initialState = {
  template: 'Shelf'
}

export default typeToReducer({
  [SET_TEMPLATE]: (action, { payload }) => ({
    template: payload
  })
}, initialState)

export const setTemplate = createAction(SET_TEMPLATE)
