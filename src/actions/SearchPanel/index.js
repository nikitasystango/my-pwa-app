import {
  GET_AIRLINE_LIST,
  GET_AIRLINE_LIST_SUCCESS,
  GET_AIRLINE_LIST_FAILURE,
  GET_SEARCHED_LOCATION,
  SET_SEARCHED_LOCATION,
  SEND_ME_ALERT,
  SEND_ME_ALERT_FAILURE,
  SEND_ME_ALERT_SUCCESS,
  RESET_SELECTED_ALERT_DATES,
  TSB__UPDATE_TICKETS_SEARCH_BOX,
  TSB__CHANGE_TICKET_CLASS,
  TSB__UPDATE_DONOT_KNOW_OBJ,
  GET_SOU_DES_LOCATIONS, GET_SOU_DES_LOCATIONS_SUCCESS, GET_SOU_DES_LOCATIONS_FAILURE,
  UPDATE_TOGGAL_CLASS_STATE,
  GET_SOU_DES_POSSIBLE_ROUTES, GET_SOU_DES_POSSIBLE_ROUTES_SUCCESS, GET_SOU_DES_POSSIBLE_ROUTES_FAILURE,
  GET_USER_NEAREST_AIRPORT, GET_USER_NEAREST_AIRPORT_SUCCESS, GET_USER_NEAREST_AIRPORT_FAILED
} from './actionTypes'


export const getAirlineList = (data) => ({
  type: GET_AIRLINE_LIST,
  payload: data
})

export const getAirlineListSuccess = (data) => ({
  type: GET_AIRLINE_LIST_SUCCESS,
  payload: data
})

export const getAirlineListFailure = () => ({
  type: GET_AIRLINE_LIST_FAILURE
})

export const getSearchedLocation = (keyword, type) => ({
  type: GET_SEARCHED_LOCATION,
  payload: { keyword, type }
})

export const setSearchedLocation = (data, type) => ({
  type: SET_SEARCHED_LOCATION,
  payload: { data, type }
})

export const SendMeAlert = (data) => ({
  type: SEND_ME_ALERT,
  payload: { data }
})

export const sendMeAlertSuccess = (data) => ({
  type: SEND_ME_ALERT_SUCCESS,
  payload: { data }
})

export const sendMeAlertFailure = () => ({
  type: SEND_ME_ALERT_FAILURE
})

export const resetAlertSelectedDates = () => ({
  type: RESET_SELECTED_ALERT_DATES
})

export const updateTicketsSearchBox = (updateParams) => ({
  type: TSB__UPDATE_TICKETS_SEARCH_BOX,
  payload: updateParams
})

export const changeTicketClass = (type) => ({
  type: TSB__CHANGE_TICKET_CLASS,
  payload: { type }
})

export const updateDoNotKnowSearch = (updateParams) => ({
  type: TSB__UPDATE_DONOT_KNOW_OBJ,
  payload: updateParams
})

// GET SOURCE DESTINATION LOCATIONS

export const getSouDesLocations = (data) => ({
  type: GET_SOU_DES_LOCATIONS,
  payload: data
})

export const getSouDesLocationsSuccess = (data) => ({
  type: GET_SOU_DES_LOCATIONS_SUCCESS,
  payload: { data }
})

export const getSouDesLocationsFailure = () => ({
  type: GET_SOU_DES_LOCATIONS_FAILURE
})

// update toggal class value

export const updateToggalClassesState = (name, value) => ({
  type: UPDATE_TOGGAL_CLASS_STATE,
  payload: { name, value }
})

// GEget source destination possible routes

export const getSouDesPossibleRoutes = (data) => ({
  type: GET_SOU_DES_POSSIBLE_ROUTES,
  payload: data 
})

export const getSouDesPossibleRoutesSuccess = (data) => ({
  type: GET_SOU_DES_POSSIBLE_ROUTES_SUCCESS,
  payload: { data }
})

export const getSouDesPossibleRoutesFailure = () => ({
  type: GET_SOU_DES_POSSIBLE_ROUTES_FAILURE
})

// get user nearest airport
export const getUserNearestAirport = (data) => ({
  type: GET_USER_NEAREST_AIRPORT,
  payload: { data }
})

export const getUserNearestAirportSuccess = (data) => ({
  type: GET_USER_NEAREST_AIRPORT_SUCCESS,
  payload: { data }
})

export const getUserNearestAirportFailed = () => ({
  type: GET_USER_NEAREST_AIRPORT_FAILED
})
