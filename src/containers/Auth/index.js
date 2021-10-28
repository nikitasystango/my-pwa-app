import { connect } from 'react-redux'
import AuthComponent from 'components/Auth'
import {
  login, signup, facebookLoginRequest, googleLoginRequest,
  facebookLoginRequestSuccess, googleLoginRequestSuccess,
  appleLoginRequest, appleLoginRequestSuccess
} from 'actions/Auth'
import { pageAnalytics, getWordpressContent, updateReducerState } from 'actions/Common'
import { getProfileDetails, removeProfilePicture } from 'actions/Dashboard'

const mapStateToProps = state => ({
  auth: state.auth,
  pageContentLoading: state.common.pageContentLoading,
  pageContentDetails: state.common.pageContentDetails,
  facebookLoginLoading: state.auth.facebookLoginLoading,
  googleLoginLoading: state.auth.googleLoginLoading,
  appleLoginLoading: state.auth.appleLoginLoading
})

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(login(data)),
  signup: (data) => dispatch(signup(data)),
  getWordpressContent: () => dispatch(getWordpressContent()),
  pageAnalytics: () => dispatch(pageAnalytics()),
  facebookLoginRequest: (data) => dispatch(facebookLoginRequest(data)),
  googleLoginRequest: (data) => dispatch(googleLoginRequest(data)),
  updateReducerState: (reducerKey, key, value) => dispatch(updateReducerState(reducerKey, key, value)),
  facebookLoginRequestSuccess: (data) => dispatch(facebookLoginRequestSuccess(data)),
  googleLoginRequestSuccess: (data) => dispatch(googleLoginRequestSuccess(data)),
  getProfileDetails: (id) => dispatch(getProfileDetails(id)),
  removeProfilePicture: (data) => dispatch(removeProfilePicture(data)),
  appleLoginRequest: (data) => dispatch(appleLoginRequest(data)),
  appleLoginRequestSuccess: (data) => dispatch(appleLoginRequestSuccess(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthComponent)
