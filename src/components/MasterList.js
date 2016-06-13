import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

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
      type='info'
      selected={selected}
    />,
    <Icon
      type='add'
      selected={selected}
      onClick={() => queueActions.addMultiple(ids)}
    />
  ]

  return (
    <div className={className}>
      <TopBar styleName='top-bar'>
        <Icon type='search' styleName='search-icon' />
        <input type='text' styleName='search' />
      </TopBar>
      <div styleName='list'>
        {labels.items.map(({ id, metadata, title }) => (
          <QueueItem
            key={id}
            accessoriesLeft={accessoriesLeft('label')}
            accessoriesRight={accessoriesRight([id])}
            metadata={metadata}
            title={title}
          />
        ))}
        <ListDivider value="Collections" />
        {collections.items.map(({ id, label_ids = [], title }) => (
          <QueueItem
            key={id}
            accessoriesLeft={accessoriesLeft('collection')}
            accessoriesRight={accessoriesRight(label_ids)}
            metadata={[`${label_ids.length} label${label_ids.length === 1 ? '' : 's'}`]}
            title={title}
          />
        ))}
      </div>
    </div>
  )
}

export default CSSModules(MasterList, styles)
