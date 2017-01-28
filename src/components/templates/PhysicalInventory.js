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
    } else if (category.match(/Watch Series 1/)) {
      quantity = 6
    } else if (category.match(/((Watch Series 2)|(Watch Nike))/)) {
      quantity = 4
    } else if (category.match(/ScreenCare/)) {
      quantity = 10
    }

    return quantity
  }

  const renderLabel = (quantity, id) => {
    const label = labels.items.get(id)
    const mpQuantity = masterPackQuantity(label)

    return Immutable.Range(0, quantity).map(() => (
      <li styleName='label'>
        <div styleName='label__key'>{label.key}</div>
        <div styleName='label__details'>
          <div styleName='label__details__item'>{label.category}</div>
          <div styleName='label__details__item'>
            {Object.values(label.metadata).join(', ')}
          </div>
        </div>
        <div styleName='label__quantity'>
          {mpQuantity + ' '}
          unit{mpQuantity === 1 ? '' : 's'} per pack
        </div>
        <ol styleName='label__barcodes'>
          {Immutable.Range(0, mpQuantity).map((count) => (
             <li styleName='label__barcodes__item'>
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
             </li>
           ))}
        </ol>
        <div>
          {label.upc.toString().substr(0, 4) + ' '}
          {label.upc.toString().substr(4, 4) + ' '}
          {label.upc.toString().substr(8)}
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
