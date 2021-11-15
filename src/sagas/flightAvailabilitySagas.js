import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET_FLIGHT_AVAILABILITY, CREATE_USER_ACTION_AUDIT, GET_ALERT_AVAILABILITY } from 'actions/FlightAvailability/actionTypes'
import {
  getFlightAvailabilitySuccess,
  getFlightAvailabilityFailure,
  userActionAuditSuccess,
  userActionAuditFailure,
  getAlertAvailabilitySuccess,
  getAlertAvailabilityFailure
} from 'actions/FlightAvailability'
import { getRequestNode, postRequestRuby, getRequestRuby } from './request'
import URls from 'constants/urls'
import { retrieveFromLocalStorage } from 'utils/helpers'
import { pushNotification } from 'utils/notifications'
import { availableAirways, airlineName } from 'constants/globalConstants'

function* handleGetFlightAvailability(action) {
  const { data } = action.payload
  const { tier, sourceCode, destinationCode, toggleClass, numberOfPassengers, airlineCode } = data
  const airlinePath = airlineCode === airlineName.VA.CODE ? availableAirways.VIRGIN_ATLANTIC :availableAirways.BRITISH_AIRWAYS
  const pathUrl = `${URls.AVAILABLE_FLIGHTS}/${airlinePath}`
  const url = `${pathUrl}?source_code=${sourceCode}&destination_code=${destinationCode}&tier=${tier}&number_of_passengers=${numberOfPassengers}`
  try {
    const response = yield call(getRequestNode, url)
    if (response && response.status && response.status === 200 && response.data) {
      yield put(getFlightAvailabilitySuccess(response.data))
      if (response?.data?.availability) {
        const finalClasses = {
          ...response.data.availability
        }
        Object.keys(toggleClass).map(item => {
          if (response.data.availability[item] && !toggleClass[item]) {
            finalClasses[item] = false
          }
          return finalClasses
        })
        // yield put(updateReducerState('searchPanel', 'toggalClasses', finalClasses))
      }
    } else {
      yield put(getFlightAvailabilitySuccess({}))
    }
  } catch (error) {
    yield put(getFlightAvailabilityFailure())
  }
}

function* watchGetFlightAvailability() {
  yield takeLatest(GET_FLIGHT_AVAILABILITY, handleGetFlightAvailability)
}

//  Create action audit user api
function* createUserActionAudit(action) {
  const { data } = action.payload
  try {
    const response = yield call(postRequestRuby, URls.USER_ACTION_AUDIT, data)
    if (response && response.status && response.status === 201) {
        yield put(userActionAuditSuccess())
    }
  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.error) {
      // pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    }
    yield put(userActionAuditFailure())
  }
}

function* watchUserActionAudit() {
  yield takeLatest(CREATE_USER_ACTION_AUDIT, createUserActionAudit)
}

//  Get alert availibility data
function* handleGetAlertAvailability(action) {
  const { alertId, emailLogId } = action.payload.data
  const accessToken = retrieveFromLocalStorage('token')
  const url = `/v1/alerts/${alertId}${URls.GET_ALERT_AVAILIBILITY}?user[access_token]=${accessToken}&alert[email_log_id]=${emailLogId}`
  try {
    const response = yield call(getRequestRuby, url)
    if (response && response.status && response.status === 200 && response.data) {
      yield put(getAlertAvailabilitySuccess(response.data))
    }
  } catch (error) {
    if (error?.response?.data?.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
    }
    yield put(getAlertAvailabilityFailure())
  }
}

function* watchGetAlertAvailability() {
  yield takeLatest(GET_ALERT_AVAILABILITY, handleGetAlertAvailability)
}

export default function* sagas() {
  yield all([
    watchGetFlightAvailability(),
    watchUserActionAudit(),
    watchGetAlertAvailability()
  ])
}
