import { connect } from 'react-redux'
import Home from 'components/Home'
import { updateReducerState, pageAnalytics, getWordpressContent } from 'actions/Common'
import { addFingerprintScapperData } from 'actions/Layout'
import { updateProfileDetails, getProfileDetails, getCountriesList, getStateList, getCityList } from 'actions/Dashboard'

const mapStateToProps = state => ({
  home: state.home,
  pageContentLoading: state.common.pageContentLoading,
  pageContentDetails: state.common.pageContentDetails,
  worksLoader: state.common.worksLoader,
  testimonialLoader: state.common.testimonialLoader,
  user: state.auth.user,
  mapPageUrl: state.mapData.mapPageUrl,
  accountSettings: state.dashboard.accountSettings,
  pages: state.pages,
  dashboard: state.dashboard
})

const mapDispatchToProps = dispatch => ({
  pageAnalytics: () => dispatch(pageAnalytics()),
  getWordpressContent: () => dispatch(getWordpressContent()),
  updateReducerState: (reducerKey, key, value) => dispatch(updateReducerState(reducerKey, key, value)),
  addFingerprintScapperData: (data) => dispatch(addFingerprintScapperData(data)),
  updateProfileDetails: (data) => dispatch(updateProfileDetails(data)),
  getProfileDetails: (userId) => dispatch(getProfileDetails(userId)),
  getCountriesList: (data) => dispatch(getCountriesList(data)),
  getStateList: (data) => dispatch(getStateList(data)),
  getCityList: (data) => dispatch(getCityList(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
