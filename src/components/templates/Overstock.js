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
            <span>{label.category}</span>
            <span styleName='top__key'>{label.key.substr(2, 3)}</span>
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
              <span>{months.abbr[date.getMonth()]} {date.getDate()}</span>
            </div>
          </div>
        </div>
        <div styleName='label__bar'></div>
        <div styleName='label__bottom'>
          <div styleName='bottom'>
            <span>{label.category}</span>
            <span styleName='bottom__key'>{label.key.substr(2, 3)}</span>
            <div styleName='bottom__metadata'>
              <ul styleName='metadata'>
                {Object.entries(label.metadata).map(([key, value]) => (
                   <li styleName='metadata__item'>
                     <div styleName='metadata__item__key'>
                       {inflect.titleize(key)}
                     </div>
                     <div>{value}</div>
                   </li>
                 ))}
              </ul>
            </div>
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
              <span>{months.abbr[date.getMonth()]} {date.getDate()}</span>
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
