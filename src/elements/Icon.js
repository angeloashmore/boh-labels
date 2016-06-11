import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'elements/Icon.css'
import * as icons from 'assets/icons'

const Icon = ({
  className: overrideClassName,
  onClick,
  selected,
  type
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  const src = icons[`${type}${selected ? 'Selected' : ''}`]

  return (
    <div className={className}>
      <div styleName='wrapper'>
        <img
          src={src}
          onClick={onClick}
          styleName='image'
        />
      </div>
    </div>
  )
}

Icon.defaultProps = {
  selected: false
}

export default CSSModules(Icon, styles)
