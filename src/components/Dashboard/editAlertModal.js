import React, { useState, useEffect, Suspense } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Dropdown, Header, Grid } from 'semantic-ui-react'
import moment from 'moment'
import { InputRadio } from 'utils/formUtils'
import { Close, CheckCircle, DeleteAlertIcon } from 'utils/svgs'
import { britishAirwaysClasses, defaultBACabinClass } from 'constants/globalConstants'
import TravellerCount from 'components/SearchPanel/travellerCount'
// import DateRangeSelectore from 'components/SearchPanel/dateRangePicker'
import { jsonToQueryString, retrieveFromLocalStorage } from 'utils/helpers'
import { DatePickerWrapper } from './style'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import dashboardMessages from 'constants/messages/dashboardMessages'
import './assets/editAlertModal.scss'
import { AppRoutes } from 'constants/appRoutes'
import { fetchAvailableCabinClass, getPassengerCountFilteredData, checkDifference, getDifferenceInDays } from 'utils/commonFunction'
import toustifyMessages from 'constants/messages/toustifyMessages'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import flightMessages from 'constants/messages/flightMessages'
import Texts from 'constants/staticText'
import { airlineName } from 'constants/globalConstants'

const DateRangeSelectore = React.lazy(() => import('components/SearchPanel/dateRangePicker'))

const EditAlertModal = (props) => {
  const { data, airlines, toggleEditAlertModal, setToggleEditAlertModal, toggleDeleteAlertModal,
    handelDeleteAlert, setToggleDeleteALertModal, editAlert, extractedParams, getFlightAvailability, flights, allowedAlertDateRange, isUserGoldMember, isUserSilverMember, updateReducerState, availablePassengerCabinClasses } = props
  const { number_of_passengers, trip_type, start_date, end_date, arrival_start_date,
    arrival_end_date, membership_type, travel_classes, id, available_travel_classes, destination_code, source_code, airline_name } = data || ''
    const { flightsAvailability } = flights || {}
    const appendParams = sessionStorage.getItem('queryParamsGA') || ''

  const [editAlertState, SetEditAlertState] = useState({
    numberOfPassengers: 1,
    journeyType: 'one-way',
    rangeDepartStartDate: null,
    rangeDepartEndDate: null,
    rangeReturnStartDate: null,
    rangeReturnEndDate: null,
    airlineMembership: '',
    cabinClasses: {
      economy: false,
      premium: false,
      business: false,
      first: false
    },
    availableClasses: []
  })
  const [errors, setErrors] = useState({
    returnDateError: false,
    cabinClassError: false,
    departDateError: false
  })
  const [activeAlertError, setActiveAlertError] = useState(false)
  const [passengerToggleClass, setPassengerToggleClass] = useState(defaultBACabinClass)


  const { numberOfPassengers, journeyType, rangeDepartStartDate, rangeDepartEndDate,
    rangeReturnStartDate, rangeReturnEndDate, cabinClasses, airlineMembership, availableClasses } = editAlertState
  useEffect(() => {
    const cabinClasses = travel_classes ? travel_classes.split(',') : []
    SetEditAlertState({
      ...editAlertState,
      numberOfPassengers: number_of_passengers,
      journeyType: trip_type === 'one_way' ? 'one-way' : trip_type,
      rangeDepartStartDate: moment.utc(start_date),
      rangeDepartEndDate: moment.utc(end_date),
      rangeReturnStartDate: arrival_start_date ? moment.utc(arrival_start_date) : null,
      rangeReturnEndDate: arrival_end_date ? moment.utc(arrival_end_date) : null,
      airlineMembership: membership_type,
      cabinClasses: {
        economy: cabinClasses.includes('economy'),
        premium: cabinClasses.includes('premium_economy'),
        business: cabinClasses.includes('business'),
        first: cabinClasses.includes('first')
      },
      availableClasses: available_travel_classes || ['economy', 'premium', 'business', 'first']
    })
    if(window.location.pathname === AppRoutes.MY_ALERT) {
      fetchFlightAvalibilityAPI()
    }
    window.location.pathname !== AppRoutes.MY_ALERT && setPassengerToggleClass(availablePassengerCabinClasses)
    // eslint-disable-next-line
  }, [])

  // Call flight availibility API for managing passenger count & cabin class change
  const fetchFlightAvalibilityAPI = () => {
    const cabinClasses = travel_classes ? travel_classes.split(',') : []
    const data = {
      numberOfPassengers: 1,
      toggleClass: {
        economy: cabinClasses.includes('economy'),
        premium: cabinClasses.includes('premium_economy'),
        business: cabinClasses.includes('business'),
        first: cabinClasses.includes('first')
      },
      tier: membership_type,
      sourceCode: source_code,
      destinationCode: destination_code,
      airlineCode: airline_name === airlineName.VA.AIRWAYS_NAME ? airlineName.VA.CODE : Texts.DEFAULT_AIRLINE_TIER_CODE 
    }
    getFlightAvailability(data)
  }

  const onJourneyChange = (value) => {
    SetEditAlertState({
      ...editAlertState,
      journeyType: value
    })
  }

  const handlerToggalEditAlertPopUp = () => {
    setToggleEditAlertModal(false)
    setToggleDeleteALertModal('edit')
      setPassengerToggleClass({ economy: true,
        premium: true,
        first: true,
        business: true })
  }

  const getAmericanMemberShip = () => {
    let member = []
    airlines.map(item => {
      if (item.value === airlineName.BA.CODE && item.memberships) {
        member = item.memberships
      }
      return member
    })
    const membershipList = []
    member.map((item, index) => {
      membershipList.push({
        key: index,
        text: item.title,
        value: item.value
      })
      return membershipList
    })
    return membershipList
  }

  const handlerMembershipChange = (value) => {
    SetEditAlertState({
      ...editAlertState,
      airlineMembership: value
    })
  }

  const handleDepartOutsideRange = (day, focused) => {
    if (focused === 'endDate') {
      return moment(day).isBefore(
        rangeDepartStartDate || moment(),
        'date'
      )
    } else {
      return moment(day).isBefore(moment(), 'date')
    }
  }

  const handleReturnOutsideRange = (day, focused) => {
    if (focused === 'endDate') {
      return moment(day).isBefore(
        rangeReturnStartDate || moment(),
        'date'
      )
    } else {
      return moment(day).isBefore(rangeDepartStartDate, 'date')
    }
  }

  const handlerClassChange = (name, value) => {
    SetEditAlertState({
      ...editAlertState,
      cabinClasses: {
        ...cabinClasses,
        [name]: value
      }
    })
    if (errors?.cabinClassError) {
      setErrors({
        ...errors,
        cabinClassError: false
      })
    }
  }

  const handlerUpdateEditAlertChanges = () => {
    const { destination_code, source_code, id } = data || ''

    const selectedClasses = []
    Object.keys(cabinClasses).map(item => {
      if (cabinClasses[item]) {
        selectedClasses.push(item === 'premium' ? 'premium_economy' : item)
      }
      return selectedClasses
    })

    if (!selectedClasses.length) {
      setErrors({
        ...errors,
        cabinClassError: true
      })
      return
    }
    if (!rangeDepartStartDate || !rangeDepartEndDate) {
      setErrors({
        ...errors,
        departDateError: true,
        returnDateError: journeyType === 'return'
      })
      return
    }

    if (!rangeDepartStartDate || !rangeDepartEndDate) {
      setErrors({
        ...errors,
        departDateError: true,
        returnDateError: journeyType === 'return'
      })
      return
    }

    const url = {
      numberOfPassengers: numberOfPassengers,
      tclass: 'Economy',
      tValue: 'economy',
      jType: journeyType,
      dPlace: extractedParams?.dPlace,
      dId: source_code,
      aPlace: extractedParams?.aPlace,
      aId: destination_code,
      economy: cabinClasses?.economy,
      premium: cabinClasses?.premium,
      first: cabinClasses?.first,
      business: cabinClasses?.business,
      start_date: moment(rangeDepartStartDate).format('YYYY-MM-DD') || null
    }
    const availabilityURL = `${AppRoutes.CALENDER}${jsonToQueryString(url)}`
    const token = retrieveFromLocalStorage('token')

    let details = {
      user: {
        access_token: token
      },
      alert: {
        number_of_passengers: numberOfPassengers,
        travel_classes: selectedClasses?.toString(),
        trip_type: 'one_way',
        membership_type: airlineMembership,
        start_date: moment(rangeDepartStartDate).format('DD-MM-YYYY'),
        end_date: moment(rangeDepartEndDate).format('DD-MM-YYYY'),
        availability_url: availabilityURL
      }
    }

    if (journeyType === 'return') {
      if (!rangeReturnStartDate || !rangeReturnEndDate) {
        setErrors({
          ...errors,
          returnDateError: true
        })
        return
      }
      details = {
        ...details,
        alert: {
          ...details.alert,
          trip_type: 'return',
          arrival_start_date: moment(rangeReturnStartDate).format('DD-MM-YYYY'),
          arrival_end_date: moment(rangeReturnEndDate).format('DD-MM-YYYY')
        }
      }
    }

    if(checkDifference(allowedAlertDateRange, details.alert)) {
     const validData = handleSpecificErrorAlertRange('checkValidation')
        setErrors({
          ...errors,
          departDateError: validData?.outBound,
          returnDateError: validData?.inBound
        })
      setActiveAlertError(true)
      return
    }
    editAlert(details, id)
    setToggleEditAlertModal(false)
    setToggleDeleteALertModal('edit')
  }

  const updateNumberOfPassenger = (sum) => {
    // SetEditAlertState({
    //   ...editAlertState,
    //   numberOfPassengers: sum
    // })
    filterObject(sum)
  }

  const filterObject = (passengerCount) => {
    let mainObj = JSON.parse(JSON.stringify(flightsAvailability))
    const objectLength = Object.keys(mainObj).length
    if (objectLength) {
      mainObj = {
        ...mainObj,
        inbound_availability: getPassengerCountFilteredData(mainObj, 'inbound_availability', passengerCount),
        outbound_availability: getPassengerCountFilteredData(
          mainObj,
          'outbound_availability',
          passengerCount
        )
      }
    }
    handleCabinClass(mainObj, passengerCount)
  }

    // To filter cabin class according to passenger count change
const handleCabinClass = (flightsAvailabilityList, passengerCount) => {
  const objectLength = Object.keys(flightsAvailabilityList).length
    if (objectLength) {
      const classObj = fetchAvailableCabinClass(flightsAvailabilityList)
      setPassengerToggleClass(classObj)
      SetEditAlertState({
        ...editAlertState,
        numberOfPassengers: passengerCount,
        journeyType
      })
    }
}

const handleAlertRangeError = (alert) => {
  if(checkDifference(allowedAlertDateRange, alert)) {
    const validData = handleSpecificErrorAlertRange('checkValidation', alert)
       setErrors({
         ...errors,
         departDateError: validData?.outBound,
         returnDateError: validData?.inBound
       })
       if(validData?.outBound || validData?.inBound) {
         setActiveAlertError(true)
       } else{
        setActiveAlertError(false)
       }
     return true
   }else{
    clearAlertError()
   }
}

  const updateDepartureSelectedDateRange = (name, value) => {
     if(rangeDepartStartDate && (name === 'rangeDepartEndDate' && value)) {
     const alert = {
        trip_type: 'one_way',
        start_date: name === 'rangeDepartStartDate' ? moment(value).format('DD-MM-YYYY') : moment(rangeDepartStartDate).format('DD-MM-YYYY'),
        end_date: name === 'rangeDepartEndDate' ? moment(value).format('DD-MM-YYYY') : moment(rangeDepartEndDate).format('DD-MM-YYYY')
      }

    handleAlertRangeError(alert)
     }else{
      setErrors({
        ...errors,
        returnDateError: false
      })
     }
    if (name === 'rangeDepartStartDate' && value > rangeDepartEndDate) {
      editAlertState.rangeDepartEndDate = null
    }
    SetEditAlertState({
      ...editAlertState,
      [name]: value,
      rangeReturnStartDate: null,
      rangeReturnEndDate: null
    })
  }


  const updateReturnSelectedDateRange = (name, value) => {
    const alert = {
      trip_type: 'return',
      arrival_start_date: name === 'rangeReturnStartDate' ? moment(value).format('DD-MM-YYYY') : moment(rangeReturnStartDate).format('DD-MM-YYYY'),
      arrival_end_date: name === 'rangeReturnEndDate' ? moment(value).format('DD-MM-YYYY') : moment(rangeReturnEndDate).format('DD-MM-YYYY'),
      start_date: moment(rangeDepartStartDate).format('DD-MM-YYYY'),
      end_date: moment(rangeDepartEndDate).format('DD-MM-YYYY')
    }

     handleAlertRangeError(alert)
    if (name === 'rangeReturnStartDate' && value > rangeReturnEndDate) {
      editAlertState.rangeReturnEndDate = null
    }
    SetEditAlertState({
      ...editAlertState,
      [name]: value
    })
  }

  const clearDates = (strStart, strEnd) => {
    const validData = handleSpecificErrorAlertRange('checkValidation')
    if(!validData?.outBound) {
      clearAlertError()
    }
    if(strStart === 'rangeReturnStartDate') {
      SetEditAlertState({
        ...editAlertState,
        [strStart]: null,
        [strEnd]: null
      })
      setErrors({
        ...errors,
        returnDateError: false
      })
    }else{
      SetEditAlertState({
        ...editAlertState,
        [strStart]: null,
        [strEnd]: null,
        rangeReturnStartDate: null,
        rangeReturnEndDate: null
      })
      clearAlertError()
    }
  }

  const clearAlertError = () => {
    setActiveAlertError(false)
    setErrors({
      ...errors,
      returnDateError: false,
      departDateError: false
    })
  }

  const handleSpecificErrorAlertRange = (str, alerts) => {
    const depStart = alerts && alerts.start_date ? alerts.start_date : rangeDepartStartDate
    const depEnd = alerts && alerts.end_date ? alerts.end_date : rangeDepartEndDate
    const retStart = alerts && alerts.arrival_start_date ? alerts.arrival_start_date : rangeReturnStartDate
    const retEnd = alerts && alerts.arrival_end_date ? alerts.arrival_end_date : rangeReturnEndDate
    const outBound = getDifferenceInDays(depStart, depEnd) >= allowedAlertDateRange
    const inBound = getDifferenceInDays(retStart, retEnd) >= allowedAlertDateRange
    if(str === 'checkValidation') {
      return { outBound, inBound }
    }else{
      return outBound && !inBound ? 'Outbound date range' : inBound && !outBound ? 'Inbound date range' : 'Outbound & Inbound date ranges'
    }
  }

  return (
    <Modal
      open={toggleEditAlertModal}
      closeIcon={<div><Close className="cst-popup__close" /></div>}
      onClose={handlerToggalEditAlertPopUp}
      size="small"
      className="cst-popup american-alert-popup myProfileAlertPopup"
    >
      {toggleDeleteAlertModal === 'edit' && <Modal.Header>
        <Header as="h2">{intl(dashboardMessages.editAlertModalTitle)}</Header>
      </Modal.Header>}
      <Modal.Content>
        {toggleDeleteAlertModal === 'edit' ?
          <>
            <div className="inerContent">
              <Grid columns={3} className="m-0">
                <Grid.Row className="pt-1">
                  <Grid.Column>
                    <div className="american-alert-popup__fields">
                      <label>{intl(commonMessages.membership)}</label>
                      <Dropdown
                      fluid
                      options={getAmericanMemberShip()}
                      value={airlineMembership}
                      onChange={(e, { value }) => handlerMembershipChange(value)}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="alert-popup-wrap american-alert-popup__fields american-alert-popup__fields--radio">
                      <label>{intl(dashboardMessages.editAlertModalFlightType)}</label>
                      <div>
                        <InputRadio
                        label={intl(commonMessages.oneWay)}
                        name={'journeyType'}
                        value={'one-way'}
                        checked={journeyType === 'one-way'}
                        onChange={value => onJourneyChange(value)}
                        />
                        <InputRadio
                        label={intl(commonMessages.return)}
                        name={'journeyType'}
                        value={'return'}
                        checked={journeyType === 'return'}
                        onChange={value => onJourneyChange(value)}
                        />
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="american-alert-popup__fields american-alert-popup__fields--passenger">
                      <label>{intl(commonMessages.passengers)}</label>
                      <TravellerCount
                      numberOfPassengers={numberOfPassengers}
                      updateNumberOfPassanger={updateNumberOfPassenger}
                      toggleEditAlertModal={toggleEditAlertModal}
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={2} className="m-0">
                <Grid.Row className="pt-0">
                  <Grid.Column>
                    <div className={`american-alert-popup__fields ${errors?.departDateError ? 'date-error-field' : ''}`}>
                      <label>{intl(dashboardMessages.editAlertModalDepRange)}</label>
                      <DatePickerWrapper>
                        <Suspense fallback={<div>Loading...</div>}>
                          <DateRangeSelectore
                        startDate={rangeDepartStartDate}
                        endDate={rangeDepartEndDate}
                        startName="rangeDepartStartDate"
                        endName="rangeDepartEndDate"
                        startDateId="rangeDepartStartDate"
                        endDateId="rangeDepartEndDate"
                        updateSelectedDateRange={updateDepartureSelectedDateRange}
                        isOutsideRange={handleDepartOutsideRange}
                        startMonthDate={rangeDepartStartDate}
                        clearDates={clearDates}
                        rangeDepartStartDate={rangeDepartStartDate}
                        rangeReturnStartDate={rangeReturnStartDate}
                          />
                        </Suspense>
                      </DatePickerWrapper>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className={`american-alert-popup__fields ${errors?.returnDateError ? 'date-error-field' : ''}`}>
                      <label>{intl(dashboardMessages.editAlertModalRetRange)}</label>
                      <DatePickerWrapper>
                        <Suspense fallback={<div>Loading...</div>}>
                          <DateRangeSelectore
                        startDate={rangeReturnStartDate}
                        endDate={rangeReturnEndDate}
                        startName="rangeReturnStartDate"
                        endName="rangeReturnEndDate"
                        startDateId="rangeReturnStartDate"
                        endDateId="rangeReturnEndDate"
                        updateSelectedDateRange={updateReturnSelectedDateRange}
                        disabled={rangeDepartStartDate && rangeDepartEndDate ? journeyType === 'one-way' ? true : false : true}
                        isOutsideRange={handleReturnOutsideRange}
                        startMonthDate={rangeReturnStartDate || rangeDepartStartDate}
                        clearDates={clearDates}
                        rangeDepartStartDate={rangeDepartStartDate}
                        rangeReturnStartDate={rangeReturnStartDate}
                          />
                        </Suspense>
                      </DatePickerWrapper>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid className="m-0">
                <Grid.Row className="pt-0">
                  <Grid.Column width="16">
                    <div className="american-alert-popup__fields">
                      <label>{intl(dashboardMessages.editAlertModalCabinType)}</label>
                      <div className="classes-buttons">
                        {
                        britishAirwaysClasses.map((item, index) => {
                          const availableSeats = availableClasses.includes(item.cabinClass)
                          return (
                            <>
                              <div key={`${item.cabinClass}_${index}_3`}
                              data-tip data-for={`notAvailableForPassengerCount${item.cabinClass}_${index}_3`}
                              className={`${!availableSeats ? 'cabin-buttons_disable' : ''} alertBoxClasses classes-buttons__grp classes-buttons__grp--${item.cabinClass}`}
                              >
                                <input disabled={!availableSeats} type="checkbox" name="airline-class" id={item.cabinClass}
                              onClick={() => passengerToggleClass[item.cabinClass] ? handlerClassChange(item.cabinClass, !cabinClasses[item.cabinClass]) : null }
                                />
                                <label htmlFor={item.cabinClass} className={`${!passengerToggleClass[item.cabinClass] ? 'inactive-cabin-class' : ''}`} ><CheckCircle color="var(--medium-blue)" checked={cabinClasses[item.cabinClass]} />{item.title}</label>
                                <ReactTooltip id={`notAvailableForPassengerCount${item.cabinClass}_${index}_3`} disable={!passengerToggleClass[item.cabinClass] ? false: true} >
                                  <span>
                                    {`${numberOfPassengers} ${intl(flightMessages.notAvailableForPassengerCount, numberOfPassengers > 1 ? intl(flightMessages.seatsText) : intl(flightMessages.singleSeatText))}`}
                                  </span>
                                </ReactTooltip>
                              </div>
                            </>
                          )
                        })
                      }
                      </div>
                      {errors?.cabinClassError && <span className="class-error-field">{intl(dashboardMessages.editAlertModalSelectCabinClass)}</span>}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
            <div className="myProfileAlertPopupFooter">
              {activeAlertError &&
              <div>
                <p className="activeAlertText">
                  {isUserGoldMember ?
                    <>
                      {intl(toustifyMessages.activeAlertGoldErrorMessage, allowedAlertDateRange)} <p>{intl(toustifyMessages.pleaseCheckDateRange, journeyType === 'return' ? handleSpecificErrorAlertRange() : 'Outbound date range')}</p>
                    </>
                    :
                    <>
                      {intl(toustifyMessages.activeAlertErrorMessage, allowedAlertDateRange)}{intl(toustifyMessages.forXMembers, isUserSilverMember ? 'Silver' : 'Bronze')} {' '}
                      <p>{intl(toustifyMessages.pleaseCheckDateRange, journeyType === 'return' ? handleSpecificErrorAlertRange() : 'Outbound date range')}, { ' ' }
                        or
                        <Link to={`${AppRoutes.PRICING}${appendParams ? appendParams : ''}`}
                        onClick ={ ()=>{
                          updateReducerState('searchPanel', 'toggleEditAlertModal', false)
                          updateReducerState('searchPanel', 'toggalPreviewAlertModal', false)
                          }}
                         className="medium-blue-color link-hover-medium-blue"
                        >
                          { ' '} upgrade { ' '}
                        </Link>
                        {intl(toustifyMessages.yourPlan)}
                      </p>
                    </>
                     }
                </p>
              </div>
              }
              <div className="cst-popup__buttons mb-1 mt-1">
                <Button className="btn delete-btn" onClick={() => setToggleDeleteALertModal('delete')}>{intl(dashboardMessages.editAlertModalDeleteAlert)}</Button>
                <Button className="btn btn--medium-blue" disabled={activeAlertError || (!rangeDepartStartDate && !rangeDepartEndDate) } onClick={() => handlerUpdateEditAlertChanges()}>{intl(commonMessages.save)}</Button>
              </div>
            </div>
          </>
          :
          <>
            <DeleteAlertIcon className="cst-popup__image" />
            <h2 className="cst-popup__title">{intl(dashboardMessages.editAlertModalDeleteAlert)}</h2>
            <p className="cst-popup__text">{intl(dashboardMessages.editAlertModalDeleteAlertText)}</p>
            <div className="cst-popup__buttons justify-content-center">
              <Button onClick={() => handelDeleteAlert(id)} className="btn btn--medium-blue">{intl(dashboardMessages.editAlertModalDeleteAlert)}</Button>
            </div>
          </>
        }

      </Modal.Content>
    </Modal>
  )
}

EditAlertModal.propTypes = {
  setToggleEditAlertModal: PropTypes.func,
  data: PropTypes.object,
  airlines: PropTypes.array,
  toggleEditAlertModal: PropTypes.bool,
  editAlert: PropTypes.func,
  extractedParams: PropTypes.object,
  handelDeleteAlert: PropTypes.func,
  setToggleDeleteALertModal: PropTypes.func,
  toggleDeleteAlertModal: PropTypes.string,
  getFlightAvailability: PropTypes.func,
  flights: PropTypes.object,
  allowedAlertDateRange: PropTypes.number,
  isUserGoldMember: PropTypes.bool,
  isUserSilverMember: PropTypes.bool,
  updateReducerState: PropTypes.func,
  availablePassengerCabinClasses: PropTypes.object
}
export default EditAlertModal
