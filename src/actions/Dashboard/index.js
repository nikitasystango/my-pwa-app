import {
  DSHBRD__SET_NEW_PROFILE_PICTURE,
  DSHBRD__PROFILE_PICTURE_UPLOAD_MODAL_TOGGLE,
  DSHBRD__UPLOAD_NEW_PROFILE_PICTURE_SUCCESS,
  DSHBRD__UPLOAD_NEW_PROFILE_PICTURE_FAILED,
  DSHBRD__REMOVE_PROFILE_PICTURE,
  DSHBRD__REMOVE_PROFILE_PICTURE_FAILED,
  DSHBRD__REMOVE_PROFILE_PICTURE_SUCCESS,
  DSHBRD__GET_SUBSCRIBED_ALERTS,
  DSHBRD__GET_SUBSCRIBED_ALERTS_SUCCESS,
  DSHBRD__GET_SUBSCRIBED_ALERTS_FAILED,
  DSHBRD__CANCEL_SUBSCRIBED_ALERTS,
  DSHBRD__CANCEL_SUBSCRIBED_ALERTS_SUCCESS,
  DSHBRD__CANCEL_SUBSCRIBED_ALERTS_FAILED,
  DSHBRD__CHANGE_PASSWORD,
  DSHBRD__CHANGE_PASSWORD_FAILED,
  DSHBRD__CHANGE_PASSWORD_SUCCESS,
  TOGGLE_MODALS,
  DSHBRD_GET_PROFILE_DETAILS,
  DSHBRD_GET_PROFILE_DETAILS_FAILED,
  DSHBRD_GET_PROFILE_DETAILS_SUCCESS,
  DSHBRD_UPDATE_PROFILE,
  DSHBRD_UPDATE_PROFILE_SUCCESS,
  DSHBRD_UPDATE_PROFILE_FAILED,
  EDIT_ALERT,
  EDIT_ALERT_SUCCESS,
  EDIT_ALERT_FAILED,
  SET_SOCIAL_USER_PASSWORD,
  SET_SOCIAL_USER_PASSWORD_SUCCESS,
  SET_SOCIAL_USER_PASSWORD_FAILED,
  ADD_ALTERNATE_EMAIL,
  ADD_ALTERNATE_EMAIL_SUCCESS,
  ADD_ALTERNATE_EMAIL_FAILED,
  EDIT_ALTERNATE_EMAIL,
  EDIT_ALTERNATE_EMAIL_SUCCESS,
  EDIT_ALTERNATE_EMAIL_FAILED,
  DELETE_ALTERNATE_EMAIL,
  DELETE_ALTERNATE_EMAIL_SUCCESS,
  DELETE_ALTERNATE_EMAIL_FAILED,
  GET_PRE_SIGNED_URL,
  GET_PRE_SIGNED_URL_SUCCESS,
  GET_PRE_SIGNED_URL_FAILED,
  VERIFY_SMS_OTP, VERIFY_SMS_OTP_SUCCESS, VERIFY_SMS_OTP_FAILED,
  RESEND_SMS_OTP, RESEND_SMS_OTP_SUCCESS, RESEND_SMS_OTP_FAILED,
  TOGGLE_SMS_NOTIFICATION, TOGGLE_SMS_NOTIFICATION_SUCCESS, TOGGLE_SMS_NOTIFICATION_FAILED,
  SET_EMAIL_PRIMARY, SET_EMAIL_PRIMARY_SUCCESS, SET_EMAIL_PRIMARY_FAILED,
  RESEND_VERIFICATION_EMAIL, RESEND_VERIFICATION_EMAIL_SUCCESS, RESEND_VERIFICATION_EMAIL_FAILED,
  TOGGLE_EMAILS_NOTIFICATION, TOGGLE_EMAILS_NOTIFICATION_SUCCESS, TOGGLE_EMAILS_NOTIFICATION_FAILED,
  DELETE_PHONE_NUMBER, DELETE_PHONE_NUMBER_SUCCESS, DELETE_PHONE_NUMBER_FAILED,
  CANCEL_DOWNGRADE_SUBSCRIPTION,
  CANCEL_DOWNGRADE_SUBSCRIPTION_SUCCESS,
  CANCEL_DOWNGRADE_SUBSCRIPTION_FAILURE,
  GET_COUNTRIES_LIST, GET_COUNTRIES_LIST_FAILED, GET_COUNTRIES_LIST_SUCCESS,
  GET_STATE_LIST, GET_STATE_LIST_SUCCESS, GET_STATE_LIST_FAILED,
  GET_CITY_LIST, GET_CITY_LIST_SUCCESS, GET_CITY_LIST_FAILED
} from './actionTypes'

// Account settings
export const profilePictureUploadModalToggle = () => ({
  type: DSHBRD__PROFILE_PICTURE_UPLOAD_MODAL_TOGGLE
})

export const uploadNewProfilePictureSuccess = () => ({
  type: DSHBRD__UPLOAD_NEW_PROFILE_PICTURE_SUCCESS
})

export const uploadNewProfilePictureFailed = () => ({
  type: DSHBRD__UPLOAD_NEW_PROFILE_PICTURE_FAILED
})

export const setNewProfilePicture = (image) => ({
  type: DSHBRD__SET_NEW_PROFILE_PICTURE,
  payload: {
    image
  }
})

export const removeProfilePicture = (data) => ({
  type: DSHBRD__REMOVE_PROFILE_PICTURE,
  payload: data
})

export const removeProfilePictureFailed = () => ({
  type: DSHBRD__REMOVE_PROFILE_PICTURE_FAILED
})

export const removeProfilePictureSuccess = () => ({
  type: DSHBRD__REMOVE_PROFILE_PICTURE_SUCCESS
})

export const updateProfileDetails = (data) => ({
  type: DSHBRD_UPDATE_PROFILE,
  payload: { data }
})

export const handleUpdateProfileSuccess = () => ({
  type: DSHBRD_UPDATE_PROFILE_SUCCESS
})

export const handleUpdateProfileFailed = () => ({
  type: DSHBRD_UPDATE_PROFILE_FAILED
})

export const getProfileDetails = (userId) => ({
  type: DSHBRD_GET_PROFILE_DETAILS,
  payload: { userId }
})

export const getProfileDetailsSuccess = (data) => ({
  type: DSHBRD_GET_PROFILE_DETAILS_SUCCESS,
  payload: { data }
})

export const getProfileDetailsFailed = () => ({
  type: DSHBRD_GET_PROFILE_DETAILS_FAILED
})

export const toggleModals = (name) => ({
  type: TOGGLE_MODALS,
  payload: { name }
})

export const changePassword = (passwords) => ({
  type: DSHBRD__CHANGE_PASSWORD,
  payload: { ...passwords }
})

export const changePasswordSuccess = () => ({
  type: DSHBRD__CHANGE_PASSWORD_SUCCESS
})

export const changePasswordFailed = () => ({
  type: DSHBRD__CHANGE_PASSWORD_FAILED
})

// My alerts
export const getSubscribedAlerts = () => ({
  type: DSHBRD__GET_SUBSCRIBED_ALERTS
})

export const getSubscribedAlertsFailed = () => ({
  type: DSHBRD__GET_SUBSCRIBED_ALERTS_FAILED
})

export const getSubscribedAlertsSuccess = (data) => ({
  type: DSHBRD__GET_SUBSCRIBED_ALERTS_SUCCESS,
  payload: { data }
})

export const cancelSubscribedAlerts = (id) => ({
  type: DSHBRD__CANCEL_SUBSCRIBED_ALERTS,
  payload: { id }
})

export const cancelSubscribedAlertsFailed = () => ({
  type: DSHBRD__CANCEL_SUBSCRIBED_ALERTS_FAILED
})

export const cancelSubscribedAlertsSuccess = () => ({
  type: DSHBRD__CANCEL_SUBSCRIBED_ALERTS_SUCCESS
})

// EDIT ALERT
export const editAlert = (data, id) => ({
  type: EDIT_ALERT,
  payload: { data, id }
})

export const editAlertSuccess = () => ({
  type: EDIT_ALERT_SUCCESS
})

export const editAlertFailed = () => ({
  type: EDIT_ALERT_FAILED
})


// set social user password
export const setSocialUserPassword = (data) => ({
  type: SET_SOCIAL_USER_PASSWORD,
  payload: { data }
})

export const setSocialUserPasswordSuccess = () => ({
  type: SET_SOCIAL_USER_PASSWORD_SUCCESS
})

export const setSocialUserPasswordFailed = () => ({
  type: SET_SOCIAL_USER_PASSWORD_FAILED
})

// Add alternate email
export const addAlternateEmail = (data, name) => ({
  type: ADD_ALTERNATE_EMAIL,
  payload: { data, name }
})

export const addAlternateEmailSuccess = () => ({
  type: ADD_ALTERNATE_EMAIL_SUCCESS
})

export const addAlternateEmailFailed = () => ({
  type: ADD_ALTERNATE_EMAIL_FAILED
})

// Edit alternate email
export const editAlternateEmail = (data, name) => ({
  type: EDIT_ALTERNATE_EMAIL,
  payload: { data, name }
})

export const editAlternateEmailSuccess = () => ({
  type: EDIT_ALTERNATE_EMAIL_SUCCESS
})

export const editAlternateEmailFailed = () => ({
  type: EDIT_ALTERNATE_EMAIL_FAILED
})

// delete alternate email
export const deleteAlternateEmail = (data) => ({
  type: DELETE_ALTERNATE_EMAIL,
  payload: { data }
})

export const deleteAlternateEmailSuccess = () => ({
  type: DELETE_ALTERNATE_EMAIL_SUCCESS
})

export const deleteAlternateEmailFailed = () => ({
  type: DELETE_ALTERNATE_EMAIL_FAILED
})

// Get pre-signed url for image upload
export const getPreSignedUrl = (data) => ({
  type: GET_PRE_SIGNED_URL,
  payload: { data }
})

export const getPreSignedUrlSuccess = (data) => ({
  type: GET_PRE_SIGNED_URL_SUCCESS,
  payload: data
})

export const getPreSignedUrlFailed = () => ({
  type: GET_PRE_SIGNED_URL_FAILED
})

// verify sms otp
export const verifySmsOtp = (data) => ({
  type: VERIFY_SMS_OTP,
  payload: { data }
})

export const verifySmsOtpSuccess = () => ({
  type: VERIFY_SMS_OTP_SUCCESS
})

export const verifySmsOtpFailed = () => ({
  type: VERIFY_SMS_OTP_FAILED
})

// resend sms otp
export const resendSmsOtp = (data) => ({
  type: RESEND_SMS_OTP,
  payload: { data }
})

export const resendSmsOtpSuccess = () => ({
  type: RESEND_SMS_OTP_SUCCESS
})

export const resendSmsOtpFailed = () => ({
  type: RESEND_SMS_OTP_FAILED
})

// activate deactive sms notification
export const toggleSmsNotification = (data) => ({
  type: TOGGLE_SMS_NOTIFICATION,
  payload: { data }
})

export const toggleSmsNotificationSuccess = () => ({
  type: TOGGLE_SMS_NOTIFICATION_SUCCESS
})

export const toggleSmsNotificationFailed = () => ({
  type: TOGGLE_SMS_NOTIFICATION_FAILED
})

// set email primary
export const setEmailPrimary = (data) => ({
  type: SET_EMAIL_PRIMARY,
  payload: { data }
})

export const setEmailPrimarySuccess = () => ({
  type: SET_EMAIL_PRIMARY_SUCCESS
})

export const setEmailPrimaryFailed = () => ({
  type: SET_EMAIL_PRIMARY_FAILED
})

// resend verification email
export const resendVerificationEmail = (data) => ({
  type: RESEND_VERIFICATION_EMAIL,
  payload: { data }
})

export const resendVerificationEmailSuccess = () => ({
  type: RESEND_VERIFICATION_EMAIL_SUCCESS
})

export const resendVerificationEmailFailed = () => ({
  type: RESEND_VERIFICATION_EMAIL_FAILED
})

// toggle emails notifications
export const toggleEmailsNotification = (data) => ({
  type: TOGGLE_EMAILS_NOTIFICATION,
  payload: { data }
})

export const toggleEmailsNotificationSuccess = () => ({
  type: TOGGLE_EMAILS_NOTIFICATION_SUCCESS
})

export const toggleEmailsNotificationFailed = () => ({
  type: TOGGLE_EMAILS_NOTIFICATION_FAILED
})

// delete phone number
export const deletePhoneNumber = (data) => ({
  type: DELETE_PHONE_NUMBER,
  payload: { data }
})

export const deletePhoneNumberSuccess = () => ({
  type: DELETE_PHONE_NUMBER_SUCCESS
})

export const deletePhoneNumberFailed = () => ({
  type: DELETE_PHONE_NUMBER_FAILED
})

// Cancel downgrade subscription
export const cancelDowngradeSubscription = (data) => ({
  type: CANCEL_DOWNGRADE_SUBSCRIPTION,
  payload: { data }
})

export const cancelDowngradeSubscriptionSuccess = () => ({
  type: CANCEL_DOWNGRADE_SUBSCRIPTION_SUCCESS
})

export const cancelDowngradeSubscriptionFailed = () => ({
  type: CANCEL_DOWNGRADE_SUBSCRIPTION_FAILURE
})

// GET COUNTRIES LIST
export const getCountriesList = () => ({
  type: GET_COUNTRIES_LIST
})

export const getCountriesListSuccess = (data) => ({
  type: GET_COUNTRIES_LIST_SUCCESS,
  payload: { data }
})

export const getCountriesListFailed = () => ({
  type: GET_COUNTRIES_LIST_FAILED
})

// GET STATE LIST
export const getStateList = () => ({
  type: GET_STATE_LIST
})

export const getStateListSuccess = (data) => ({
  type: GET_STATE_LIST_SUCCESS,
  payload: { data }
})

export const getStateListFailed = () => ({
  type: GET_STATE_LIST_FAILED
})

// GET CITY LIST
export const getCityList = () => ({
  type: GET_CITY_LIST
})

export const getCityListSuccess = (data) => ({
  type: GET_CITY_LIST_SUCCESS,
  payload: { data }
})

export const getCityListFailed = () => ({
  type: GET_CITY_LIST_FAILED
})
