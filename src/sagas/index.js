import {
  fork,
  put,
  takeLatest
} from 'redux-saga/effects'

import * as collections from '../modules/collections'
import * as labels from '../modules/labels'
import githubReleases from '../lib/githubReleases'

export default function* rootSaga () {
  yield fork(loadCollections)
  yield fork(loadLabels)
}

export function* loadCollections () {
  yield put({ type: collections.LOAD_PENDING })

  const payload = yield githubReleases('collections.json')

  yield put({ type: collections.LOAD_FULFILLED, payload })
}

export function* loadLabels () {
  yield put({ type: labels.LOAD_PENDING })

  const payload = yield githubReleases('labels.json')

  yield put({ type: labels.LOAD_FULFILLED, payload })
}
