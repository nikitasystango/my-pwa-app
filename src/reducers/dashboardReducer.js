import {
  DSHBRD__CHANGE_PASSWORD_FAILED,
  DSHBRD__CHANGE_PASSWORD_SUCCESS,
  DSHBRD__CHANGE_PASSWORD,
  TOGGLE_MODALS,
  DSHBRD_GET_PROFILE_DETAILS,
  DSHBRD_GET_PROFILE_DETAILS_SUCCESS,
  DSHBRD_GET_PROFILE_DETAILS_FAILED,
  DSHBRD_UPDATE_PROFILE_SUCCESS,
  DSHBRD_UPDATE_PROFILE_FAILED,
  DSHBRD_UPDATE_PROFILE,
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
  CANCEL_DOWNGRADE_SUBSCRIPTION, CANCEL_DOWNGRADE_SUBSCRIPTION_SUCCESS, CANCEL_DOWNGRADE_SUBSCRIPTION_FAILURE,
  GET_COUNTRIES_LIST_SUCCESS
} from 'actions/Dashboard/actionTypes'

const initialState = {
  newProfilePicture: {
    image: null,
    imageUrl: null,
    uploading: false,
    removing: false,
    profilePictureUploadModal: false,
    getPreSignedUrlLoading: false,
    preSignedUrl: null
  },
  myAlerts: {
    alerts: [],
    fetchingAlerts: false,
    cancellingAlert: false,
    editAlertLoading: false
  },
  accountSettings: {
    fetchingProfileDetails: false,
    userDetails: null,
    changeUserPasswordModal: false,
    changeUserPasswordLoading: false,
    updateUserProfileLoading: '',
    toggleSetSocialUserPasswordModal: false,
    setSocialUserPasswordLoading: false,
    toggleSetAlternateEmailsModal: false,
    addAlternateEmailLoading: false,
    editAlternateEmailLoading: '',
    deleteAlternateEmailLoading: '',
    verifySmsOtpLoading: false,
    resendSmsOtpLoading: false,
    toggleSmsNotificationLoading: false,
    setEmailPrimaryLoading: false,
    resendVerificationEmailLoading: '',
    toggleEmailsNotificationLoading: false,
    toggleSmsOtpSection: false,
    deletePhoneNumberLoading: false,
    toggleTimer: false
  },
  toggleCaneleMembershipModal: false,
  cancelDowngradeSubscriptionLoading: false,
  toggleMembershipTierModal: false,
  activeProfileView: 0,
  countriesList: [],
  statesList: [],
  citiesList: []
}
const profilePictureUploadModalToggle = (state, action) => ({
  ...state,
  newProfilePicture: {
    ...state.newProfilePicture,
    profilePictureUploadModal: !state.newProfilePicture.profilePictureUploadModal
  }
})

const uploadNewProfilePictureFailed = (state, action) => ({
  ...state,
  newProfilePicture: {
    ...state.newProfilePicture,
    uploading: false,
    preSignedUrl: null
  }
})

const uploadNewProfilePictureSuccess = (state, action) => ({
  ...state,
  newProfilePicture: {
    ...state.newProfilePicture,
    uploading: false,
    profilePictureUploadModal: false,
    image: null,
    preSignedUrl: null
  }
})
const setNewProfilePicture = (state, action) => ({
  ...state,
  newProfilePicture: {
    ...state.newProfilePicture,
    image: action.payload.image
    // imageUrl: URL.createObjectURL(action.payload.image)
  }
})

const removeProfilePicture = (state, action) => ({
  ...state,
  newProfilePicture: {
    ...state.newProfilePicture,
    removing: action?.payload === 'preSignedFailed' ? false : true
    }
})

const removeProfilePictureFailed = (state, action) => ({
  ...state,
  newProfilePicture: {
    ...state.newProfilePicture,
    removing: false
  }
})

const removeProfilePictureSuccess = (state, action) => ({
  ...state,
  newProfilePicture: {
    ...state.newProfilePicture,
    removing: false,
    profilePictureUploadModal: false
  }
})

const getSubscribedAlerts = (state, action) => ({
  ...state,
  myAlerts: {
    ...state.myAlerts,
    fetchingAlerts: true
  }
})

const getSubscribedAlertsSuccess = (state, action) => {
  const { data } = action.payload
  //  Sort alerts by inbound dates
  data.sort(function(a, b) { return new Date(a.start_date) - new Date(b.start_date) })
  return ({
    ...state,
  myAlerts: {
    ...state.myAlerts,
    fetchingAlerts: false,
    alerts: data
  }
  })
}

const getSubscribedAlertsFailed = (state, action) => ({
  ...state,
  myAlerts: {
    ...state.myAlerts,
    fetchingAlerts: false
  }
})

const cancelSubscribedAlerts = (state, action) => ({
  ...state,
  myAlerts: {
    ...state.myAlerts,
    cancellingAlert: true
  }
})

const cancelSubscribedAlertsSuccess = (state) => ({
  ...state,
  myAlerts: {
    ...state.myAlerts,
    cancellingAlert: false
  }
})

const cancelSubscribedAlertsFailed = (state) => ({
  ...state,
  myAlerts: {
    ...state.myAlerts,
    cancellingAlert: false
  }
})

const updateProfileDetails = (state, action) => ({
    ...state,
    accountSettings: {
      ...state.accountSettings,
      updateUserProfileLoading: action?.payload?.data?.name
    }
  })

const updateProfileDetailsSuccess = (state, action) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    updateUserProfileLoading: ''
  }
})

const updateProfileDetailsFailed = (state, action) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    updateUserProfileLoading: ''
  }
})

const getProfileDetails = (state, action) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    fetchingProfileDetails: true
  }
})

const getProfileDetailsSuccess = (state, action) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    fetchingProfileDetails: false,
    userDetails: action.payload.data
  }
})

const getProfileDetailsFailed = (state, action) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    fetchingProfileDetails: false
  }
})

const toggleModals = (state, action) => {
  const { name } = action.payload
  return ({
    ...state,
    accountSettings: {
      ...state.accountSettings,
      [name]: !state.accountSettings[name]
    }
  })
}

const changePassword = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    changeUserPasswordLoading: true
  }
})

const changePasswordSuccess = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    changeUserPasswordLoading: false,
    changeUserPasswordModal: false
  }
})

const changePasswordFailed = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    changeUserPasswordLoading: false
  }
})

// edit user alert
const editAlert = (state) => ({
  ...state,
  myAlerts: {
    ...state.myAlerts,
    editAlertLoading: true
  }
})

const editAlertSuccess = (state) => ({
  ...state,
  myAlerts: {
    ...state.myAlerts,
    editAlertLoading: false
  }
})

const editAlertFailed = (state) => ({
  ...state,
  myAlerts: {
    ...state.myAlerts,
    editAlertLoading: false
  }
})

// set socila user password
const setSocialUserPassword = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    setSocialUserPasswordLoading: true
  }
})

const setSocialUserPasswordSuccess = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    setSocialUserPasswordLoading: false,
    toggleSetSocialUserPasswordModal: false
  }
})

const setSocialUserPasswordFailed = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    setSocialUserPasswordLoading: false
  }
})

// add alternate email
const addAlternateEmail = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    addAlternateEmailLoading: true
  }
})

const addAlternateEmailSuccess = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    addAlternateEmailLoading: false
    // toggleSetAlternateEmailsModal: false
  }
})

const addAlternateEmailFailed = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    addAlternateEmailLoading: false
  }
})

// edit altenate email
const editAlternateEmail = (state, action) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    editAlternateEmailLoading: action?.payload?.name
  }
})

const editAlternateEmailSuccess = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    editAlternateEmailLoading: '',
    toggleSetAlternateEmailsModal: false
  }
})

const editAlternateEmailFailed = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    editAlternateEmailLoading: ''
  }
})

// delete alternate email
const deleteAlternateEmail = (state, action) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    deleteAlternateEmailLoading: action?.payload?.data?.deleteName
  }
})

const deleteAlternateEmailSuccess = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    deleteAlternateEmailLoading: ''
  }
})

const deleteAlternateEmailFailed = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    deleteAlternateEmailLoading: ''
  }
})

// get pre signed url for uploading image
const getPreSignedUrl = (state, action) => ({
  ...state,
  newProfilePicture: {
    ...state.newProfilePicture,
    uploading: true
  }
})

const getPreSignedUrlSuccess = (state, action) => ({
  ...state,
  newProfilePicture: {
    ...state.newProfilePicture,
    preSignedUrl: action.payload
  }
})

const getPreSignedUrlFailed = (state, action) => ({
  ...state,
  newProfilePicture: {
    ...state.newProfilePicture,
    uploading: false
  }
})

// verify sms otp
const verifySmsOtp = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    verifySmsOtpLoading: true
  }
})

const verifySmsOtpSuccess = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    verifySmsOtpLoading: false,
    toggleSmsOtpSection: false,
    toggleTimer: false
  }
})

const verifySmsOtpFailed = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    verifySmsOtpLoading: false
  }
})

// resend sms otp
const resendSmsOtp = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    resendSmsOtpLoading: true,
    toggleSmsOtpSection: true,
    toggleTimer: true
  }
})

const resendSmsOtpSuccess = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    resendSmsOtpLoading: false
  }
})

const resendSmsOtpFailed = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    resendSmsOtpLoading: false
  }
})

// toggle sms notification
const toggleSmsNotification = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    toggleSmsNotificationLoading: true
  }
})

const toggleSmsNotificationSuccess = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    toggleSmsNotificationLoading: false
  }
})

const toggleSmsNotificationFailed = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    toggleSmsNotificationLoading: false
  }
})

// set email primary
const setEmailPrimary = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    setEmailPrimaryLoading: true
  }
})

const setEmailPrimarySuccess = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    setEmailPrimaryLoading: false
  }
})

const setEmailPrimaryFailed = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    setEmailPrimaryLoading: false
  }
})

// resend verification email
const resendVerificationEmail = (state, action) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    resendVerificationEmailLoading: action?.payload?.data?.resendName
    }
})

const resendVerificationEmailSuccess = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    resendVerificationEmailLoading: ''
  }
})

const resendVerificationEmailFailed = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    resendVerificationEmailLoading: ''
  }
})

// toggle emails notification
const toggleEmailsNotification = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    toggleEmailsNotificationLoading: true
  }
})

const toggleEmailsNotificationSuccess = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    toggleEmailsNotificationLoading: false
  }
})

const toggleEmailsNotificationFailed = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    toggleEmailsNotificationLoading: false
  }
})

// delete phone number
const deletePhoneNumber = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    deletePhoneNumberLoading: true
  }
})

const deletePhoneNumberSuccess = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    deletePhoneNumberLoading: false,
    toggleSmsOtpSection: false,
    toggleTimer: false
  }
})

const deletePhoneNumberFailed = (state) => ({
  ...state,
  accountSettings: {
    ...state.accountSettings,
    deletePhoneNumberLoading: false
  }
})

// cancel downgrade subscription
const cancelDowngradeSubscription = (state) => ({
  ...state,
  cancelDowngradeSubscriptionLoading: true
})

const cancelDowngradeSubscriptionSuccess = (state) => ({
  ...state,
  cancelDowngradeSubscriptionLoading: false
})

const cancelDowngradeSubscriptionFailed = (state) => ({
  ...state,
  cancelDowngradeSubscriptionLoading: false
})


const getCountryListSuccess = (state, action) => {
  const { data } = action.payload || ''
  return {
    ...state,
    countriesList: data?.countries || []
  }
}


const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DSHBRD__PROFILE_PICTURE_UPLOAD_MODAL_TOGGLE: return profilePictureUploadModalToggle(state, action)
    case DSHBRD__UPLOAD_NEW_PROFILE_PICTURE_FAILED: return uploadNewProfilePictureFailed(state, action)
    case DSHBRD__UPLOAD_NEW_PROFILE_PICTURE_SUCCESS: return uploadNewProfilePictureSuccess(state, action)
    case DSHBRD__SET_NEW_PROFILE_PICTURE: return setNewProfilePicture(state, action)
    case DSHBRD__REMOVE_PROFILE_PICTURE: return removeProfilePicture(state, action)
    case DSHBRD__REMOVE_PROFILE_PICTURE_FAILED: return removeProfilePictureFailed(state, action)
    case DSHBRD__REMOVE_PROFILE_PICTURE_SUCCESS: return removeProfilePictureSuccess(state, action)
    case DSHBRD__GET_SUBSCRIBED_ALERTS: return getSubscribedAlerts(state, action)
    case DSHBRD__GET_SUBSCRIBED_ALERTS_SUCCESS: return getSubscribedAlertsSuccess(state, action)
    case DSHBRD__GET_SUBSCRIBED_ALERTS_FAILED: return getSubscribedAlertsFailed(state, action)
    case DSHBRD__CANCEL_SUBSCRIBED_ALERTS: return cancelSubscribedAlerts(state, action)
    case DSHBRD__CANCEL_SUBSCRIBED_ALERTS_SUCCESS: return cancelSubscribedAlertsSuccess(state, action)
    case DSHBRD__CANCEL_SUBSCRIBED_ALERTS_FAILED: return cancelSubscribedAlertsFailed(state, action)
    case DSHBRD_UPDATE_PROFILE: return updateProfileDetails(state, action)
    case DSHBRD_UPDATE_PROFILE_SUCCESS: return updateProfileDetailsSuccess(state, action)
    case DSHBRD_UPDATE_PROFILE_FAILED: return updateProfileDetailsFailed(state, action)
    case DSHBRD_GET_PROFILE_DETAILS: return getProfileDetails(state, action)
    case DSHBRD_GET_PROFILE_DETAILS_SUCCESS: return getProfileDetailsSuccess(state, action)
    case DSHBRD_GET_PROFILE_DETAILS_FAILED: return getProfileDetailsFailed(state, action)
    case TOGGLE_MODALS: return toggleModals(state, action)
    case DSHBRD__CHANGE_PASSWORD: return changePassword(state, action)
    case DSHBRD__CHANGE_PASSWORD_FAILED: return changePasswordFailed(state, action)
    case DSHBRD__CHANGE_PASSWORD_SUCCESS: return changePasswordSuccess(state, action)
    case EDIT_ALERT: return editAlert(state, action)
    case EDIT_ALERT_SUCCESS: return editAlertSuccess(state, action)
    case EDIT_ALERT_FAILED: return editAlertFailed(state, action)
    case SET_SOCIAL_USER_PASSWORD: return setSocialUserPassword(state, action)
    case SET_SOCIAL_USER_PASSWORD_SUCCESS: return setSocialUserPasswordSuccess(state, action)
    case SET_SOCIAL_USER_PASSWORD_FAILED: return setSocialUserPasswordFailed(state, action)
    case ADD_ALTERNATE_EMAIL: return addAlternateEmail(state, action)
    case ADD_ALTERNATE_EMAIL_SUCCESS: return addAlternateEmailSuccess(state, action)
    case ADD_ALTERNATE_EMAIL_FAILED: return addAlternateEmailFailed(state, action)
    case EDIT_ALTERNATE_EMAIL: return editAlternateEmail(state, action)
    case EDIT_ALTERNATE_EMAIL_SUCCESS: return editAlternateEmailSuccess(state, action)
    case EDIT_ALTERNATE_EMAIL_FAILED: return editAlternateEmailFailed(state, action)
    case DELETE_ALTERNATE_EMAIL: return deleteAlternateEmail(state, action)
    case DELETE_ALTERNATE_EMAIL_SUCCESS: return deleteAlternateEmailSuccess(state, action)
    case DELETE_ALTERNATE_EMAIL_FAILED: return deleteAlternateEmailFailed(state, action)
    case GET_PRE_SIGNED_URL: return getPreSignedUrl(state, action)
    case GET_PRE_SIGNED_URL_SUCCESS: return getPreSignedUrlSuccess(state, action)
    case GET_PRE_SIGNED_URL_FAILED: return getPreSignedUrlFailed(state, action)
    case VERIFY_SMS_OTP: return verifySmsOtp(state, action)
    case VERIFY_SMS_OTP_SUCCESS: return verifySmsOtpSuccess(state, action)
    case VERIFY_SMS_OTP_FAILED: return verifySmsOtpFailed(state, action)
    case RESEND_SMS_OTP: return resendSmsOtp(state, action)
    case RESEND_SMS_OTP_SUCCESS: return resendSmsOtpSuccess(state, action)
    case RESEND_SMS_OTP_FAILED: return resendSmsOtpFailed(state, action)
    case TOGGLE_SMS_NOTIFICATION: return toggleSmsNotification(state, action)
    case TOGGLE_SMS_NOTIFICATION_SUCCESS: return toggleSmsNotificationSuccess(state, action)
    case TOGGLE_SMS_NOTIFICATION_FAILED: return toggleSmsNotificationFailed(state, action)
    case SET_EMAIL_PRIMARY: return setEmailPrimary(state, action)
    case SET_EMAIL_PRIMARY_SUCCESS: return setEmailPrimarySuccess(state, action)
    case SET_EMAIL_PRIMARY_FAILED: return setEmailPrimaryFailed(state, action)
    case RESEND_VERIFICATION_EMAIL: return resendVerificationEmail(state, action)
    case RESEND_VERIFICATION_EMAIL_SUCCESS: return resendVerificationEmailSuccess(state, action)
    case RESEND_VERIFICATION_EMAIL_FAILED: return resendVerificationEmailFailed(state, action)
    case TOGGLE_EMAILS_NOTIFICATION: return toggleEmailsNotification(state, action)
    case TOGGLE_EMAILS_NOTIFICATION_SUCCESS: return toggleEmailsNotificationSuccess(state, action)
    case TOGGLE_EMAILS_NOTIFICATION_FAILED: return toggleEmailsNotificationFailed(state, action)
    case DELETE_PHONE_NUMBER: return deletePhoneNumber(state, action)
    case DELETE_PHONE_NUMBER_SUCCESS: return deletePhoneNumberSuccess(state, action)
    case DELETE_PHONE_NUMBER_FAILED: return deletePhoneNumberFailed(state, action)
    case CANCEL_DOWNGRADE_SUBSCRIPTION: return cancelDowngradeSubscription(state, action)
    case CANCEL_DOWNGRADE_SUBSCRIPTION_SUCCESS: return cancelDowngradeSubscriptionSuccess(state, action)
    case CANCEL_DOWNGRADE_SUBSCRIPTION_FAILURE: return cancelDowngradeSubscriptionFailed(state, action)
    case GET_COUNTRIES_LIST_SUCCESS: return getCountryListSuccess(state, action)
    default: return state
  }
}

export default dashboardReducer
