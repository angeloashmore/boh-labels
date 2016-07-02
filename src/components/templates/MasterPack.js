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

const MasterPackHorizontal = ({
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
          <div styleName='stamp'>
            <span styleName='stamp__category'>
              {label.category}
            </span>
            <span styleName='stamp__identifier'>
              {label.key.substr(2, 3)}
            </span>
            <span styleName='stamp__part-number'>
              {label.key}
            </span>
          </div>
        </div>
        <div styleName='label__details'>
          <div styleName='details'>
            <div styleName='details__metadata'>
              <ul styleName='metadata'>
                {Object.entries(label.metadata).map(([key, value]) => (
                  <li styleName='metadata__item'>
                    <span styleName='metadata__item__key'>
                      {inflect.titleize(key)}
                    </span>
                    <span styleName='metadata__item__value'>
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div styleName='details__footer'>
              <div styleName='footer'>
                <div styleName='footer__date'>
                  <span styleName='footer__date__month'>
                    {months.abbr[date.getMonth()]}
                  </span>
                  <span styleName='footer__date__date'>
                    {date.getDate()}
                  </span>
                </div>
                <div styleName='footer__barcode'>
                  <div styleName='footer__barcode__svg'>
                    <Barcode
                      displayValue={false}
                      fontSize={0}
                      format='UPC'
                      height={22}
                      margin={0}
                      textMargin={0}
                      value={label.upc.toString()}
                      width={1}
                    />
                  </div>
                  <span styleName='footer__barcode__value'>
                    {label.upc.toString().substr(0, 1) + ' '}
                    {label.upc.toString().substr(1, 5) + ' '}
                    {label.upc.toString().substr(6, 5) + ' '}
                    {label.upc.toString().substr(-1)}
                  </span>
                </div>
              </div>
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

MasterPackHorizontal.handlePrint = () => {
  const { webContents } = BrowserWindow.getAllWindows()[0]

  webContents.printToPDF({
    marginsType: 1,
    pageSize: {
      height: 53975,
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

export default CSSModules(MasterPackHorizontal, styles)
