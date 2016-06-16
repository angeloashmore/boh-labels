import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'components/ListDivider.css'

const ListDivider = ({
  className: overrideClassName,
  title
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <div className={className}>
      {title}
    </div>
  )
}

export default CSSModules(ListDivider, styles)
