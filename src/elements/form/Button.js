import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'elements/Form/Button.css'

const Button = ({
  className: overrideClassName,
  chrome = true,
  disabled = false,
  onClick = () => {},
  value
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName,
    [styles['base--chrome']]: chrome
  })

  return (
    <input
      className={className}
      disabled={disabled}
      onClick={onClick}
      type='button'
      value={value}
    />
  )
}

export default CSSModules(Button, styles)
