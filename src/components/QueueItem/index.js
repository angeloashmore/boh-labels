import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Container } from 'components'
import Accessories from 'components/QueueItem/Accessories'
import Details from 'components/QueueItem/Details'

import styles from 'components/QueueItem/index.css'

const QueueItem = ({
  accessoriesLeft = [],
  accessoriesRight = [],
  category,
  className: overrideClassName,
  selected = false,
  title,
  metadata = {},
  onDoubleClick = () => {}
}) => {
  const className = cx(styles.base, {
    [styles['base--selected']]: selected,
    [overrideClassName]: overrideClassName
  })

  const flatMetadata = Object.values(metadata)

  if (category) {
    flatMetadata.unshift(category)
  }

  return (
    <Container
      className={className}
      shadow={false}
      slim
    >
      <Accessories
        accessories={accessoriesLeft}
        styleName='accessories--left'
      />
      <Details
        title={title}
        metadata={flatMetadata}
        onDoubleClick={onDoubleClick}
      />
      <Accessories
        accessories={accessoriesRight}
        styleName='accessories--right'
      />
    </Container>
  )
}

export default CSSModules(QueueItem, styles)
