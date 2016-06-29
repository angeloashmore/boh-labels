import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import * as templates from 'components/templates'

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

  const Template = templates[printOptions.template]

  return (
    <div className={className}>
      <Template
        labels={labels}
        printOptions={printOptions}
        queue={queue}
      />
    </div>
  )
}

export default CSSModules(PrintSheet, styles)
