import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'components/QueueItem/Accessories.css'

const Accessories = ({
  accessories,
  className: overrideClassName
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  const renderAccessories = (
    accessories.map((item, index) => (
      <li
        key={index}
        styleName='item'
      >
        {item}
      </li>
    ))
  )

  return (
    <ul className={className}>
      {renderAccessories}
    </ul>
  )
}

Accessories.defaultProps = {
  accessories: []
}

export default CSSModules(Accessories, styles)
