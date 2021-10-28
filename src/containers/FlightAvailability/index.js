import { connect } from 'react-redux'
import FlightAvailabilityComponent from 'components/FlightAvailability'
import { getFlightAvailability, userActionAudit, getAlertAvailability } from 'actions/FlightAvailability'
import { updateReducerState, pageAnalytics } from 'actions/Common'
import { changeTicketClass, updateToggalClassesState, updateTicketsSearchBox, SendMeAlert } from 'actions/SearchPanel'
import { signup, facebookLoginRequest, googleLoginRequest,
  facebookLoginRequestSuccess, googleLoginRequestSuccess,
  appleLoginRequest, appleLoginRequestSuccess
} from 'actions/Auth'

const mapStateToProps = state => ({
  flights: state.flights,
  toggalClasses: state.searchPanel.toggalClasses,
  searchPanel: state.searchPanel,
  myAlerts: state.dashboard.myAlerts,
  auth: state.auth,
  pageContentLoading: state.common.pageContentLoading,
  pageContentDetails: state.common.pageContentDetails,
  facebookLoginLoading: state.auth.facebookLoginLoading,
  googleLoginLoading: state.auth.googleLoginLoading,
  appleLoginLoading: state.auth.appleLoginLoading,
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  pageAnalytics: () => dispatch(pageAnalytics()),
  getFlightAvailability: (data) => dispatch(getFlightAvailability(data)),
  changeTicketClass: type => dispatch(changeTicketClass(type)),
  updateToggalClassesState: (name, value) => dispatch(updateToggalClassesState(name, value)),
  updateReducerState: (reducerKey, key, value) => dispatch(updateReducerState(reducerKey, key, value)),
  userActionAudit: (data) => dispatch(userActionAudit(data)),
  getAlertAvailability: (data) => dispatch(getAlertAvailability(data)),
  signup: (data) => dispatch(signup(data)),
  facebookLoginRequest: (data) => dispatch(facebookLoginRequest(data)),
  googleLoginRequest: (data) => dispatch(googleLoginRequest(data)),
  appleLoginRequest: (data) => dispatch(appleLoginRequest(data)),
  appleLoginRequestSuccess: (data) => dispatch(appleLoginRequestSuccess(data)),
  facebookLoginRequestSuccess: (data) => dispatch(facebookLoginRequestSuccess(data)),
  googleLoginRequestSuccess: (data) => dispatch(googleLoginRequestSuccess(data)),
  updateTicketsSearchBox: (name, value) => dispatch(updateTicketsSearchBox({ name, value })),
  onSendMeAlert: (data) => dispatch(SendMeAlert(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlightAvailabilityComponent)
