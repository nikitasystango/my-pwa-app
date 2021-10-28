import { all, call, put, takeLatest } from 'redux-saga/effects'
import { FORGOT_PASSWORD_INITIATE_REQUEST, RESET_PASSWORD_REQUEST } from 'actions/ForgotPassword/actionTypes'
import {
  initiateForgotPasswordSuccess,
  initiateForgotPasswordFailure,
  resetPasswordSuccess,
  resetPasswordFailure
} from 'actions/ForgotPassword'
import { postRequestRuby } from './request'
import { pushNotification } from 'utils/notifications'
import history from 'utils/history'
import URls from 'constants/urls'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import toustifyMessages from 'constants/messages/toustifyMessages'

function* handleForgotPassword(action) {
  const { email } = action.payload
  try {
    const url = `${URls.FORGOT_PASSWORD}`
    const response = yield call(postRequestRuby, url, { user: { email: email } })
    if (response && response.status && response.status === 204) {
      yield put(initiateForgotPasswordSuccess())
      pushNotification(intl(toustifyMessages.forgotPassSuccess), 'success', 'TOP_CENTER', 3000)
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      if (error.response.data.error === 'User not found') {
        yield put(initiateForgotPasswordSuccess())
        pushNotification(intl(toustifyMessages.forgotPassSuccess), 'success', 'TOP_CENTER', 3000)
      } else {
        yield put(initiateForgotPasswordFailure(error.response.data.error))
      }
    } else {
      yield put(initiateForgotPasswordFailure(intl(toustifyMessages.forgotPassFailed)))
    }
  }
}

function* watchForgotPasswordRequest() {
  yield takeLatest(FORGOT_PASSWORD_INITIATE_REQUEST, handleForgotPassword)
}

function* handleResetPassword(action) {
  const { data } = action.payload
  try {
    const response = yield call(postRequestRuby, URls.RESET_PASSWORD, data)
    if (response && response.status && response.status === 204) {
      yield put(resetPasswordSuccess())
      history.push(AppRoutes.SIGN_IN)
      pushNotification(intl(toustifyMessages.resetPasswordSuccess), 'success', 'TOP_CENTER', 3000)
    }
  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.error) {
      yield put(resetPasswordFailure(error.response.data.error))
    } else {
      yield put(resetPasswordFailure(intl(toustifyMessages.resetPassFailed)))
    }
  }
}

function* watchResetPasswordRequest() {
  yield takeLatest(RESET_PASSWORD_REQUEST, handleResetPassword)
}

export default function* sagas() {
  yield all([
    watchForgotPasswordRequest(),
    watchResetPasswordRequest()
  ])
}
