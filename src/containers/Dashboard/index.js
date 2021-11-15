import { connect } from 'react-redux'
import Dashboard from 'components/Dashboard'
import { profilePictureUploadModalToggle } from 'actions/Dashboard'
import { pageAnalytics, updateReducerState } from 'actions/Common'
import { getPricingPlans, cancelEliteMembership } from 'actions/Pages'
import {
  getSubscribedAlerts,
  cancelSubscribedAlerts,
  updateProfileDetails,
  getProfileDetails,
  toggleModals,
  changePassword,
  editAlert,
  setSocialUserPassword,
  addAlternateEmail,
  editAlternateEmail,
  deleteAlternateEmail,
  verifySmsOtp,
  resendSmsOtp,
  toggleSmsNotification,
  setEmailPrimary,
  resendVerificationEmail,
  toggleEmailsNotification,
  deletePhoneNumber,
  cancelDowngradeSubscription,
  getCountriesList
} from 'actions/Dashboard'
import { getFlightAvailability } from 'actions/FlightAvailability'
import { getAirlineList, getSouDesLocations, getSouDesPossibleRoutes, getUserNearestAirport } from 'actions/SearchPanel'

const mapStateToProps = state => ({
  dashboard: state.dashboard,
  user: state.auth.user,
  pricingPlans: state.pages.pricingPlans,
  airlines: state.searchPanel.airlines,
  cancelEliteLoading: state.pages.cancelEliteLoading,
  flights: state.flights,
  searchPanel: state.searchPanel
})

const mapDispatchToProps = dispatch => ({
  getSubscribedAlerts: () => dispatch(getSubscribedAlerts()),
  cancelSubscribedAlerts: (id) => dispatch(cancelSubscribedAlerts(id)),
  updateProfileDetails: (data) => dispatch(updateProfileDetails(data)),
  profilePictureUploadModalToggle: () => dispatch(profilePictureUploadModalToggle()),
  getProfileDetails: (userId) => dispatch(getProfileDetails(userId)),
  toggleModals: (name) => dispatch(toggleModals(name)),
  changePassword: (passwords) => dispatch(changePassword(passwords)),
  pageAnalytics: () => dispatch(pageAnalytics()),
  getPricingPlans: () => dispatch(getPricingPlans()),
  getAirlineList: (data) => dispatch(getAirlineList(data)),
  editAlert: (data, id) => dispatch(editAlert(data, id)),
  setSocialUserPassword: (data) => dispatch(setSocialUserPassword(data)),
  addAlternateEmail: (data, name) => dispatch(addAlternateEmail(data, name)),
  editAlternateEmail: (data, name) => dispatch(editAlternateEmail(data, name)),
  deleteAlternateEmail: (data) => dispatch(deleteAlternateEmail(data)),
  verifySmsOtp: (data) => dispatch(verifySmsOtp(data)),
  resendSmsOtp: (data) => dispatch(resendSmsOtp(data)),
  toggleSmsNotification: (data) => dispatch(toggleSmsNotification(data)),
  setEmailPrimary: (data) => dispatch(setEmailPrimary(data)),
  resendVerificationEmail: (data) => dispatch(resendVerificationEmail(data)),
  toggleEmailsNotification: (data) => dispatch(toggleEmailsNotification(data)),
  deletePhoneNumber: (data) => dispatch(deletePhoneNumber(data)),
  cancelEliteMembership: (data) => dispatch(cancelEliteMembership(data)),
  updateReducerState: (reducerKey, key, value) => dispatch(updateReducerState(reducerKey, key, value)),
  cancelDowngradeSubscription: (data) => dispatch(cancelDowngradeSubscription(data)),
  getFlightAvailability: (data) => dispatch(getFlightAvailability(data)),
  getSouDesLocations: (data) => dispatch(getSouDesLocations(data)),
  getSouDesPossibleRoutes: (data) => dispatch(getSouDesPossibleRoutes(data)),
  getUserNearestAirport: (data) => dispatch(getUserNearestAirport(data)),
  getCountriesList: (data) => dispatch(getCountriesList(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
