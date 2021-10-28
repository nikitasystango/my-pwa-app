import { DSHBRD__TOGGLE_SIDEBAR, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, LOGOUT_USER } from '../actions/Layout/actionTypes'

const initialState = {
  authenticationModalType: null,
  showAuthenticationModal: false,
  isSidebarVisible: false,
  logoutUserLoading: false
}

const toggleSidebar = (state) => ({
  ...state,
  isSidebarVisible: !state.isSidebarVisible
})

const logoutUser = (state) => ({
  ...state,
  logoutUserLoading: true
})

const logoutUserSuccess = (state) => ({
  ...state,
  logoutUserLoading: false
})

const logoutUserFailure = (state) => ({
  ...state,
  logoutUserLoading: false
})
const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DSHBRD__TOGGLE_SIDEBAR: return toggleSidebar(state, action)
    case LOGOUT_USER: return logoutUser(state, action)
    case LOGOUT_USER_SUCCESS: return logoutUserSuccess(state, action)
    case LOGOUT_USER_FAILURE: return logoutUserFailure(state, action)
    default: return state
  }
}
export default dashboardReducer
