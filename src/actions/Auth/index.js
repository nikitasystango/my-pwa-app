import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAILURE,
  RESET_AUTH_STATE,
  FACEBOOK_LOGIN_REQUEST, FACEBOOK_LOGIN_REQUEST_SUCCESS, FACEBOOK_LOGIN_REQUEST_FAILURE,
  GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_REQUEST_SUCCESS, GOOGLE_LOGIN_REQUEST_FAILURE,
  GET_PRE_SIGNED_URL_AUTH, GET_PRE_SIGNED_URL_AUTH_SUCCESS,
  APPLE_LOGIN_REQUEST,
  APPLE_LOGIN_REQUEST_SUCCESS,
  APPLE_LOGIN_REQUEST_FAILURE
} from './actionTypes'
import { EventTypes } from 'redux-segment'

export const login = (data) => ({
  type: LOGIN_REQUEST,
  payload: { data }
})

export const loginSuccess = (data) => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: { data },
  meta: {
    analytics: EventTypes.identify
  }
})

export const loginFailure = (error) => ({
  type: LOGIN_REQUEST_FAILURE,
  payload: { error }
})

export const signup = (data) => ({
  type: SIGNUP_REQUEST,
  payload: { data }
})

export const signupSuccess = (data) => ({
  type: SIGNUP_REQUEST_SUCCESS,
  payload: { data }
})

export const signupFailure = (error) => ({
  type: SIGNUP_REQUEST_FAILURE,
  payload: { error }
})

export const resetAuthState = () => ({
  type: RESET_AUTH_STATE
})

// Facebook login

export const facebookLoginRequest = (data) => ({
  type: FACEBOOK_LOGIN_REQUEST,
  payload: data
})

export const facebookLoginRequestSuccess = (data) => ({
  type: FACEBOOK_LOGIN_REQUEST_SUCCESS,
  payload: { data },
  meta: {
    analytics: EventTypes.identify
  }
})

export const facebookLoginRequestFailure = () => ({
  type: FACEBOOK_LOGIN_REQUEST_FAILURE
})

// google login

export const googleLoginRequest = (data) => ({
  type: GOOGLE_LOGIN_REQUEST,
  payload: data
})

export const googleLoginRequestSuccess = (data) => ({
  type: GOOGLE_LOGIN_REQUEST_SUCCESS,
  payload: { data },
  meta: {
    analytics: EventTypes.identify
  }
})

export const googleLoginRequestFailure = () => ({
  type: GOOGLE_LOGIN_REQUEST_FAILURE
})

// apple login

export const appleLoginRequest = (data) => ({
  type: APPLE_LOGIN_REQUEST,
  payload: data
})

export const appleLoginRequestSuccess = (data) => ({
  type: APPLE_LOGIN_REQUEST_SUCCESS,
  payload: { data },
  meta: {
    analytics: EventTypes.identify
  }
})

export const appleLoginRequestFailure = () => ({
  type: APPLE_LOGIN_REQUEST_FAILURE
})

// GET PRE SIGNED URL FOR UPLOADING IMAGE
export const getPreSignedUrlAuth = (data) => ({
  type: GET_PRE_SIGNED_URL_AUTH,
  payload: data
})

export const getPreSignedUrlAuthSuccess = (data) => ({
  type: GET_PRE_SIGNED_URL_AUTH_SUCCESS,
  payload: data
})
