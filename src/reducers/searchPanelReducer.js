import {
  GET_AIRLINE_LIST,
  GET_AIRLINE_LIST_SUCCESS,
  GET_AIRLINE_LIST_FAILURE,
  SET_SEARCHED_LOCATION,
  SEND_ME_ALERT,
  SEND_ME_ALERT_SUCCESS,
  SEND_ME_ALERT_FAILURE,
  RESET_SELECTED_ALERT_DATES,
  TSB__UPDATE_TICKETS_SEARCH_BOX,
  TSB__CHANGE_TICKET_CLASS,
  TSB__UPDATE_DONOT_KNOW_OBJ,
  GET_SOU_DES_LOCATIONS, GET_SOU_DES_LOCATIONS_SUCCESS, GET_SOU_DES_LOCATIONS_FAILURE,
  UPDATE_TOGGAL_CLASS_STATE,
  GET_SOU_DES_POSSIBLE_ROUTES, GET_SOU_DES_POSSIBLE_ROUTES_SUCCESS, GET_SOU_DES_POSSIBLE_ROUTES_FAILURE,
  GET_USER_NEAREST_AIRPORT_SUCCESS
} from 'actions/SearchPanel/actionTypes'
import { airlineName } from 'constants/globalConstants'
import Texts from 'constants/staticText'
import { splitArrayAsUNiqueCombination } from 'utils/helpers'

const initialState = {
  possibleRoutes: [],
  possibleRoutesLoading: false,
  souDesLocations: [],
  airportsWithMultiCity: [],
  souDesAirports: [],
  souDesLocationsLoading: false,
  airlinesLoading: false,
  calendarSupport: true,
  airlines: [],
  selectedAirline: null,
  airlineMembership: null,
  selectedAirlineCode: null,
  departure: {
    name: '',
    value: ''
  },
  departureLocation: [],
  arrival: {
    name: '',
    value: ''
  },
  arrivalLocation: [],
  departStartDate: null,
  departEndDate: null,
  returnStartDate: null,
  returnEndDate: null,
  rangeDepartStartDate: null,
  rangeDepartEndDate: null,
  rangeReturnStartDate: null,
  rangeReturnEndDate: null,
  sendAlertLoading: false,
  previewAlertId: null,
  ticketsSearchBox: {
    numberOfPassengers: 1,
    numberOfChildren: 0,
    numberOfInfants: 0,
    numberOfInfantsOnLap: 0,
    travellerCount: 1,
    ticketClass: null
  },
  membership: null,
  journeyType: 'return',
  isDataSwitched: undefined,
  knowDontKnowToggal: 'know',
  doNotKnowObj: {
    travelFromTo: 'fromTravel',
    flyFrom: '',
    flyTo: '',
    mapDepartureDate: null,
    mapDestinationDate: null
  },
  toggalClasses: {
    economy: true,
    premium: true,
    first: true,
    business: true
  },
  toggalMapEliteLoginPopUp: false,
  toggalPlanLimitModal: false,
  nearestAirports: [],
  toggalPreviewAlertModal: false,
  toggleEditAlertModal: false,
  toggalAlertDatesModal: false,
  activeAlertError: false,
  searchErrors: {
    sourceError: false,
    destinationError: false,
    airlineError: false,
    startDateError: false,
    endDateError: false
  },
  availablePassengerCabinClasses : {
    economy: true,
    premium: true,
    first: true,
    business: true
  }
}

const getAirlineList = (state) => ({
  ...state,
  airlinesLoading: true
})

const getAirlineListSuccess = (state, action) => {
  const { data, payloadData, user: { airlineMemberships } } = action.payload
  const { isSetDefault } = payloadData
  const airlineBA = airlineMemberships && airlineMemberships.length ? airlineMemberships[0].membership : Texts.DEFAULT_AIRLINE_TIER
  const airlineCode = airlineMemberships && airlineMemberships.length ? airlineMemberships[0].airline === airlineName.BA.AIRWAYS_NAME ? airlineName.BA.CODE : airlineName.VA.CODE: airlineName.BA.CODE
  let airlineData = []
  let selectedClasses = {}
  data.map((item) => {
    if (item && item.airline && item.airline !== 'American Airlines') {
      airlineData = [...airlineData, item]
    }
    return airlineData
  })

  if (airlineData?.length && airlineData[0]?.memberships) {
  const selectedTierList = state.selectedAirlineCode === airlineName.VA.CODE ? airlineData[1] : airlineData[0]

  selectedTierList.classes.map(item => {
    const str = item.value === 'premium_economy' ? 'premium' : item.value
     return selectedClasses = {
        ...selectedClasses,
        [str]: true
      }
  })
  if (isSetDefault) {
    selectedTierList.memberships.map(item => {
      if ((item?.value === 'blue' || item?.value === 'red') && state.selectedAirlineCode === null) {
        state = {
          ...state,
          calendarSupport: true,
          airlineMembership: item.value,
          membership: item.value,
          selectedAirlineCode: selectedTierList.value,
          selectedAirline: `${selectedTierList.value}_${item.value}`
        }
      }
      return true
    })
  }else{
    state = {
      ...state,
      airlineMembership: airlineBA,
      membership: airlineBA,
      selectedAirlineCode: airlineCode,
      selectedAirline: `${airlineCode}_${airlineBA}`
    }
  }
}
  return ({
    ...state,
    airlinesLoading: false,
    airlines: airlineData
    // toggalClasses: selectedClasses || state.toggalClasses
  })
}

const getAirlineListFailure = (state) => ({
  ...state,
  airlinesLoading: false
})

const setSearchedLocation = (state, action) => {
  const { data, type } = action.payload
  return ({
    ...state,
    [type]: data
  })
}

const sendMeAlert = (state) => ({
  ...state,
  sendAlertLoading: true
})

const sendMeAlertSuccess = (state, action) => {
  const { data } = action.payload
  return ({
    ...state,
    sendAlertLoading: false,
  previewAlertId: data || null
  })
}

const sendMeAlertFailure = (state) => ({
  ...state,
  sendAlertLoading: false
})

const resetSendMeAlertDates = (state) => ({
  ...state,
  departStartDate: null,
  departEndDate: null,
  returnStartDate: null,
  returnEndDate: null
})

const updateTicketsSearchBox = (state, action) => ({
    ...state,
    ticketsSearchBox: {
      ...state.ticketsSearchBox,
      [action.payload.name]: action.payload.value
    }
  })

const changeTicketClass = (state, action) => ({
    ...state,
    ticketsSearchBox: {
      ...state.ticketsSearchBox,
      ticketClass: action.payload.type
    }
  })

const updateDoNotSearch = (state, action) => ({
    ...state,
    doNotKnowObj: {
      ...state.doNotKnowObj,
      [action.payload.name]: action.payload.value
    }
  })

// get locations
const getSouDesLocation = (state) => ({
  ...state,
  souDesLocationsLoading: true
})

const getSouDesLocationSuccess = (state, action) => {
  const { data } = action.payload
  const airpots = []
  const airportMultiCity = []
  data.map(item => {
    if (item && item.airports && item.airports.length > 1) {
      let labelDesign = item.airports[0].code
      item.airports.map((data, index) => {
        if (index > 0) {
          labelDesign = `${labelDesign}, ${data.code}`
        }
        return labelDesign
      })
      airportMultiCity.push({ value: item.code, label: `${item.city_name} (${labelDesign})`, search: `${item.city_name} (${labelDesign})-${item.code}` })
    } else {
      airpots.push({ value: item.code, label: `${item.city_name} (${item.code})`, search: `${item.city_name} (${item.country_name})-${item.code}` })
    }
    return true
  })
  return ({
    ...state,
    souDesLocations: data,
    souDesAirports: airpots,
    airportsWithMultiCity: airportMultiCity,
    souDesLocationsLoading: false
  })
}

const getSouDesLocationFailure = (state) => ({
  ...state,
  souDesLocationsLoading: false
})

// update toggal class state

const updateToggalClassState = (state, action) => ({
    ...state,
    toggalClasses: {
      ...state.toggalClasses,
      [action.payload.name]: action.payload.value
    }
  })

// possible routes for source and destination
const getSouDesPossibleRoutes = (state) => ({
  ...state,
  possibleRoutesLoading: true
})

const getSouDesPossibleRoutesSuccess = (state, action) => {
  const { data } = action.payload

  return ({
    ...state,
    possibleRoutesLoading: false,
    possibleRoutes: data
  })
}

const getSouDesPossibleRoutesFailure = (state) => ({
  ...state,
  possibleRoutesLoading: false
})


// get user nearest airport.
const getUserNearestAirportSuccess = (state, action) => {
  const { data } = action.payload
  const airpots = []
  const splittedData = splitArrayAsUNiqueCombination(data)

   Object.fromEntries((Object.entries(splittedData)
        // eslint-disable-next-line
    .filter(([listKey, value]) => {
      // eslint-disable-next-line
    value.map((item, index) => {
      const { cityName } = item
       if(index === 0 && cityName) {
       if (value && value.length > 1) {
         let labelDesign = value[0].codeIataAirport
         value.map((airport, index) => {
           if (index > 0) {
             labelDesign = `${labelDesign}, ${airport.codeIataAirport}`
           }
           return labelDesign
         })
         airpots.push({ value: item.codeIataAirport, label: `${cityName} (${labelDesign})`, search: `${cityName} (${labelDesign})-${item.codeIataAirport}` })
       } else {
         airpots.push({ value: item.codeIataAirport, label: `${cityName} (${item.codeIataAirport})`, search: `${cityName} (${item.nameCountry})-${item.codeIataAirport}` })
       }
     }
     return airpots
     })
    }
    )))

  return ({
    ...state,
    nearestAirports: airpots && airpots.length ? airpots : []
  })
}

const searchPanelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AIRLINE_LIST: return getAirlineList(state, action)
    case GET_AIRLINE_LIST_SUCCESS: return getAirlineListSuccess(state, action)
    case GET_AIRLINE_LIST_FAILURE: return getAirlineListFailure(state, action)
    case SET_SEARCHED_LOCATION: return setSearchedLocation(state, action)
    case SEND_ME_ALERT: return sendMeAlert(state, action)
    case SEND_ME_ALERT_SUCCESS: return sendMeAlertSuccess(state, action)
    case SEND_ME_ALERT_FAILURE: return sendMeAlertFailure(state, action)
    case RESET_SELECTED_ALERT_DATES: return resetSendMeAlertDates(state, action)
    case TSB__UPDATE_TICKETS_SEARCH_BOX: return updateTicketsSearchBox(state, action)
    case TSB__CHANGE_TICKET_CLASS: return changeTicketClass(state, action)
    case TSB__UPDATE_DONOT_KNOW_OBJ: return updateDoNotSearch(state, action)
    case GET_SOU_DES_LOCATIONS: return getSouDesLocation(state, action)
    case GET_SOU_DES_LOCATIONS_SUCCESS: return getSouDesLocationSuccess(state, action)
    case GET_SOU_DES_LOCATIONS_FAILURE: return getSouDesLocationFailure(state, action)
    case UPDATE_TOGGAL_CLASS_STATE: return updateToggalClassState(state, action)
    case GET_SOU_DES_POSSIBLE_ROUTES: return getSouDesPossibleRoutes(state, action)
    case GET_SOU_DES_POSSIBLE_ROUTES_SUCCESS: return getSouDesPossibleRoutesSuccess(state, action)
    case GET_SOU_DES_POSSIBLE_ROUTES_FAILURE: return getSouDesPossibleRoutesFailure(state, action)
    case GET_USER_NEAREST_AIRPORT_SUCCESS: return getUserNearestAirportSuccess(state, action)
    default: return state
  }
}

export default searchPanelReducer
