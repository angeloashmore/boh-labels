import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import {
  MasterListContainer,
  PrintSheetContainer,
  QueueContainer
} from 'containers'

import styles from 'components/App.css'

export default class App extends Component {
  static propTypes = {
    loadCollections: PropTypes.func.isRequired,
    loadLabels: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { loadCollections, loadLabels } = this.props

    // Populate store
    loadCollections()
    loadLabels()
  }

  render () {
    return (
      <div styleName='base'>
        <MasterListContainer styleName='master-list' />
        <QueueContainer styleName='queue' />
        <PrintSheetContainer styleName='print-sheet' />
      </div>
    )
  }
}

export default CSSModules(App, styles)
