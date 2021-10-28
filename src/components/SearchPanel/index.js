import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import moment from 'moment'
import AirlineSelector from './airlineSelector'
import history from 'utils/history'
import SourceAutocomplete from 'components/SearchPanel/sourceAutocomplete'
import DestinationAutocomplete from 'components/SearchPanel/destinationAutocomplete'
import JourneyTypeSelector from 'components/SearchPanel/journeyTypeSelector'
import AirlineClasses from 'components/SearchPanel/airlineClasses'
import {
  setInLocalStorage,
  retrieveFromLocalStorage,
  removeFromLocalStorage,
  getRedirectionURL,
  extractURLParams
} from 'utils/helpers'
import DateSelect from 'components/Subscribe'
import { jsonToQueryString } from 'utils/helpers'
import { LocationSwitch } from 'utils/svgs'
import DoNOtKnow from './doNotKnow'
import TravellerCount from './travellerCount'
import PlanLimitModal from './planLimitModal'
import AlertPopUp from './alertPopUp'
import PreviewAlertModal from './previewAlertModal'
import SendAlertCard from './sendAlertCard'
import './index.scss'
import { isMobile } from 'react-device-detect'
import { pushNotification } from 'utils/notifications'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import toustifyMessages from 'constants/messages/toustifyMessages'
import searchPanelMessages from 'constants/messages/searchPanelMessages'
import publicIp from 'public-ip'
import { checkDifference, handleSpecificErrorAlertRange, removeFalsyElement } from 'utils/commonFunction'

const SearchPanel = (props) => {
  const {
    isEmailVerified,
    allowedAlertDateRange,
    isUserSilverMember,
    isUserGoldMember,
    searchPanel: {
      toggalPreviewAlertModal,
      toggleEditAlertModal,
      toggalClasses,
      airlineMembership,
      selectedAirline,
      departure,
      arrival,
      possibleRoutes,
      knowDontKnowToggal,
      doNotKnowObj,
      calendarSupport,
      toggalPlanLimitModal,
      rangeDepartStartDate,
      rangeDepartEndDate,
      rangeReturnEndDate,
      rangeReturnStartDate,
      airlines,
      airlinesLoading,
      sendAlertLoading,
      previewAlertId,
      selectedAirlineCode,
      journeyType,
      ticketsSearchBox,
      membership,
      departure: { value: depCode },
      arrival: { value: arrCode },
      activeAlertError,
      searchErrors,
      availablePassengerCabinClasses
    },
    updateReducerState,
    searchPanel,
    getSearchedLocation,
    location,
    onSendMeAlert,
    updateTicketsSearchBox,
    updateDoNotKnowSearch,
    getAirlineList,
    getSouDesLocations,
    getSouDesPossibleRoutes,
    flightsAvailability,
    createAlertsLimit,
    activeAlertsCount,
    closeAlert,
    dashboard: {
      myAlerts: { alerts }
    },
    cancelSubscribedAlerts,
    getUserNearestAirport,
    getFlightAvailability,
    flights,
    setOnRunTimeUpdate
  } = props
  const { ticketClass, numberOfPassengers } = ticketsSearchBox
  const { search, state } = location
  let extractedParams = null
  if (search) {
    extractedParams = extractURLParams(search)
  }
  const [toggalAlertModal, setToggalAlertModal] = useState(false)
  const [errors, setErrors] = useState({
    sourceError: false,
    destinationError: false,
    airlineError: false,
    startDateError: false,
    endDateError: false
  })
  const [dontKnowError, setDontKnowError] = useState({
    dontKnowGoDateError: false,
    dontKnowComeBackDateError: false,
    travelTypeError: false,
    dontKnowSourceError: false,
    dontKnowDestinationError: false
  })

  const handleScrollToStickyHeader = () => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth'
    })
  }

  // Update toggle class according to source availability
  useEffect(() => {
    handleInitialToggle()
    // eslint-disable-next-line
  }, [flightsAvailability])


  // Update error state in reducer
  const handleUpdateReducer = (dataJson) => {
    if (
      dataJson &&
      dataJson.searchErrors
    ) {
    Object.keys(dataJson).map((item) => (
      updateReducerState('searchPanel', item, dataJson[item])
    ))
    }
  }

  useEffect(()=> {
    // Update reducer error in local state
    const { sourceError, destinationError, startDateError, endDateError } = searchErrors || {}
    setErrors({
      sourceError,
      destinationError,
      startDateError,
      endDateError
    })
  }, [searchErrors])

  const handleInitialToggle = () => {
    if (
      flightsAvailability && flightsAvailability.availability
    ) {
      let finalClasses = {}
        Object.keys(flightsAvailability.availability).map((item) => {
          if (flightsAvailability.availability[item] && toggalClasses[item]) {
            finalClasses = { ...finalClasses, [item]: toggalClasses[item] }
          }
          return finalClasses
        })
      const objLength = Object.keys(finalClasses).length
      if(objLength < 1) {
        finalClasses = removeFalsyElement(flightsAvailability.availability)
      }
      updateReducerState('searchPanel', 'toggalClasses', finalClasses)
    }
  }

  // set the search panel values
  const setSearchPanelData = (values) => {
    const { updateReducerState } = props
    if (values) {
      const data = values.split(';')
      // check if past expiration date
      if (new Date(data[1]).getTime() < new Date().getTime()) {
        removeFromLocalStorage('recentSearch')
        removeFromLocalStorage('recentSearchVA')
      }
      // saving retreived data back to redux
      else {
        if (data && data.length) {
          const dataJson = JSON.parse(data[0])
          if (
            dataJson &&
            dataJson.selectedAirline &&
            dataJson.airlineMembership &&
            dataJson.departure &&
            dataJson.arrival &&
            dataJson.selectedAirlineCode &&
            dataJson.calendarSupport
          ) {
            // eslint-disable-next-line
            Object.keys(dataJson).map((item) => {
              const dataObj = state && state[item] ? state[item] : dataJson[item]
              updateReducerState('searchPanel', item, dataObj)
            })
          }
        }
      }
    }else{
     const data = {
      selectedAirline: null,
      airlineMembership: null,
      selectedAirlineCode: null,
      departure: {
        name: '',
        value: ''
      },
      arrival: {
        name: '',
        value: ''
      }
     }
      // eslint-disable-next-line
     Object.keys(data).map((item) => {
      const dataObj = state && state[item] ? state[item] : data[item]
      updateReducerState('searchPanel', item, dataObj)
    })
    }
  }

  // Get Airlines List
  useEffect(() => {
    getClientIp()
    const airlineSel = location.pathname === AppRoutes.HOME ? 'BA' : location.pathname === AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS ? 'VA' : extractedParams && extractedParams.aCode ? extractedParams.aCode : 'BA'
    const values = retrieveFromLocalStorage(`${airlineSel === 'BA' ? 'recentSearch' : 'recentSearchVA'} `)

      getAirlineList({ isSetDefault: !Boolean(values), selectedAirline: airlineSel })
      getSouDesLocations({ selectedAirline: airlineSel })
      getSouDesPossibleRoutes({ selectedAirline: airlineSel })
    if (location.pathname === AppRoutes.HOME || location.pathname === AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS) {
      setSearchPanelData(values)
    }
    updateReducerState('searchPanel', 'activeAlertError', false)
    const dataJson = {
      searchErrors: {
        sourceError: false,
        destinationError: false,
        airlineError: false,
        startDateError: false,
        endDateError: false
      }
    }
    handleUpdateReducer(dataJson)
    // eslint-disable-next-line
  }, [])

  const getClientIp = async() => {
    try {
      const ipAdd = await publicIp.v4({ fallbackUrls: [
        'https://ifconfig.co/ip'
      ] })
      if(ipAdd) {
        getUserNearestAirport({ ipAddress: ipAdd })
      }
    } catch (error) {
    }
  }

  // Set default ticket class for landing page
  useEffect(() => {
    if (
      location.pathname === AppRoutes.HOME &&
      airlines &&
      airlines.length &&
      !ticketsSearchBox.ticketClass &&
      selectedAirlineCode
    ) {
      const classData = {
        label:
          airlines[0].classes &&
          airlines[0].classes[0] &&
          airlines[0].classes[0].title
            ? airlines[0].classes[0].title
            : '',
        value:
          airlines[0].classes &&
          airlines[0].classes[0] &&
          airlines[0].classes[0].value
            ? airlines[0].classes[0].value
            : ''
      }
      const passengerData = {
        ...ticketsSearchBox,
        ticketClass: classData
      }
      updateReducerState('searchPanel', 'ticketsSearchBox', passengerData)
    }
    if (selectedAirline && airlineMembership) {
      handlerSetError('airlineError', false)
    }
    // eslint-disable-next-line
  }, [props.searchPanel.airlines])

  // Handle search click
  const handleSearchClick = (passengerCountData) => {
    if (!selectedAirline && !airlineMembership) {
      handlerSetError('airlineError', true)
    } else if (!departure.value) {
      handlerSetError('sourceError', true)
    } else if (!arrival.value) {
      handlerSetError('destinationError', true)
    } else {
      if (
        possibleRoutes &&
        possibleRoutes[departure.value] &&
        possibleRoutes[departure.value].connections.length
      ) {
        const result = possibleRoutes[departure.value].connections.find(
          (item) => item === arrival.value
        )
        if (!result) {
          pushNotification(
            intl(toustifyMessages.notHavePossibleRoutes),
            'error',
            'TOP_CENTER',
            5000
          )
          return
        }
      } else {
        pushNotification(
          intl(toustifyMessages.notHavePossibleRoutes),
          'error',
          'TOP_CENTER',
          5000
        )
        return
      }
      let data = {
        selectedAirline,
        departure,
        arrival,
        selectedAirlineCode,
        airlineMembership,
        numberOfPassengers: passengerCountData ? passengerCountData : numberOfPassengers ,
        ticketClass,
        toggalClasses,
        membership,
        journeyType,
        calendarSupport
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
        label: location.pathname === AppRoutes.CALENDER ? 'calendar' : 'home'
      }
      const airlineSel = location.pathname === AppRoutes.HOME ? 'BA' : location.pathname === AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS ? 'VA' : selectedAirline ? selectedAirline.split('_')[0] : ''
      setInLocalStorage(`${airlineSel === 'BA' ? 'recentSearch' : 'recentSearchVA'} `, values.join(';'))
      setOnRunTimeUpdate && !passengerCountData && setOnRunTimeUpdate(false)
      // creating url
      const url = getRedirectionURL(data)
      // Navigating to availablity page
       history.push(url)
    }
  }

  // Handle location switch
  const handleLocationSwap = () => {
    if (
      searchPanel.departure.name &&
      searchPanel.departure.value &&
      searchPanel.arrival.name &&
      searchPanel.arrival.value
    ) {
      const oldDep = searchPanel.departure
      const oldDepLocations = searchPanel.departureLocation
      const oldArr = searchPanel.arrival
      const oldArrLocations = searchPanel.arrivalLocation
      updateReducerState('searchPanel', 'departure', oldArr)
      updateReducerState('searchPanel', 'departureLocation', oldArrLocations)
      updateReducerState('searchPanel', 'arrival', oldDep)
      updateReducerState('searchPanel', 'arrivalLocation', oldDepLocations)
      updateReducerState(
        'searchPanel',
        'isDataSwitched',
        searchPanel.isDataSwitched === undefined
          ? false
          : !searchPanel.isDataSwitched
      )
    }
  }

  // Send me alert
  const sendAlertHandler = () => {
    let payload = {
      source_code: depCode,
      membership_type: airlineMembership,
      destination_code: arrCode,
      airline_name:
        selectedAirlineCode === 'AA' ? 'american_airlines' : 'british_airways',
      number_of_passengers: numberOfPassengers,
      travel_class:
        ticketClass && ticketClass.value ? ticketClass.value : 'economy',
      trip_type: 'one_way',
      start_date: moment(rangeDepartStartDate).format('DD-MM-YYYY'),
      end_date: moment(rangeDepartEndDate).format('DD-MM-YYYY')
    }

    if (!selectedAirline && !airlineMembership) {
      handlerSetError('airlineError', true)
      return
    }
    if (!depCode) {
      handlerSetError('sourceError', true)
      return
    }
    if (!arrCode) {
      handlerSetError('destinationError', true)
      return
    }

    if (
      rangeDepartStartDate &&
      rangeReturnStartDate &&
      journeyType === 'return'
    ) {
      payload = {
        ...payload,
        trip_type: 'return',
        arrival_start_date: moment(rangeReturnStartDate).format('DD-MM-YYYY'),
        arrival_end_date: moment(rangeReturnEndDate).format('DD-MM-YYYY')
      }
      callCreateAlertAPi(payload)
    } else if (rangeDepartStartDate) {
      callCreateAlertAPi(payload)
    }
  }

  const callCreateAlertAPi = (payload) => {
    if (!retrieveFromLocalStorage('token')) {
      setToggalAlertModal(!toggalAlertModal)
    } else {
      if (!isEmailVerified) {
        pushNotification(
          intl(toustifyMessages.verifyEmailToCreateAlert),
          'error',
          'TOP_CENTER',
          3000
        )
        return
      } else if (activeAlertsCount >= createAlertsLimit) {
        if (isUserGoldMember) {
          pushNotification(
            intl(toustifyMessages.createAlertLimitGold, createAlertsLimit),
            'error',
            'TOP_CENTER',
            5000
          )
        } else {
          updateReducerState('searchPanel', 'toggalPlanLimitModal', true)
          // pushNotification(`You can only have ${createAlertsLimit} ${Messages.CREATE_ALERT_LIMIT}`, 'error', 'TOP_CENTER', 4000)
        }
        return
      } else if(checkDifference(allowedAlertDateRange, payload)) {
        updateReducerState('searchPanel', 'toggalAlertDatesModal', true)
        const validData = handleSpecificErrorAlertRange({
          ...payload,
          allowedAlertDateRange
        })
        setErrors({
          ...errors,
          startDateError: validData?.outBound,
          endDateError: validData?.inBound
        })
        const dataJson = {
          searchErrors: {
            ...searchErrors,
            startDateError: validData?.outBound,
            endDateError: validData?.inBound
          }
        }
        handleUpdateReducer(dataJson)
        updateReducerState('searchPanel', 'activeAlertError', true)
        return
      }
      onSendMeAlert(payload)
    }
  }


  const showSearch = () => {
    const {
      searchPanel: { selectedAirlineCode, calendarSupport }
    } = props
    if (selectedAirlineCode) {
      if (!calendarSupport && props.location.pathname === AppRoutes.HOME) {
        return false
      }
    }
    return true
  }

  const isDateSelectVisible =
    location.pathname === AppRoutes.CALENDER ? true : false

  const handlerSetDontKnowErrors = (name, error) => {
    setDontKnowError({
      ...dontKnowError,
      [name]: error
    })
  }

  const handlerSearchMap = () => {
    const {
      travelFromTo,
      flyFrom,
      flyTo,
      mapDepartureDate,
      mapDestinationDate
    } = doNotKnowObj
    if (!selectedAirline && !airlineMembership) {
      handlerSetError('airlineError', true)
      return
    }
    if (travelFromTo === 'fromTravel' && !flyFrom) {
      handlerSetDontKnowErrors('dontKnowSourceError', true)
      return
    }
    if (travelFromTo === 'fromTo' && !flyTo) {
      handlerSetDontKnowErrors('dontKnowDestinationError', true)
      return
    }
    if (!mapDepartureDate) {
      handlerSetDontKnowErrors('dontKnowGoDateError', true)
      return
    }
    if (journeyType === 'return' && !mapDestinationDate) {
      handlerSetDontKnowErrors('dontKnowComeBackDateError', true)
      return
    }

    let data = {
      tier: airlineMembership,
      selectedAirline: selectedAirline,
      selectedAirlineCode: selectedAirlineCode,
      tClass: ticketClass && ticketClass.value ? ticketClass.value : 'economy',
      titleClass:
        ticketClass && ticketClass.name ? ticketClass.name : 'Economy',
      jType: journeyType,
      traveller: numberOfPassengers,
      dDate: moment(mapDepartureDate).format('YYYY-MM-DD')
    }
    if (travelFromTo === 'fromTravel') {
      data = {
        ...data,
        dPlace: flyFrom
      }
    } else {
      data = {
        ...data,
        aPlace: flyTo
      }
    }
    if (journeyType === 'return') {
      data = {
        ...data,
        aDate: moment(mapDestinationDate).format('YYYY-MM-DD')
      }
    }
    history.push(`location${jsonToQueryString(data)}`)
  }

  const getSerchPanelComponent = () => {
    if (knowDontKnowToggal === 'know') {
      return (
        <Fragment>
          <Grid.Column
            mobile={16}
            tablet={6}
            computer={
              props.location.pathname === AppRoutes.HOME ||
              props.location.pathname === AppRoutes.LOCATION
                ? props.location.pathname === AppRoutes.HOME && !calendarSupport
                  ? 3
                  : 4
                : 4
            }
            widescreen={
              props.location.pathname === AppRoutes.HOME ||
              props.location.pathname === AppRoutes.LOCATION
                ? props.location.pathname === AppRoutes.HOME && !calendarSupport
                  ? 3
                  : 5
                : 4
            }
            className="search-panel__col search-panel__col--source-autocomplete whereFromDropdown"
          >
            <SourceAutocomplete
              getSearchedLocation={getSearchedLocation}
              searchPanel={searchPanel}
              setSelectedLocation={updateReducerState}
              className={
                errors.sourceError
                  ? 'select-location error-field'
                  : 'select-location'
              }
              placeholder="Select Source"
              handlerSetError={handlerSetError}
              updateReducerState={updateReducerState}
              isCalendarHover={flights.isCalendarHover}
            />
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={6}
            computer={
              props.location.pathname === AppRoutes.HOME ||
              props.location.pathname === AppRoutes.LOCATION
                ? props.location.pathname === AppRoutes.HOME && !calendarSupport
                  ? 3
                  : 4
                : 4
            }
            widescreen={
              props.location.pathname === AppRoutes.HOME ||
              props.location.pathname === AppRoutes.LOCATION
                ? props.location.pathname === AppRoutes.HOME && !calendarSupport
                  ? 3
                  : 5
                : 4
            }
            className={`whereToDropdown search-panel__col search-panel__col--detination-autocomplete ${
              props.location.pathname === AppRoutes.HOME && !calendarSupport
                ? ''
                : 'pr-1'
            }`}
          >
            <span onClick={handleLocationSwap}>
              <LocationSwitch className="search-panel__date-swap-icon" />
            </span>
            <DestinationAutocomplete
              getSearchedLocation={getSearchedLocation}
              searchPanel={searchPanel}
              setSelectedLocation={updateReducerState}
              className={
                errors.destinationError
                  ? 'select-location  error-field'
                  : 'select-location'
              }
              placeholder="Select Destination"
              handlerSetError={handlerSetError}
              isCalendarHover={flights.isCalendarHover}
              updateReducerState={updateReducerState}
            />
          </Grid.Column>
        </Fragment>
      )
    } else {
      return (
        <Grid.Column
          mobile={16}
          tablet={12}
          computer={
            props.location.pathname === AppRoutes.HOME ||
            props.location.pathname === AppRoutes.LOCATION
              ? props.location.pathname === AppRoutes.HOME && !calendarSupport
                ? 13
                : 9
              : 8
          }
          widescreen={
            props.location.pathname === AppRoutes.HOME ||
            props.location.pathname === AppRoutes.LOCATION
              ? props.location.pathname === AppRoutes.HOME && !calendarSupport
                ? 13
                : 10
              : 8
          }
          className={`${
            isMobile ? 'pr-28' : 'pr-0'
          } search-panel__col search-panel__col--dont-know`}
        >
          <DoNOtKnow
            doNotKnowObj={doNotKnowObj}
            updateDoNotKnowSearch={updateDoNotKnowSearch}
            journeyType={journeyType}
            calendarSupport={calendarSupport}
            path={props.location.pathname}
            dontKnowError={dontKnowError}
            handlerSetDontKnowErrors={handlerSetDontKnowErrors}
          />
        </Grid.Column>
      )
    }
  }

  const handlerSetError = (name, error) => {
    setErrors({
      ...error,
      [name]: error
    })
    const dataJson = {
      searchErrors: {
        ...searchErrors,
        [name]: error
      }
    }
    handleUpdateReducer(dataJson)
  }

  const updateNumberOfPassanger = (sum) => {
    updateTicketsSearchBox('numberOfPassengers', sum)
    setOnRunTimeUpdate && setOnRunTimeUpdate(true)
  }

  return (
    <>
      <div className="find-flight">
        <Grid columns={2} className="radio-buttons find-flights-header">
          <Grid.Row className="RffPanelRow">
            <Grid.Column className="radio-buttons__col radio-buttons__col--journey-type">
              <JourneyTypeSelector
                journeyType={journeyType}
                updateReducerState={updateReducerState}
              />
            </Grid.Column>
            <Grid.Column className="radio-buttons__col radio-buttons__col--airline-classes">
              <AirlineClasses
                updateReducerState={updateReducerState}
                toggalClasses={toggalClasses}
                flightsAvailability={flightsAvailability}
                location={location}
                searchPanel={searchPanel}
                setOnRunTimeUpdate={setOnRunTimeUpdate}
              />
            </Grid.Column>
            <Grid.Column className="radio-buttons__col radio-buttons__col--traveller-count">
              <TravellerCount
                numberOfPassengers={numberOfPassengers}
                updateNumberOfPassanger={updateNumberOfPassanger}
                handleSearchClick={handleSearchClick}
                location={location}
                searchPanel={searchPanel}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={4} className="search-panel search-panel-responsive">
          <Grid.Row className="search-panel__row ">
            <Grid.Column
              mobile={
                props.location.pathname === AppRoutes.HOME
                  ? 16
                  : props.location.pathname === AppRoutes.LOCATION
                  ? 16
                  : 16
              }
              tablet={4}
              computer={
                props.location.pathname === AppRoutes.HOME ||
                props.location.pathname === AppRoutes.LOCATION
                  ? props.location.pathname === AppRoutes.HOME &&
                    !calendarSupport
                    ? 3
                    : 4
                  : 4
              }
              widescreen={
                props.location.pathname === AppRoutes.HOME ||
                props.location.pathname === AppRoutes.LOCATION
                  ? props.location.pathname === AppRoutes.HOME &&
                    !calendarSupport
                    ? 3
                    : 4
                  : 4
              }
              className="search-panel__col search-panel__col--airline-selector"
            >
              <AirlineSelector
                searchPanel={searchPanel}
                airlines={airlines}
                fetchingAirlines={airlinesLoading}
                updateReducerState={updateReducerState}
                dropdownClassName={`airLineDropdown airline-selector-dropdown calendarAirlineDropdown ${
                  selectedAirlineCode === 'AA'
                    ? 'airline-selector-dropdown--AA'
                    : ''
                }`}
                className={errors.airlineError ? 'error-field' : ''}
                handlerSetError={handlerSetError}
                getSouDesLocations ={getSouDesLocations}
                 getSouDesPossibleRoutes = {getSouDesPossibleRoutes}
                 location={props.location.pathname}
                 isCalendarHover={flights.isCalendarHover}
              />
            </Grid.Column>
            {getSerchPanelComponent()}
            <Grid.Column
              mobile={props.location.pathname === AppRoutes.HOME ? 16 : 16}
              tablet={props.location.pathname === AppRoutes.HOME ? 16 : 16}
              computer={
                props.location.pathname === AppRoutes.HOME
                  ? 4
                  : props.location.pathname === AppRoutes.LOCATION
                  ? 3
                  : 4
              }
              widescreen={
                props.location.pathname === AppRoutes.HOME
                  ? 2
                  : props.location.pathname === AppRoutes.LOCATION
                  ? 2
                  : 4
              }
              textAlign={
                props.location.pathname === AppRoutes.HOME ? 'center' : 'center'
              }
              className={`search-panel__col search-panel__col--button ${
                props.location.pathname === AppRoutes.HOME ||
                props.location.pathname === AppRoutes.LOCATION
                  ? 'search-panel__col--button-home'
                  : 'mp0'
              }`}
            >
              <div className="mbMinus35">
                {knowDontKnowToggal === 'know' ? (
                  showSearch() ? (
                    <Button
                      onClick={() => {
                        handleSearchClick()
                      }}
                      className={`search-panel__button ${
                        props.location.pathname === AppRoutes.HOME ||
                        props.location.pathname === AppRoutes.LOCATION
                          ? 'search-panel__button--home'
                          : ''
                      }`}
                    >
                      {intl(commonMessages.search)}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        sendAlertHandler()
                      }}
                      className={`search-panel__button ${
                        props.location.pathname === AppRoutes.HOME ||
                        props.location.pathname === AppRoutes.LOCATION
                          ? 'search-panel__button--home'
                          : ''
                      }`}
                      loading={sendAlertLoading}
                    >
                      {intl(searchPanelMessages.sendMeAlertCapital)}
                    </Button>
                  )
                ) : (
                  <Button
                    className={`search-panel__button ${
                      props.location.pathname === AppRoutes.HOME ||
                      props.location.pathname === AppRoutes.LOCATION
                        ? 'search-panel__button--home'
                        : ''
                    }`}
                    onClick={handlerSearchMap}
                  >
                    {intl(commonMessages.search)}
                  </Button>
                )}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <SendAlertCard
          isUserSilverMember={isUserSilverMember}
          isUserGoldMember={isUserGoldMember}
          pathname={props.location.pathname}
          handleScrollToStickyHeader={handleScrollToStickyHeader}
        />
        <Grid className="search-panel-divder-grid">
          <div className="search-panel-divider" />
        </Grid>
        {isDateSelectVisible && (
          <DateSelect
            location={location}
            searchPanel={searchPanel}
            sendAlertLoading={sendAlertLoading}
            onSendMeAlert={onSendMeAlert}
            updateReducerState={updateReducerState}
            handlerToggalAlertModal={() =>
              setToggalAlertModal(!toggalAlertModal)
            }
            callCreateAlertAPi={callCreateAlertAPi}
            toggalClasses={toggalClasses}
            flightsAvailability={flightsAvailability}
            closeAlert={closeAlert}
            activeAlertError={activeAlertError}
            isUserGoldMember={isUserGoldMember}
            allowedAlertDateRange={allowedAlertDateRange}
            isUserSilverMember={isUserSilverMember}
            errors={errors}
            setErrors={setErrors}
            handleUpdateReducer={handleUpdateReducer}
          />
        )}
      </div>

      <AlertPopUp
        toggalAlertModal={toggalAlertModal}
        handlerToggalAlertModal={() => setToggalAlertModal(!toggalAlertModal)}
        updateReducerState={updateReducerState}
      />

      <PlanLimitModal
        createAlertsLimit={createAlertsLimit}
        toggalPlanLimitModal={toggalPlanLimitModal}
        updateReducerState={updateReducerState}
      />
      <PreviewAlertModal
        {...props}
        toggalPreviewAlertModal={toggalPreviewAlertModal}
        toggleEditAlertModal={toggleEditAlertModal}
        updateReducerState={updateReducerState}
        airlines={airlines}
        cancelSubscribedAlerts={cancelSubscribedAlerts}
        previewAlertData={previewAlertId ? alerts.filter(alert => parseInt(alert.id) === parseInt(previewAlertId))[0] : {} }
        allowedAlertDateRange={allowedAlertDateRange}
        isUserGoldMember={isUserGoldMember}
        getFlightAvailability={getFlightAvailability}
        flights={flights}
        availablePassengerCabinClasses={availablePassengerCabinClasses}
      />
    </>
  )
}

SearchPanel.propTypes = {
  searchPanel: PropTypes.object,
  updateReducerState: PropTypes.func,
  getSearchedLocation: PropTypes.func,
  onSendMeAlert: PropTypes.func,
  location: PropTypes.object,
  ticketsSearchBox: PropTypes.object,
  createAlertsLimit: PropTypes.number,
  getAirlineList: PropTypes.func,
  updateDoNotKnowSearch: PropTypes.func,
  getSouDesLocations: PropTypes.func,
  getSouDesPossibleRoutes: PropTypes.func,
  updateTicketsSearchBox: PropTypes.func,
  isUserSilverMember: PropTypes.bool,
  isUserGoldMember: PropTypes.bool,
  flightsAvailability: PropTypes.object,
  isEmailVerified: PropTypes.bool,
  activeAlertsCount: PropTypes.number,
  toggalPlanLimitModal: PropTypes.bool,
  getUserNearestAirport: PropTypes.func,
  dashboard: PropTypes.object,
  cancelSubscribedAlerts: PropTypes.func,
  allowedAlertDateRange: PropTypes.number,
  getFlightAvailability: PropTypes.func,
  flights: PropTypes.object
}

export default withRouter(SearchPanel)
