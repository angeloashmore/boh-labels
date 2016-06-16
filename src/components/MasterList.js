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
      selected={selected}
      type='info'
    />,
    <Icon
      onClick={() => queueActions.addMultiple(ids)}
      selected={selected}
      type='add'
    />
  ]

  return (
    <div className={className}>
      <TopBar styleName='top-bar'>
        <Icon type='search' styleName='search-icon' />
        <input type='text' styleName='search' />
      </TopBar>
      <div styleName='list'>
        {labels.isPending ?
         'Loading' :
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
        }
        <ListDivider title="Collections" />
        {collections.isPending ?
         'Loading' :
         collections.items.map(({ id, key, label_ids = [] }) => (
           <QueueItem
             key={id}
             accessoriesLeft={accessoriesLeft('collection')}
             accessoriesRight={accessoriesRight(label_ids)}
             metadata={[`${label_ids.length} label${label_ids.length === 1 ? '' : 's'}`]}
             title={key}
           />
         ))}
      </div>
    </div>
  )
}

export default CSSModules(MasterList, styles)
