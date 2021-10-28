import { all, call, put, takeLatest } from 'redux-saga/effects'
import { LOGOUT_USER, ADD_FINGERPRINT_SCRAPPER_DATA } from 'actions/Layout/actionTypes'
import {
  logoutUserSuccess, logoutUserFailure, addFingerprintScapperDataSuccess, addFingerprintScapperDataFailure
} from 'actions/Layout'
import { deleteRequestRuby, postRequestRuby } from './request'
import { pushNotification } from 'utils/notifications'
import URls from 'constants/urls'
import { retrieveFromLocalStorage, removeFromLocalStorage, navigateToRespectivePage } from 'utils/helpers'
import { resetAuthState } from 'actions/Auth'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import toustifyMessages from 'constants/messages/toustifyMessages'

function* logoutUser() {
  const token = retrieveFromLocalStorage('token')
  const url = `${URls.LOGOUT_USER}?user[access_token]=${token}`
  try {
    const response = yield call(deleteRequestRuby, url)
    if (response && response.status && response.status === 204) {
      yield put(logoutUserSuccess())
      removeFromLocalStorage('userDetails')
      removeFromLocalStorage('token')
      removeFromLocalStorage('signupFirstTime')
      removeFromLocalStorage('userId')
      yield put(resetAuthState())
      navigateToRespectivePage(AppRoutes.HOME)
      window.location.reload()
    }
  } catch (error) {
    pushNotification(intl(toustifyMessages.logoutFailed), 'error', 'TOP_CENTER', 3000)
    yield put(logoutUserFailure())
  }
}

function* watchLogoutUser() {
  yield takeLatest(LOGOUT_USER, logoutUser)
}

// Store Data of Web fingerprint scrapper and track user agent
function* trackUserAgent(action) {
  const { data } = action.payload
  try {
    const response = yield call(postRequestRuby, URls.TRACK_USER_AGENT, data)
    if (response && response.status && response.status === 201) {
        yield put(addFingerprintScapperDataSuccess())
    }
  } catch (error) {
    yield put(addFingerprintScapperDataFailure())
  }
}

function* watchFingerprintScapper() {
  yield takeLatest(ADD_FINGERPRINT_SCRAPPER_DATA, trackUserAgent)
}

export default function* sagas() {
  yield all([
    watchLogoutUser(),
    watchFingerprintScapper()
  ])
}
