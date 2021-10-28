import { connect } from 'react-redux'
import SearchPanel from 'components/SearchPanel'
import {
  getAirlineList, SendMeAlert, getSearchedLocation, updateTicketsSearchBox,
  changeTicketClass, updateDoNotKnowSearch, getSouDesLocations, getSouDesPossibleRoutes,
  getUserNearestAirport
} from 'actions/SearchPanel'
import { updateReducerState } from 'actions/Common'
import { cancelSubscribedAlerts, editAlert } from 'actions/Dashboard'
import { getFlightAvailability } from 'actions/FlightAvailability'

const mapStateToProps = state => ({
  ticketsSearchBox: state.searchPanel.ticketsSearchBox,
  searchPanel: state.searchPanel,
  flightsAvailability: state.flights.flightsAvailability,
  isUserBronzeMember: state.auth.user.isUserBronzeMember,
  isUserSilverMember: state.auth.user.isUserSilverMember,
  isUserGoldMember: state.auth.user.isUserGoldMember,
  isEmailVerified: state.auth.user.isEmailVerified,
  createAlertsLimit: state.auth.user.createAlertsLimit,
  activeAlertsCount: state.auth.user.activeAlertsCount,
  dashboard: state.dashboard,
  allowedAlertDateRange: state.auth.user.allowedAlertDateRange,
  flights: state.flights
})

const mapDispatchToProps = dispatch => ({
  getAirlineList: (data) => dispatch(getAirlineList(data)),
  getSearchedLocation: (keyword, type) => dispatch(getSearchedLocation(keyword, type)),
  updateReducerState: (reducerKey, key, value) => dispatch(updateReducerState(reducerKey, key, value)),
  onSendMeAlert: (data) => dispatch(SendMeAlert(data)),
  updateTicketsSearchBox: (name, value) => dispatch(updateTicketsSearchBox({ name, value })),
  changeTicketClass: type => dispatch(changeTicketClass(type)),
  updateDoNotKnowSearch: (name, value) => dispatch(updateDoNotKnowSearch({ name, value })),
  getSouDesLocations: (data) => dispatch(getSouDesLocations(data)),
  getSouDesPossibleRoutes: (data) => dispatch(getSouDesPossibleRoutes(data)),
  getUserNearestAirport: (data) => dispatch(getUserNearestAirport(data)),
  cancelSubscribedAlerts: (id) => dispatch(cancelSubscribedAlerts(id)),
  editAlert: (data, id) => dispatch(editAlert(data, id)),
  getFlightAvailability: (data) => dispatch(getFlightAvailability(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPanel)
