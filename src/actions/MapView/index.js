import {
  GET_MAP_LOCATION,
  GET_MAP_LOCATION_SUCCESS,
  GET_MAP_LOCATION_FAILURE
} from './actionTypes'

// get map locations
export const getMapLocations = (data) => ({
  type: GET_MAP_LOCATION,
  payload: { data }
})

export const getMapLocationsSuccess = (data) => ({
  type: GET_MAP_LOCATION_SUCCESS,
  payload: { data }
})

export const getMapLocationsFailure = (data) => ({
  type: GET_MAP_LOCATION_FAILURE,
  payload: { data }
})
