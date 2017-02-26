import React from 'react'
import CSSModules from 'react-css-modules'

import {
  MasterListContainer,
  PrintSheetContainer,
  QueueContainer
} from 'containers'

import styles from 'components/App.css'

const App = () => (
  <div styleName='base'>
    <MasterListContainer styleName='master-list' />
    <QueueContainer styleName='queue' />
    <PrintSheetContainer styleName='print-sheet' />
  </div>
)

export default CSSModules(App, styles)
