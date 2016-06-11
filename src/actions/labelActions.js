import { createAction } from 'redux-actions'

import * as types from 'actions/actionTypes'

export const getLabels = createAction(
  types.LABELS.GET_LABELS,
  async () => {
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
  }
)
