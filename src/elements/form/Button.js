import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'elements/Form/Button.css'

const Button = (props) => {
  const {
    className: overrideClassName,
    chrome
  } = props

  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName,
    [styles['base--chrome']]: chrome
  })

  return (
    <input
      {...props}
      className={className}
      type='button'
    />
  )
}

Button.defaultProps = {
  chrome: true
}

export default CSSModules(Button, styles)
