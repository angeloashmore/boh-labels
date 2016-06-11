import { createAction } from 'redux-actions'

import * as types from 'actions/actionTypes'

export const getCollections = createAction(
  types.COLLECTIONS.GET_COLLECTIONS,
  async () => {
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
  }
)
