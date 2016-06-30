import typeToReducer from 'type-to-reducer'
import { createAction } from 'redux-actions'
import Immutable from 'immutable'

const LOAD = 'boh-labels/collections/LOAD'

const initialState = {
  error: null,
  isPending: false,
  isRejected: false,
  items: Immutable.OrderedMap()
}

export default typeToReducer({
  [LOAD]: {
    PENDING: (state) => ({
      ...initialState,
      isPending: true
    }),

    FULFILLED: (state, action) => ({
      ...initialState,
      items: Immutable.OrderedMap(action.payload.map((item) => [item.id, item]))
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
  const releasesURL = 'https://api.github.com/repos/angeloashmore/boh-labels-db/releases/latest'
  const releasesData = await fetch(releasesURL)
  const releases = await releasesData.json()

  const asset = releases.assets.find((asset) => asset.name === 'collections.json')

  const result = await fetch(asset.browser_download_url)
  const json = await result.json()

  return json
})
