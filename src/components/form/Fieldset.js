import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'components/form/Fieldset.css'

const Fieldset = ({
  children,
  className: overrideClassName
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default CSSModules(Fieldset, styles)
