import Electron from 'electron'
import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Container } from 'components'
import { Button } from 'components/form'

import styles from 'components/Queue/Footer.css'

const { BrowserWindow, dialog } = Electron.remote

const Footer = ({
  className: overrideClassName,
  queueSize,
  removeAllItems
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  const handleClearAll = () => {
    if (queueSize < 5) {
      removeAllItems()
    } else {
      dialog.showMessageBox(BrowserWindow.getAllWindows()[0], {
        type: 'question',
        buttons: [
          'OK',
          'Cancel'
        ],
        defaultId: 0,
        cancelId: 1,
        message: `Are you sure you want to clear all ${queueSize} labels?`
      }, (response) => {
        if (response === 0) {
          removeAllItems()
        }
      })
    }
  }

  return (
    <Container
      className={className}
      shadow={false}
      slim
    >
      <Button
        chrome={false}
        disabled={queueSize < 1}
        onClick={handleClearAll}
        value='Clear All'
      />
    </Container>
  )
}

export default CSSModules(Footer, styles)
