import {
  GET_FLIGHT_AVAILABILITY,
  GET_FLIGHT_AVAILABILITY_SUCCESS,
  GET_FLIGHT_AVAILABILITY_FAILURE,
  GET_ALERT_AVAILABILITY,
  GET_ALERT_AVAILABILITY_SUCCESS,
  GET_ALERT_AVAILABILITY_FAILURE
} from 'actions/FlightAvailability/actionTypes'

const initialState = {
  flightsLoading: false,
  flightsAvailability: {},
  toggalDateAvailibilityModal: false,
  availabilityAlertLoading: false,
  availabilityAlertData: {},
  isCalendarHover: false,
  calendarSignupModal: false
}

const getFlightAvailabilityStart = (state) => ({
  ...state,
  flightsLoading: true
})

const getFlightAvailabilitySuccess = (state, action) => ({
  ...state,
  flightsAvailability: action.payload
  // flightsLoading: false
})

const getFlightAvailabilityFailure = (state) => ({
  ...state,
  flightsLoading: false
})

const getAlertAvailability = (state) => ({
  ...state,
  availabilityAlertLoading: true
})

const getAlertAvailabilitySuccess = (state, action) => ({
  ...state,
  availabilityAlertData: action.payload.data
})

const getAlertAvailabilityFailure = (state) => ({
  ...state,
  availabilityAlertLoading: false
})

const flightAvailabilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FLIGHT_AVAILABILITY: return getFlightAvailabilityStart(state, action)
    case GET_FLIGHT_AVAILABILITY_SUCCESS: return getFlightAvailabilitySuccess(state, action)
    case GET_FLIGHT_AVAILABILITY_FAILURE: return getFlightAvailabilityFailure(state, action)

    case GET_ALERT_AVAILABILITY: return getAlertAvailability(state, action)
    case GET_ALERT_AVAILABILITY_SUCCESS: return getAlertAvailabilitySuccess(state, action)
    case GET_ALERT_AVAILABILITY_FAILURE: return getAlertAvailabilityFailure(state, action)
    default: return state
  }
}

export default flightAvailabilityReducer
