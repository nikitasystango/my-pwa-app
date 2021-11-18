import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Grid, Container, Button } from 'semantic-ui-react'
import Layout from 'containers/Layout'
import { extractURLParams, handleAuditUser, retrieveFromLocalStorage, setInLocalStorage, removeFromLocalStorage } from 'utils/helpers'
import { fetchAvailableCabinClass, getPassengerCountFilteredData, updateQueryParams } from 'utils/commonFunction'
import DayPicker from 'react-day-picker'
import SeoTexts from 'constants/seoConstants'
import moment from 'moment'
// Components
import './flight-availability.scss'
import PopupFlightDetails from './popupFlightDetails'
import ColorCircleBox from './colorCircle'
import Loader from 'components/LoadingSpinner'
import 'react-day-picker/lib/style.css'
import {
  calendarMonthsLength,
  calendarDefaultRouteSearcParams
} from 'constants/globalConstants'
import history from 'utils/history'
import { AppRoutes } from 'constants/appRoutes'
import DateAvailibilityModal from './dateAvailabilityModal'
import { getElementHeight } from 'utils/commonFunction'
import FlightsHeader from './flightsHeader'
import { AlertBellIcon } from 'utils/svgs'
import SeoHelmet from 'utils/seoHelmet'
import Texts from 'constants/staticText'
import AirlineMembershipModal from 'common/Modals/airlineMembershipModal'
import intl from 'utils/intlMessage'
import { pushNotification } from 'utils/notifications'
import toustifyMessages from 'constants/messages/toustifyMessages'
import { airlineName } from 'constants/globalConstants'

var header
var sticky
const Home = (props) => {
  const flightDetailsRef = useRef()
  const {
    toggalClasses,
    flights: { flightsAvailability, flightsLoading, toggalDateAvailibilityModal, availabilityAlertData, availabilityAlertLoading },
    updateToggalClassesState,
    location: { search, state },
    pageAnalytics,
    updateReducerState,
    userActionAudit,
    searchPanel: { ticketsSearchBox, selectedAirlineCode, journeyType, availablePassengerCabinClasses, airlineMembership },
    myAlerts: { cancellingAlert },
    getAlertAvailability,
    user,
    common: { airlineMembershipToggle },
    accountSettings : { updateUserProfileLoading }
  } = props
  const { isEmailVerified } = user || ''
  const { numberOfPassengers } = ticketsSearchBox

  let extractedParams = null
  if (search) {
    extractedParams = extractURLParams(search)
  }
  const [showReturnDates, showReturnDatesHandle] = useState('outbound-seats')
  const [showMobileSearch, toggleMobileSearch] = useState(false)
  const [highlightOffPeak, setHighlightOffPeak] = useState(false)
   // onRunTimeUpdate state is use to restrict API calling when change cabin class & passenger count
  const [onRunTimeUpdate, setOnRunTimeUpdate] = useState(false)

  const [flightsAvailabilityList, setFlightsAvailabilityList] = useState({})
  const accessToken = retrieveFromLocalStorage('token')

  // Set Availability list
  useEffect(() => {
    if (flightsAvailability) {
      filterObject()
      setFlightsAvailabilityList(flightsAvailability)
      // update flightsLoading to false once its setstate
      updateReducerState('flights', 'flightsLoading', false)
    }
    // eslint-disable-next-line
  }, [flightsAvailability])

  useEffect(()=> {
    const { airlineMemberships } = user || {}
    if(airlineMemberships && !airlineMemberships.length) {
      updateReducerState('common', 'airlineMembershipToggle', true)
    }else{
      updateReducerState('common', 'airlineMembershipToggle', false)
    }
    // eslint-disable-next-line
  }, [user])

  // To filter cabin class according to passenger count change
const handleCabinClass = (flightsAvailabilityList) => {
  const objectLength = Object.keys(flightsAvailabilityList).length
    if (objectLength) {
      const classObj = fetchAvailableCabinClass(flightsAvailabilityList)
      updateReducerState('searchPanel', 'availablePassengerCabinClasses', classObj)
    }
}

  // Filter Availability list according to numberOfPassengers
  useEffect(() => {
    const objectLength = Object.keys(flightsAvailability).length
    if (numberOfPassengers && objectLength) {
    filterObject()
    updateExistingEventId()
    }
    // eslint-disable-next-line
  }, [numberOfPassengers])



  const filterObject = () => {
    let mainObj = JSON.parse(JSON.stringify(flightsAvailability))
    const objectLength = Object.keys(mainObj).length
    if (objectLength) {
      mainObj = {
        ...mainObj,
        inbound_availability: getPassengerCountFilteredData(mainObj, 'inbound_availability', numberOfPassengers),
        outbound_availability: getPassengerCountFilteredData(
          mainObj,
          'outbound_availability',
          numberOfPassengers
        )
      }
    }
    handleCabinClass(mainObj)
    // setFlightsAvailabilityList(mainObj)
  }


  const handleOffPeakHighlight = () => {
    setHighlightOffPeak(!highlightOffPeak)
  }

  let selectedClass = {}
  for (const key in toggalClasses)
    if (toggalClasses[key]) {
      selectedClass = {
        ...selectedClass,
        [key]: true
      }
    }

  // Update eventId on class filter for user action audit
const updateExistingEventId = () => {
  if (
    state &&
    state.sourcePage === 'calendar' &&
    extractedParams &&
    extractedParams.dId
  ) {
    const data = {
      numberOfPassengers: Number(numberOfPassengers),
      toggleClass: {
        economy: toggalClasses.economy,
        premium: toggalClasses.premium,
        first: toggalClasses.first,
        business: toggalClasses.business
      },
      tier: airlineMembership ? airlineMembership : Texts.DEFAULT_AIRLINE_TIER,
      sourceCode: extractedParams.dId,
      destinationCode: extractedParams.aId,
      classFilter: true
    }
    const details = handleAuditUser(data, extractedParams, state)
    userActionAudit(details)
  }
}

// Call user action audit API on cabin class filter with same event Id
  useEffect(() => {
    updateExistingEventId()
    // eslint-disable-next-line
  }, [toggalClasses])

  // Get Availability
  useEffect(() => {
    !onRunTimeUpdate && getAirlineData(search)
    pageAnalytics()
    setTimeout(() => {
      handleScrollToCreatedAlert()
    }, 2000)
    // toggleShowAlertModal()
    updateReducerState('searchPanel', 'toggalAlertDatesModal', false)
    // eslint-disable-next-line
  }, [props.location.search])

  // set toggle true if get change in state value
  const handleScrollToCreatedAlert = () => {
    if (extractedParams && extractedParams.start_date) {
      const { start_date } = extractedParams || {}
      const currentDayIdentifier = moment(start_date).format('YYYY-MM-DD')
      const today = moment().format('YYYY-MM-DD')
      const pastDate = currentDayIdentifier < today
      // logic to find index to make scroll at particular div
      const index = pastDate
        ? moment().diff(moment(start_date), 'months', true)
        : moment(start_date).diff(moment(), 'months', true)

      const ele = document.getElementsByClassName(`key-${parseInt(index + 1)}`)
      const header = document.getElementById('main-header')
      if (ele && ele.length) {
        window.scrollTo({
          top: (ele[0].offsetTop - ele[0].offsetHeight / 2) - header.offsetHeight,
          behavior: 'smooth'
        })
      }
    }
  }
// eslint-disable-next-line
  const toggleShowAlertModal = () => {
    if(extractedParams && extractedParams.alertId) {
      if(accessToken) {
        updateReducerState('flights', 'toggalDateAvailibilityModal', true)
        removeFromLocalStorage('alertPopupUrl')
        getAlertAvailability({ alertId: extractedParams.alertId, emailLogId: extractedParams?.emailLogId || null })
      }else{
        history.push(AppRoutes.SIGN_IN)
        setInLocalStorage('alertPopupUrl', props.location.search)
      }
    }
  }

  // eslint-disable-next-line
  const handleCloudTransition = () => {
    const cloudFooter = document.getElementsByClassName('cloudwrap')
    const element = document.getElementsByClassName('DayPicker')
    const isInViewport = isElementXPercentInViewport(element[element.length - 1], 60)
    if (isInViewport) {
      cloudFooter && cloudFooter.length && cloudFooter[0].classList.add('footercloudtop')
      if (window.pageYOffset > 600) {
        cloudFooter && cloudFooter.length && cloudFooter[0].classList.remove('footercloudstick')
      }
    }
    else {
      cloudFooter && cloudFooter.length && cloudFooter[0].classList.remove('footercloudtop')
    }
  }

  // Check if element is partially visible in viewport by %
  const isElementXPercentInViewport = (el, percentVisible) => {
    if(el && el !== undefined) {
    const rect = el.getBoundingClientRect(),
      windowHeight = (window.innerHeight || document.documentElement.clientHeight)
    return !(
      Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
      Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
    )
    }else{
        return true
    }
  }

  useEffect(() => {
    if(!accessToken) {
      pushNotification(intl(toustifyMessages.currentAirlineMembershipText), 'success', 'TOP_CENTER', 5000)
    }
    const scrollCallBack = window.addEventListener('scroll', () => {
      header = document.getElementById('myHeader')
      sticky = header?.offsetTop
      if (window.pageYOffset > sticky) {
        header && header.classList.add('sticky-header')
      } else {
        header && header.classList.remove('sticky-header')
      }
      if(!accessToken) {
        handleCloudTransition()
      }
    })
    handleHideDate()
    const { updateReducerState } = props
    return () => {
      updateReducerState('searchPanel', 'departStartDate', null)
      updateReducerState('searchPanel', 'departEndDate', null)
      updateReducerState('searchPanel', 'returnStartDate', null)
      updateReducerState('searchPanel', 'returnEndDate', null)
      window.removeEventListener('scroll', scrollCallBack)
    }
    // eslint-disable-next-line
  }, [])

  // To hide past dates from calendar
  const handleHideDate = () => {
    const element = document.getElementsByClassName('DayPicker-Week')
    for (var i = 0; i < element.length; i++) {
        if(element[i].children.length === (element[i].querySelectorAll('.DayPicker-Day--outside').length + element[i].querySelectorAll('.DayPicker-Day--highlighted').length)) {
          element[i].remove()
        }
    }
  }

  const getAirlineData = () => {

    if (
      extractedParams &&
      extractedParams.aId &&
      extractedParams.aPlace &&
      extractedParams.dId &&
      extractedParams.dPlace &&
      extractedParams.jType 
    ) {
       updateSearchParams(extractedParams)
    } else {
      // if(accessToken) {
      //   navigateToRespectivePage(AppRoutes.HOME, appendParams)
      // }else {
        updateSearchParams(calendarDefaultRouteSearcParams)
      // }
    }
  }

  const updateSearchParams = (paramsData) => {
    const { getFlightAvailability } = props
    const userValue = JSON.parse(retrieveFromLocalStorage('userDetails'))
    const airlineTier = accessToken && airlineMembership ? airlineMembership : userValue && userValue.airline_memberships && userValue.airline_memberships.length && userValue.airline_memberships[0].membership ? userValue.airline_memberships[0].membership : Texts.DEFAULT_AIRLINE_TIER
    let data = {
      numberOfPassengers: 1,
      toggleClass: {
        economy: paramsData.economy === 'true',
        premium: paramsData.premium === 'true',
        first: paramsData.first === 'true',
        business: paramsData.business === 'true'
      },
      tier: airlineTier,
      sourceCode: paramsData.dId,
      destinationCode: paramsData.aId,
      airlineCode: selectedAirlineCode ? selectedAirlineCode : Texts.DEFAULT_AIRLINE_TIER_CODE
    }
    if(selectedAirlineCode === airlineName.VA.CODE) {
      data = {
        ...data,
        toggalClasses: {
          economy: paramsData.economy === 'true',
          premium: paramsData.premium === 'true',
          upper: paramsData.upper === 'true'
        }
      }
    }
    const details = handleAuditUser(data, paramsData, state)
    userActionAudit(details)
    getFlightAvailability(data)
    let dataJson = {
      departure: {
        name: paramsData.dPlace,
        value: paramsData.dId
      },
      arrival: {
        name: paramsData.aPlace,
        value: paramsData.aId
      },
      journeyType: paramsData.jType,
      ticketsSearchBox: {
        numberOfPassengers: Number(paramsData.numberOfPassengers),
        numberOfInfantsOnLap: 0,
        ticketClass: {
          label: paramsData.tclass ? paramsData.tclass : 'Economy',
          value: paramsData.tValue ? paramsData.tValue : 'economy'
        }
      },
      toggalClasses: {
        economy: paramsData.economy === 'true' ? true : false,
        premium: paramsData.premium === 'true' ? true : false,
        first: paramsData.first === 'true' ? true : false,
        business: paramsData.business === 'true' ? true : false
      }
    }
    if(selectedAirlineCode === airlineName.VA.CODE) {
      dataJson = {
        ...dataJson,
        toggalClasses: {
          economy: paramsData.economy === 'true' ? true : false,
          premium: paramsData.premium === 'true' ? true : false,
          upper: paramsData.upper === 'true' ? true : false
        }
      }
    }
    if (
      dataJson &&
      dataJson.departure &&
      dataJson.arrival &&
      dataJson.ticketsSearchBox
    ) {
      Object.keys(dataJson).map((item) => (
         updateReducerState('searchPanel', item, dataJson[item])
      ))
    }
  }

  const handleClassChange = (name) => {
    const newClass = {
      ...toggalClasses,
      [name]: !toggalClasses[name]
    }
    const checkedClassLength =
    Object.values(toggalClasses).filter((classStr) => classStr).length - 1
    if (checkedClassLength >= 1 || !toggalClasses[name]) {
      updateQueryParams(props.searchPanel, 'toggalClasses', newClass)
      setOnRunTimeUpdate(true)
      updateToggalClassesState(name, !toggalClasses[name])
    }
  }

  const renderOutboundDayContents = (day) => {
    const date = moment(day).format('YYYY-MM-DD')
    const currentDayIdentifier = moment(date).format('YYYY-MM-DD')
    const today = moment().format('YYYY-MM-DD')
    const futureDate = moment().add(365, 'days').format('YYYY-MM-DD')
    if (
      flightsAvailabilityList &&
      flightsAvailabilityList.outbound_availability &&
      flightsAvailabilityList.outbound_availability[currentDayIdentifier] &&
      today <= currentDayIdentifier &&
      futureDate >= currentDayIdentifier
    ) {
      const dayCircle = (
        <ColorCircleBox
          value={
            flightsAvailabilityList.outbound_availability[currentDayIdentifier]
          }
          peak={
            flightsAvailabilityList.outbound_availability[currentDayIdentifier]
              ?.peak
          }
          date={date}
          selectedClass={selectedClass}
          passangerCount={
            numberOfPassengers
              ? parseInt(numberOfPassengers)
              : 1
          }
          highlightOffPeak = {highlightOffPeak}
        />
      )
      return (
        <div
          data-tip={false}
          data-for="outbound"
          className="react-datepicker__day-date react-datepicker__day-date--available react-datepicker__tooltip-wrap"
        >
          <div className="date-svg">{dayCircle}</div>
        </div>
      )
    } else {
      return (
        <div
          className="react-datepicker__day-date "
          data-tip-disable
          data-tip={false}
          data-for="outbound"
        >
          {moment(day).format('DD')}
        </div>
      )
    }
  }

  const renderInboundDayContents = (day) => {
    const date = moment(day).format('YYYY-MM-DD')
    const currentDayIdentifier = moment(date).format('YYYY-MM-DD')
    const today = moment().format('YYYY-MM-DD')
    const futureDate = moment().add(365, 'days').format('YYYY-MM-DD')
    if (
      flightsAvailabilityList &&
      flightsAvailabilityList.inbound_availability &&
      flightsAvailabilityList.inbound_availability[currentDayIdentifier] &&
      today <= currentDayIdentifier &&
      futureDate >= currentDayIdentifier
    ) {
      const dayCircle = (
        <ColorCircleBox
          value={
            flightsAvailabilityList.inbound_availability[currentDayIdentifier]
          }
          peak={
            flightsAvailabilityList.inbound_availability[currentDayIdentifier]
              ?.peak
          }
          date={date}
          selectedClass={selectedClass}
          passangerCount={
            numberOfPassengers
              ? parseInt(numberOfPassengers)
              : 1
          }
          highlightOffPeak = {highlightOffPeak}
        />
      )
      return (
        <div
          data-tip={false}
          data-for="inbound"
          className="react-datepicker__day-date react-datepicker__day-date--available react-datepicker__tooltip-wrap"
        >
          <div className="date-svg">{dayCircle}</div>
        </div>
      )
    } else {
      return (
        <div
          className="react-datepicker__day-date"
          data-tip-disable
          data-tip={false}
          data-for="inbound"
        >
          {moment(day).format('DD')}
        </div>
      )
    }
  }

  const Weekday = ({ weekday, className, localeUtils, locale }) => {
    const weekdayName = localeUtils.formatWeekdayLong(weekday, locale)
    return (
      <div className={className} title={weekdayName}>
        {weekdayName.slice(0, 1)}
      </div>
    )
  }


  const date = new Date(), y = date.getFullYear(), m = date.getMonth()
  const firstDay = new Date(y, m, 1)
  const lastWeek = moment().startOf('week').format('MMM DD, YYYY HH:MM')
  const modifiers = {
    highlighted: {
      from: moment(firstDay).isSame(new Date(), 'week') ? '' :firstDay,
      to: new Date(lastWeek)
    }
  }

  const currentMonthNumber = Number(moment().format('M')) - 1
  const currentYearNumber = Number(moment().format('YYYY'))

  return (
    <>
      {(flightsLoading || cancellingAlert) && <Loader />}
      <Layout className={`flight-availability-page ${accessToken && user?.alternateEmails?.length && !isEmailVerified ? 'flight-availability-page-top' : ''}`}>
        <SeoHelmet title={SeoTexts.CALENDAR_TITLE} />
        <Container>
          <div>
            <FlightsHeader
              showMobileSearch={showMobileSearch}
              toggleMobileSearch={toggleMobileSearch}
              flightsAvailabilityList={flightsAvailabilityList}
              handleClassChange={handleClassChange}
              toggalClasses={toggalClasses}
              extractedParams={extractedParams}
              handleOffPeakHighlight={handleOffPeakHighlight}
              highlightOffPeak={highlightOffPeak}
              showReturnDates={showReturnDates}
              showReturnDatesHandle={showReturnDatesHandle}
              selectedAirlineCode={selectedAirlineCode}
              journeyType={journeyType}
              availablePassengerCabinClasses={availablePassengerCabinClasses}
              setOnRunTimeUpdate={setOnRunTimeUpdate}
              numberOfPassengers={numberOfPassengers}
            />
            <div className="full-width flight-availability-page__calender-wrapper" onMouseEnter={()=> updateReducerState('flights', 'isCalendarHover', true)}>
              <div className="flight-availability-page__calender-wrapper-inner">
                <Grid
                  columns="equal"
                  className="flight-availability-page__calender my-0"
                >
                  <Grid.Row
                    className={`flight-availability-page__calender-inner ${
                      journeyType === 'return'
                        ? 'flight-availability-page__calender-inner--has-two-col'
                        : ''
                    }`}
                  >
                    <Grid.Column
                      className={`${
                        journeyType === 'return'
                          ? 'calendar-wrapper'
                          : ''
                      } ${
                        showReturnDates === 'outbound-seats'
                          ? 'calendar-wrapper--active'
                          : ''
                      }`}
                    >
                      {calendarMonthsLength.map((data, index) => (
                        <DayPicker
                          containerProps={{ tabIndex: index }}
                          className={`key-${index}`}
                          key={index}
                          month={
                            new Date(
                              currentYearNumber,
                              currentMonthNumber + index
                            )
                          }
                          firstDayOfWeek={1}
                          renderDay={renderOutboundDayContents}
                          canChangeMonth={false}
                          weekdayElement={<Weekday />}
                          onDayMouseEnter={(e) =>
                            {
                              flightDetailsRef.current.updateState(e, 'out')
                              const eleB = document.getElementById('outbound')
                              setTimeout(() => {
                                getElementHeight(eleB)
                              }, 1000)
                            }
                          }
                          modifiers={modifiers}
                        />
                      ))}
                    </Grid.Column>
                    <Grid.Column
                      className={`calendar-wrapper ${
                        showReturnDates === 'return-seats'
                          ? 'calendar-wrapper--active'
                          : ''
                      } ${journeyType === 'return' ? ' ' : ' d-n'}`}
                    >
                      {calendarMonthsLength.map((data, index) => <DayPicker
                          containerProps={{ tabIndex: index }}
                          className={`key-${index}`}
                          key={index}
                          // disabledDays={{ before: new Date() }}
                          month={
                            new Date(
                              currentYearNumber,
                              currentMonthNumber + index
                            )
                          }
                          firstDayOfWeek={1}
                          renderDay={renderInboundDayContents}
                          canChangeMonth={false}
                          weekdayElement={<Weekday />}
                          onDayMouseEnter={(e) => {
                            flightDetailsRef.current.updateState(e, 'in')
                            const eleB = document.getElementById('inbound')
                            setTimeout(() => {
                              getElementHeight(eleB)
                            }, 1000)
                          }}
                          modifiers={modifiers}
                                                               />)}
                    </Grid.Column>
                    {/* } */}
                  </Grid.Row>
                </Grid>
              </div>
            </div>
          </div>
        </Container>
        {!showMobileSearch ? (
          <Button
            className="w-100 btn btn--dark btn--search-icon pl-3 pr-3"
            onClick={() => toggleMobileSearch(!showMobileSearch)}
          >
            <span className="mr-1"> Create Alert</span>{' '}
            <AlertBellIcon/>
          </Button>
        ) : null}
        <PopupFlightDetails
          ref={flightDetailsRef}
          toggalClasses={toggalClasses}
          flightsAvailability={flightsAvailabilityList}
          selectedClass={selectedClass}
          highlightOffPeak={highlightOffPeak}
          numberOfPassengers={numberOfPassengers}
        />
      </Layout>

      {toggalDateAvailibilityModal && !flightsLoading &&
      <DateAvailibilityModal
      updateReducerState={updateReducerState}
      toggalDateAvailibilityModal={toggalDateAvailibilityModal}
      selectedClass={selectedClass}
      availabilityAlertData={availabilityAlertData}
      availabilityAlertLoading={availabilityAlertLoading}
      extractedParams={extractedParams}
      />
     }

      {airlineMembershipToggle && !flightsLoading &&
      <AirlineMembershipModal
        airlineMembershipToggle={airlineMembershipToggle}
        searchPanel={props.searchPanel}
        getAirlineList={props.getAirlineList}
        updateReducerState={updateReducerState}
        updateProfileDetails={props.updateProfileDetails}
        user={user}
        updateUserProfileLoading={updateUserProfileLoading}
      />
      }
    </>
  )
}

Home.propTypes = {
  flights: PropTypes.object,
  getFlightAvailability: PropTypes.func,
  location: PropTypes.object,
  updateReducerState: PropTypes.func,
  toggalClasses: PropTypes.object,
  updateToggalClassesState: PropTypes.func,
  pageAnalytics: PropTypes.func,
  userActionAudit: PropTypes.func,
  searchPanel: PropTypes.object,
  myAlerts: PropTypes.object,
  getAlertAvailability: PropTypes.func,
  common: PropTypes.object,
  getAirlineList: PropTypes.func
}

export default Home
