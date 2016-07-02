import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Footer, Header, Items, PrintOptions } from 'components/Queue/index'
import * as templates from 'components/templates'

import styles from 'components/Queue.css'

const Queue = ({
  className: overrideClassName,
  labels,
  printOptions,
  printOptionsActions,
  queue,
  queueActions
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <div className={className}>
      <Header
        handlePrint={templates[printOptions.template].handlePrint}
        queueSize={queue.size}
      />
      <PrintOptions
        setTemplate={printOptionsActions.setTemplate}
        template={printOptions.template}
      />
      <Items
        changeQuantity={queueActions.changeQuantity}
        items={queue.items}
        labels={labels.items}
        removeItem={queueActions.remove}
      />
      <Footer
        queueSize={queue.size}
        removeAllItems={queueActions.removeAll}
      />
    </div>
  )
}

export default CSSModules(Queue, styles)
