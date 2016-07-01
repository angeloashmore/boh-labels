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
        <div styleName='label__stamp'>
          <span styleName='label__stamp__category'>
            {label.category}
          </span>
          <span styleName='label__stamp__identifier'>
            {label.key.substr(2, 3)}
          </span>
          <span styleName='label__stamp__part-number'>
            {label.key}
          </span>
        </div>
        <ul styleName='label__metadata'>
          {Object.entries(label.metadata).map(([key, value]) => (
            <li styleName='label__metadata__item'>
              <span styleName='label__metadata__item__key'>
                {inflect.titleize(key)}
              </span>
              <span styleName='label__metadata__item__value'>
                {value}
              </span>
            </li>
          ))}
        </ul>
        <div styleName='label__footer'>
          <div styleName='label__footer__date'>
            <span styleName='label__footer__date__month'>
              {months.abbr[date.getMonth()]}
            </span>
            <span styleName='label__footer__date__date'>
              {date.getDate()}
            </span>
          </div>
          <div styleName='label__footer__barcode'>
            <Barcode
              displayValue={false}
              fontSize={0}
              format='UPC'
              height={13}
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

MasterPack.handlePrint = () => {
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
