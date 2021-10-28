import {
  FORGOT_PASSWORD_INITIATE_REQUEST,
  FORGOT_PASSWORD_INITIATE_REQUEST_SUCCESS,
  FORGOT_PASSWORD_INITIATE_REQUEST_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILURE
} from 'actions/ForgotPassword/actionTypes'

const initialState = {
  forgotPasswordLoading: false,
  forgetPasswordError: null,
  resetPasswordLoading: false,
  resetPasswordError: null
}

const forgotPasswordStart = (state) => ({
  ...state,
  forgotPasswordLoading: true
})

const forgotPasswordSuccess = (state) => ({
  ...state,
  forgotPasswordLoading: false,
  forgetPasswordError: null
})

const forgotPasswordFailure = (state, action) => ({
  ...state,
  forgotPasswordLoading: false,
  forgetPasswordError: action.payload.error
})

const resetPasswordStart = (state) => ({
  ...state,
  resetPasswordLoading: true
})

const resetPasswordSuccess = (state) => ({
  ...state,
  resetPasswordLoading: false,
  resetPasswordError: null
})

const resetPasswordFailed = (state, action) => ({
  ...state,
  resetPasswordLoading: false,
  resetPasswordError: action.payload.error
})

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_INITIATE_REQUEST: return forgotPasswordStart(state, action)
    case FORGOT_PASSWORD_INITIATE_REQUEST_SUCCESS: return forgotPasswordSuccess(state, action)
    case FORGOT_PASSWORD_INITIATE_REQUEST_FAILURE: return forgotPasswordFailure(state, action)
    case RESET_PASSWORD_REQUEST: return resetPasswordStart(state, action)
    case RESET_PASSWORD_REQUEST_SUCCESS: return resetPasswordSuccess(state, action)
    case RESET_PASSWORD_REQUEST_FAILURE: return resetPasswordFailed(state, action)
    default: return state
  }
}

export default forgotPasswordReducer
