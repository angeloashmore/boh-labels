import Electron from 'electron'
import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { Container } from 'components'
import { Button } from 'components/form'

import styles from 'components/MasterList/Footer.css'

const { BrowserWindow, dialog } = Electron.remote

const Footer = ({
  className: overrideClassName,
  addMultipleQueueItems,
  filteredLabels
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  const handleAddAll = () => {
    const addAll = () => addMultipleQueueItems(filteredLabels.map((label) => label.id))

    if (filteredLabels.size > 5) {
      dialog.showMessageBox(BrowserWindow.getAllWindows()[0], {
        type: 'question',
        buttons: [
          'OK',
          'Cancel'
        ],
        defaultId: 0,
        cancelId: 1,
        message: `Are you sure you want to add ${filteredLabels.size} labels?`
      }, (response) => {
        if (response === 0) {
          addAll()
        }
      })
    } else {
      addAll()
    }
  }

  return (
    <Container
      className={className}
      secondary
      shadow={false}
      slim
    >
      <Button
        chrome={false}
        disabled={filteredLabels.size < 1}
        onClick={handleAddAll}
        value='Add All Visible'
      />
    </Container>
  )
}

export default CSSModules(Footer, styles)
