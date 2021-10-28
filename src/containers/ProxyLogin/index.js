import { connect } from 'react-redux'
import ProxyLoginComponent from 'components/ProxyLogin'
import { getProfileDetails } from 'actions/Dashboard'

const mapStateToProps = state => ({
  pageContentDetails: state.common.pageContentDetails,
  pageContentLoading: state.common.pageContentLoading
})

const mapDispatchToProps = dispatch => ({
    getProfileDetails: (userId) => dispatch(getProfileDetails(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProxyLoginComponent)
