import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'components/form/Select.css'

const Select = ({
  children,
  className: overrideClassName,
  onChange = () => {},
  value
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <select
      className={className}
      onChange={onChange}
      value={value}
    >
      {children}
    </select>
  )
}

export default CSSModules(Select, styles)
