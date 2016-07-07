import Electron from 'electron'
import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'
import Infinite from 'react-infinite'

import { Icon, QueueItem } from 'components'

import styles from 'components/MasterList/Items.css'

const { BrowserWindow } = Electron.remote

const Items = ({
  className: overrideClassName,
  addQueueItem,
  labels,
  loading
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  const renderLoading = (
    <div styleName='loading'>
      Loading
    </div>
  )

  const accessoriesLeft = (selected = false) => ([
    <Icon
      className={styles['accessories-left-icon']}
      selected={selected}
      type='label'
    />
  ])

  const accessoriesRight = (id, selected = false) => ([
    <Icon
      onClick={() => addQueueItem(id)}
      selected={selected}
      type='add'
    />
  ])

  const renderList = (
    <Infinite
      containerHeight={BrowserWindow.getAllWindows()[0].getSize()[1] - 91}
      elementHeight={60}
      className={className}
    >
      {labels.map(({ category, id, key, metadata }) => (
        <QueueItem
          key={id}
          accessoriesLeft={accessoriesLeft()}
          accessoriesRight={accessoriesRight(id)}
          category={category}
          metadata={metadata}
          onDoubleClick={() => addQueueItem(id)}
          title={key}
        />
      ))}
    </Infinite>
  )

  return (loading ? renderLoading : renderList)
}

export default CSSModules(Items, styles)
