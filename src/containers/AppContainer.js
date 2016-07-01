import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { App } from 'components'
import { load as loadCollections } from 'modules/collections'
import { load as loadLabels } from 'modules/labels'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadCollections,
  loadLabels
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
