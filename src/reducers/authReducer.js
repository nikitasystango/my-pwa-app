import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAILURE,
  FACEBOOK_LOGIN_REQUEST, FACEBOOK_LOGIN_REQUEST_SUCCESS, FACEBOOK_LOGIN_REQUEST_FAILURE,
  GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_REQUEST_SUCCESS, GOOGLE_LOGIN_REQUEST_FAILURE,
  GET_PRE_SIGNED_URL_AUTH_SUCCESS,
  APPLE_LOGIN_REQUEST, APPLE_LOGIN_REQUEST_SUCCESS, APPLE_LOGIN_REQUEST_FAILURE
} from 'actions/Auth/actionTypes'

const initialState = {
  posts: [],
  isLoggingIn: false,
  logginError: null,
  isRegistering: false,
  signupError: null,
  userRegisterConfirmation: false,
  user: {
    email: null,
    isEmailVerified: false,
    isEmailNotificationEnable: false,
    id: null,
    country: null,
    firstName: null,
    lastName: null,
    preferredCurrency: null,
    profileImage: null,
    isUserBronzeMember: false,
    isUserSilverMember: false,
    isUserGoldMember: false,
    plan: {},
    notificationSettings: null,
    cancelledSubscription: false,
    goldFreeTrial: false,
    socialUserPasswordSet: false,
    alternateEmails: [],
    isSocialUser: false,
    phoneNumber: null,
    createAlertsLimit: 0,
    activeAlertsCount: 0,
    downgradeMembership: false,
    onboarded: null,
    trialEligibilty: {}
  },
  facebookLoginLoading: false,
  googleLoginLoading: false,
  appleLoginLoading: false,
  signedUrlAuth: null
}

const loginStart = (state, action) => ({
  ...state,
  isLoggingIn: true
})

const loginSuccess = (state, action) => {
  const { data } = action.payload
  return ({
    ...state,
    isLoggingIn: false,
    logginError: null,
    user: data ? {
        ...state.user,
        id: data
    } : null
  })
}

const loginFailure = (state, action) => ({
  ...state,
  isLoggingIn: false,
  logginError: action.payload.error
})

const registerStart = (state, action) => ({
  ...state,
  isRegistering: true
})

const registerSuccess = (state, action) => {
  return ({
    ...state,
    isRegistering: false,
    userRegisterConfirmation: true,
    signupError: null
  })
}

const registerFailed = (state, action) => ({
  ...state,
  isRegistering: false,
  signupError: action.payload.error
})

// facebook login
const facebookLogin = (state) => ({
  ...state,
  facebookLoginLoading: true
})

const facebookLoginSuccess = (state, action) => {
  const { data } = action.payload
  if (data) {
    state.user.id = data
  }
  return ({
    ...state,
    facebookLoginLoading: false,
    signedUrlAuth: null
  })
}

const facebookLoginFailed = (state) => ({
  ...state,
  facebookLoginLoading: false
})

// google login 

const googleLogin = (state) => ({
  ...state,
  googleLoginLoading: true
})

const googleLoginSuccess = (state, action) => {
  const { data } = action.payload
  if (data) {
    state.user.id = data
  }
  return ({
    ...state,
    googleLoginLoading: false,
    signedUrlAuth: null
  })
}

const googleLoginFailed = (state) => ({
  ...state,
  googleLoginLoading: false
})

// apple login 

const appleLogin = (state) => ({
  ...state,
  appleLoginLoading: true
})

const appleLoginSuccess = (state, action) => {
  const { data } = action.payload
  if (data) {
    state.user.id = data
  }
  return ({
    ...state,
    appleLoginLoading: false,
    signedUrlAuth: null
  })
}

const appleLoginFailed = (state) => ({
  ...state,
  appleLoginLoading: false
})

const getPreSignedUrlAuthSuccess = (state, action) => {
  return ({
    ...state,
    signedUrlAuth: action.payload
  })
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: return loginStart(state, action)
    case LOGIN_REQUEST_SUCCESS: return loginSuccess(state, action)
    case LOGIN_REQUEST_FAILURE: return loginFailure(state, action)
    case SIGNUP_REQUEST: return registerStart(state, action)
    case SIGNUP_REQUEST_SUCCESS: return registerSuccess(state, action)
    case SIGNUP_REQUEST_FAILURE: return registerFailed(state, action)
    case FACEBOOK_LOGIN_REQUEST: return facebookLogin(state, action)
    case FACEBOOK_LOGIN_REQUEST_SUCCESS: return facebookLoginSuccess(state, action)
    case FACEBOOK_LOGIN_REQUEST_FAILURE: return facebookLoginFailed(state, action)
    case GOOGLE_LOGIN_REQUEST: return googleLogin(state, action)
    case GOOGLE_LOGIN_REQUEST_SUCCESS: return googleLoginSuccess(state, action)
    case GOOGLE_LOGIN_REQUEST_FAILURE: return googleLoginFailed(state, action)
    case GET_PRE_SIGNED_URL_AUTH_SUCCESS: return getPreSignedUrlAuthSuccess(state, action)
    case APPLE_LOGIN_REQUEST: return appleLogin(state, action)
    case APPLE_LOGIN_REQUEST_SUCCESS: return appleLoginSuccess(state, action)
    case APPLE_LOGIN_REQUEST_FAILURE: return appleLoginFailed(state, action)
    default: return state
  }
}

export default authReducer
