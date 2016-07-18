import Electron, { shell } from 'electron'
import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'
import Immutable from 'immutable'
import Barcode from 'react-barcode'
import months from 'months'
import Inflect from 'i'
import temp from 'temp'
import fs from 'fs'

import styles from 'components/templates/Overstock.css'

const inflect = Inflect()
const { BrowserWindow } = Electron.remote

const Overstock = ({
  className: overrideClassName,
  labels,
  printOptions,
  queue
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  const renderLabel = (quantity, id) => {
    const label = labels.items.get(id)
    const date = new Date()

    return Immutable.Range(0, quantity).map(() => (
      <li styleName='label'>
        <div styleName='label__top'>
          <div styleName='top'>
            <div styleName='top__category'>
              <span styleName='category'>{label.category}</span>
            </div>
            <div styleName='top__key'>
              <div styleName='key'>
                <span styleName='key__value'>{label.key.substr(2, 3)}</span>
              </div>
            </div>
            <div styleName='top__footer'>
              <Barcode
                displayValue={false}
                fontSize={0}
                format='UPC'
                height={12}
                margin={0}
                textMargin={0}
                value={label.upc.toString()}
                width={1}
              />
              <span>
                {months.abbr[date.getMonth()]} {date.getDate()}
              </span>
            </div>
          </div>
        </div>
        <div styleName='label__bottom'>
          <div styleName='bottom'>
            <div styleName='bottom__category'>
              <span styleName='category'>{label.category}</span>
            </div>
            <div styleName='bottom__key'>
              <div styleName='key'>
                <span styleName='key__value'>{label.key.substr(2, 3)}</span>
              </div>
            </div>
            <ul styleName='bottom__metadata'>
              {Object.values(label.metadata).map((item) => (
                 <li styleName='bottom__metadata__item'>{item}</li>
               ))}
            </ul>
            <div styleName='bottom__footer'>
              <Barcode
                displayValue={false}
                fontSize={0}
                format='UPC'
                height={12}
                margin={0}
                textMargin={0}
                value={label.upc.toString()}
                width={1}
              />
              <span>
                {months.abbr[date.getMonth()]} {date.getDate()}
              </span>
            </div>
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

Overstock.handlePrint = () => {
  const { webContents } = BrowserWindow.getAllWindows()[0]

  webContents.printToPDF({
    marginsType: 1,
    pageSize: {
      height: 101600,
      width: 57150
    },
    printBackground: true
  }, (printToPDFError, data) => {
    if (printToPDFError) throw printToPDFError

    const tempPath = temp.path({
      prefix: 'boh-labels__master-pack__',
      suffix: '.pdf'
    })

    fs.writeFile(tempPath, data, (writeFileError) => {
      if (writeFileError) throw writeFileError

      shell.openItem(tempPath)
    })
  })
}

export default CSSModules(Overstock, styles)
