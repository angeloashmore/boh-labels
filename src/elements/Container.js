import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'elements/Container.css'

const Container = ({
  children,
  className: overrideClassName,
  secondary = false,
  shadow = true,
  slim = false
}) => {
  const className = cx(styles.base, {
    [styles.secondary]: secondary,
    [styles.shadow]: shadow,
    [styles.slim]: slim,
    [overrideClassName]: overrideClassName
  })

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default CSSModules(Container, styles)
