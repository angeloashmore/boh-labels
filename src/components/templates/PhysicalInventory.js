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

  const masterPackQuantity = ({ category }) => {
    let quantity = 1

    if (category.match(/iPhone/)) {
      quantity = 10
    } else if (category.match(/iPad/) && !category.match(/12\.9/)) {
      quantity = 5
    } else if (category.match(/(iPod|Apple TV)/)) {
      quantity = 6
    } else if (category.match(/Watch/)) {
      quantity = 4
    }

    return quantity
  }

  const renderLabel = (quantity, id) => {
    const label = labels.items.get(id)

    return Immutable.Range(0, quantity).map(() => (
      <li styleName='label'>
        <div styleName='label__top'>
          <span styleName='label__top__key'>{label.key.substr(2, 3)}</span>
          <ul styleName='label__top__details'>
            <li>{label.key}</li>
            <li>{label.upc}</li>
          </ul>
        </div>
        <div styleName='label__details'>
          <div styleName='label__details__category'>{label.category}</div>
          <div>
            {Object.values(label.metadata).join(', ')}
          </div>
        </div>
        <ul styleName='label__barcodes'>
          {Immutable.Range(0, masterPackQuantity(label)).map((count) => (
             <li styleName='label__barcodes__item'>
               <span>{count + 1}</span>
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
               <span>{count + 1}</span>
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
      width: 57150
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
