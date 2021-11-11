import { connect } from 'react-redux'
import ProfileDetails from 'components/ProfileDetails'
import { updateReducerState, updateUserName } from 'actions/Common'
import { updateProfileDetails, getProfileDetails, getCountriesList } from 'actions/Dashboard'
import { getSouDesLocations, getSouDesPossibleRoutes, getUserNearestAirport } from 'actions/SearchPanel'

const mapStateToProps = state => ({
  userRegisterConfirmation: state.auth.userRegisterConfirmation,
  user: state.auth.user,
  fetchingProfileDetails: state.dashboard.accountSettings.fetchingProfileDetails,
  accountSettings: state.dashboard.accountSettings,
  updateUserNameLoading: state.common.updateUserNameLoading,
  dashboard: state.dashboard,
  searchPanel: state.searchPanel
})

const mapDispatchToProps = dispatch => ({
  updateReducerState: (reducerKey, key, value) => dispatch(updateReducerState(reducerKey, key, value)),
  updateProfileDetails: (data) => dispatch(updateProfileDetails(data)),
  getProfileDetails: (id) => dispatch(getProfileDetails(id)),
  updateUserName: (data) => dispatch(updateUserName(data)),
  getSouDesLocations: (data) => dispatch(getSouDesLocations(data)),
  getSouDesPossibleRoutes: (data) => dispatch(getSouDesPossibleRoutes(data)),
  getUserNearestAirport: (data) => dispatch(getUserNearestAirport(data)),
  getCountriesList: (data) => dispatch(getCountriesList(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDetails)
