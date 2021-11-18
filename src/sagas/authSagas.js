import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  LOGIN_REQUEST, SIGNUP_REQUEST, FACEBOOK_LOGIN_REQUEST,
  GOOGLE_LOGIN_REQUEST, GET_PRE_SIGNED_URL_AUTH, APPLE_LOGIN_REQUEST
} from 'actions/Auth/actionTypes'
import {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  facebookLoginRequestSuccess, facebookLoginRequestFailure,
  googleLoginRequestSuccess, googleLoginRequestFailure,
  getPreSignedUrlAuthSuccess,
  getPreSignedUrlAuth,
  appleLoginRequestSuccess, appleLoginRequestFailure
} from 'actions/Auth'
import { getProfileDetails } from 'actions/Dashboard'
import { AppRoutes } from 'constants/appRoutes'
import { postRequestRuby, getRequestRuby } from './request'
import { pushNotification } from 'utils/notifications'
import { setInLocalStorage, retrieveFromLocalStorage, isFirstTimeLoginHandler, removeFromLocalStorage, navigateToRespectivePage } from 'utils/helpers'
import history from 'utils/history'
import URls from 'constants/urls'
import Messages from 'constants/messages'
import env from 'utils/env_variables'
import intl from 'utils/intlMessage'
import toustifyMessages from 'constants/messages/toustifyMessages'
const appendParams = sessionStorage.getItem('queryParamsGA')

function* handleLogin(action) {
  const { data } = action.payload
  try {
    const response = yield call(postRequestRuby, URls.LOGIN, data)
    if (response.status && response.status === 200 && response.headers &&
      response.headers.accesstoken && response.headers.location) {
      setInLocalStorage('token', response.headers.accesstoken)
      const userId = response?.headers?.location?.split('/')?.pop()
      yield put(loginSuccess(userId))
      yield put(getProfileDetails(userId))
      setInLocalStorage('userId', userId)
      const path = retrieveFromLocalStorage('helpCenter')
      const alertURL = retrieveFromLocalStorage('alertPopupUrl')
      const callbackUrl = retrieveFromLocalStorage('callbackUrl')
        if(alertURL) {
        history.push({
          pathname: AppRoutes.CALENDER,
          search: alertURL
         })
         yield put(getProfileDetails(userId))
        } else if(callbackUrl) {
          history.push(callbackUrl)
        }
        else{
      if (path) {
        if(path === '/chargebee/self_serve_portal') {
          navigateToRespectivePage(AppRoutes.HOME, appendParams)
             //  window.location.href = `${env.REDIRECT_ON_RUBY}/chargebee/self_serve_portal?user_id=${userId}`
           const url = `${env.REDIRECT_ON_RUBY}/chargebee/self_serve_portal?user_id=${userId}`
           const newWin = window.open(`${url}${appendParams ? appendParams.replace('?', '&') : ''}`)
           if(!newWin || newWin.closed || typeof newWin.closed=='undefined')
           {
             pushNotification(Messages.ENABLED_POPUP, 'error', 'TOP_CENTER', 3000)
               // POPUP BLOCKED
           }
        }else {
          history.push(path)
        }
      } else {
        navigateToRespectivePage(AppRoutes.HOME, appendParams)
      }
      // window.location.reload()
    }
    }
  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.error) {
      yield put(loginFailure(error.response.data.error))
    } else {
      yield put(loginFailure(intl(toustifyMessages.loginFailed)))
    }
  }
}

function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, handleLogin)
}

function* handleSignUp(action) {
  const { data } = action.payload
  try {
    const response = yield call(postRequestRuby, URls.REGISTER, data)
    if (response.status && response.status === 201 && response.headers && response.headers.accesstoken && response.headers.location) {
      setInLocalStorage('token', response.headers.accesstoken)
      setInLocalStorage('firstTimeSignup', 'true')
      removeFromLocalStorage('tapfiliateReference')
      const userId = response?.headers?.location?.split('/')?.pop()
      yield put(signupSuccess(response.data))
      yield put(getProfileDetails(userId))
      navigateToRespectivePage(AppRoutes.THANK_YOU, appendParams)
    }
  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.error) {
      yield put(signupFailure(error.response.data.error))
    } else {
      yield put(signupFailure(intl(toustifyMessages.registerFailed)))
    }
  }
}

function* watchSignupRequest() {
  yield takeLatest(SIGNUP_REQUEST, handleSignUp)
}

// facebook login

function* facebookLogin(action) {
  const { data, image, source } = action.payload
  try {
    const response = yield call(postRequestRuby, URls.FACEBOOK_LOGIN, data)
    if (response && response.status && response.status === 201 && response.headers &&
      response.headers.accesstoken && response.headers.location) {
      const userId = response?.headers?.location?.split('/')?.pop()
      setInLocalStorage('token', response.headers.accesstoken)
      setInLocalStorage('userId', userId)
      const isFirstTimeLogin=response?.headers?.firstlogin==='true' ? true : false
      if (image && source !== 'login') {
        yield put(getPreSignedUrlAuth({ token: response.headers.accesstoken, image, type: 'fb', userId, isFirstTimeLogin }))
      } else {
        yield put(facebookLoginRequestSuccess(userId))
        yield put(getProfileDetails(userId))
        isFirstTimeLoginHandler(isFirstTimeLogin)
      }
    }
  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.facebookLoginFailed), 'error', 'TOP_CENTER', 3000)
    }
    yield put(facebookLoginRequestFailure())
  }
}

function* watchFacebookLogin() {
  yield takeLatest(FACEBOOK_LOGIN_REQUEST, facebookLogin)
}

// Google login

function* googleLogin(action) {
  const { data, image, source } = action.payload
  try {
    const response = yield call(postRequestRuby, URls.FACEBOOK_LOGIN, data)
    if (response && response.status && response.status === 201 && response.headers &&
      response.headers.accesstoken && response.headers.location) {
      const userId = response?.headers?.location?.split('/')?.pop()
      setInLocalStorage('userId', userId)
      setInLocalStorage('token', response.headers.accesstoken)
      const isFirstTimeLogin=response?.headers?.firstlogin==='true' ? true : false
      if (image && source !== 'login') {
        yield put(getPreSignedUrlAuth({ token: response.headers.accesstoken, image, type: 'google', userId, isFirstTimeLogin }))
      } else {
        yield put(googleLoginRequestSuccess(userId))
        yield put(getProfileDetails(userId))
        isFirstTimeLoginHandler(isFirstTimeLogin)
      }
    }
  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.googleLoginFailed), 'error', 'TOP_CENTER', 3000)
    }
    yield put(googleLoginRequestFailure())
  }
}

function* watchGoogleLogin() {
  yield takeLatest(GOOGLE_LOGIN_REQUEST, googleLogin)
}

// Apple login
function* appleLogin(action) {
  const { data } = action.payload
  try {
    const response = yield call(postRequestRuby, URls.FACEBOOK_LOGIN, data)
    if (response && response.status && response.status === 201 && response.headers &&
      response.headers.accesstoken && response.headers.location) {
      const userId = response?.headers?.location?.split('/')?.pop()
      const isFirstTimeLogin=response?.headers?.firstlogin==='true' ? true : false
        setInLocalStorage('token', response.headers.accesstoken)
        setInLocalStorage('userId', userId)
        yield put(appleLoginRequestSuccess(userId))
        yield put(getProfileDetails(userId))
        isFirstTimeLoginHandler(isFirstTimeLogin)
    }
  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.appleLoginFailed), 'error', 'TOP_CENTER', 3000)
    }
    yield put(appleLoginRequestFailure())
  }
}

function* watchAppleLogin() {
  yield takeLatest(APPLE_LOGIN_REQUEST, appleLogin)
}

// Get pre signed url for uploading image
function* getPreSignedUrlAuthHandler(action) {
  const { token, image, type, userId, isFirstTimeLogin } = action.payload
  const extension = image?.type?.split('/').pop()
  try {
    const urlReq = `/v1/users/${userId}/${URls.GET_PRE_SIGNED_URL}?user[access_token]=${token}&user[file_extension]=${extension}`
    const response = yield call(getRequestRuby, urlReq)
    if (response?.status === 200 && response?.data?.presigned_url) {
      const { presigned_url } = response?.data
      yield put(getPreSignedUrlAuthSuccess({ presigned_url, image, type, token, userId, isFirstTimeLogin }))
    } else {
      setInLocalStorage('token', token)
      if (type === 'fb') {
        yield put(facebookLoginRequestSuccess(userId))
      } else {
        yield put(googleLoginRequestSuccess(userId))
      }
      yield put(getProfileDetails(userId))
      isFirstTimeLoginHandler(isFirstTimeLogin)
    }
  } catch (error) {
    setInLocalStorage('token', token)
    if (type === 'fb') {
      yield put(facebookLoginRequestSuccess(userId))
    } else {
      yield put(googleLoginRequestSuccess(userId))
    }
    yield put(getProfileDetails(userId))
    isFirstTimeLoginHandler(isFirstTimeLogin)
  }
}

function* watchGetPresignedUrlAuth() {
  yield takeLatest(GET_PRE_SIGNED_URL_AUTH, getPreSignedUrlAuthHandler)
}

export default function* sagas() {
  yield all([
    watchLoginRequest(),
    watchSignupRequest(),
    watchFacebookLogin(),
    watchGoogleLogin(),
    watchGetPresignedUrlAuth(),
    watchAppleLogin()
  ])
}
