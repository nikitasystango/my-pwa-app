import {
  GET_FLIGHT_AVAILABILITY,
  GET_FLIGHT_AVAILABILITY_SUCCESS,
  GET_FLIGHT_AVAILABILITY_FAILURE,
  CREATE_USER_ACTION_AUDIT,
  CREATE_USER_ACTION_AUDIT_SUCCESS,
  CREATE_USER_ACTION_AUDIT_FAILURE,
  GET_ALERT_AVAILABILITY,
  GET_ALERT_AVAILABILITY_SUCCESS,
  GET_ALERT_AVAILABILITY_FAILURE
} from './actionTypes'

export const getFlightAvailability = (data) => ({
  type: GET_FLIGHT_AVAILABILITY,
  payload: { data }
})

export const getFlightAvailabilitySuccess = (data) => ({
  type: GET_FLIGHT_AVAILABILITY_SUCCESS,
  payload: data
})

export const getFlightAvailabilityFailure = () => ({
  type: GET_FLIGHT_AVAILABILITY_FAILURE
})

//  CREATE USER ACTION AUDIT
export const userActionAudit = (data) => ({
  type: CREATE_USER_ACTION_AUDIT,
  payload: { data }
})

export const userActionAuditSuccess = (data) => ({
  type: CREATE_USER_ACTION_AUDIT_SUCCESS,
  payload: data
})

export const userActionAuditFailure = () => ({
  type: CREATE_USER_ACTION_AUDIT_FAILURE
})

// Show all available dates in popup
export const getAlertAvailability = (data) => ({
  type: GET_ALERT_AVAILABILITY,
  payload: { data }
})

export const getAlertAvailabilitySuccess = (data) => ({
  type: GET_ALERT_AVAILABILITY_SUCCESS,
  payload: data
})

export const getAlertAvailabilityFailure = () => ({
  type: GET_ALERT_AVAILABILITY_FAILURE
})
