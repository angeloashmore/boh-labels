import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Icon, ListDivider, QueueItem, TopBar } from 'elements'

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

  const accessoriesLeftLabel = (selected) => [
    <Icon
      className={styles['accessories-left-icon']}
      selected={selected}
      type='label'
    />
  ]

  const accessoriesLeftCollection = (selected) => [
    <Icon
      className={styles['accessories-left-icon']}
      selected={selected}
      type='collection'
    />
  ]

  const accessoriesRightLabel = (id, selected) => [
    <Icon type='info' selected={selected} />,
    <Icon type='add' selected={selected} onClick={() => queueActions.addLabel(id)} />
  ]

  const accessoriesRightCollection = (ids, selected) => [
    <Icon type='info' selected={selected} />,
    <Icon type='add' selected={selected} onClick={() => queueActions.addLabels(ids)} />
  ]

  return (
    <div className={className}>
      <TopBar styleName='top-bar'>
        <Icon type='search' styleName='search-icon' />
        <input type='text' styleName='search' />
      </TopBar>
      <div styleName='list'>
        {labels.items.map((item) => (
          <QueueItem
            key={item.id}
            accessoriesLeft={accessoriesLeftLabel()}
            accessoriesRight={accessoriesRightLabel(item.id)}
            metadata={item.metadata}
            title={item.title}
          />
        ))}
        <ListDivider value="Collections" />
        {collections.items.map((item) => (
          <QueueItem
            key={item.id}
            accessoriesLeft={accessoriesLeftCollection()}
            accessoriesRight={accessoriesRightCollection(item.label_ids)}
            metadata={[`${item.label_ids.length} label${item.label_ids.length === 1 ? '' : 's'}`]}
            title={item.title}
          />
        ))}
      </div>
    </div>
  )
}

export default CSSModules(MasterList, styles)
