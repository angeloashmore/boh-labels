import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import styles from 'components/PrintSheet.css'

const PrintSheet = ({
  className: overrideClassName,
  labels,
  printOptions,
  queue
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <div className={className}>
      Print {queue.size} labels using the {printOptions.template} template.
    </div>
  )
}

export default CSSModules(PrintSheet, styles)
