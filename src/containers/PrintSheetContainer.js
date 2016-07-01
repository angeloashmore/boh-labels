import { connect } from 'react-redux'

import { PrintSheet } from 'components'

const mapStateToProps = (state) => ({
  labels: state.labels,
  printOptions: state.printOptions,
  queue: state.queue.items
})

export default connect(
  mapStateToProps
)(PrintSheet)
