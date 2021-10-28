import { connect } from 'react-redux'
import SubscriptionThankyouPage from 'components/SubscriptionThankyouPage'
import { pageAnalytics, updateReducerState } from 'actions/Common'
import { getPricingPlans, cancelEliteMembership, addEmail } from 'actions/Pages'
import { updateProfileDetails, getProfileDetails } from 'actions/Dashboard'

const mapStateToProps = state => ({
  userRegisterConfirmation: state.auth.userRegisterConfirmation,
  user: state.auth.user,
  pages: state.pages,
  fetchingProfileDetails: state.dashboard.accountSettings.fetchingProfileDetails,
  toggleCaneleMembershipModal: state.dashboard.toggleCaneleMembershipModal,
  mapPageUrl: state.mapData.mapPageUrl,
  accountSettings: state.dashboard.accountSettings
})

const mapDispatchToProps = dispatch => ({
  pageAnalytics: () => dispatch(pageAnalytics()),
  updateReducerState: (reducerKey, key, value) => dispatch(updateReducerState(reducerKey, key, value)),
  getPricingPlans: () => dispatch(getPricingPlans()),
  cancelEliteMembership: (data) => dispatch(cancelEliteMembership(data)),
  addEmail: (data) => dispatch(addEmail(data)),
  updateProfileDetails: (data) => dispatch(updateProfileDetails(data)),
  getProfileDetails: (id) => dispatch(getProfileDetails(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionThankyouPage)
