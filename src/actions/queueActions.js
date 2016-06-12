import { createAction } from 'redux-actions'

import * as types from 'actions/actionTypes'

export const addLabel = createAction(types.QUEUE.ADD_LABEL)

export const addLabels = createAction(types.QUEUE.ADD_LABELS)

export const removeAllLabels = createAction(types.QUEUE.REMOVE_ALL_LABELS)

export const removeLabel = createAction(types.QUEUE.REMOVE_LABEL)

export const updateQuantity = createAction(types.QUEUE.UPDATE_QUANTITY)
