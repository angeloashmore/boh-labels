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
  filters,
  filterActions,
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
      <input
        onChange={({ target }) => filterActions.setQuery(target.value)}
        styleName='search'
        type='text'
      />
    </TopBar>
  )

  const labelsList = () => {
    const { query } = filters

    const filteredItems = labels.items.filter((item) => {
      const subject = JSON.stringify(item)
      const regExp = new RegExp(query.trim().replace(' ', '.*'), 'gi')
      return subject.match(regExp)
    })

    return filteredItems.map(({ category, id, key, metadata }) => (
      <QueueItem
        key={id}
        accessoriesLeft={accessoriesLeft('label')}
        accessoriesRight={accessoriesRight([id])}
        category={category}
        metadata={metadata}
        title={key}
      />
    ))
  }

  const collectionsList = () => {
    const { query } = filters

    const filteredItems = collections.items.filter((item) => {
      const subject = JSON.stringify(item)
      const regExp = new RegExp(query.trim().replace(' ', '.*'), 'gi')
      return subject.match(regExp)
    })

    return filteredItems.map(({ id, key, label_ids = [] }) => (
      <QueueItem
        key={id}
        accessoriesLeft={accessoriesLeft('collection')}
        accessoriesRight={accessoriesRight(label_ids)}
        metadata={[`${label_ids.length} label${label_ids.length === 1 ? '' : 's'}`]}
        title={key}
      />
    ))
  }

  const renderList = (
    <div styleName='list'>
      {labelsList()}
      <ListDivider title="Collections" />
      {collectionsList()}
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
