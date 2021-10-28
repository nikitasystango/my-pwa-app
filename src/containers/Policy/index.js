import { connect } from 'react-redux'
import Policy from 'components/Policy'
import { pageAnalytics } from 'actions/Common'

const mapStateToProps = state => ({
  pageContentDetails: state.common.pageContentDetails,
  pageContentLoading: state.common.pageContentLoading
})

const mapDispatchToProps = dispatch => ({
  pageAnalytics: () => dispatch(pageAnalytics())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Policy)
