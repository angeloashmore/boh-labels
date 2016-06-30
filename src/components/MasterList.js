import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import fuzzySearch from 'lib/fuzzySearch'
import { Container, Icon, ListDivider, QueueItem, TopBar } from 'components'
import { Button, Fieldset, Label, Select, TextField } from 'components/form'

import styles from 'components/MasterList.css'

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

  const collection = collections.items.find((value, key) => {
    return key === filters.collection
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
      selected={selected}
      type='info'
    />,
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

  const labelsList = () => {
    const { query } = filters

    const filteredItems = labels.items.filter((item) => {
      let result = true

      if (collection) {
        result = result && collection.label_ids.includes(item.id)
      }

      if (query.trim().length > 0) {
        result = result && fuzzySearch(item, query)
      }

      return result
    })

    return filteredItems.map(({ category, id, key, metadata }) => (
      <QueueItem
        key={id}
        accessoriesLeft={accessoriesLeft('label')}
        accessoriesRight={accessoriesRight([id])}
        category={category}
        metadata={metadata}
        title={key}
      />
    ))
  }

  const renderList = (
    <div styleName='list'>
      {labelsList()}
    </div>
  )

  const renderLoading = (
    <div styleName='loading'>
      Loading
    </div>
  )

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
            <option value=''>All collections</option>
            {collections.items.map(({ id, key }) => (
               <option value={id}>{key}</option>
             ))}
          </Select>
          {collection ? (
            <Icon
              onClick={() => {queueActions.addMultiple(collection.label_ids)}}
              styleName='addAllButton'
              type='addAll'
            />
           ) : ''}
        </Fieldset>
      </Container>
      {labels.isPending || labels.isPending ? renderLoading : renderList}
    </div>
  )
}

export default CSSModules(MasterList, styles)
