import React from 'react'
import CSSModules from 'react-css-modules'
import cx from 'classnames'

import CollectionSelect from 'components/MasterList/CollectionSelect'
import Footer from 'components/MasterList/Footer'
import Header from 'components/MasterList/Header'
import Items from 'components/MasterList/Items'

import styles from 'components/MasterList/index.css'

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

    const collection = collections.items.get(collectionId)
    const needles = query.toLowerCase().trim().split(' ')

    const queryIsEventuallyUPC = needles.length === 1 &&
                                 needles[0].length > 3 &&
                                 Number.parseInt(needles[0])

    if (queryIsEventuallyUPC) {
      if (needles[0].length == 12) {
        return labels.items.filter((item) => item.upc == needles[0])
      } else {
        return labels.items.constructor()
      }
    }

    let result = labels.items

    if (collection) {
      result = result.filter((item) => collection.label_ids.includes(item.id))
    }

    if (needles[0].length > 0) {
      result = result.filter((item) => {
        const subject = { ...item, id: undefined, upc: undefined }
        const haystack = JSON.stringify(subject).toLowerCase()

        return needles.every((needle) => haystack.indexOf(needle) > 0)
      })
    }

    return result
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
