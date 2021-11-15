import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET_MAP_LOCATION } from 'actions/MapView/actionTypes'
import {
  getMapLocationsSuccess,
  getMapLocationsFailure
} from 'actions/MapView'
import { getRequestNode } from './request'
import URls from 'constants/urls'
import { jsonToQueryString } from 'utils/helpers'
import { availableAirways, airlineName } from 'constants/globalConstants'
import intl from 'utils/intlMessage'
import toustifyMessages from 'constants/messages/toustifyMessages'

// get locations for map
function* handleMapLocations(action) {
  const { data } = action.payload
  const airlinePath = data && data.airlineCode && data.airlineCode === airlineName.VA.CODE ? availableAirways.VIRGIN_ATLANTIC :availableAirways.BRITISH_AIRWAYS
  const selectedAirlineURL = `${URls.GET_FLIGHTS_AVAILABILITY}/${airlinePath}`
  const url = `${selectedAirlineURL}${jsonToQueryString(data)}`
  try {
    const response = yield call(getRequestNode, url)
    if (response?.status === 200 && response?.data?.available_destinations &&
      response?.data?.available_destinations?.length && response?.data?.source) {
      yield put(getMapLocationsSuccess(response.data))
    } else {
      yield put(getMapLocationsSuccess(null))
    }
  } catch (error) {
    if (error?.response?.status === 400 && error?.response?.data?.message) {
      // pushNotification(error?.response?.data?.message, 'error', 'TOP_CENTER', 5000)
      yield put(getMapLocationsFailure(error?.response?.data?.message))
    }else if (error.request) {
      // The request was made but no response was received
      yield put(getMapLocationsFailure(intl(toustifyMessages.networkTimeoutIssue)))
    }else{
      yield put(getMapLocationsFailure())
    }
  }
}

function* watchGetMapLocations() {
  yield takeLatest(GET_MAP_LOCATION, handleMapLocations)
}

export default function* sagas() {
  yield all([
    watchGetMapLocations()
  ])
}
