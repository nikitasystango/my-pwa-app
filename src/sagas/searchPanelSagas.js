import { all, call, put, takeLatest, cancelled, select } from 'redux-saga/effects'
import {
  GET_AIRLINE_LIST, GET_SEARCHED_LOCATION, SEND_ME_ALERT,
  GET_SOU_DES_LOCATIONS, GET_SOU_DES_POSSIBLE_ROUTES, GET_USER_NEAREST_AIRPORT
} from 'actions/SearchPanel/actionTypes'
import {
  getAirlineListSuccess,
  getAirlineListFailure,
  setSearchedLocation,
  sendMeAlertSuccess,
  sendMeAlertFailure,
  resetAlertSelectedDates,
  getSouDesLocationsSuccess, getSouDesLocationsFailure,
  getSouDesPossibleRoutesSuccess, getSouDesPossibleRoutesFailure,
  getUserNearestAirportSuccess, getUserNearestAirportFailed
} from 'actions/SearchPanel'
import { postRequestRuby, getRequestNode, getRequestRuby } from './request'
import URls from 'constants/urls'
import authServiceRuby from 'utils/authServiceRuby'
import { pushNotification } from 'utils/notifications'
import { retrieveFromLocalStorage } from 'utils/helpers'
import { getProfileDetails, getSubscribedAlerts } from 'actions/Dashboard'
import intl from 'utils/intlMessage'
import toustifyMessages from 'constants/messages/toustifyMessages'
import { updateReducerState } from 'actions/Common'
import { availableAirways, airlineName } from 'constants/globalConstants'

function* handleGetAirlinesList(action) {
  const { payload } = action
  const user = yield select(state => state.auth.user)
  try {
    const response = yield call(getRequestNode, URls.AIRLINES_LIST)
    if (response && response.status && response.status === 200 && response.data) {
      yield put(getAirlineListSuccess({ data: response.data, payloadData: payload, user }))
    }
  } catch (error) {
    yield put(getAirlineListFailure())
  }
}

function* watchGetAirlineRequest() {
  yield takeLatest(GET_AIRLINE_LIST, handleGetAirlinesList)
}

function* handleGetSearchedLocation(action) {
  const { keyword, type } = action.payload
  const cancelSource = authServiceRuby.CancelToken.source()
  try {
    const url = `${URls.SEARCH_LOCATION}?search_query[location]=${keyword}`
    const response = yield call(authServiceRuby.axios.get, url, { cancelToken: cancelSource.token })
    if (response && response.status && response.status === 200 && response.data) {
      yield put(setSearchedLocation(response.data, type))
    }
  } catch (error) {
    yield put(setSearchedLocation([], type))
  } finally {
    if (yield (cancelled())) {
      yield call(cancelSource.cancel)
    }
  }
}

function* watchGetLocationsFromQuery() {
  yield takeLatest(GET_SEARCHED_LOCATION, handleGetSearchedLocation)
}

function* handleSendMeAlert(action) {
  const { data } = action.payload
  const token = retrieveFromLocalStorage('token')
  const payload = {
    alert: {
      ...data
    },
    user: {
      access_token: token
    }
  }
  try {
    const response = yield call(postRequestRuby, URls.SUBSCRIBE_AVAILABILITY_ALERT, payload)
    if (response && response.status && response.status === 201) {
      pushNotification(intl(toustifyMessages.createAlertSuccess), 'success', 'TOP_CENTER', 3000)
      const alertId = response?.headers?.location?.split('/')?.pop()
      yield put(sendMeAlertSuccess(alertId))
      yield put(getSubscribedAlerts())
      yield put(updateReducerState('searchPanel', 'toggalPreviewAlertModal', true))
      yield put(updateReducerState('searchPanel', 'toggalAlertDatesModal', false))
      const user = yield select(state => state.auth.user)
      yield put(getProfileDetails(user && user.id))
      yield put(resetAlertSelectedDates())
    }
  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 5000)
    } else {
      pushNotification(intl(toustifyMessages.createAlertFailed), 'error', 'TOP_CENTER', 3000)
    }
    yield put(sendMeAlertFailure())
  }
}

function* watchSendMeAlert() {
  yield takeLatest(SEND_ME_ALERT, handleSendMeAlert)
}

// get source destinaation location

function* handleSouDesLocations(action) {
  const { selectedAirline } = action.payload
  try {
    const airlinePath = selectedAirline === airlineName.VA.CODE ? availableAirways.VIRGIN_ATLANTIC : availableAirways.BRITISH_AIRWAYS 
    const pathUrl = `${URls.GET_SOU_DES_LOCATION_URL}/${airlinePath}`
    const response = yield call(getRequestNode, pathUrl)
    if (response && response.status && response.status === 200 && response.data) {
      yield put(getSouDesLocationsSuccess(response.data))
    }
  } catch (error) {
    yield put(getSouDesLocationsFailure())
  }
}

function* watchGetSouDesLocation() {
  yield takeLatest(GET_SOU_DES_LOCATIONS, handleSouDesLocations)
}

// get source destinaation possible routes

function* handleSouDesPossibleRoutes(action) {
  const { selectedAirline } = action.payload
  try {
    const pathUrl = `${URls.GET_SOU_DES_POSSIBLE_ROUTES_URL}/${selectedAirline === airlineName.VA.CODE ? availableAirways.VIRGIN_ATLANTIC : availableAirways.BRITISH_AIRWAYS }`
    const response = yield call(getRequestNode, pathUrl)
    if (response && response.status && response.status === 200 && response.data) {
      yield put(getSouDesPossibleRoutesSuccess(response.data))
    }
  } catch (error) {
    yield put(getSouDesPossibleRoutesFailure())
  }
}

function* watchGetSouDesPossibleRoutes() {
  yield takeLatest(GET_SOU_DES_POSSIBLE_ROUTES, handleSouDesPossibleRoutes)
}

// Get user nearest airport
function* handleGetUserNearestAirport(action) {
  const { data } = action.payload
  try {
    const url = `${URls.GET_USER_NEAREST_AIRPORT_URL}?ip_address=${data.ipAddress}`
    const response = yield call(getRequestRuby, url)
    if (response && response.status && response.status === 200 && response.data) {
      yield put(getUserNearestAirportSuccess(response.data))
    }
  } catch (error) {
    yield put(getUserNearestAirportFailed())
  }
}

function* watchGetUserNearestAirport() {
  yield takeLatest(GET_USER_NEAREST_AIRPORT, handleGetUserNearestAirport)
}

export default function* sagas() {
  yield all([
    watchGetAirlineRequest(),
    watchGetLocationsFromQuery(),
    watchSendMeAlert(),
    watchGetSouDesLocation(),
    watchGetSouDesPossibleRoutes(),
    watchGetUserNearestAirport()
  ])
}
