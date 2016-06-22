import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { MasterList, Queue } from 'components'

import styles from 'components/App.css'

export default class App extends Component {
  static propTypes = {
    collectionActions: PropTypes.object.isRequired,
    collections: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequred,
    filterActions: PropTypes.object.isRequired,
    labelActions: PropTypes.object.isRequired,
    labels: PropTypes.object.isRequired,
    queue: PropTypes.object.isRequired,
    queueActions: PropTypes.object.isRequired
  }

  static defaultProps = {
    queue: []
  }

  componentDidMount() {
    const { collectionActions, labelActions } = this.props

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
          queueActions={queueActions}
          styleName='queue'
        />
      </div>
    )
  }
}

export default CSSModules(App, styles)
