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

import styles from 'components/templates/MasterPack.css'

const inflect = Inflect()
const { BrowserWindow } = Electron.remote

const MasterPack = ({
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
          <span styleName='label__top__category'>{label.category}</span>
          <Barcode
            displayValue={false}
            fontSize={0}
            format='UPC'
            height={18}
            margin={0}
            textMargin={0}
            value={label.upc.toString()}
            width={1}
          />
        </div>
        <div styleName='label__key'>{label.key.substr(2, 3)}</div>
        <div styleName='label__bottom'>
          <span styleName='label__bottom__metadata'>
            {Object.values(label.metadata).join(', ')}
          </span>
          <span styleName='label__bottom__date'>
            {months.abbr[date.getMonth()]} {date.getDate()}
          </span>
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

MasterPack.handlePrint = () => {
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

export default CSSModules(MasterPack, styles)
