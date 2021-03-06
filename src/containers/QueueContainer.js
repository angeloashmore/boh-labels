import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Queue from 'components/Queue'
import * as printOptionsActions from 'modules/printOptions'
import * as queueActions from 'modules/queue'

const mapStateToProps = (state) => ({
  labels: state.labels,
  printOptions: state.printOptions,
  queue: state.queue
})

const mapDispatchToProps = (dispatch) => ({
  printOptionsActions: bindActionCreators(printOptionsActions, dispatch),
  queueActions: bindActionCreators(queueActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queue)
