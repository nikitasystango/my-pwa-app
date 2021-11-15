import React, { useState, useEffect } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { pushNotification } from 'utils/notifications'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import './subscribe.scss'
import { ArrowNext, ArrowPrev, CloseIcon, BellIcon } from 'utils/svgs'
import { extractURLParams, jsonToQueryString } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import toustifyMessages from 'constants/messages/toustifyMessages'
import flightMessages from 'constants/messages/flightMessages'
import searchPanelMessages from 'constants/messages/searchPanelMessages'
import { Link } from 'react-router-dom'
import { checkDifference, getDifferenceInDays, handleSpecificErrorAlertRange } from 'utils/commonFunction'
import Texts from 'constants/staticText'
import { airlineName } from 'constants/globalConstants'

const DateSelect = (props) => {
  const { flightsAvailability, callCreateAlertAPi, sendAlertLoading, updateReducerState,
    searchPanel: { departStartDate, departEndDate, returnStartDate, returnEndDate, journeyType, toggalAlertDatesModal, ticketsSearchBox, searchErrors, airlineMembership, selectedAirlineCode },
    location, toggalClasses, activeAlertError, isUserGoldMember, allowedAlertDateRange, isUserSilverMember, errors, setErrors, handlerToggalAlertModal, handleUpdateReducer } = props
  const { numberOfPassengers } = ticketsSearchBox
  const extractedParams = location?.search && extractURLParams(location.search)
  const [focused, setFocus] = useState(null)
  const [focusedReturn, setFocusReturn] = useState(null)

  const journeyTypeData = journeyType && journeyType === 'return'

  const sendAlertHandler = () => {
    // const availabilityURL = window.location.pathname + window.location.search
    if (extractedParams && extractedParams.dId && extractedParams.aId &&
      extractedParams.jType) {

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
        numberOfPassengers: numberOfPassengers || 1,
        tclass: extractedParams?.tclass || 'Economy',
        tValue: extractedParams?.tValue || 'economy',
        jType: journeyType || 'return',
        dPlace: extractedParams.dPlace,
        dId: extractedParams.dId,
        aPlace: extractedParams.aPlace,
        aId: extractedParams.aId,
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
        source_code: extractedParams.dId,
        membership_type: airlineMembership ? airlineMembership : Texts.DEFAULT_AIRLINE_TIER,
        destination_code: extractedParams.aId,
        airline_name: selectedAirlineCode ? airlineName[selectedAirlineCode].AIRWAYS_NAME : airlineName.BA.AIRWAYS_NAME,
        travel_classes: selectedClasses?.toString(),
        number_of_passengers: numberOfPassengers || 1,
        trip_type: 'one_way',
        start_date: moment(departStartDate).format('DD-MM-YYYY'),
        end_date: moment(departEndDate).format('DD-MM-YYYY'),
        availability_url: availabilityURL,
        available_travel_classes: availableClasses?.toString()
      }
      // validate return journey case
      if (journeyTypeData) {
        if (!returnStartDate) {
          pushNotification(intl(toustifyMessages.selectReturnDate), 'error', 'TOP_CENTER', 3000)
          return
        }
      }

      if (departStartDate && returnStartDate && journeyTypeData) {
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
        setFocus('startDate')
        setFocusReturn(null)
      }
    }else{
      handlerToggalAlertModal()
    }
  }

  const handleReturnOutsideRange = (day) => {
    if (departStartDate) {
      return moment(day).isBefore(departStartDate, 'date')
    } else {
      return moment(day).isBefore(moment(), 'date')
    }
  }


const handleAlertRangeError = (alert) => {
    if(checkDifference(allowedAlertDateRange, alert)) {
      const validData = handleSpecificErrorAlertRange({ ...alert, allowedAlertDateRange })
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
         if(validData?.outBound || validData?.inBound) {
           updateReducerState('searchPanel', 'activeAlertError', true)
         } else{
          updateReducerState('searchPanel', 'activeAlertError', false)
         }
       return true
     }else{
      setErrors({
        ...errors,
       startDateError: false,
       endDateError: false
      })
      const dataJson = {
        searchErrors: {
          ...searchErrors,
          startDateError: false,
          endDateError: false
        }
      }
      handleUpdateReducer(dataJson)
      updateReducerState('searchPanel', 'activeAlertError', false)
     }
  }


  const changeDepartureDatesHandler = ({ startDate, endDate, label }) => {
    clearAlertError()
     if(endDate) {
     const alert = {
        trip_type: 'one_way',
        start_date: startDate ? moment(startDate).format('DD-MM-YYYY') : moment(departStartDate).format('DD-MM-YYYY'),
        end_date: endDate ? moment(endDate).format('DD-MM-YYYY') : moment(departEndDate).format('DD-MM-YYYY')
      }
    handleAlertRangeError(alert)
     }

    if (returnStartDate) {
      updateReducerState('searchPanel', 'returnStartDate', null)
      updateReducerState('searchPanel', 'returnEndDate', null)
    }

    updateReducerState('searchPanel', 'departStartDate', startDate)
    updateReducerState('searchPanel', 'departEndDate', endDate)

    if (journeyTypeData && startDate && endDate) {
      setFocusReturn('startDate')
      setFocus(null)
    }
    if(startDate=== null && endDate === null) {
      updateReducerState('searchPanel', 'departStartDate', startDate)
      updateReducerState('searchPanel', 'departEndDate', endDate)
      setFocus(label === 'clearFocus' ? null : 'startDate')
      setFocusReturn(null)
    }
  }

  const changeReturnDatesHandler = ({ startDate, endDate, label }) => {
    const alert = {
      trip_type: 'return',
      arrival_start_date: startDate ? moment(startDate).format('DD-MM-YYYY') : moment(returnStartDate).format('DD-MM-YYYY'),
      arrival_end_date: endDate ? moment(endDate).format('DD-MM-YYYY') : moment(returnEndDate).format('DD-MM-YYYY'),
      start_date: moment(departStartDate).format('DD-MM-YYYY'),
      end_date: moment(departEndDate).format('DD-MM-YYYY')
    }

     handleAlertRangeError(alert)
    if(startDate=== null && endDate === null) {
      setFocusReturn(label === 'clearFocus' ? null : 'startDate')
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
          const validData = handleSpecificErrorAlertRange({
            start_date: departStartDate, end_date: departEndDate, arrival_start_date: returnStartDate, arrival_end_date: returnEndDate, allowedAlertDateRange
          })
          if(!validData?.outBound) {
            updateReducerState('searchPanel', 'activeAlertError', false)
          }
        }
        updateReducerState('searchPanel', 'returnStartDate', startDate)
        updateReducerState('searchPanel', 'returnEndDate', endDate)
   }

  const clearAlertError = () => {
    updateReducerState('searchPanel', 'activeAlertError', false)
    setErrors({
      ...errors,
      startDateError: false,
      endDateError: false
    })
    const dataJson = {
      searchErrors: {
        ...searchErrors,
        startDateError: false,
        endDateError: false
      }
    }
    handleUpdateReducer(dataJson)
  }

  const handlerSetDates = () => {
    sendAlertHandler()
  }


  const handleClosePopUp = () => {
    setFocus(null)
    setFocusReturn(null)
    // setToggalDatesModal(false)
    updateReducerState('searchPanel', 'toggalAlertDatesModal', false)
  }

  const setFocusAndToggalModal = (name) => {
    if (name === 'departStartDate' || name === 'departEndDate') {
      setFocus('startDate')
      setFocusReturn(null)
    }

    if (name === 'returnStartDate' || name === 'returnEndDate') {
      setFocusReturn('startDate')
      setFocus(null)
    }
    // setToggalDatesModal(true)
    updateReducerState('searchPanel', 'toggalAlertDatesModal', true)
  }

  const departRenderDayContent = (date) => <div className="CalendarDay__Date">{moment(date).format('DD')}</div>

  const returnRenderDayContent = (date) => <div className="CalendarDay__Date">{moment(date).format('DD')}</div>
  const isDisabled = !(departStartDate || returnStartDate) ? true : false

  let deviceWidth = window.innerWidth < 576 ? true : false

  useEffect(() => {
    window.onresize = () => {
       // eslint-disable-next-line
      deviceWidth = window.innerWidth < 576 ? true : false
    }
    // eslint-disable-next-line
  }, [])

  const getStartArrivalMonthDateDeparture = () => {
    if (departStartDate) {
      return departStartDate
    } else {
      return moment()
    }
  }

  const getStartArrivalMonthDateReturn = () => {
    if (returnStartDate || departStartDate) {
      return returnStartDate || departStartDate
    } else {
      return moment()
    }
  }

  const handleErrorAlertRange = () => {
    const outBound = getDifferenceInDays(departStartDate, departEndDate) >= allowedAlertDateRange
    const inBound = getDifferenceInDays(returnStartDate, returnEndDate) >= allowedAlertDateRange
    return outBound && !inBound ? 'Outbound date range' : inBound && !outBound ? 'Inbound date range' : 'Outbound & Inbound date ranges'
  }

  return (
    <>
      <Grid className={`date-select calendarDatePickerBar date-select-responsive ${departStartDate && !toggalAlertDatesModal ? '' : 'dataSelectCompress'}  ${journeyTypeData ? '' : 'date-select--one-way'}`}>
        <div className="create-alert-close">
          <h2 onClick={() => props.closeAlert() } ><CloseIcon/> </h2>
        </div>
        <Grid.Row>
          <Grid.Column mobile={8} tablet={8} computer={6} widescreen={6} className={`outbondRangepicker ${errors?.startDateError ? 'date-error-field' : ''}`}>
            <label>{intl(flightMessages.outboundDateText)}</label>
            <DateRangePicker
              startDate={departStartDate}
              startDateId="departStartDate"
              endDate={departEndDate}
              endDateId="departEndDate"
              onFocusChange={() => setFocusAndToggalModal('departStartDate')}
              displayFormat="DD/MM/YYYY"
              readOnly
              showClearDates
              onDatesChange={({ startDate, endDate }) => changeDepartureDatesHandler({ startDate, endDate, startDateId: 'departStartDate', label: 'clearFocus' })}
            // className="DateRangePickerWrapper DateRangePickerWrapper--focus"
            />
          </Grid.Column>
          {journeyTypeData &&
            <Grid.Column mobile={8} tablet={8} computer={6} widescreen={6} className={`inbondRangepicker ${errors?.endDateError ? 'date-error-field' : ''}`}>
              <label>{intl(flightMessages.inboundDateText)}</label>
              <DateRangePicker
                startDate={returnStartDate}
                startDateId="returnStartDate"
                endDate={returnEndDate}
                endDateId="returnEndDate"
                onFocusChange={() => setFocusAndToggalModal('returnStartDate')}
                displayFormat="DD/MM/YYYY"
                disabled={departStartDate && departEndDate ? false : true}
                readOnly
                showClearDates
                onDatesChange={({ startDate, endDate }) => changeReturnDatesHandler({ startDate, endDate, startDateId: 'returnStartDate', label: 'clearFocus' })}
              />
            </Grid.Column>
          }
          {
          departStartDate && !toggalAlertDatesModal &&
          <Grid.Column mobile={16} tablet={16} computer={4} widescreen={4} textAlign="right" verticalAlign="bottom">
            <Button onClick={() => sendAlertHandler()} disabled={isDisabled || activeAlertError} loading={sendAlertLoading} className="btn btn--dark date-select__btn">{intl(searchPanelMessages.createAlert)} <BellIcon /></Button>
          </Grid.Column>
           }
        </Grid.Row>
      </Grid>
      <div className={`date-select-popup ${journeyTypeData ? '' : 'date-select-popup--one-way'} ${toggalAlertDatesModal ? 'show' : ''} ${location.pathname === AppRoutes.CALENDER ? 'calenderDatePopup' : '' } `}>
        <div className="date-select-popup__inner">
          <Grid className="date-select-popup__grid m-0">
            <Grid.Row className="date-select-popup__header">
              <Grid.Column width={8} className={`date-select-popup__depart ${journeyTypeData ? '' : 'oneWayOutBondCal'}  `}>
                <label>{intl(flightMessages.outboundDateText)}</label>
                <div className={`DateRangePickerWrapper ${focused ? 'DateRangePickerWrapper--focus' : ''} ${errors?.startDateError ? 'date-error-field' : ''}`}>
                  <DateRangePicker
                    startDate={departStartDate}
                    startDateId="departStartDate"
                    endDate={departEndDate}
                    endDateId="departEndDate"
                    onDatesChange={({ startDate, endDate }) => changeDepartureDatesHandler({ startDate, endDate, startDateId: 'departStartDate' })}
                    focusedInput={focused}
                    numberOfMonths={deviceWidth ? 1 : 2}
                    keepOpenOnDateSelect
                    daySize={35}
                    minimumNights={0}
                    displayFormat="DD/MM/YYYY"
                    onFocusChange={focusedInput => {
                      if (focusedInput) {
                        // if (focusedInput === 'endDate' && !depDates.depStartDate) {
                        //   return
                        // }
                        setFocusReturn(null)
                        setFocus(focusedInput)
                      }
                    }}
                    // disabled={disabled}
                    isOutsideRange={(day) => moment(day).isBefore(moment(), 'date')}
                    transitionDuration={0}
                    navPrev={<ArrowPrev />}
                    navNext={<ArrowNext />}
                    renderDayContents={date => departRenderDayContent(date)}
                    initialVisibleMonth={() => getStartArrivalMonthDateDeparture()}
                    readOnly
                    showClearDates
                    minDate={moment()}
                  />
                </div>
              </Grid.Column>
              {journeyTypeData &&
                <Grid.Column width={8} className="date-select-popup__return">
                  <label>{intl(flightMessages.inboundDateText)}</label>
                  <div className={`DateRangePickerWrapper ${focusedReturn ? 'DateRangePickerWrapper--focus' : ''} ${errors?.endDateError ? 'date-error-field' : ''}`}>
                    <DateRangePicker
                      startDate={ returnStartDate}
                      startDateId="returnStartDate"
                      endDate={returnEndDate}
                      endDateId="returnEndDate"
                      onDatesChange={({ startDate, endDate }) => changeReturnDatesHandler({ startDate, endDate, startDateId: 'returnStartDate' })}
                      focusedInput={focusedReturn}
                      numberOfMonths={deviceWidth ? 1 : 2}
                      keepOpenOnDateSelect
                      daySize={35}
                      minimumNights={0}
                      displayFormat="DD/MM/YYYY"
                      onFocusChange={focusedInput => {
                        if (focusedInput) {
                          setFocus(null)
                          setFocusReturn(focusedInput)
                        }
                      }}
                      disabled={departStartDate && departEndDate ? false : true}
                      isOutsideRange={(day) => handleReturnOutsideRange(day, focusedReturn)}
                      transitionDuration={0}
                      navPrev={<ArrowPrev />}
                      navNext={<ArrowNext />}
                      renderDayContents={date => returnRenderDayContent(date)}
                      initialVisibleMonth={() => getStartArrivalMonthDateReturn()}
                      readOnly
                      showClearDates
                      minDate={moment()}
                    />
                  </div>
                </Grid.Column>
              }
            </Grid.Row>
            <Grid.Row className="date-select-popup__body" />
            <Grid.Row className="date-select-popup__footer">
              {activeAlertError &&
                <div>
                  <p className="activeAlertText">
                    {isUserGoldMember ?
                      <>
                        {intl(toustifyMessages.activeAlertGoldErrorMessage, allowedAlertDateRange)} <p>{intl(toustifyMessages.pleaseCheckDateRange, journeyType === 'return' ? handleErrorAlertRange() : 'Outbound date range')}</p>
                      </>
                     :
                      <>
                        {intl(toustifyMessages.activeAlertErrorMessage, allowedAlertDateRange)}{intl(toustifyMessages.forXMembers, isUserSilverMember ? 'Silver' : 'Bronze')} {' '}
                        <p>{intl(toustifyMessages.pleaseCheckDateRange, journeyType === 'return' ? handleErrorAlertRange() : 'Outbound date range')}, { ' ' }
                          or
                          <Link to={AppRoutes.PRICING} className="medium-blue-color link-hover-medium-blue">
                            { ' '} upgrade { ' '}
                          </Link>
                          {intl(toustifyMessages.yourPlan)}
                        </p>
                      </>
                     }
                  </p>
                </div>
              }
              <Grid.Column width={16} textAlign="center" >
                <Button onClick={() => handleClosePopUp()} className="btn btn--dark-invert button--cancel">{intl(commonMessages.cancel)}</Button>
                <Button onClick={() => handlerSetDates()} disabled={isDisabled || activeAlertError} loading={sendAlertLoading} className="button-setdates btn btn--medium-blue">{intl(commonMessages.setDates)} & {intl(searchPanelMessages.createAlert)} </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
      <div className={`date-select-popup-overlay ${toggalAlertDatesModal ? 'show' : ''}`} />
    </>
  )
}
DateSelect.propTypes = {
  sendAlertLoading: PropTypes.bool,
  searchPanel: PropTypes.object,
  updateReducerState: PropTypes.func,
  location: PropTypes.object,
  callCreateAlertAPi: PropTypes.func,
  toggalClasses: PropTypes.object,
  flightsAvailability: PropTypes.object,
  activeAlertError: PropTypes.string,
  isUserGoldMember: PropTypes.bool,
  allowedAlertDateRange: PropTypes.number,
  isUserSilverMember: PropTypes.bool,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
  handleUpdateReducer: PropTypes.func
}
export default DateSelect
