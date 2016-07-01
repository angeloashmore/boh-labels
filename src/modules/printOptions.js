import typeToReducer from 'type-to-reducer'
import { createAction } from 'redux-actions'

const SET_TEMPLATE = 'boh-labels/filters/SET_TEMPLATE'

const initialState = {
  template: 'MasterPack'
}

export default typeToReducer({
  [SET_TEMPLATE]: (_action, { payload: template }) => ({
    template
  })
}, initialState)

export const setTemplate = createAction(SET_TEMPLATE)
