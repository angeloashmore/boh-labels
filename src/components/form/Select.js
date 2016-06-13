import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'components/form/Select.css'

const Select = ({
  children,
  className: overrideClassName
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <select className={className}>
      {children}
    </select>
  )
}

export default CSSModules(Select, styles)
