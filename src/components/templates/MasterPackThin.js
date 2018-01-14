import Electron, { shell } from 'electron'
import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'
import Immutable from 'immutable'
import Barcode from 'react-barcode'
import temp from 'temp'
import fs from 'fs'

import styles from 'components/templates/MasterPackThin.css'

const { BrowserWindow } = Electron.remote

const MasterPackThin = ({
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
        <div styleName='label__top'>
          <div styleName='top'>
            <div styleName='top__key'>
              <div styleName='key'>
                <span styleName='key__value'>{label.key.substr(2, 3)}</span>
              </div>
            </div>
            <div styleName='top__details'>
              <span styleName='top__details__category'>{label.category}</span>
              <ul styleName='top__details__metadata'>
                {Object.values(label.metadata || {}).map((item) => (
                  <li styleName='top__details__metadata__item'>{item}</li>
                ))}
              </ul>
            </div>
            <div styleName='top__barcode'>
              {label.upc && (
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
              )}
              <table styleName='top__barcode__technical'>
                <tbody>
                  <tr>
                    <th>P/N</th>
                    <td>{label.key}</td>
                  </tr>
                  <tr>
                    <th>Qty</th>
                    <td>{mpQuantity}</td>
                  </tr>
                </tbody>
              </table>
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

MasterPackThin.handlePrint = () => {
  const { webContents } = BrowserWindow.getAllWindows()[0]

  webContents.printToPDF({
    marginsType: 1,
    pageSize: {
      height: 57150,
      width: 101600
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

export default CSSModules(MasterPackThin, styles)
