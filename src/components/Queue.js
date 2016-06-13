import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Container, Icon, ListDivider, QueueItem, TopBar } from 'elements'
import { Button, Fieldset, Label, Select, TextField } from 'elements/form'

import styles from 'components/Queue.css'

const Queue = ({
  className: overrideClassName,
  labels,
  items,
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

  return (
    <div className={className}>
      <TopBar styleName='top-bar'>
        <span>{queueSize} label{queueSize === 1 ? '' : 's'}</span>
        <Button
          disabled={disabled}
          value="Print"
        />
      </TopBar>
      <Container slim={true}>
        <Fieldset>
          <Label>Template:</Label>
          <Select>
            <option>Master Pack</option>
            <option>Physical Inventory</option>
            <option>Shelf</option>
          </Select>
        </Fieldset>
      </Container>
      <Container styleName='list'>
        {items.map((quantity, id) => {
          const { metadata, title } = labels.items.get(id)
          return (
            <QueueItem
              key={id}
              accessoriesLeft={accessoriesLeft(id, quantity)}
              accessoriesRight={accessoriesRight(id)}
              metadata={metadata}
              title={title}
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
