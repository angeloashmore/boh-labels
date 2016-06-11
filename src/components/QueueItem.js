import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Container } from 'elements'

import styles from 'components/QueueItem.css'

const QueueItem = ({
  accessoriesLeft,
  accessoriesRight,
  className: overrideClassName,
  selected,
  title,
  metadata
}) => {
  const className = cx(styles.base, {
    [styles['base--selected']]: selected,
    [overrideClassName]: overrideClassName
  })

  return (
    <Container
      className={className}
      shadow={false}
      slim={true}
    >
      <ul styleName='accessories--left'>
        {accessoriesLeft.map((item, index) => (
          <li key={index} styleName='accessories__item'>{item}</li>
        ))}
      </ul>
      <div styleName='details'>
        <div styleName='details__title'>{title}</div>
        <ul styleName='details__metadata'>
          {metadata.map((item, index) => (
            <li key={index} styleName='details__metadata__item'>{item}</li>
          ))}
        </ul>
      </div>
      <ul styleName='accessories--right'>
        {accessoriesRight.map((item, index) => (
          <li key={index} styleName='accessories__item'>{item}</li>
        ))}
      </ul>
    </Container>
  )
}

QueueItem.defaultProps = {
  accessoriesLeft: [],
  accessoriesRight: [],
  metadata: []
}

export default CSSModules(QueueItem, styles)
