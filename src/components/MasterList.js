import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import fuzzySearch from 'lib/fuzzySearch'
import { CollectionSelect, Footer, Header, Items } from 'components/MasterList/index'

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

  const filteredLabels = (function () {
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
  })()

  return (
    <div className={className}>
      <Header
        addQueueItem={queueActions.add}
        labels={filteredLabels}
        setFilterQuery={filterActions.setQuery}
      />
      <CollectionSelect
        collection={filters.collection}
        collections={collections.items}
        setCollection={filterActions.setCollection}
      />
      <Items
        addQueueItem={queueActions.add}
        labels={filteredLabels}
        loading={labels.isPending}
      />
      <Footer
        addMultipleQueueItems={queueActions.addMultiple}
        filteredLabels={filteredLabels}
      />
    </div>
  )
}

export default CSSModules(MasterList, styles)
