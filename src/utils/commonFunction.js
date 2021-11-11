import moment from 'moment'
import { virginAtlanticAvailableClass, BritishAirwaysAvailableClass } from 'constants/globalConstants'
import { AppRoutes } from 'constants/appRoutes'
import { getRedirectionURL, setInLocalStorage } from './helpers'
import history from 'utils/history'
import Texts from 'constants/staticText'
import { airlineName } from 'constants/globalConstants'


  //  filter nested object
export const getPassengerCountFilteredData = (mainObj, key, numberOfPassengers) => {
    const data = { ...mainObj[key] }
     Object.keys(data).forEach((key) => {
      Object.keys(data[key]).forEach((innerKey) => {
       const objCount = Object.keys(data[key]).length
          if (data[key][innerKey] && data[key][innerKey].seats < numberOfPassengers) {
            if(objCount <= 2) {
              // Remove date object if any of class not exist acco. to passenger count filter
              delete data[key]
            }else{
              delete data[key][innerKey]
            }
          }
      })
  })
    return data
  }

 export const getDummyData = (mainObj, key) => {
  const data = { ...mainObj[key] }
  Object.keys(data).forEach((key) => {
    Object.keys(data[key]).forEach((innerKey) => {
     const nextThreeMonth = moment().add(3, 'months').format('YYYY-MM-DD')
     const isMonthExceed = moment(key).isAfter(nextThreeMonth)
     if (isMonthExceed && data[key][innerKey] && data[key][innerKey].seats) {
       // eslint-disable-next-line
       return data[key][innerKey].seats = data[key][innerKey].seats + 2,
       data[key][innerKey].points = data[key][innerKey].points + 2000
        }
    })
  })
  return data
 }


  //  filter nested object
  export const fetchAvailableCabinClass = (flightsAvailability) => {
    const mainObj = JSON.parse(JSON.stringify(flightsAvailability))
    const today = moment().format('YYYY-MM-DD')
    const checkObject = ['outbound_availability', 'inbound_availability']
    let finalClasses = changeObjectValue(mainObj) || {}
    // eslint-disable-next-line
    checkObject.map((list)=> {
     const data = { ...mainObj[list] }
     Object.keys(data).forEach((key) => {
       if(key >= today) {
         Object.keys(data[key]).forEach((innerKey) => {
             if(!finalClasses[innerKey] && innerKey !== 'peak') {
               finalClasses={ ...finalClasses, [innerKey]: true }
             }
         })
       }
  })
})
return finalClasses
}

const changeObjectValue = (mainObj) => {
  if(mainObj &&mainObj.availability) {
   return Object.fromEntries(Object.keys(mainObj.availability).map((key) => [key, false]))
  }
}

export const handleSetTrueToCabinClass = (airlineCode) => {
  let selectedClasses = {}
  const toggleData = airlineCode === 'VA' ? virginAtlanticAvailableClass : BritishAirwaysAvailableClass
  toggleData.map(item => {
    const str = item === 'premium_economy' ? 'premium' : item
     return selectedClasses = {
        ...selectedClasses,
        [str]: true
      }
  })
  return selectedClasses
}

export const getDifferenceInDays = (startDate, endDate) => {
  // const formatStartDate = moment.unix(startDate/1000, 'DD-MM-YYYY')
  // const formatEndDate = moment.unix(endDate/1000, 'DD-MM-YYYY')
  const formatStartDate = moment(startDate, 'DD-MM-YYYY')
  const formatEndDate = moment(endDate, 'DD-MM-YYYY')
  return formatEndDate.diff(formatStartDate, 'days')
}

export const checkDifference = (limit, payload) => {
  const { trip_type, start_date, end_date, arrival_start_date, arrival_end_date } = payload
  let isExceed = false
  if(trip_type === 'return') {
    isExceed = getDifferenceInDays(start_date, end_date) >= limit || getDifferenceInDays(arrival_start_date, arrival_end_date) >= limit
  }else {
    isExceed = getDifferenceInDays(start_date, end_date) >= limit
  }
  return isExceed
}

// Check if object is empty
export const isEmptyObject = obj => obj === null || Object.keys(obj).length === 0

export const objectIntersection = (o1, o2) => Object.keys(o1).filter({}.hasOwnProperty.bind(o2))

  //  Check if all sets of object 1 available in object 2
  export const checkObjectSet = (objFirst, objSecond) => {
    let isEqual = false
    if (Object.keys(objFirst).every((key) => key in objSecond)) {
      isEqual = true
    } else {
      isEqual = false
    }
    return isEqual
  }

  export const handleSpecificErrorAlertRange = (payload) => {
    const { start_date, end_date, arrival_start_date, arrival_end_date, allowedAlertDateRange } = payload || {}
    const outBound = getDifferenceInDays(start_date, end_date) >= allowedAlertDateRange
    const inBound = getDifferenceInDays(arrival_start_date, arrival_end_date) >= allowedAlertDateRange
      return { outBound, inBound }
  }

  export const sortDateObj = (a, b) => new Date(a) - new Date(b)

// method to check if a value exists in an array
export const existsArray = (value, array) => array.some(e => e === value)

    // Check if element is partially visible in viewport by %
  export const isElementXPercentInViewport = (el, percentVisible) => {
    const isExist = []
      if(el && el.length) {
        for(var i= 0; i<= el.length; i++) {
          const element = el[i]
          if(element !== undefined) {
            const rect = element.getBoundingClientRect(),
            windowHeight = (window.innerHeight || document.documentElement.clientHeight)
            isExist.push(!(
            Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
            Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
          )
            )
          }
        }
        } else{
          return isExist.push(true)
      }
      return existsArray(true, isExist)
    }

    // compare two arrays and return values that matched
 export const findMatchedArray = (arrayFirst, arraySecond) => arrayFirst.filter((item) => arraySecond.includes(item))

  export const trackUserIdConversion = (userId) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      'userId': userId
    })
  }

  export const getStatesOfCountry = (list, value, key) => list.filter((item) => parseInt(item[key]) === parseInt(value))

 export const getElementHeight = (element) => {
    let yPosition = 0
    let ele = element
    while (ele) {
      yPosition += ele.offsetTop - ele.scrollTop + ele.clientTop
      ele = ele.offsetParent
    }
    if (yPosition <= 15) {
      element && element.classList.add('position-wrap')
    }
  }

 export const getPercentDiscountPrice = (val1, val2) => {
    var numVal1 = Number(val1)
    var numVal2 = Number(val2) / 100
    var totalValue = numVal1 - (numVal1 * numVal2)
    return totalValue.toFixed(2)
  }

  // Update class in query params
 export const updateQueryParams = (searchPanel, name, value) => {
    const {
      selectedAirline,
      toggalClasses,
      departure,
      arrival,
      calendarSupport,
      journeyType,
      ticketClass,
      ticketsSearchBox: { numberOfPassengers }
    } = searchPanel
      let data = {
        departure,
        arrival,
        numberOfPassengers,
        ticketClass,
        toggalClasses,
        journeyType,
        calendarSupport
      }
      if(name) {
        data = {
          ...data,
          [name]: value
        }
      }
      // saving recent search
      // eslint-disable-next-line
      const values = new Array()
      const oneday = new Date()
      oneday.setHours(oneday.getHours() + 24)
      values.push(JSON.stringify(data))
      values.push(oneday)
      data = {
        ...data,
        label: window.location.pathname === AppRoutes.CALENDER ? 'calendar' : 'home'
      }
      const airlineSel = window.location.pathname === AppRoutes.HOME ? 'BA' : window.location.pathname === AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS ? 'VA' : selectedAirline ? selectedAirline.split('_')[0] : ''
      setInLocalStorage(`${airlineSel === 'BA' ? 'recentSearch' : 'recentSearchVA'} `, values.join(';'))

      // creating url
      const url = getRedirectionURL(data)
      // Navigating to availablity page
       history.push(url)
  }

  // check if all object keys has false values
  export const ifObjectValueFalse = (obj) => Object.keys(obj).every((k) => !obj[k])

  // Set all object value to true
export const setObjectValueTrue = (obj) => Object.fromEntries(Object.keys(obj).map((key) => [key, true]))

// Remove the falsy value attribute from object
export const removeFalsyElement = object => {
  const newObject = {}
  Object.keys(object).forEach(key => {
    if (object[key]) {
      newObject[key] = object[key]
    }
  })
  return newObject
}

export const updateReducerAirlineData = (airlineMemberships) => {
  // Store airlineMemberships data in all airline's state [currently we have done only for BA]
  const airlineBA = airlineMemberships && airlineMemberships.length ? airlineMemberships[0].membership : Texts.DEFAULT_AIRLINE_TIER_CODE
  const airlineCode = airlineMemberships && airlineMemberships.length && airlineMemberships[0].airline === airlineName.BRITISH_AIRWAYS ? 'BA' : 'VA'
  const dataJson = {
    airlineMembership: airlineBA,
    membership: airlineBA || null,
    selectedAirlineCode: airlineCode,
    selectedAirline: `${airlineCode}_${airlineBA}`
  }
 return dataJson
}
