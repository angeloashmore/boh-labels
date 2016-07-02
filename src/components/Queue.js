import Electron from 'electron'
import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Container, Icon, QueueItem, TopBar } from 'components'
import { Button, Fieldset, Label, Select, TextField } from 'components/form'
import * as templates from 'components/templates'

import styles from 'components/Queue.css'

const { BrowserWindow, dialog } = Electron.remote

const Queue = ({
  className: overrideClassName,
  labels,
  printOptions,
  printOptionsActions,
  queue,
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
      onClick={({ target }) => target.select()}
      onChange={({ target }) => {
        queueActions.changeQuantity({ id, quantity: target.value })
      }}
    />
  ]

  const disabled = !(queue.size > 0)

  const { handlePrint } = templates[printOptions.template]

  const handleClearAll = () => {
    const clearAll = () => queueActions.removeAll()

    if (queue.size > 5) {
      dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
        type: 'question',
        buttons: [
          'OK',
          'Cancel'
        ],
        defaultId: 0,
        cancelId: 1,
        message: `Are you sure you want to clear all ${queue.size} labels?`
      }, (response) => {
        if (response === 0) {
          clearAll()
        }
      })
    } else {
      clearAll()
    }
  }

  return (
    <div className={className}>
      <TopBar styleName='top-bar'>
        <span>{queue.size} label{queue.size === 1 ? '' : 's'}</span>
        <Button
          disabled={disabled}
          onClick={handlePrint}
          value='Print'
        />
      </TopBar>
      <Container slim>
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
        {queue.items.map((quantity, id) => {
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
      <Container slim styleName='clearAll'>
        <Button
          chrome={false}
          disabled={disabled}
          onClick={handleClearAll}
          value='Clear All'
        />
      </Container>
    </div>
  )
}

export default CSSModules(Queue, styles)
