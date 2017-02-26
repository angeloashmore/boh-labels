import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import { TopBar, Icon } from 'components'

import styles from 'components/MasterList/Header.css'

const Header = ({
  className: overrideClassName,
  addQueueItem,
  labels,
  setFilterQuery
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  return (
    <TopBar className={className}>
      <Icon type='search' styleName='search-icon' />
      <input
        id='search'
        onKeyPress={({ key, target }) => {
          if (key === 'Enter') {
            if (labels.size > 0) {
              addQueueItem(labels.first().id)
            }

            target.select()
          }
        }}
        onChange={({ target }) => setFilterQuery(target.value)}
        styleName='search'
        type='text'
      />
    </TopBar>
  )
}

export default CSSModules(Header, styles)
