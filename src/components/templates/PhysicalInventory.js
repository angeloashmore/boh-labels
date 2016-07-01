import Electron, { shell } from 'electron'
import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'
import Immutable from 'immutable'
import Barcode from 'react-barcode'
import temp from 'temp'
import fs from 'fs'

import styles from 'components/templates/PhysicalInventory.css'

const { BrowserWindow } = Electron.remote

const PhysicalInventory = ({
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

    const masterPackQuantity = label.masterPackQuantity ? label.masterPackQuantity : 1

    return Immutable.Range(0, quantity).map(() => (
      <li styleName='label'>
        <div styleName='label__details'>
          <div styleName='label__details__key'>{label.key}</div>
          <div styleName='label__details__category'>{label.category}</div>
          <div styleName='label__details__metadata'>
            {Object.values(label.metadata).join(', ')}
          </div>
          <div styleName='label__details__upc'>{label.upc}</div>
        </div>
        <ul styleName='label__barcodes'>
          {Immutable.Range(0, masterPackQuantity).map((i) => (
             <li styleName='label__barcodes__item'>
               <span styleName='label__barcodes__item__index'>{i + 1}</span>
               <div styleName='label__barcodes__item__barcode'>
                 <Barcode
                   displayValue={false}
                   fontSize={0}
                   format='UPC'
                   height={11}
                   margin={0}
                   textMargin={0}
                   value={label.upc.toString()}
                   width={1}
                 />
               </div>
             </li>
           ))}
        </ul>
      </li>
    ))
  }

  return (
    <ul className={className}>
      {queue.map(renderLabel)}
    </ul>
  )
}

PhysicalInventory.handlePrint = () => {
  const { webContents } = BrowserWindow.getAllWindows()[0]

  webContents.printToPDF({
    marginsType: 1,
    pageSize: {
      height: 101600,
      width: 53975
    },
    printBackground: true
  }, (printToPDFError, data) => {
    if (printToPDFError) throw printToPDFError

    const tempPath = temp.path({
      prefix: 'boh-labels__physical-inventory__',
      suffix: '.pdf'
    })

    fs.writeFile(tempPath, data, (writeFileError) => {
      if (writeFileError) throw writeFileError

      shell.openItem(tempPath)
    })
  })
}

export default CSSModules(PhysicalInventory, styles)
