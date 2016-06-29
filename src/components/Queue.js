import Electron from 'electron'
import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Container, Icon, ListDivider, QueueItem, TopBar } from 'components'
import { Button, Fieldset, Label, Select, TextField } from 'components/form'

import styles from 'components/Queue.css'

const { BrowserWindow } = Electron.remote

const Queue = ({
  className: overrideClassName,
  labels,
  items,
  printOptions,
  printOptionsActions,
  queueActions
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  const accessoriesRight = (id, selected) => [
    <Icon
      onClick={() => queueActions.remove(id)}
      selected={selected}
      type='remove'
    />
  ]

  const accessoriesLeft = (id, quantity) => [
    <TextField
      className={styles['accessories-left-quantity']}
      value={quantity}
      onChange={({ target }) => {
          queueActions.changeQuantity({ id, quantity: target.value })
        }}
    />
  ]

  const queueSize = items.reduce((a, b) => (a + b), 0)
  const disabled = !(queueSize > 0)

  const handlePrint = () => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    const { webContents } = focusedWindow

    webContents.print({
      printBackground: true
    })
  }

  return (
    <div className={className}>
      <TopBar styleName='top-bar'>
        <span>{queueSize} label{queueSize === 1 ? '' : 's'}</span>
        <Button
          disabled={disabled}
          onClick={handlePrint}
          value="Print"
        />
      </TopBar>
      <Container slim={true}>
        <Fieldset>
          <Label>Template:</Label>
          <Select
            onChange={({ target }) => printOptionsActions.setTemplate(target.value)}
            value={printOptions.template}
          >
            <option value='MasterPack'>Master Pack</option>
            <option value='PhysicalInventory'>Physical Inventory</option>
            <option value='Shelf'>Shelf</option>
          </Select>
        </Fieldset>
      </Container>
      <Container styleName='list'>
        {items.map((quantity, id) => {
          const { category, key, metadata } = labels.items.get(id)
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
      </Container>
      <Container slim={true} styleName='clearAll'>
        <Button
          chrome={false}
          disabled={disabled}
          onClick={() => queueActions.removeAll()}
          value="Clear All"
        />
      </Container>
    </div>
  )
}

export default CSSModules(Queue, styles)
