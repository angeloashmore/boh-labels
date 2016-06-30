import Electron from 'electron'
import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import fuzzySearch from 'lib/fuzzySearch'
import { Container, Icon, ListDivider, QueueItem, TopBar } from 'components'
import { Button, Fieldset, Label, Select, TextField } from 'components/form'

import styles from 'components/MasterList.css'

const { BrowserWindow, dialog } = Electron.remote

const MasterList = ({
  className: overrideClassName,
  collections,
  filters,
  filterActions,
  labels,
  queueActions
}) => {
  const className = cx(styles.base, {
    [overrideClassName]: overrideClassName
  })

  const accessoriesLeft = (type, selected = false) => [
    <Icon
      className={styles['accessories-left-icon']}
      selected={selected}
      type={type}
    />
  ]

  const accessoriesRight = (ids, selected = false) => [
    <Icon
      onClick={() => queueActions.addMultiple(ids)}
      selected={selected}
      type='add'
    />
  ]

  const topBar = (
    <TopBar styleName='top-bar'>
      <Icon type='search' styleName='search-icon' />
      <input
        onChange={({ target }) => filterActions.setQuery(target.value)}
        styleName='search'
        type='text'
      />
    </TopBar>
  )

  const filteredLabels = function() {
    const { collection: collectionId, query } = filters

    const collection = collections.items.find((value, key) => {
      return key === collectionId
    })

    return labels.items.filter((item) => {
      let result = true

      if (collection) {
        result = result && collection.label_ids.includes(item.id)
      }

      if (query.trim().length > 0) {
        result = result && fuzzySearch(item, query)
      }

      return result
    })
  }()

  const labelsList = filteredLabels.map(({ category, id, key, metadata }) => (
      <QueueItem
        key={id}
        accessoriesLeft={accessoriesLeft('label')}
        accessoriesRight={accessoriesRight([id])}
        category={category}
        metadata={metadata}
        title={key}
      />
    )
  )

  const renderList = (
    <div styleName='list'>
      {labelsList}
    </div>
  )

  const renderLoading = (
    <div styleName='loading'>
      Loading
    </div>
  )

  const handleAddAll = () => {
    const addAll = () => queueActions.addMultiple(filteredLabels.map((label) => label.id))

    if (filteredLabels.size > 5) {
      dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
        type: 'question',
        buttons: [
          'OK',
          'Cancel'
        ],
        defaultId: 0,
        cancelId: 1,
        message: `Are you sure you want to add ${filteredLabels.size} labels?`
      }, (response) => {
        if (response === 0) {
          addAll()
        }
      })
    } else {
      addAll()
    }
  }

  return (
    <div className={className}>
      {topBar}
      <Container slim={true}>
        <Fieldset>
          <Label>Collection:</Label>
          <Select
            onChange={({ target }) => filterActions.setCollection(target.value)}
            value={filters.collection}
          >
            <option value=''>All labels</option>
            {collections.items.map(({ id, key }) => (
               <option value={id}>{key}</option>
             ))}
          </Select>
        </Fieldset>
      </Container>
      {labels.isPending || labels.isPending ? renderLoading : renderList}
      <Container
        secondary={true}
        slim={true}
        styleName='bottomBar'
      >
        <Button
          chrome={false}
          disabled={!(filteredLabels.size > 0)}
          onClick={handleAddAll}
          value="Add All Visible"
        />
      </Container>
    </div>
  )
}

export default CSSModules(MasterList, styles)
