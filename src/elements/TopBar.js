import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Container, Draggable } from 'elements'

import styles from 'elements/TopBar.css'

const TopBar = ({
  children,
  className: overrideClassName
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <Draggable>
      <Container className={className}>
        {children}
      </Container>
    </Draggable>
  )
}

export default CSSModules(TopBar, styles)
