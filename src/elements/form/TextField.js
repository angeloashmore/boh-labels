import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'elements/Form/TextField.css'

const TextField = (props) => {
  const {
    children,
    className: overrideClassName
  } = props

  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <input
      {...props}
      className={className}
      type='text'
    />
  )
}

export default CSSModules(TextField, styles)
