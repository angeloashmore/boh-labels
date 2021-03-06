import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'components/form/TextField.css'

const TextField = ({
  children,
  className: overrideClassName,
  onClick = () => {},
  onChange = () => {},
  value
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <input
      className={className}
      onClick={onClick}
      onChange={onChange}
      type='text'
      value={value}
    />
  )
}

export default CSSModules(TextField, styles)
