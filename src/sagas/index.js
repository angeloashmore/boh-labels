import { call, put, takeEvery } from 'redux-saga/effects'

import * as collections from 'modules/collections'
import * as labels from 'modules/labels'
import * as queue from 'modules/queue'
import githubReleases from 'lib/githubReleases'

export default function* rootSaga () {
  yield [
    loadLabels(),
    loadCollections(),
    watchQueue()
  ]
}

// Collections

export function* loadCollections () {
  yield put({ type: collections.LOAD_PENDING })

  const payload = yield githubReleases('collections.json')

  yield put({ type: collections.LOAD_FULFILLED, payload })
}

// Labels

export function* loadLabels () {
  yield put({ type: labels.LOAD_PENDING })

  const payload = yield githubReleases('labels.json')

  yield put({ type: labels.LOAD_FULFILLED, payload })
}

// Queue

export function* watchQueue () {
  yield takeEvery(queue.ADD, selectSearch)
  yield takeEvery(queue.ADD_MULTIPLE, selectSearch)
  yield takeEvery(queue.REMOVE, selectSearch)
  yield takeEvery(queue.REMOVE_ALL, selectSearch)
}

export function* selectSearch (action) {
  yield document.querySelector('#search').select()
}
