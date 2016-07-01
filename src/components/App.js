import Electron from 'electron'
import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { MasterList, PrintSheet, Queue } from 'components'

import styles from 'components/App.css'

const { BrowserWindow } = Electron.remote

export default class App extends Component {
  static propTypes = {
    collectionActions: PropTypes.object.isRequired,
    collections: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequred,
    filterActions: PropTypes.object.isRequired,
    labels: PropTypes.object.isRequired,
    labelActions: PropTypes.object.isRequired,
    printOptions: PropTypes.object.isRequred,
    printOptionsActions: PropTypes.object.isRequred,
    queue: PropTypes.object.isRequired,
    queueActions: PropTypes.object.isRequired
  }

  static defaultProps = {
    queue: []
  }

  componentDidMount() {
    const { collectionActions, labelActions } = this.props

    // Set sheet offset
    BrowserWindow.getAllWindows()[0].setSheetOffset(56)

    collectionActions.load()
    labelActions.load()
  }

  render() {
    const {
      className: overrideClassName,
      collections,
      filters,
      filterActions,
      labels,
      printOptions,
      printOptionsActions,
      queue,
      queueActions
    } = this.props

    const className = cx(styles.base, {
      [overrideClassName]: overrideClassName
    })

    return (
      <div className={className}>
        <MasterList
          collections={collections}
          filters={filters}
          filterActions={filterActions}
          labels={labels}
          queueActions={queueActions}
          styleName='master-list'
        />
        <Queue
          items={queue}
          labels={labels}
          printOptions={printOptions}
          printOptionsActions={printOptionsActions}
          queueActions={queueActions}
          styleName='queue'
        />
        <PrintSheet
          labels={labels}
          printOptions={printOptions}
          queue={queue}
          styleName='print-sheet'
        />
      </div>
    )
  }
}

export default CSSModules(App, styles)
