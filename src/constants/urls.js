const URLs = {

  // cms url's
  GET_TESTIMONIAL_URL: '/testimonials',
  COMMON_CONTENT_URL: '/page',
  GET_SINGLE_BLOG: '/blogs',
  GET_BLOGS: '/blogs',
  GET_BLOGS_CATEGORIES: '/categories',
  GET_FAQ_CATEGORIES: '/faq-categories',
  GET_FAQ: '/faqs',

  // Ruby APi's
  REGISTER: 'v1/users',
  LOGIN: 'v1/users/login',
  FACEBOOK_LOGIN: 'v1/users/social_auth',
  GET_PROFILE_DETAILS: 'v1/users',
  FORGOT_PASSWORD: 'v1/users/forgot_password',
  LOGOUT_USER: 'v1/users/logout',
  RESET_PASSWORD: 'v1/users/reset_password',
  CHANGE_PASSWORD_DETAILS: 'change_password',
  UPDATE_USER_PROFILE: 'v1/users',
  SEARCH_LOCATION: 'v1/airports',
  REMOVE_PROFILE_PICTURE: 'v1/users/image/_delete',
  SET_SOCIAL_USER_PASSWORD: '/v1/users',
  ALTERNATE_EMAIL_URL: 'notification_emails',
  GET_PRE_SIGNED_URL: 'profile',
  SET_PRIMARY_EMAIL_URL: '/set_as_primary',
  RESENT_SECONDARY_VERIFICATION_EMAIL: '/reverify',
  RESENT_PRIMARY_VERIFICATION_EMAIL: '/resend_verification_emails',
  TOGGLE_EMAIL_NOTIFICATION_URL: '/enable_email_notifications',
  TOGGLE_SMS_NOTIFICATION_URL: '/user_phone_numbers/toggle_sms',
  DELETE_PHONE_NUMBER: '/user_phone_numbers',
  RESEND_OTP_URL: '/user_phone_numbers/resend_otp',
  VERIFY_OTP: '/user_phone_numbers/verify_otp',
  CANCEL_DOWNGRADE_SUBSCRIPTION: '/cancel_scheduled_downgrades',
  GET_USER_NEAREST_AIRPORT_URL: 'v1/airports/nearby',
  USER_ACTION_AUDIT: 'v1/user_action_audits',
  TRACK_USER_AGENT: 'v1/users/track_fingerprint',
  UPDATE_PROFILE_NAME: '/update_details',
  GET_ALERT_AVAILIBILITY: '/availabilities',

  // alerts
  SUBSCRIBE_AVAILABILITY_ALERT: 'v1/alerts',
  CANCEL_SUBSCRIBED_ALERTS: 'v1/alerts',
  UPDATE_ALERT_DETAILS: 'v1/alerts',
  GET_PRICING_PLANS: 'v1/plans',
  CANCEL_ELITE_MEMBERSHIP: 'v1/subscriptions/_cancel',
  GET_SUBSCRIBED_ALERTS: 'alerts',
  GET_AVAILABILITY: 'flights/query',
  ADD_EMAIL_URL: '/v1/upcoming_airline_requests',
 // Node APi's
 AVAILABLE_FLIGHTS: 'entire-availability',
 GET_FLIGHTS_AVAILABILITY: 'available-destinations',
 AIRLINES_LIST: '/airlines',
 GET_SOU_DES_LOCATION_URL: 'locations',
 GET_SOU_DES_POSSIBLE_ROUTES_URL: 'possible-routes'

}

export default URLs
