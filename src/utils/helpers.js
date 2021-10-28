import React from 'react'
import history from './history'
import { AppRoutes } from 'constants/appRoutes'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

export const setInLocalStorage = (name, data) => {
  localStorage.setItem(name, data)
}

export const retrieveFromLocalStorage = (name) => {
  const retrievedData = localStorage.getItem(name)
  return retrievedData
}

export const removeFromLocalStorage = (name) => {
  localStorage.removeItem(name)
}

export const navigateToRespectivePage = (path, params) =>
{
  const appendParams = sessionStorage.getItem('queryParamsGA')
  history.push({
    pathname: path,
    search: params ? params : appendParams ? appendParams : null
  })
}

/* eslint-disable prefer-template */
export const jsonToQueryString = (json) => '?' +
  Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key])
  }).join('&')

export const getRedirectionURL = (data) => {
  let json = {}
  const { selectedAirline, airlineMembership, departure, arrival, selectedAirlineCode, numberOfPassengers,
    ticketClass, membership, journeyType, toggalClasses, label } = data
  if (data.selectedAirline) {
    json = {
      ...json,
      airlineSelected: selectedAirline
    }
  }
  if (data.airlineMembership) {
    json = {
      ...json,
      airlineMembership: airlineMembership
    }
  }
  if (data.selectedAirlineCode) {
    json = {
      ...json,
      aCode: selectedAirlineCode
    }
  }
  if (data.numberOfPassengers) {
    json = {
      ...json,
      numberOfPassengers: numberOfPassengers
    }
  }
  if (data.ticketClass) {
    json = {
      ...json,
      tclass: ticketClass.label,
      tValue: ticketClass.value
    }
  }
  if (data.membership) {
    json = {
      ...json,
      membership: membership
    }
  }
  if (data.journeyType) {
    json = {
      ...json,
      jType: journeyType
    }
  }
  if (data.departure) {
    json = {
      ...json,
      dPlace: departure.name,
      dId: departure.value
    }
  }
  if (data.arrival) {
    json = {
      ...json,
      aPlace: arrival.name,
      aId: arrival.value
    }
  }
  if (data.toggalClasses) {
    json = {
      ...json,
      ...toggalClasses
    }
  }

 const redirectData = {
    pathname: AppRoutes.CALENDER,
    search: jsonToQueryString(json),
    state: { sourcePage: label, startDate: null,
    endDate: null,
    arrivalStartDate: null,
    arrivalEndDate: null }
}
  return redirectData
}

export const extractURLParams = (url) => {
  var qs = (function (a) {
    if (a === '') return {}
    var b = {}
    for (var i = 0; i < a.length; ++i) {
      var p = a[i].split('=')
      if (p.length === 1)
        b[p[0]] = ''
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '))
    }
    return b
  })(url.split('?')[1].split('&'))
  return qs
}

export const sliceString = (string, index, length) => {
  if (string) {
    const finalString = string.slice(index, length)
    return finalString
  }
  return string
}

const appendLeadingZeroes = (n) => {
  if (n <= 9) {
    return '0' + n
  }
  return n
}

export const formatDate = (date) => {
  if (date) {
    const finalDate = appendLeadingZeroes(date.getDate()) + '-' + appendLeadingZeroes(date.getMonth() + 1) + '-' + date.getFullYear()
    return finalDate
  }
  return date
}

export const sortObjectArray = (a, b) => {
  const nameFirst = a.label ? a.label.toUpperCase() : a.text.toUpperCase()
  const nameSecond = b.label ? b.label.toUpperCase() : b.text.toUpperCase()

  let comparison = 0
  if (nameFirst > nameSecond) {
    comparison = 1
  } else if (nameFirst < nameSecond) {
    comparison = -1
  }
  return comparison
}


export const movePointerOnTop = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

export const formatPrice = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const sortSlectedRouteValue = (possibleRoutes, selectedValue, souDesAirports, airportsWithMultiCity, nearestAirports=[]) => {
  let groupedOptions = [
    {
      label: 'Airports',
      options: souDesAirports.sort(sortObjectArray)
    },
    {
      label: 'Cities with multiple airports',
      options: airportsWithMultiCity.sort(sortObjectArray)
    }
  ]

  if (nearestAirports.length) {
    groupedOptions.unshift({
      label: 'Nearest airports and cities',
      options: nearestAirports.sort(sortObjectArray)
    })
  }

  if (selectedValue) {
    if (possibleRoutes && possibleRoutes[selectedValue] &&
      possibleRoutes[selectedValue].connections.length) {
      const airports = []
      const multiAirports = []
      const nearAirports = []
      // eslint-disable-next-line
      possibleRoutes[selectedValue].connections.map(desCode => {
        const airValue = souDesAirports.find(item => item.value === desCode)
        if (airValue) {
          airports.push(airValue)
        }

        const multiAirportValue = airportsWithMultiCity.find(item => item.value === desCode)
        if (multiAirportValue) {
          multiAirports.push(multiAirportValue)
        }

        const nearAirportValue = nearestAirports.find(item => item.value === desCode)
        if (nearAirportValue) {
          nearAirports.push(nearAirportValue)
        }
      })
      const optionsArray = []
      if (nearAirports.length) {
        optionsArray.push({
          label: 'Nearest airports and cities',
          options: nearAirports.sort(sortObjectArray)
        })
      }
      if (airports.length) {
        optionsArray.push({
          label: 'Airports',
          options: airports.sort(sortObjectArray)
        })
      }
      if (multiAirports.length) {
        optionsArray.push({
          label: 'Cities with multiple airports',
          options: multiAirports.sort(sortObjectArray)
        })
      }
      groupedOptions = optionsArray
    } else {
      groupedOptions = []
    }
  }
  return groupedOptions
}

export const checkImageFormateIsWebp = (image) => {
  let imageType = image
  if (image && (/\.(gif|jpe?g|tiff|png|bmp)$/i).test(image)) {
    imageType = image.replace((/\.(gif|jpe?g|tiff|png|bmp)$/i), '.webp')
  }
  return imageType
}

export const openUrlOnNewTab = (path) => {
  var win = window.open(path, '_blank')
  win.focus()
}

export const getInitialsProfileImage = (firstName, lastName) => {
  let initials = ''
  if (firstName && lastName) {
    initials = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
  } else if (firstName) {
    initials = `${firstName.charAt(0).toUpperCase()}`
  }
  return (
    <div className="user-initials">
      {initials}
    </div>
  )
}

export const getErrorMessage = (error, msg) => {
  let message = msg
  if (error?.response?.data?.error) {
    message = error.response.data.error
  }
  return message
}

export const openCalendarPageHandler = (locationDetail, flightDetails, airportsWithMultiCity, souDesAirports, availablePopupCabinClass) => {
  const { tier, jType, passenger, airline, airlineCode, dId,
    dPlace } = flightDetails || ''
    const { business, economy, first, premium } = availablePopupCabinClass || {}
  let details = {
    airlineSelected: airline,
    airlineMembership: tier,
    aCode: airlineCode,
    numberOfPassengers: passenger,
    tclass: 'Economy',
    tValue: 'economy',
    membership: tier,
    jType: jType === 'return' ? 'return' : 'one-way',
    economy: economy,
    premium: premium,
    first: first,
    business: business,
    dPlace: dPlace,
    dId: dId
  }
  const multiAir = airportsWithMultiCity.find(item => item.value === locationDetail.code)
  const airport = souDesAirports.find(item => item.value === locationDetail.code)
  if (multiAir) {
    details = {
      ...details,
      aPlace: multiAir.label,
      aId: locationDetail.code
    }
  } else if (airport) {
    details = {
      ...details,
      aPlace: airport.label,
      aId: locationDetail.code
    }
  }
    history.push(`${AppRoutes.CALENDER}${jsonToQueryString(details)}`)
}

export const isFirstTimeLoginHandler = (value) => {
  if (value) {
    setInLocalStorage('firstTimeSignup', 'true')
    history.push(AppRoutes.THANK_YOU)
  } else {
    history.push(AppRoutes.HOME)
  }
}

export const handleAuditUser = (data, extractedParams, state) => {
  const { jType, airlineSelected } = extractedParams || ''
  const userValue = JSON.parse(retrieveFromLocalStorage('userDetails'))
  const guestId = retrieveFromLocalStorage('guest_id')
  const eventId = retrieveFromLocalStorage('event_id')
  const classT = []
  const airlineSplit = airlineSelected ? airlineSelected.split('_')[0] : null
  const airlineStr = airlineSplit === 'BA' ? 'british_airways' : 'virgin_atlantic'
  Object.keys(data.toggleClass).map(item => {
    if (data.toggleClass[item]) {
      classT.push(item === 'premium' ? 'premium_economy' : item)
    }
    return classT
  })
  const details = {
    user_action_audit: {
      user_id: userValue && userValue.id ? userValue.id : null,
      guest_id: guestId ? guestId : uuidv4(),
      event_id: data.classFilter && eventId ? eventId : uuidv4(),
      source_page: state && state.sourcePage ? state.sourcePage : 'calendar',
      destination_page: data && data.destinationPage ? data.destinationPage : 'calendar',
      event_type: 0,
      event_time: moment().format('YYYY-MM-DD HH:MM'),
      trip_type: jType === 'return' ? 'return' : 'one_way',
      source: data.sourceCode,
      destination: data.destinationCode,
      departure_date_from: state && state.startDate ? moment(state.startDate).format('YYYY-MM-DD'): moment().format('YYYY-MM-DD'),
      departure_date_to: state && state.endDate ? moment(state.endDate).format('YYYY-MM-DD'): moment().add(365, 'days').format('YYYY-MM-DD'),
      arrival_date_from: jType === 'return' ? state && state.arrivalStartDate ? moment(state.arrivalStartDate).format('YYYY-MM-DD'): moment().format('YYYY-MM-DD') : null,
      arrival_date_to: jType === 'return' ? state && state.arrivalEndDate ? moment(state.arrivalEndDate).format('YYYY-MM-DD'): moment().add(365, 'days').format('YYYY-MM-DD'): null,
      cabin_classes: classT.join(),
      passenger_count: data.numberOfPassengers,
      airline: airlineStr
    }
  }

  if(!guestId) {
    setInLocalStorage('guest_id', details.user_action_audit.guest_id)
  }
  if(!eventId) {
    setInLocalStorage('event_id', details.user_action_audit.event_id)
  }
  return details
}

export const checkAnyTrueObjectValue = (objData) => {
 const isTrue = Object.values(objData).some(item => item)
 return isTrue
}

export const splitArrayAsUNiqueCombination = (dataset) => {
  const result = dataset.reduce((acc, item) => {
    if (!acc[item.codeIataCity]) {
      acc[item.codeIataCity] = []
    }

    acc[item.codeIataCity].push(item)
    return acc
  }, {})
return result
}

export const convertDateFormat = (date) => {
  const newDate = moment.unix(date/1000, 'YYYY-MM-DD')
  return moment(newDate).format('YYYY-MM-DD')
}

export const sortText = (a, b, sortName, selectedValue) => {
  const nameFirst = a[selectedValue] ? a[selectedValue].toUpperCase() : ''
  const nameSecond = b[selectedValue] ? b[selectedValue].toUpperCase() : ''
  let comparison = 0
  switch (sortName[selectedValue].sort) {
    case 'AtoZ':
      if (nameFirst > nameSecond) {
        comparison = 1
      } else if (nameFirst < nameSecond) {
        comparison = -1
      }
      break

    case 'ZtoA':
      if (nameFirst < nameSecond) {
        comparison = 1
      } else if (nameFirst > nameSecond) {
        comparison = -1
      }
      break

    default:
      if (nameFirst > nameSecond) {
        comparison = 1
      } else if (nameFirst < nameSecond) {
        comparison = -1
      }
  }
  return comparison
}
export const hasWord = (str, word) => {
  const strWord = str.replace(/-/g, ' ')
 return strWord.split(/\s+/).includes(word)
}


export const validateEmail = (value) => {
  // eslint-disable-next-line
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const validEmail = value.match(mailformat)
  if (validEmail && validEmail.length) {
    return true
  }else{
   return false
  }
}
