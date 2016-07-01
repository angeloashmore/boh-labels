import Electron, { shell } from 'electron'
import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'
import Immutable from 'immutable'
import Barcode from 'react-barcode'
import temp from 'temp'
import fs from 'fs'

import styles from 'components/templates/Shelf.css'

const { BrowserWindow } = Electron.remote

const Shelf = ({
  className: overrideClassName,
  labels,
  printOptions,
  queue
}) => {
  const className = cx(styles.base, {
    [styles['base--small']]: true,
    [overrideClassName]: overrideClassName
  })

  const renderLabel = (quantity, id) => {
    const label = labels.items.get(id)

    return Immutable.Range(0, quantity).map(() => (
      <li styleName='label'>
        <div styleName='label__main'>
          <div
            styleName='label__main__color-bar'
            style={{ backgroundColor: `#${label.tag_color}` }}
          >
            <div styleName='label__main__color-bar__category'>
              {label.category}
            </div>
            <div styleName='label__main__color-bar__group'>
              {label.group}
            </div>
          </div>
          <div styleName='label__main__body'>
            <div styleName='label__main__body__key'>
              {label.key.match(/\/[A-Z]$/) ? label.key.substr(2, 3) : label.key}
            </div>
            <ul styleName='label__main__body__metadata'>
              {Object.values(label.metadata).map((value) => (
                 <li styleName='label__main__body__metadata__item'>
                   {value}
                 </li>
               ))}
            </ul>
          </div>
        </div>
        <div styleName='label__barcode-wrapper'>
          <div styleName='label__barcode-wrapper__barcode'>
            <Barcode
              displayValue={false}
              fontSize={0}
              format='UPC'
              height={34}
              margin={0}
              textMargin={0}
              value={label.upc.toString()}
              width={1}
            />
          </div>
        </div>
      </li>
    ))
  }

  return (
    <ul className={className}>
      {queue.map(renderLabel)}
    </ul>
  )
}

Shelf.handlePrint = () => {
  const { webContents } = BrowserWindow.getAllWindows()[0]

  webContents.printToPDF({
    pageSize: 'Letter',
    printBackground: true
  }, (printToPDFError, data) => {
    if (printToPDFError) throw printToPDFError

    const tempPath = temp.path({
      prefix: 'boh-labels__shelf__',
      suffix: '.pdf'
    })

    fs.writeFile(tempPath, data, (writeFileError) => {
      if (writeFileError) throw writeFileError

      shell.openItem(tempPath)
    })
  })
}

export default CSSModules(Shelf, styles)
