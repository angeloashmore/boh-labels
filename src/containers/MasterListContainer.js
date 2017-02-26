import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import MasterList from 'components/MasterList'
import * as filterActions from 'modules/filters'
import * as queueActions from 'modules/queue'

const mapStateToProps = (state) => ({
  collections: state.collections,
  filters: state.filters,
  labels: state.labels
})

const mapDispatchToProps = (dispatch) => ({
  filterActions: bindActionCreators(filterActions, dispatch),
  queueActions: bindActionCreators(queueActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterList)
