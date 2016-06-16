import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Container } from 'components'
import { Accessories, Details } from 'components/QueueItem/index'

import styles from 'components/QueueItem.css'

const QueueItem = ({
  accessoriesLeft = [],
  accessoriesRight = [],
  category,
  className: overrideClassName,
  selected = false,
  title,
  metadata = {}
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
      slim={true}
    >
      <Accessories
        accessories={accessoriesLeft}
        styleName='accessories--left'
      />
      <Details
        title={title}
        metadata={flatMetadata}
      />
      <Accessories
        accessories={accessoriesRight}
        styleName='accessories--right'
      />
    </Container>
  )
}

export default CSSModules(QueueItem, styles)
