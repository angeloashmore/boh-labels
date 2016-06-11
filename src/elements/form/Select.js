import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'elements/Form/Select.css'

const Select = (props) => {
  const {
    children,
    className: overrideClassName
  } = props

  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <select
      {...props}
      className={className}
    >
      {children}
    </select>
  )
}

export default CSSModules(Select, styles)
