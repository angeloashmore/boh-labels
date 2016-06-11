import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'elements/Form/Fieldset.css'

const Fieldset = (props) => {
  const {
    children,
    className: overrideClassName
  } = props

  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <div
      {...props}
      className={className}
    >
      {children}
    </div>
  )
}

export default CSSModules(Fieldset, styles)
