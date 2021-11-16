import { connect } from 'react-redux'
import FlightAvailabilityComponent from 'components/FlightAvailability'
import { getFlightAvailability, userActionAudit, getAlertAvailability } from 'actions/FlightAvailability'
import { updateReducerState, pageAnalytics } from 'actions/Common'
import { changeTicketClass, updateToggalClassesState, updateTicketsSearchBox, SendMeAlert, getAirlineList } from 'actions/SearchPanel'
import { updateProfileDetails } from 'actions/Dashboard'

const mapStateToProps = state => ({
  flights: state.flights,
  toggalClasses: state.searchPanel.toggalClasses,
  searchPanel: state.searchPanel,
  myAlerts: state.dashboard.myAlerts,
  auth: state.auth,
  common: state.common,
  facebookLoginLoading: state.auth.facebookLoginLoading,
  googleLoginLoading: state.auth.googleLoginLoading,
  appleLoginLoading: state.auth.appleLoginLoading,
  user: state.auth.user,
  accountSettings: state.dashboard.accountSettings
})

const mapDispatchToProps = dispatch => ({
  pageAnalytics: () => dispatch(pageAnalytics()),
  getFlightAvailability: (data) => dispatch(getFlightAvailability(data)),
  changeTicketClass: type => dispatch(changeTicketClass(type)),
  updateToggalClassesState: (name, value) => dispatch(updateToggalClassesState(name, value)),
  updateReducerState: (reducerKey, key, value) => dispatch(updateReducerState(reducerKey, key, value)),
  userActionAudit: (data) => dispatch(userActionAudit(data)),
  getAlertAvailability: (data) => dispatch(getAlertAvailability(data)),
  updateTicketsSearchBox: (name, value) => dispatch(updateTicketsSearchBox({ name, value })),
  onSendMeAlert: (data) => dispatch(SendMeAlert(data)),
  getAirlineList: (data) => dispatch(getAirlineList(data)),
  updateProfileDetails: (data) => dispatch(updateProfileDetails(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlightAvailabilityComponent)
