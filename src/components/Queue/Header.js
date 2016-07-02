import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { TopBar } from 'components'
import { Button } from 'components/form'

import styles from 'components/Queue/Header.css'

const Header = ({
  className: overrideClassName,
  handlePrint,
  queueSize
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <TopBar className={className}>
      <span>{queueSize} label{queueSize === 1 ? '' : 's'}</span>
      <Button
        disabled={queueSize < 1}
        onClick={handlePrint}
        value='Print'
      />
    </TopBar>
  )
}

export default CSSModules(Header, styles)
