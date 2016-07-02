import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Container } from 'components'
import { Fieldset, Label, Select } from 'components/form'

import styles from 'components/MasterList/CollectionSelect.css'

const CollectionSelect = ({
  className: overrideClassName,
  collection,
  collections,
  setCollection
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
        <Label>Collection:</Label>
        <Select
          onChange={({ target }) => setCollection(target.value)}
          value={collection}
        >
          <option value=''>All labels</option>
          {collections.map(({ id, key }) => (
            <option value={id}>{key}</option>
          ))}
        </Select>
      </Fieldset>
    </Container>
  )
}

export default CSSModules(CollectionSelect, styles)
