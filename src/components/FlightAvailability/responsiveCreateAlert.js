import React, { useState, Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import DestinationAutocomplete from 'components/SearchPanel/destinationAutocomplete'
import SourceAutocomplete from 'components/SearchPanel/sourceAutocomplete'
import { DatePickerWrapper } from 'components/Dashboard/style'
import DateRangeSelectore from 'components/SearchPanel/dateRangePicker'
import intl from 'utils/intlMessage'
import dashboardMessages from 'constants/messages/dashboardMessages'
import moment from 'moment'
import { checkDifference, getDifferenceInDays } from 'utils/commonFunction'
import { Button } from 'semantic-ui-react'
import { CheckCircle } from 'utils/svgs'
import TravellerCount from 'components/SearchPanel/travellerCount'
import commonMessages from 'constants/messages/commonMessages'
import { InputRadio } from 'utils/formUtils'
import { pushNotification } from 'utils/notifications'
import toustifyMessages from 'constants/messages/toustifyMessages'
import { getRedirectionURL } from 'utils/helpers'
import { setInLocalStorage } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import history from 'utils/history'
import { Link } from 'react-router-dom'
import searchPanelMessages from 'constants/messages/searchPanelMessages'
import flightMessages from 'constants/messages/flightMessages'
import { jsonToQueryString } from 'utils/helpers'
import { retrieveFromLocalStorage } from 'utils/helpers'

const ResponsiveCreateAlert = (props) => {
  const {
    searchPanel: {
      departStartDate,
      departEndDate,
      returnStartDate,
      returnEndDate,
      airlineMembership,
      selectedAirline,
      departure,
      arrival,
      possibleRoutes,
      calendarSupport,
      selectedAirlineCode,
      journeyType,
      ticketsSearchBox,
      membership,
      activeAlertError,
      searchErrors,
      sendAlertLoading
    },
    updateReducerState,
    auth: {
      user: { allowedAlertDateRange, isUserGoldMember, isUserSilverMember, isEmailVerified, activeAlertsCount, createAlertsLimit }
    },
    flightsAvailabilityList,
    toggalClasses,
    handleClassChange,
    activeAirlineClass,
    updateTicketsSearchBox,
    location,
    extractedParams,
    flightsAvailability,
    handlerToggalAlertModal,
    setToggalAlertModal,
    toggalAlertModal,
    onSendMeAlert
  } = props
  const { ticketClass, numberOfPassengers } = ticketsSearchBox
  const isDisabled = !(departStartDate || returnStartDate) ? true : false

  const [errors, setErrors] = useState({
    sourceError: false,
    destinationError: false,
    startDateError: false,
    endDateError: false
  })

  useEffect(() => {
    const { sourceError, destinationError, startDateError, endDateError } =
      searchErrors || {}
    setErrors({
      sourceError,
      destinationError,
      startDateError,
      endDateError
    })
  }, [searchErrors])

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

  // Update error state in reducer
  const handleUpdateReducer = (dataJson) => {
    if (dataJson && dataJson.searchErrors) {
      Object.keys(dataJson).map((item) =>
        updateReducerState('searchPanel', item, dataJson[item])
      )
    }
  }
  const handleSpecificErrorAlertRange = (str, alerts) => {
    const depStart =
      alerts && alerts.start_date ? alerts.start_date : departStartDate
    const depEnd = alerts && alerts.end_date ? alerts.end_date : departEndDate
    const retStart =
      alerts && alerts.arrival_start_date
        ? alerts.arrival_start_date
        : returnStartDate
    const retEnd =
      alerts && alerts.arrival_end_date
        ? alerts.arrival_end_date
        : returnEndDate
    const outBound =
      getDifferenceInDays(depStart, depEnd) >= allowedAlertDateRange
    const inBound =
      getDifferenceInDays(retStart, retEnd) >= allowedAlertDateRange
    if (str === 'checkValidation') {
      return { outBound, inBound }
    } else {
      return outBound && !inBound
        ? 'Outbound date range'
        : inBound && !outBound
        ? 'Inbound date range'
        : 'Outbound & Inbound date ranges'
    }
  }

  const handleAlertRangeError = (alert) => {
    if (checkDifference(allowedAlertDateRange, alert)) {
      const validData = handleSpecificErrorAlertRange('checkValidation', alert)
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
      if (validData?.outBound || validData?.inBound) {
        updateReducerState('searchPanel', 'activeAlertError', true)
      } else {
        updateReducerState('searchPanel', 'activeAlertError', false)
      }
      return true
    } else {
      clearAlertError()
    }
  }

  const clearAlertError = () => {
    updateReducerState('searchPanel', 'activeAlertError', false)
    setErrors({
      ...errors,
      endDateError: false,
      startDateError: false
    })
    const dataJson = {
      searchErrors: {
        ...searchErrors,
        endDateError: false,
        startDateError: false
      }
    }
    handleUpdateReducer(dataJson)
  }

  const updateDepartureSelectedDateRange = (name, value) => {
    if (departStartDate && name === 'departEndDate' && value) {
      const alert = {
        trip_type: 'one_way',
        start_date:
          name === 'departStartDate'
            ? moment(value).format('DD-MM-YYYY')
            : moment(departStartDate).format('DD-MM-YYYY'),
        end_date:
          name === 'departEndDate'
            ? moment(value).format('DD-MM-YYYY')
            : moment(departEndDate).format('DD-MM-YYYY')
      }

      handleAlertRangeError(alert)
    } else {
      setErrors({
        ...errors,
        endDateError: false
      })
      const dataJson = {
        searchErrors: {
          ...searchErrors,
          endDateError: false
        }
      }
      handleUpdateReducer(dataJson)
    }
    if (returnStartDate) {
      updateReducerState('searchPanel', 'returnStartDate', null)
      updateReducerState('searchPanel', 'returnEndDate', null)
    }

    updateReducerState('searchPanel', [name], value)
    updateReducerState('searchPanel', [name], value)
  }

  const handleDepartOutsideRange = (day, focused) => {
    if (focused === 'endDate') {
      return moment(day).isBefore(departStartDate || moment(), 'date')
    } else {
      return moment(day).isBefore(moment(), 'date')
    }
  }

  const clearDates = (strStart, strEnd) => {
    const validData = handleSpecificErrorAlertRange('checkValidation')
    if (!validData?.outBound) {
      clearAlertError()
    }
    if (strStart === 'returnStartDate') {
      updateReducerState('searchPanel', [strStart], null)
      updateReducerState('searchPanel', [strEnd], null)
      setErrors({
        ...errors,
        endDateError: false
      })
      const dataJson = {
        searchErrors: {
          ...searchErrors,
          endDateError: false
        }
      }
      handleUpdateReducer(dataJson)
    } else {
      updateReducerState('searchPanel', [strStart], null)
      updateReducerState('searchPanel', [strEnd], null)
      updateReducerState('searchPanel', 'returnStartDate', null)
      updateReducerState('searchPanel', 'returnEndDate', null)
      clearAlertError()
    }
  }

  const handleReturnOutsideRange = (day, focused) => {
    if (focused === 'endDate') {
      return moment(day).isBefore(returnStartDate || moment(), 'date')
    } else {
      return moment(day).isBefore(departStartDate, 'date')
    }
  }

  const updateReturnSelectedDateRange = (name, value) => {
    const alert = {
      trip_type: 'return',
      arrival_start_date:
        name === 'returnStartDate'
          ? moment(value).format('DD-MM-YYYY')
          : moment(returnStartDate).format('DD-MM-YYYY'),
      arrival_end_date:
        name === 'returnEndDate'
          ? moment(value).format('DD-MM-YYYY')
          : moment(returnEndDate).format('DD-MM-YYYY'),
      start_date: moment(departStartDate).format('DD-MM-YYYY'),
      end_date: moment(departEndDate).format('DD-MM-YYYY')
    }

    handleAlertRangeError(alert)
    if (name === 'returnStartDate' && value > returnEndDate) {
      updateReducerState('searchPanel', 'returnEndDate', null)
    }
    updateReducerState('searchPanel', [name], value)
  }

  const onJourneyChange = (value) => {
    updateReducerState('searchPanel', 'journeyType', value)
  }

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
        numberOfPassengers: passengerCountData
          ? passengerCountData
          : numberOfPassengers,
        ticketClass,
        toggalClasses,
        membership,
        journeyType,
        calendarSupport
      }

      // saving recent search
      // eslint-disable-next-line
      const values = new Array();
      const oneday = new Date()
      oneday.setHours(oneday.getHours() + 24)
      values.push(JSON.stringify(data))
      values.push(oneday)
      data = {
        ...data,
        label: location.pathname === AppRoutes.CALENDER ? 'calendar' : 'home'
      }
      const airlineSel =
        location.pathname === AppRoutes.HOME
          ? 'BA'
          : location.pathname === AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS
          ? 'VA'
          : selectedAirline
          ? selectedAirline.split('_')[0]
          : ''
      setInLocalStorage(
        `${airlineSel === 'BA' ? 'recentSearch' : 'recentSearchVA'} `,
        values.join(';')
      )

      // creating url
      const url = getRedirectionURL(data)
      // Navigating to availablity page
      history.push(url)
    }
  }

    const sendAlertHandler = () => {
    // const availabilityURL = window.location.pathname + window.location.search
    if (extractedParams && extractedParams.dId && extractedParams.aId &&
      extractedParams.jType && extractedParams.airlineMembership &&
      extractedParams.airlineSelected) {

      const selectedClasses = []
      Object.keys(toggalClasses).map(item => {
        if (toggalClasses[item]) {
          selectedClasses.push(item === 'premium' ? 'premium_economy' : item)
        }
        return selectedClasses
      })

      if (!selectedClasses.length) {
        pushNotification(intl(toustifyMessages.selectCabinClass), 'error', 'TOP_CENTER', 3000)
        return
      }
      const url = {
        airlineSelected: extractedParams.airlineSelected,
        airlineMembership: extractedParams.membership,
        aCode: extractedParams.aCode,
        numberOfPassengers: numberOfPassengers || 1,
        tclass: extractedParams.tclass,
        tValue: extractedParams.tValue,
        membership: extractedParams.membership,
        jType: journeyType || 'return',
        dPlace: departure?.name,
        dId: departure?.value,
        aPlace: arrival?.name,
        aId: arrival?.value,
        economy: toggalClasses.economy,
        premium: toggalClasses.premium,
        first: toggalClasses.first,
        business: toggalClasses.business,
        start_date: moment(departStartDate).format('YYYY-MM-DD') || null
      }

      const availabilityURL = `${AppRoutes.CALENDER}${jsonToQueryString(url)}`
      const availableClasses = []
      Object.keys(flightsAvailability?.availability || []).map(item => {
        if (flightsAvailability.availability[item]) {
          availableClasses.push(item)
        }
        return availableClasses
      })
      let payload = {
        source_code: departure?.value,
        membership_type: extractedParams.airlineMembership,
        destination_code: arrival?.value,
        airline_name: extractedParams.aCode === 'AA' ? 'american_airlines' : 'british_airways',
        travel_classes: selectedClasses?.toString(),
        number_of_passengers: numberOfPassengers || 1,
        trip_type: 'one_way',
        start_date: moment(departStartDate).format('DD-MM-YYYY'),
        end_date: moment(departEndDate).format('DD-MM-YYYY'),
        availability_url: availabilityURL,
        available_travel_classes: availableClasses?.toString()
      }
      // validate return journey case
      if (journeyType === 'return') {
        if (!returnStartDate) {
          pushNotification(intl(toustifyMessages.selectReturnDate), 'error', 'TOP_CENTER', 3000)
          return
        }
      }

      if (departStartDate && returnStartDate && journeyType === 'return') {
        payload = {
          ...payload,
          trip_type: 'return',
          arrival_start_date: moment(returnStartDate).format('DD-MM-YYYY'),
          arrival_end_date: moment(returnEndDate).format('DD-MM-YYYY')
        }
        callCreateAlertAPi(payload)
      } else if (departStartDate) {
        callCreateAlertAPi(payload)
      }
       if(checkDifference(allowedAlertDateRange, payload)) {
        updateReducerState('searchPanel', 'toggalAlertDatesModal', true)
      }
    }else{
      handlerToggalAlertModal()
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

  return (
    <div className="inputWrapCalendar" id= "inputWrapCalendar">
      <h2>{intl(searchPanelMessages.createAlert)}</h2>
      <div className="d-flex justify-content-bw">
        <div className="location-input-wrap w-48 mb-1">
          <span>{intl(commonMessages.originText)}</span>
          <SourceAutocomplete
            searchPanel={props.searchPanel}
            setSelectedLocation={updateReducerState}
            className={
              errors.sourceError
                ? ' error-field'
                : ''
            }
            placeholder="Select Source"
            handlerSetError={handlerSetError}
            updateReducerState={updateReducerState}
          />
        </div>

        <div className="location-input-wrap w-48">
          <span>{intl(commonMessages.destinations)} </span>
          <DestinationAutocomplete
            searchPanel={props.searchPanel}
            setSelectedLocation={updateReducerState}
            className={
              errors.destinationError
                ? ' error-field'
                : ' '
            }
            placeholder="Select Destination"
            handlerSetError={handlerSetError}
            updateReducerState={updateReducerState}
          />
        </div>
      </div>
      <div className="d-flex justify-content-bw">
        <div
          className={`american-alert-popup__fields w-48 mb-1 ${
            errors?.startDateError ? 'date-error-field' : ''
          }`}
        >
          <label>{intl(dashboardMessages.editAlertModalDepRange)}</label>
          <DatePickerWrapper>
            <Suspense fallback={<div>Loading...</div>}>
              <DateRangeSelectore
                startDate={departStartDate}
                endDate={departEndDate}
                startName="departStartDate"
                endName="departEndDate"
                startDateId="departStartDate"
                endDateId="departEndDate"
                updateSelectedDateRange={updateDepartureSelectedDateRange}
                isOutsideRange={handleDepartOutsideRange}
                startMonthDate={departStartDate}
                clearDates={clearDates}
                departStartDate={departStartDate}
                returnStartDate={returnStartDate}
              />
            </Suspense>
          </DatePickerWrapper>
        </div>

        <div
          className={`american-alert-popup__fields w-48 ${
            errors?.endDateError ? 'date-error-field' : ''
          }`}
        >
          <label>{intl(dashboardMessages.editAlertModalRetRange)}</label>
          <DatePickerWrapper>
            <DateRangeSelectore
              startDate={returnStartDate}
              endDate={returnEndDate}
              startName="returnStartDate"
              endName="returnEndDate"
              startDateId="returnStartDate"
              endDateId="returnEndDate"
              updateSelectedDateRange={updateReturnSelectedDateRange}
              disabled={
                departStartDate && departEndDate
                  ? journeyType === 'one-way'
                    ? true
                    : false
                  : true
              }
              isOutsideRange={handleReturnOutsideRange}
              startMonthDate={returnStartDate || departStartDate}
              clearDates={clearDates}
              departStartDate={departStartDate}
              returnStartDate={returnStartDate}
            />
          </DatePickerWrapper>
        </div>

        {activeAlertError && (
          <div className="active-alert-wrap">
            <p className="activeAlertText">
              {isUserGoldMember ? (
                <>
                  {intl(
                    toustifyMessages.activeAlertGoldErrorMessage,
                    allowedAlertDateRange
                  )}{' '}
                  <p>
                    {intl(
                      toustifyMessages.pleaseCheckDateRange,
                      journeyType === 'return'
                        ? handleSpecificErrorAlertRange()
                        : 'Outbound date range'
                    )}
                  </p>
                </>
              ) : (
                <>
                  {intl(
                    toustifyMessages.activeAlertErrorMessage,
                    allowedAlertDateRange
                  )}
                  {intl(
                    toustifyMessages.forXMembers,
                    isUserSilverMember ? 'Silver' : 'Bronze'
                  )}{' '}
                  <p>
                    {intl(
                      toustifyMessages.pleaseCheckDateRange,
                      journeyType === 'return'
                        ? handleSpecificErrorAlertRange()
                        : 'Outbound date range'
                    )}
                    , or
                    <Link
                      to={AppRoutes.PRICING}
                      className="medium-blue-color link-hover-medium-blue"
                    >
                      {' '}
                      upgrade{' '}
                    </Link>
                    {intl(toustifyMessages.yourPlan)}
                  </p>
                </>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="d-flex d-flex-start">
        <div className="american-alert-popup__fields american-alert-popup__fields">
          <label>{intl(flightMessages.cabinClassesText)}</label>
          <div className="cabin-class-buttons">
            {/* eslint-disable-next-line */}
            {activeAirlineClass.map((item, index) => {
              if (
                flightsAvailabilityList?.availability &&
                flightsAvailabilityList.availability[item.cabinClass]
              ) {
                return (
                  <Button
                    key={`${item.name}_${index + 1}`}
                    onClick={() => handleClassChange(item.cabinClass)}
                    className={` ml-0 buttons_element__button buttons_element__button--${
                      item.cabinClass
                    } ${toggalClasses[item.cabinClass] ? 'active' : ''}`}
                  >
                    <CheckCircle
                      color={item.color}
                      checked={toggalClasses[item.cabinClass]}
                    />
                    <span>{item.title}</span>
                  </Button>
                )
              }
            })}
          </div>
        </div>
        <div className="d-flex ml-20">
          <div className="american-alert-popup__fields american-alert-popup__fields--radio">
            <label>{intl(dashboardMessages.editAlertModalFlightType)}</label>
            <div className="d-flex mt-8 flight-type-wrap">
              <InputRadio
                label={intl(commonMessages.oneWay)}
                name={'journeyType'}
                value={'one-way'}
                checked={journeyType === 'one-way'}
                onChange={(value) => onJourneyChange(value)}
              />
              <InputRadio
                label={intl(commonMessages.return)}
                name={'journeyType'}
                value={'return'}
                checked={journeyType === 'return'}
                onChange={(value) => onJourneyChange(value)}
                className="ml-20"
              />
            </div>
          </div>
          <div className="american-alert-popup__fields american-alert-popup__fields--passenger">
            <TravellerCount
              numberOfPassengers={numberOfPassengers}
              updateNumberOfPassanger={(sum) =>
                updateTicketsSearchBox('numberOfPassengers', sum)
              }
              handleSearchClick={handleSearchClick}
              location={location}
            />
          </div>
        </div>
      </div>
      <Button className="ui button search-panel__button search-panel__button--home"
      onClick={() => sendAlertHandler()} disabled={isDisabled || activeAlertError}
      loading={sendAlertLoading}
      >
        {intl(searchPanelMessages.createAlert)}
      </Button>
    </div>
  )
}

ResponsiveCreateAlert.propTypes = {
  searchPanel: PropTypes.object,
  updateReducerState: PropTypes.func,
  auth: PropTypes.object,
  flightsAvailabilityList: PropTypes.object,
  toggalClasses: PropTypes.object,
  handleClassChange: PropTypes.func,
  activeAirlineClass: PropTypes.object,
  updateTicketsSearchBox: PropTypes.func,
  location: PropTypes.object,
  sendAlertLoading: PropTypes.bool,
  extractedParams: PropTypes.object,
  flightsAvailability: PropTypes.object,
  handlerToggalAlertModal: PropTypes.func,
  setToggalAlertModal: PropTypes.func,
  toggalAlertModal: PropTypes.bool,
  onSendMeAlert: PropTypes.func
}

export default ResponsiveCreateAlert
