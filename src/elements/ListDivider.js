import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'elements/ListDivider.css'

const ListDivider = ({
  className: overrideClassName,
  value
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <div className={className}>
      {value}
    </div>
  )
}

export default CSSModules(ListDivider, styles)
