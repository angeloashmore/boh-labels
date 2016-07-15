import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import * as templates from 'components/templates'
import Footer from 'components/Queue/Footer'
import Header from 'components/Queue/Header'
import PrintOptions from 'components/Queue/PrintOptions'
import Items from 'components/Queue/Items'

import styles from 'components/Queue/index.css'

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

  const handlePrint = templates[printOptions.template].handlePrint

  return (
    <div className={className}>
      <Header
        handlePrint={handlePrint}
        queueSize={queue.size}
      />
      <PrintOptions
        setTemplate={printOptionsActions.setTemplate}
        template={printOptions.template}
        templates={templates}
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
