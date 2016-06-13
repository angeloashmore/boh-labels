import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'components/form/Label.css'

const Label = ({
  children,
  className: overrideClassName
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <label className={className}>
      {children}
    </label>
  )
}

export default CSSModules(Label, styles)
