import {
  GET_MAP_LOCATION,
  GET_MAP_LOCATION_SUCCESS,
  GET_MAP_LOCATION_FAILURE
} from 'actions/MapView/actionTypes'

const initialState = {
  getLocationLoading: false,
  mapLocations: null,
  startDateDep: null,
  endDateDep: null,
  startDateReturn: null,
  endDateReturn: null,
  mapPageUrl: null,
  toggleTab: false,
  toggleSideBar: true,
  sourceLocation: {
    name: '',
    value: ''
  },
  availablePopupCabinClass: {
    economy: true,
    premium: true,
    first: true,
    business: true
  },
  destinationLocation: {
    name: '',
    value: ''
  },
  flyToSearch: 'travelFrom',
  mapLocationsError: ''
}

const getMapLocations = (state, action) => ({
  ...state,
  getLocationLoading: true,
  mapLocationsError: ''
})

const getMapLocationsSucces = (state, action) => {
  if (action?.payload?.data) {
    return ({
      ...state,
      mapLocations: action.payload.data,
      toggleTab: true,
      toggleSideBar: true,
      mapLocationsError: ''
    })
  } else {
    return ({
      ...state,
      getLocationLoading: false,
      mapLocations: null,
      toggleSideBar: true,
      mapLocationsError: ''
    })
  }
}

const getMapLocationsFailed = (state, action) => ({
   ...state,
  getLocationLoading: false,
  mapLocations: null,
  toggleSideBar: true,
  mapLocationsError: action?.payload?.data || ''
})

const mapViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAP_LOCATION: return getMapLocations(state, action)
    case GET_MAP_LOCATION_SUCCESS: return getMapLocationsSucces(state, action)
    case GET_MAP_LOCATION_FAILURE: return getMapLocationsFailed(state, action)
    default: return state
  }
}

export default mapViewReducer
