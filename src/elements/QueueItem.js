import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Container } from 'elements'
import { Accessories, Details } from 'elements/QueueItem/index'

import styles from 'elements/QueueItem.css'

const QueueItem = ({
  accessoriesLeft = [],
  accessoriesRight = [],
  className: overrideClassName,
  selected = false,
  title,
  metadata = []
}) => {
  const className = cx(styles.base, {
    [styles['base--selected']]: selected,
    [overrideClassName]: overrideClassName
  })

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
        metadata={metadata}
      />
      <Accessories
        accessories={accessoriesRight}
        styleName='accessories--right'
      />
    </Container>
  )
}

export default CSSModules(QueueItem, styles)
