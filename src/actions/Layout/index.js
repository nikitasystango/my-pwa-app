import { DSHBRD__TOGGLE_SIDEBAR, LOGOUT_USER, LOGOUT_USER_FAILURE, LOGOUT_USER_SUCCESS, ADD_FINGERPRINT_SCRAPPER_DATA, ADD_FINGERPRINT_SCRAPPER_DATA_SUCCESS, ADD_FINGERPRINT_SCRAPPER_DATA_FAILURE } from './actionTypes'
export const toggleSidebar = () => ({
  type: DSHBRD__TOGGLE_SIDEBAR
})

export const logoutUser = () => ({
  type: LOGOUT_USER
})

export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS
})

export const logoutUserFailure = () => ({
  type: LOGOUT_USER_FAILURE
})

// Store Data of Web fingerprint scrapper
export const addFingerprintScapperData = (data) => ({
  type: ADD_FINGERPRINT_SCRAPPER_DATA,
  payload: { data }
})

export const addFingerprintScapperDataSuccess = () => ({
  type: ADD_FINGERPRINT_SCRAPPER_DATA_SUCCESS
})

export const addFingerprintScapperDataFailure = () => ({
  type: ADD_FINGERPRINT_SCRAPPER_DATA_FAILURE
})