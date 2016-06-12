import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'elements/QueueItem/Details.css'

const Accessories = ({
  className: overrideClassName,
  metadata = [],
  title
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  const renderMetadata = (
    <ul styleName='metadata'>
      {metadata.map((item, index) => (
        <li
          key={index}
          styleName='metadata__item'
        >
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <div className={className}>
      <div styleName='title'>{title}</div>
      {renderMetadata}
    </div>
  )
}

export default CSSModules(Accessories, styles)
