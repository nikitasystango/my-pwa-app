import { connect } from 'react-redux'
import { getMapLocations } from 'actions/MapView'
import { updateReducerState } from 'actions/Common'
import { getAirlineList, getSouDesPossibleRoutes, getSouDesLocations } from 'actions/SearchPanel'
import {
  updateTicketsSearchBox, updateToggalClassesState
} from 'actions/SearchPanel'
import MapView from 'components/MapView'
import { userActionAudit } from 'actions/FlightAvailability'
import { updateProfileDetails } from 'actions/Dashboard'


const mapStateToProps = state => ({
  mapData: state.mapData,
  searchPanel: state.searchPanel,
  flightsAvailability: state.flights.flightsAvailability,
  isUserBronzeMember: state.auth.user.isUserBronzeMember,
  common: state.common,
  user: state.auth.user,
  accountSettings: state.dashboard.accountSettings
})

const mapDispatchToProps = dispatch => ({
  getMapLocations: data => dispatch(getMapLocations(data)),
  updateReducerState: (reducerKey, key, value) => dispatch(updateReducerState(reducerKey, key, value)),
  updateTicketsSearchBox: (name, value) => dispatch(updateTicketsSearchBox({ name, value })),
  getAirlineList: (data) => dispatch(getAirlineList(data)),
  updateToggalClassesState: (name, value) => dispatch(updateToggalClassesState(name, value)),
  userActionAudit: (data) => dispatch(userActionAudit(data)),
  getSouDesPossibleRoutes: (data) => dispatch(getSouDesPossibleRoutes(data)),
  getSouDesLocations: (data) => dispatch(getSouDesLocations(data)),
  updateProfileDetails: (data) => dispatch(updateProfileDetails(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)
