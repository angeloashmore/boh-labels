import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { App } from 'components'
import * as collectionActions from 'modules/collections'
import * as labelActions from 'modules/labels'
import * as queueActions from 'modules/queue'

const mapStateToProps = (state, ownProps) => ({
  collections: state.collections,
  labels: state.labels,
  queue: state.queue.items
})

const mapDispatchToProps = (dispatch) => ({
  collectionActions: bindActionCreators(collectionActions, dispatch),
  labelActions: bindActionCreators(labelActions, dispatch),
  queueActions: bindActionCreators(queueActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
