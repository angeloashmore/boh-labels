import Electron from 'electron'
import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'
import Infinite from 'react-infinite'

import { Icon, QueueItem } from 'components'
import { TextField } from 'components/form'

import styles from 'components/Queue/Items.css'

const { BrowserWindow } = Electron.remote

const Items = ({
  className: overrideClassName,
  changeQuantity,
  items,
  labels,
  removeItem
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  const accessoriesLeft = (id, quantity) => [
    <TextField
      className={styles['accessories-left-quantity']}
      value={quantity}
      onClick={({ target }) => target.select()}
      onChange={({ target }) => {
        changeQuantity({ id, quantity: target.value })
      }}
    />
  ]

  const accessoriesRight = (id, selected) => [
    <Icon
      onClick={() => removeItem(id)}
      selected={selected}
      type='remove'
    />
  ]

  return (
    <Infinite
      containerHeight={BrowserWindow.getAllWindows()[0].getSize()[1] - 91}
      elementHeight={60}
      className={className}
    >
      {items.map((quantity, id) => {
        const { category, key, metadata } = labels.get(id)
        return (
          <QueueItem
            category={category}
            accessoriesLeft={accessoriesLeft(id, quantity)}
            accessoriesRight={accessoriesRight(id)}
            key={id}
            metadata={metadata}
            title={key}
          />
        )
      })}
    </Infinite>
  )
}

export default CSSModules(Items, styles)
