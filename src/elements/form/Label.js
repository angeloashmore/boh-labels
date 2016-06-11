import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'elements/Form/Label.css'

const Label = (props) => {
  const {
    children,
    className: overrideClassName
  } = props

  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <label
      {...props}
      className={className}
    >
      {children}
    </label>
  )
}

export default CSSModules(Label, styles)
