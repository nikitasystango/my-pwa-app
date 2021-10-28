const Messages = {
  // 401 unauthhorized
  SESSION_EXPIRE: 'Session expired. Please login again',
  SOMETHING_WRONG_WITH_LOGIN: 'Something went wrong, Please try again for login',

  // Login case
  LOGIN_SUCCESS: 'Login success',
  LOGIN_FAILED: 'Login failed',
  FACEBOOK_LOGIN_FAILED: 'Facebook login failed. Please try again',
  GOOGLE_LOGIN_FAILED: 'Google Login Failed. Please try again!',
  APPLE_LOGIN_FAILED: 'Apple Login Failed. Please try again!',


  // Register case
  REGISTER_SUCCESS: 'Registartion success',
  REGISTER_FAILED: 'Registration failure',

  // Forgot password case
  FORGOT_PASSWORD_SUCCESS: 'A password recovery link will be sent to this email address if it\'s connected to a Reward Flight Finder account',
  FORGOT_PASSWORD_FAILED: 'Failed to initiate forgot password process. Please try again!!',

  // Reset password case
  RESET_PASSWORD_SUCCESS: 'User password successfully updated!!',
  RESET_PASSWORD_FAILED: 'Failed to reset password. Please try again',

  // Logout case
  LOGOUT_SUCCESS: 'Logout success!!',
  LOGOUT_FAIL: 'Failed to logout. Please try again',
  // Search Panel
  AIRLINE_REQUIRED: 'Please select airline',
  AMERICAN_AIRWAYS_NOT_ALLOW: 'Map works for British airways only',
  DEPARTURE_REQUIRED: 'Please select departure location',
  ARRIVAL_REQUIRED: 'Please select arrival location',
  TICKET_CLASS_REQUIRED: 'Please select ticket class',
  SUBSCRIBE_RETURN_INVALID: 'Please select return dates',
  SUBSCRIBE_DEPARTURE_INVALID: 'Please select departure dates',
  SUBSCRIBE_LOGIN_REQUIRED: 'Please login to subscribe for alerts',
  SUBSCRIBE_ALERT_SUCCESS: 'Alert created!',
  SUBSCRIBE_ALERT_FAILURE: 'Failed to create alert. Please try again',
  DEPARTURE_ARRIVAL_LOCATION_NOT_SAME: 'Departure and Arrival location can\'t be the same',
  FLY_FROM_REQUIRED: 'Plese select where do you want to fly',
  GO_DATE_REQUIRED: 'Please select When do you want to leave?',
  COME_BACK_DATE_REQUIRED: 'Please select When do you want to come back?',
  NO_POSSIBLE_ROUTE: 'We can\'t exchange locations, Possible routes aren\'t available',
  SELECT_LOCATOION_NO_HAVE_ROUTES: 'Selected origin doesn\'t have any routes',
  CABIN_CLASS_SELECT: 'Please select cabin class(es)',
  VERIFY_EMAIL: 'Please verify your email to create an alert',
  CREATE_ALERT_LIMIT: 'active alerts at once. Please either delete one of your other active alerts, or upgrade your membership',
  CREATE_ALERT_LIMIT_GOLD: 'active alerts at once. Please delete one of your other active alerts in order to create a new one',
  CREATE_ANOTHER_ALERT_SEARCH: 'To Create Another Alert Make a Search.',

  // Dashboard
  FETCHING_PROFILE_DETAILS: 'Fetching profile details. Please wait',
  FETCHING_ALERTS_LIST: 'Fetching subscribed alerts',
  CANCELLING_ALERT: 'Cancelling alert subscription. Please wait',
  CANCEL_ALERT_SUCCESS: 'Alert subscription cancelled!',
  CANCEL_ALERT_ERROR: 'Failed to cancel alert subscription',
  CHANGE_PASSWORD_SUCCESS: 'Changed password successfully!!',
  CHANGE_PASSWORD_FAILURE: 'Failed to change your password. Please try again',
  UPDATE_PROFILE_SUCCESS: 'User account details successfully updated!!',
  UPDATE_PROFILE_FAILURE: 'Failed to update profile details. Please try again',
  EMAIL_SEND_TO_YOUR_ID: 'Please verify your email address by clicking the verification link we just sent  ',
  UPDATE_ALERT_SUCCESS: 'Alert details successfully updated!!',
  UPDATE_ALERT_FAILED: 'Failed to update alert details. Please try again',
  SET_USER_PASSWORD_SUCCESS: 'Set password successfully!!',
  SET_USER_PASSWORD_FAILED: 'Failed to set the password. Please try again',
  RESEND_VERIFICATION_EMAIL_FAILED: 'Failed to resend verification email. Please try again',
  SET_PRIMARY_EMAIL_FAILED: 'Failed to set secondary email as primary. Please try again!!',
  TOGGLE_EMAIL_NOTIFICATION_FAILED: 'Failed to enable/disable email notification. Please try again',
  EMAIL_ALREADY_UESED: 'This email is already in use',
  ADD_ALTERNATE_EMAIL_FAILED: 'Failed to add alternate email. Please try again',
  EDIT_ALTERNATE_EMAIL_FAILED: 'Failed to update alternate email. Please try again',
  DELETE_ALTERNATE_EMAIL_FAILED: 'Failed to delete alternate email. Please try again',
  UPLOAD_PROFILE_PICTURE_FAILED: 'Failed to upload profile picture. Please try again',
  DELETE_PHONE_NUMBER_FAILED: 'Failed to delete phone number. Please try again',
  RESEND_OTP_FAILED: 'Failed to resend OTP. Please try again',
  VERIFY_OTP_FAILED: 'Failed to verify OTP. Please try again',
  TOGGLE_SMS_NOTIFICATION_FAILED: 'Failed to enable/disable SMS alert notifications. Please try again',
  ADD_EMAIL_FAILED: 'Failed to add email. Please try again',
  VERIFY_NUMBER: 'Please verify your phone number first',
  CANCEL_DOWNGRADE_SUBSCRIPTION_FAILED: 'Failed to cancel downgrade subscription. Please try again',
  CANCEL_DOWNGRADE_SUBSCRIPTION_SUCCESS: 'Your downgrade subscription has been cancelled successfully!!',
  DOWNGRADE_SUCCESS: 'Your subscription has been downgraded successfully',

  // charge bee
  SOMETHEING_WENT_WRONG: 'Something went wrong with ChargeBee. Please contact RFF support for assistance if needed',
  INVALID_TOKEN: 'Token is expire,Please try again',
  INVALID_ID: 'Invalid user ID. Please try again',
  EMAIL_ALREADY_TAKEN: 'This email is already connected to a Reward Flight Finder account',
  CONFIRMATION_TOKEN_INVALID: 'Email verification link expired',
  EMAIL_ALREADY_VERIFY: 'Email was already confirmed, please try signing in',
  ENABLED_POPUP: 'Please disable your pop-up blocker.'

}

export default Messages
