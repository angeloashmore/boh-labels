import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Container } from 'components'
import { Fieldset, Label, Select } from 'components/form'

import styles from 'components/Queue/PrintOptions.css'

const PrintOptions = ({
  className: overrideClassName,
  setTemplate,
  template
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <Container
      className={className}
      slim
    >
      <Fieldset>
        <Label>Template:</Label>
        <Select
          onChange={({ target }) => setTemplate(target.value)}
          value={template}
        >
          <option value='MasterPack'>Master Pack</option>
          <option value='PhysicalInventory'>Physical Inventory</option>
          <option value='Shelf'>Shelf</option>
        </Select>
      </Fieldset>
    </Container>
  )
}

export default CSSModules(PrintOptions, styles)
