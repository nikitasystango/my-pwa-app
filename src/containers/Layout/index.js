import { connect } from 'react-redux'
import { resetAuthState } from 'actions/Auth'
import Layout from 'common/Layout'
import { toggleSidebar, logoutUser } from 'actions/Layout'
import { updateReducerState } from 'actions/Common'
import { getProfileDetails, toggleModals } from 'actions/Dashboard'
import { updateDoNotKnowSearch } from 'actions/SearchPanel'

const mapStateToProps = state => ({
  isSidebarVisible: state.layout.isSidebarVisible,
  logoutUserLoading: state.layout.logoutUserLoading,
  user: state.auth.user,
  mapPageUrl: state.mapData.mapPageUrl,
  newProfilePicture: state.dashboard.newProfilePicture
})

const mapDispatchToProps = dispatch => ({
  resetAuthState: () => dispatch(resetAuthState()),
  toggleSidebar: () => dispatch(toggleSidebar()),
  logoutUser: () => dispatch(logoutUser()),
  getProfileDetails: (userId) => dispatch(getProfileDetails(userId)),
  updateReducerState: (reducerKey, key, value) => dispatch(updateReducerState(reducerKey, key, value)),
  updateDoNotKnowSearch: (name, value) => dispatch(updateDoNotKnowSearch({ name, value })),
  toggleModals: (name) => dispatch(toggleModals(name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout)

