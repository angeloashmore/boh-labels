import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'
import Spinner from 'react-spin'

import { Icon, ListDivider, QueueItem, TopBar } from 'components'

import styles from 'components/MasterList.css'

const MasterList = ({
  queueActions,
  className: overrideClassName,
  collections,
  labels
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  const accessoriesLeft = (type, selected = false) => [
    <Icon
      className={styles['accessories-left-icon']}
      selected={selected}
      type={type}
    />
  ]

  const accessoriesRight = (ids, selected = false) => [
    <Icon
      selected={selected}
      type='info'
    />,
    <Icon
      onClick={() => queueActions.addMultiple(ids)}
      selected={selected}
      type='add'
    />
  ]

  const topBar = (
    <TopBar styleName='top-bar'>
      <Icon type='search' styleName='search-icon' />
      <input type='text' styleName='search' />
    </TopBar>
  )

  const labelsList = (
    labels.items.map(({ category, id, key, metadata }) => (
      <QueueItem
        key={id}
        accessoriesLeft={accessoriesLeft('label')}
        accessoriesRight={accessoriesRight([id])}
        category={category}
        metadata={metadata}
        title={key}
      />
    ))
  )

  const collectionsList = (
    collections.items.map(({ id, key, label_ids = [] }) => (
      <QueueItem
        key={id}
        accessoriesLeft={accessoriesLeft('collection')}
        accessoriesRight={accessoriesRight(label_ids)}
        metadata={[`${label_ids.length} label${label_ids.length === 1 ? '' : 's'}`]}
        title={key}
      />
    ))
  )

  const renderList = (
    <div styleName='list'>
      {labelsList}
      <ListDivider title="Collections" />
      {collectionsList}
    </div>
  )

  const renderLoading = (
    <div styleName='loading'>
      Loading
    </div>
  )

  return (
    <div className={className}>
      {topBar}
      {labels.isPending || labels.isPending ? renderLoading : renderList}
    </div>
  )
}

export default CSSModules(MasterList, styles)
