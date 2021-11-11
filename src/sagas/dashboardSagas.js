import {
  DSHBRD__REMOVE_PROFILE_PICTURE,
  DSHBRD__GET_SUBSCRIBED_ALERTS,
  DSHBRD__CANCEL_SUBSCRIBED_ALERTS,
  DSHBRD__CHANGE_PASSWORD,
  DSHBRD_GET_PROFILE_DETAILS,
  DSHBRD_UPDATE_PROFILE,
  EDIT_ALERT,
  SET_SOCIAL_USER_PASSWORD,
  ADD_ALTERNATE_EMAIL,
  EDIT_ALTERNATE_EMAIL,
  DELETE_ALTERNATE_EMAIL,
  GET_PRE_SIGNED_URL,
  VERIFY_SMS_OTP,
  RESEND_SMS_OTP,
  TOGGLE_SMS_NOTIFICATION,
  SET_EMAIL_PRIMARY,
  RESEND_VERIFICATION_EMAIL,
  TOGGLE_EMAILS_NOTIFICATION,
  DELETE_PHONE_NUMBER,
  CANCEL_DOWNGRADE_SUBSCRIPTION,
  GET_COUNTRIES_LIST
} from 'actions/Dashboard/actionTypes'
import { all, put, call, takeLatest, select, takeEvery, take } from 'redux-saga/effects'
import {
  getSubscribedAlerts,
  getSubscribedAlertsSuccess, getSubscribedAlertsFailed,
  cancelSubscribedAlertsSuccess, cancelSubscribedAlertsFailed,
  getProfileDetails as getProfileDetailsUser, getProfileDetailsSuccess, getProfileDetailsFailed,
  changePasswordSuccess, changePasswordFailed,
  handleUpdateProfileSuccess, handleUpdateProfileFailed,
  removeProfilePictureSuccess, removeProfilePictureFailed,
  editAlertSuccess, editAlertFailed,
  setSocialUserPasswordSuccess, setSocialUserPasswordFailed,
  addAlternateEmailSuccess, addAlternateEmailFailed,
  editAlternateEmailSuccess, editAlternateEmailFailed,
  deleteAlternateEmailSuccess, deleteAlternateEmailFailed,
  getPreSignedUrlSuccess, getPreSignedUrlFailed,
  verifySmsOtpSuccess, verifySmsOtpFailed,
  resendSmsOtpSuccess, resendSmsOtpFailed,
  toggleSmsNotificationSuccess, toggleSmsNotificationFailed,
  setEmailPrimarySuccess, setEmailPrimaryFailed,
  resendVerificationEmailSuccess, resendVerificationEmailFailed,
  toggleEmailsNotificationSuccess, toggleEmailsNotificationFailed,
  deletePhoneNumberSuccess, deletePhoneNumberFailed,
  cancelDowngradeSubscriptionSuccess,
  cancelDowngradeSubscriptionFailed,
  getCountriesListFailed, getCountriesListSuccess
} from 'actions/Dashboard'
import { patchRequestRuby, getRequestRuby, putRequestRuby, deleteRequestRuby, postRequestRuby } from './request'
import URls from 'constants/urls'
import { pushNotification } from 'utils/notifications'
import { setInLocalStorage, retrieveFromLocalStorage, navigateToRespectivePage, removeFromLocalStorage } from 'utils/helpers'
import { updateReducerState } from 'actions/Common'
import { resetAuthState } from 'actions/Auth'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import toustifyMessages from 'constants/messages/toustifyMessages'
import { updateReducerAirlineData } from 'utils/commonFunction'

// ********** Profile Picture Remove**********
function* removeProfilePicture(action) {
  try {
    const token = retrieveFromLocalStorage('token')
    const userProfileUpdateUrl = `${URls.REMOVE_PROFILE_PICTURE}?user[access_token]=${token}`

    const response = yield call(putRequestRuby, userProfileUpdateUrl)
    if (response && response.status && response.status === 204) {
      const user = yield select(state => state.auth.user)
      yield put(getProfileDetailsUser(user && user.id))
      yield put(removeProfilePictureSuccess())
    } else {
      throw new Error(intl(toustifyMessages.errorRemovingProfilePicture))
    }
  } catch (error) {
    yield put(removeProfilePictureFailed())
  }
}

function* watchRemoveProfilePicture() {
  while (true) {
    const action = yield take(DSHBRD__REMOVE_PROFILE_PICTURE)
    yield call(removeProfilePicture, action)
  }
}

function* getSubscribedAlertsAPI(action) {
  const token = retrieveFromLocalStorage('token')
  const url = `${URls.SUBSCRIBE_AVAILABILITY_ALERT}?user[access_token]=${token}`
  try {
    const response = yield call(getRequestRuby, url)
    if (response && response.status === 200 && response.data && response.data.data) {
      yield put(getSubscribedAlertsSuccess(response.data.data))
    }
  } catch (error) {
    yield put(getSubscribedAlertsFailed())
  }
}

function* watchGetSubscribedAlerts() {
  yield takeLatest(DSHBRD__GET_SUBSCRIBED_ALERTS, getSubscribedAlertsAPI)
}

function* cancelSubscribedAlerts(action) {
  const { id } = action.payload
  const token = retrieveFromLocalStorage('token')
  try {
    const cancelAlertURL = `${URls.CANCEL_SUBSCRIBED_ALERTS}/${id}?user[access_token]=${token}`
    const response = yield call(deleteRequestRuby, cancelAlertURL)
    if (response.status && response.status === 204) {
      yield put(cancelSubscribedAlertsSuccess())
      //  close toggalPreviewAlertModal on delete alert for calendar page
      yield put(updateReducerState('searchPanel', 'toggalPreviewAlertModal', false))
      yield put(getSubscribedAlerts())
      const user = yield select(state => state.auth.user)
      yield put(getProfileDetailsUser(user && user.id))
      // pushNotification(Messages.REGISTER_SUCCESS, 'success', 'TOP_CENTER', 1000)
    }
  } catch (error) {
    yield put(cancelSubscribedAlertsFailed())
    pushNotification(intl(toustifyMessages.cancelAlertFailed), 'error')
  }
}

function* watchCancelSubscribedAlerts() {
  yield takeEvery(DSHBRD__CANCEL_SUBSCRIBED_ALERTS, cancelSubscribedAlerts)
}

function* updateProfileDetails(action) {
  const { data, onboardingExistingUser } = action.payload.data
  const user = yield select(state => state.auth.user)
  const url = `${URls.UPDATE_USER_PROFILE}/${user && user.id}`
  try {
    const response = yield call(putRequestRuby, url, data)
    if (response && response.status && response.status === 204) {
      yield put(getProfileDetailsUser(user?.id))
      yield put(handleUpdateProfileSuccess())
      updateReducerState('common', 'airlineMembershipToggle', false)
      if(onboardingExistingUser && onboardingExistingUser !== null) {
        yield put(updateReducerState('pages', 'toggleSignupOnBoardingModal', false))
      }
    }
  } catch (error) {
    if (error?.response?.data?.error) {
      pushNotification(error?.response?.data?.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.updateUserFailed), 'error', 'TOP_CENTER', 3000)
    }
    yield put(handleUpdateProfileFailed())
  }
}

function* watchUpdateProfileDetails() {
  while (true) {
    const action = yield take(DSHBRD_UPDATE_PROFILE)
    yield call(updateProfileDetails, action)
  }
}

function* getProfileDetails(action) {
  const { userId } = action.payload
  const accessToken = retrieveFromLocalStorage('token')
  const url = `${URls.GET_PROFILE_DETAILS}/${userId}?user[access_token]=${accessToken}`
  try {
    const response = yield call(getRequestRuby, url)
    if (response && response.status && response.status === 200 && response.data &&
      response.data.data) {
      const userValue = response.data.data
      setInLocalStorage('userDetails', JSON.stringify(userValue))
      let plan = {}
      if (userValue && userValue.current_subscription_expiry && userValue.current_plan) {
        plan = {
          expiryTime: userValue.current_subscription_expiry,
          ...userValue.current_plan
        }
      }
      const data = {
        email: userValue && userValue.email ? userValue.email : null,
        id: userValue && userValue.id ? userValue.id : null,
        country: userValue && userValue.country ? userValue.country : null,
        firstName: userValue && userValue.first_name ? userValue.first_name : null,
        lastName: userValue && userValue.last_name ? userValue.last_name : null,
        preferredCurrency: userValue && userValue.preferred_currency ? userValue.preferred_currency : null,
        profileImage: userValue && userValue.image ? userValue.image : null,
        plan: plan,
        isUserSilverMember: userValue?.silver_member || false,
        isUserGoldMember: userValue?.gold_member || false,
        notificationSettings: userValue?.notification_setting || null,
        cancelledSubscription: userValue?.cancelled_subscription || false,
        goldFreeTrial: userValue?.opted_free_trial || false,
        isUserBronzeMember: userValue?.bronze_member || false,
        socialUserPasswordSet: userValue?.password_configured_manually || false,
        alternateEmails: userValue?.alternate_emails || [],
        isSocialUser: userValue?.social_user || false,
        phoneNumber: userValue?.phone || null,
        isEmailVerified: userValue?.email_verified || false,
        isEmailNotificationEnable: userValue?.email_notifiable || false,
        createAlertsLimit: userValue?.allowed_active_alerts || 0,
        activeAlertsCount: userValue?.current_active_alerts || 0,
        downgradeMembership: userValue?.gold_to_silver_downgrade || false,
        onboarded: userValue.onboarded,
        allowedAlertDateRange: userValue?.allowed_date_range_for_alerts || 0,
        trialEligibilty: userValue?.trial_eligibility || {},
        downgradedPlan: userValue?.downgraded_plan || null,
        address: userValue?.address || {},
        ageBand: userValue?.age_band || null,
        flightsTakenAnnually: userValue?.flights_taken_annually || null,
        gender: userValue?.gender || null,
        travellingAbroad: userValue?.travelling_abroad_in_next_12_months || null,
        redeemedCouponIds: userValue?.redeemed_coupon_ids || null,
        airlineMemberships: userValue?.airline_memberships || []
      }
      yield put(updateReducerState('auth', 'user', data))
      updateReducerData(data?.airlineMemberships)
      yield put(getProfileDetailsSuccess(data))
    }
  } catch (error) {
    pushNotification(intl(toustifyMessages.somethingWentWrong), 'error', 'TOP_CENTER', 3000)
    removeFromLocalStorage('userDetails')
    removeFromLocalStorage('token')
    removeFromLocalStorage('signupFirstTime')
    removeFromLocalStorage('userId')
    yield put(resetAuthState())
    navigateToRespectivePage(AppRoutes.HOME)
    yield put(getProfileDetailsFailed())
  }
}

const updateReducerData = (airlineMemberships) => {
  if(airlineMemberships && airlineMemberships.length) {
    const dataJson = updateReducerAirlineData(airlineMemberships)
    Object.keys(dataJson).map((item) => (
      updateReducerState('searchPanel', item, dataJson[item])
    ))
  }
}

function* watchgetProfileDetails() {
  while (true) {
    const action = yield take(DSHBRD_GET_PROFILE_DETAILS)
    yield call(getProfileDetails, action)
  }
}

function* changePassword(action) {
  try {
    const user = yield select(state => state.auth.user)
    const url = `v1/users/${user && user.id}/${URls.CHANGE_PASSWORD_DETAILS}`
    const response = yield call(patchRequestRuby, url, action.payload)
    if (response && response.status && response.status === 204) {
      yield put(changePasswordSuccess())
       pushNotification(intl(toustifyMessages.changePasswordSuccess), 'success', 'TOP_CENTER', 3000)
       yield put(updateReducerState('dashboard', 'activeProfileView', 0))
    }
  } catch (error) {
    yield put(changePasswordFailed())
    if (error && error.response && error.response.data && error.response.data.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.changePasswordFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchChangePassword() {
  while (true) {
    const action = yield take(DSHBRD__CHANGE_PASSWORD)
    yield call(changePassword, action)
  }
}

// edit alert
function* editUserAlert(action) {
  const { data, id } = action.payload
  try {
    const url = `${URls.UPDATE_ALERT_DETAILS}/${id}`
    const response = yield call(putRequestRuby, url, data)
    if (response && response.status && response.status === 204) {
      yield put(editAlertSuccess())
      yield put(updateReducerState('searchPanel', 'toggleEditAlertModal', false))
      yield put(getSubscribedAlerts())
    } else {
      yield put(editAlertFailed())
    }
  } catch (error) {
    yield put(editAlertFailed())
    pushNotification(intl(toustifyMessages.updateAlertFailed), 'error', 'TOP_CENTER', 3000)
  }
}

function* watchEditAlert() {
  yield takeLatest(EDIT_ALERT, editUserAlert)
}

// set social user password
function* setUserSocialPassword(action) {
  const { data } = action.payload
  try {
    const user = yield select(state => state.auth.user)
    const url = `${URls.SET_SOCIAL_USER_PASSWORD}/${user?.id}/set_password`
    const response = yield call(patchRequestRuby, url, data)
    if (response?.status === 204) {
      yield put(setSocialUserPasswordSuccess())
      yield put(getProfileDetailsUser(user?.id))
      // pushNotification(Messages.SET_USER_PASSWORD_SUCCESS, 'success', 'TOP_CENTER', 3000)
    } else {
      yield put(setSocialUserPasswordFailed())
      pushNotification(intl(toustifyMessages.setPassFailed), 'error', 'TOP_CENTER', 3000)
    }
  } catch (error) {
    yield put(setSocialUserPasswordFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.setPassFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchSetSocialUserPassword() {
  yield takeLatest(SET_SOCIAL_USER_PASSWORD, setUserSocialPassword)
}

// add alternate email
function* addAlternateEmailHandler(action) {
  const { data } = action.payload
  try {
    const user = yield select(state => state.auth.user)
    const url = `/v1/users/${user?.id}/${URls.ALTERNATE_EMAIL_URL}`
    const response = yield call(postRequestRuby, url, data)
    if (response?.status === 201) {
      yield put(addAlternateEmailSuccess())
      pushNotification(intl(toustifyMessages.linkSendToEmail), 'success', 'TOP_CENTER', 3000)
      yield put(getProfileDetailsUser(user?.id))
    } else {
      yield put(addAlternateEmailFailed())
      pushNotification(intl(toustifyMessages.addAlternateEmailFailed), 'error', 'TOP_CENTER', 3000)
    }
  } catch (error) {
    yield put(addAlternateEmailFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.addAlternateEmailFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchAddAlternateEmail() {
  yield takeLatest(ADD_ALTERNATE_EMAIL, addAlternateEmailHandler)
}

// edit alternate email
function* editAlternateEmailHandler(action) {
  const { data } = action.payload
  const { id, details } = data
  try {
    const user = yield select(state => state.auth.user)
    const url = `/v1/users/${user?.id}/${URls.ALTERNATE_EMAIL_URL}/${id}`
    const response = yield call(putRequestRuby, url, details)
    if (response?.status === 204) {
      yield put(editAlternateEmailSuccess())
      pushNotification(intl(toustifyMessages.linkSendToEmail), 'success', 'TOP_CENTER', 3000)
      yield put(getProfileDetailsUser(user?.id))
    } else {
      yield put(editAlternateEmailFailed())
      pushNotification(intl(toustifyMessages.updateAlternateEmailFailed), 'error', 'TOP_CENTER', 3000)
    }
  } catch (error) {
    yield put(editAlternateEmailFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.updateAlternateEmailFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchEditAlternateEmail() {
  yield takeLatest(EDIT_ALTERNATE_EMAIL, editAlternateEmailHandler)
}

// delete alternate email
function* deleteAlternateEmailHandler(action) {
  const { data } = action.payload
  const { id, token } = data
  try {
    const user = yield select(state => state.auth.user)
    const url = `/v1/users/${user?.id}/${URls.ALTERNATE_EMAIL_URL}/${id}?user[access_token]=${token}`
    const response = yield call(deleteRequestRuby, url, data)
    if (response?.status === 204) {
      yield put(deleteAlternateEmailSuccess())
      yield put(getProfileDetailsUser(user?.id))
    } else {
      yield put(deleteAlternateEmailFailed())
      pushNotification(intl(toustifyMessages.deleteAlternateEmailFailed), 'error', 'TOP_CENTER', 3000)
    }
  } catch (error) {
    yield put(deleteAlternateEmailFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.deleteAlternateEmailFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchDeleteAlternateEmail() {
  yield takeLatest(DELETE_ALTERNATE_EMAIL, deleteAlternateEmailHandler)
}

// Get pre signed url for uploading image
function* getPreSignedUrlHandler(action) {
  const { data } = action.payload
  const { token, image } = data
  const extension = image?.type?.split('/').pop()
  try {
    const user = yield select(state => state.auth.user)
    const url = `/v1/users/${user?.id}/${URls.GET_PRE_SIGNED_URL}?user[access_token]=${token}&user[file_extension]=${extension}`
    const response = yield call(getRequestRuby, url)
    if (response?.status === 200 && response?.data?.presigned_url) {
      const { presigned_url } = response?.data;
      yield put(getPreSignedUrlSuccess({ presigned_url, image }))
    } else {
       pushNotification(intl(toustifyMessages.uploadProfileImageFailed), 'error', 'TOP_CENTER', 3000)
      yield put(getPreSignedUrlFailed())
    }
  } catch (error) {
    yield put(getPreSignedUrlFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
       pushNotification(intl(toustifyMessages.uploadProfileImageFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchGetPreSignedUrl() {
  yield takeLatest(GET_PRE_SIGNED_URL, getPreSignedUrlHandler)
}

// verify sms otp
function* verifySmsOtpHandler(action) {
  const { data } = action.payload
  const { token, smsOtp } = data
  const details = {
    user: {
      access_token: token
    },
    user_phone_number: {
      code: smsOtp
    }
  }
  try {
    const user = yield select(state => state.auth.user)
    const url = `/v1/users/${user?.id}${URls.VERIFY_OTP}`
    const response = yield call(putRequestRuby, url, details)
    if (response?.status === 204) {
      yield put(verifySmsOtpSuccess())
      yield put(getProfileDetailsUser(user?.id))
    } else {
      yield put(verifySmsOtpFailed())
      pushNotification(intl(toustifyMessages.verifyOtpFailed), 'error', 'TOP_CENTER', 3000)
    }
  } catch (error) {
    yield put(verifySmsOtpFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.verifyOtpFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchVerifySmsOtp() {
  yield takeLatest(VERIFY_SMS_OTP, verifySmsOtpHandler)
}

// resend sms otp
function* resendSmsOtpHandler(action) {
  const { data } = action.payload
  const { token } = data
  const details = {
    user: {
      access_token: token
    }
  }
  try {
    const user = yield select(state => state.auth.user)
    const url = `/v1/users/${user?.id}${URls.RESEND_OTP_URL}`
    const response = yield call(putRequestRuby, url, details)
    if (response?.status === 204) {
      yield put(resendSmsOtpSuccess())
    } else {
      yield put(resendSmsOtpFailed())
     pushNotification(intl(toustifyMessages.resendOtpFailed), 'error', 'TOP_CENTER', 3000)
    }
  } catch (error) {
    yield put(resendSmsOtpFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
     pushNotification(intl(toustifyMessages.resendOtpFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchResendSmsOtp() {
  yield takeLatest(RESEND_SMS_OTP, resendSmsOtpHandler)
}

// toggle sms notification
function* toggleSmsNotificationHandler(action) {
  const { data } = action.payload
  const { token, isActive } = data
  const details = {
    user: {
      access_token: token
    },
    user_phone_number: {
      sms_enabled: isActive
    }
  }
  try {
    const user = yield select(state => state.auth.user)
    const url = `/v1/users/${user?.id}${URls.TOGGLE_SMS_NOTIFICATION_URL}`
    const response = yield call(putRequestRuby, url, details)
    if (response?.status === 204) {
      yield put(toggleSmsNotificationSuccess())
      yield put(getProfileDetailsUser(user?.id))
    } else {
       pushNotification(intl(toustifyMessages.toggleSmsFailed), 'error', 'TOP_CENTER', 3000)
      yield put(toggleSmsNotificationFailed())
    }
  } catch (error) {
    yield put(toggleSmsNotificationFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
       pushNotification(intl(toustifyMessages.toggleSmsFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchToggleSmsNotification() {
  yield takeLatest(TOGGLE_SMS_NOTIFICATION, toggleSmsNotificationHandler)
}

// set primary email
function* setPrimaryEmailHandler(action) {
  const { data } = action.payload
  const { id, token } = data
  const details = {
    user: {
      access_token: token
    }
  }
  try {
    const user = yield select(state => state.auth.user)
    const url = `/v1/users/${user?.id}/notification_emails/${id}${URls.SET_PRIMARY_EMAIL_URL}`
    const response = yield call(putRequestRuby, url, details)
    if (response?.status === 204) {
      yield put(setEmailPrimarySuccess())
      yield put(getProfileDetailsUser(user?.id))
    } else {
      pushNotification(intl(toustifyMessages.setPrimaryEmailFailed), 'error', 'TOP_CENTER', 3000)
      yield put(setEmailPrimaryFailed())
    }
  } catch (error) {
    yield put(setEmailPrimaryFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.setPrimaryEmailFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchSetPrimaryEmail() {
  yield takeLatest(SET_EMAIL_PRIMARY, setPrimaryEmailHandler)
}

// resend verification email
function* resendVerificationEmailHandler(action) {
  const { data } = action.payload
  const { id, token, resendName } = data
  const details = {
    user: {
      access_token: token
    }
  }
  try {
    const user = yield select(state => state.auth.user)
    let url = `/v1/users/${user?.id}/${URls.ALTERNATE_EMAIL_URL}/${id}${URls.RESENT_SECONDARY_VERIFICATION_EMAIL}`
    if (resendName === 'primaryResend') {
      url = `/v1/users/${user?.id}${URls.RESENT_PRIMARY_VERIFICATION_EMAIL}`
    }
    const response = yield call(putRequestRuby, url, details)
    if (response?.status === 204) {
      pushNotification(intl(toustifyMessages.linkSendToEmail), 'success', 'TOP_CENTER', 3000)
      yield put(resendVerificationEmailSuccess())
    } else {
      pushNotification(intl(toustifyMessages.resendEmailFailed), 'error', 'TOP_CENTER', 3000)
      yield put(resendVerificationEmailFailed())
    }
  } catch (error) {
    yield put(resendVerificationEmailFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.resendEmailFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchResendVerificationEmail() {
  yield takeLatest(RESEND_VERIFICATION_EMAIL, resendVerificationEmailHandler)
}

// toggle emails notification
function* toggleEmailsNotificationHandler(action) {
  const { data } = action.payload
  const { isActive, token } = data
  const details = {
    user: {
      access_token: token,
      email_notifiable: isActive
    }
  }
  try {
    const user = yield select(state => state.auth.user)
    const url = `/v1/users/${user?.id}${URls.TOGGLE_EMAIL_NOTIFICATION_URL}`
    const response = yield call(putRequestRuby, url, details)
    if (response?.status === 204) {
      yield put(toggleEmailsNotificationSuccess())
      yield put(getProfileDetailsUser(user?.id))
    } else {
      pushNotification(intl(toustifyMessages.toggleEmailFailed), 'error', 'TOP_CENTER', 3000)
      yield put(toggleEmailsNotificationFailed())
    }
  } catch (error) {
    yield put(toggleEmailsNotificationFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.toggleEmailFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchToggleEmailsNotification() {
  yield takeLatest(TOGGLE_EMAILS_NOTIFICATION, toggleEmailsNotificationHandler)
}

// delete phone number
function* HandlerDeletePhoneNumber(action) {
  const { data } = action.payload
  const { token } = data
  try {
    const user = yield select(state => state.auth.user)
    const url = `/v1/users/${user?.id}${URls.DELETE_PHONE_NUMBER}?user[access_token]=${token}`
    const response = yield call(deleteRequestRuby, url)
    if (response?.status === 204) {
      yield put(deletePhoneNumberSuccess())
      yield put(getProfileDetailsUser(user?.id))
    } else {
      pushNotification(intl(toustifyMessages.deletePhoneNumberFailed), 'error', 'TOP_CENTER', 3000)
      yield put(deletePhoneNumberFailed())
    }
  } catch (error) {
    yield put(deletePhoneNumberFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.deletePhoneNumberFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchDeletePhoneNumber() {
  yield takeLatest(DELETE_PHONE_NUMBER, HandlerDeletePhoneNumber)
}

// cancel downgrade subscription
function* HandlerCancelDowngradeSubscription(action) {
  const { data } = action.payload
  const { token } = data
  try {
    const user = yield select(state => state.auth.user)
    const url = `/v1/users/${user?.id}${URls.CANCEL_DOWNGRADE_SUBSCRIPTION}?user[access_token]=${token}`
    const response = yield call(putRequestRuby, url)
    if (response?.status === 204) {
      pushNotification(intl(toustifyMessages.cancelDowngradeSubscriptionSuccess), 'success', 'TOP_CENTER', 3000)
      yield put(cancelDowngradeSubscriptionSuccess())
      yield put(getProfileDetailsUser(user?.id))
    } else {
      pushNotification(intl(toustifyMessages.cancelDowngradeSubscriptionFailed), 'error', 'TOP_CENTER', 3000)
      yield put(cancelDowngradeSubscriptionFailed())
    }
  } catch (error) {
    yield put(cancelDowngradeSubscriptionFailed())
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.cancelDowngradeSubscriptionFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchCancelDowngradeSubscription() {
  yield takeLatest(CANCEL_DOWNGRADE_SUBSCRIPTION, HandlerCancelDowngradeSubscription)
}

// Get countries list
function* getCountries() {
  try {
    const response = yield call(getRequestRuby, URls.GET_COUNTRIES_LIST)
    if (response?.status === 200 && response?.data) {
      yield put(getCountriesListSuccess(response.data))
    }
  } catch (error) {
    yield put(getCountriesListFailed())
  }
}

function* watchGetCountriesList() {
  yield takeLatest(GET_COUNTRIES_LIST, getCountries)
}


export default function* dashboardSagas() {
  yield all([
    watchRemoveProfilePicture(),
    watchGetSubscribedAlerts(),
    watchCancelSubscribedAlerts(),
    watchUpdateProfileDetails(),
    watchgetProfileDetails(),
    watchChangePassword(),
    watchEditAlert(),
    watchSetSocialUserPassword(),
    watchAddAlternateEmail(),
    watchEditAlternateEmail(),
    watchDeleteAlternateEmail(),
    watchGetPreSignedUrl(),
    watchVerifySmsOtp(),
    watchResendSmsOtp(),
    watchToggleSmsNotification(),
    watchSetPrimaryEmail(),
    watchResendVerificationEmail(),
    watchToggleEmailsNotification(),
    watchDeletePhoneNumber(),
    watchCancelDowngradeSubscription(),
    watchGetCountriesList()
  ])
}
