import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { DateRangePicker } from 'react-dates'
import TravellerCount from 'components/SearchPanel/travellerCount'
import JourneyTypeSelector from 'components/SearchPanel/journeyTypeSelector'
import AirlineClasses from 'components/SearchPanel/airlineClasses'
import SourceAutocomplete from 'components/SearchPanel/sourceAutocomplete'
import SelectDateRange from 'common/DateRangePicker'
import { retrieveFromLocalStorage, jsonToQueryString, setInLocalStorage } from 'utils/helpers'
import moment from 'moment'
import history from 'utils/history'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import FlyToSearchSelector from './flyToSearchSelector'
import DestinationAutocomplete from 'components/SearchPanel/destinationAutocomplete'
import { handleSetTrueToCabinClass } from 'utils/commonFunction'
import { AppRoutes } from 'constants/appRoutes'
import Texts from 'constants/staticText'

const MapSearch = (props) => {
  const { searchPanel, updateTicketsSearchBox, updateReducerState, flightsAvailability, pathName,
    mapData: { startDateDep, endDateDep, startDateReturn, endDateReturn, toggleSideBar, sourceLocation, destinationLocation, flyToSearch }, isUserBronzeMember,
    searchQuery, setSearchLocation, location, mapLocationsError, setOnRunTimeUpdate } = props
  const { ticketsSearchBox, journeyType, selectedAirlineCode,
    toggalClasses, airlineMembership, selectedAirline } = searchPanel || ''
  const { numberOfPassengers } = ticketsSearchBox || ''
  const appendParams = sessionStorage.getItem('queryParamsGA')
  const [errors, setErrors] = useState({
    sourceError: false,
    departureDateError: false,
    returnDateError: false,
    destinationError: false
  })
  const [focused, setFocus] = useState(null)
  const [focusedReturn, setFocusReturn] = useState(null)
  const [toggalDatesModal, setToggalDatesModal] = useState(false)
  const [depDates, setDepDates] = useState({
    depStartDateState: null,
    depEndDateState: null
  })
  const [retDates, setRetDates] = useState({
    retStartDateState: null,
    retEndDateState: null
  })
  const { depStartDateState, depEndDateState } = depDates
  const { retStartDateState, retEndDateState } = retDates

  const updateNumberOfPassanger = (sum) => {
    updateTicketsSearchBox('numberOfPassengers', sum)
  }

  const handlerSetError = (name, error) => {
    setErrors({
      ...error,
      [name]: error
    })
  }

  const setFocusAndToggalModal = (name) => {
    if (name === 'startDateDep' || name === 'endDateDep') {
      setFocus('startDate')
      setFocusReturn(null)
    }

    if (name === 'startDateReturn' || name === 'endDateReturn') {
      setFocusReturn('startDate')
      setFocus(null)
    }
    setToggalDatesModal(true)
  }

  const setSelctedDatesHandler = () => {
    if (depStartDateState && depEndDateState) {
      updateReducerState('mapData', 'startDateDep', depStartDateState)
      updateReducerState('mapData', 'endDateDep', depEndDateState)
      if (errors.departureDateError) {
        handlerSetError('departureDateError', false)
      }
    }

    if (retStartDateState && retEndDateState) {
      setReturnDatesNullHandler(retStartDateState, retEndDateState)
      if (errors.returnDateError) {
        handlerSetError('returnDateError', false)
      }
    } else if (!retStartDateState && !retEndDateState && startDateReturn && endDateReturn) {
      setReturnDatesNullHandler(null, null)
    }
  }

  const setReturnDatesNullHandler = (start, end) => {
    updateReducerState('mapData', 'startDateReturn', start)
    updateReducerState('mapData', 'endDateReturn', end)
  }

  const searchHandler = () => {
   if (flyToSearch === 'travelFrom' && !sourceLocation.value) {
      handlerSetError('sourceError', true)
      return
    }else if (flyToSearch === 'travelTo' && !destinationLocation.value) {
      handlerSetError('destinationError', true)
      return
    }
     else if (!startDateDep && !endDateDep) {
      handlerSetError('departureDateError', true)
      return
    }
    else if (!startDateReturn && !endDateReturn && journeyType === 'return') {
      handlerSetError('returnDateError', true)
      return
    }

    let data = {
      tier: airlineMembership ? airlineMembership : Texts.DEFAULT_AIRLINE_TIER,
      airline: selectedAirline ? selectedAirline : `${Texts.DEFAULT_AIRLINE_TIER}_${Texts.DEFAULT_AIRLINE_TIER_CODE}`,
      airlineCode: selectedAirlineCode ? selectedAirlineCode : Texts.DEFAULT_AIRLINE_TIER_CODE,
      jType: 'one_way',
      passenger: numberOfPassengers,
      ouStartDate: moment(startDateDep).format('YYYY-MM-DD'),
      ouEndDate: moment(endDateDep).format('YYYY-MM-DD'),
      dId: flyToSearch === 'travelFrom' ? sourceLocation?.value : destinationLocation?.value,
      dPlace: flyToSearch === 'travelFrom' ? sourceLocation.name: destinationLocation.name,
      eclass: toggalClasses?.economy,
      pclass: toggalClasses?.premium,
      fclass: toggalClasses?.first,
      bclass: toggalClasses?.business,
      desId: destinationLocation?.value,
      desPlace: destinationLocation.name
    }

    if (startDateReturn && endDateReturn && journeyType === 'return') {
      data = {
        ...data,
        inStartDate: moment(startDateReturn).format('YYYY-MM-DD'),
        inEndDate: moment(endDateReturn).format('YYYY-MM-DD'),
        jType: 'return'
      }
    }
    if (!retrieveFromLocalStorage('token') || isUserBronzeMember) {
      updateReducerState('searchPanel', 'toggalMapEliteLoginPopUp', true)
      updateReducerState('mapData', 'toggleSideBar', !toggleSideBar)
      setInLocalStorage('callbackUrl', `${AppRoutes.LOCATION}${jsonToQueryString(data)}`)
      return
    }

    history.push(`${AppRoutes.LOCATION}${jsonToQueryString(data)}${appendParams ? appendParams.replace('?', '&'): ''}`)
    setSearchLocation('')
    setOnRunTimeUpdate(false)
    if (searchQuery !== jsonToQueryString(data) || mapLocationsError) {
      updateReducerState('mapData', 'getLocationLoading', true)
    }else{
      if(!mapLocationsError) {
        updateReducerState('mapData', 'toggleTab', true)
      }
    }
  }


  const handleToggleFlySearch = (value) => {
    updateReducerState('mapData', 'flyToSearch', value)
    if(value ==='dontKnow') {
      updateReducerState('mapData', 'destinationLocation', {
        name: '',
        value: ''
      })
      const selectedClasses = handleSetTrueToCabinClass(selectedAirlineCode)
      updateReducerState('searchPanel', 'toggalClasses', selectedClasses)
    }
  }

  const clearDatesHandler = ({ startDateId }) => {
    if(startDateId === 'startDateDep') {
      updateReducerState('mapData', 'startDateDep', null)
      updateReducerState('mapData', 'endDateDep', null)
    }
      updateReducerState('mapData', 'startDateReturn', null)
      updateReducerState('mapData', 'endDateReturn', null)
  }

  return (
    <div className="search-tab">
      <div className="search-tab-inner">
        <div className="search-tab-selector">
          <JourneyTypeSelector
            journeyType={journeyType}
            updateReducerState={updateReducerState}
          />
          <AirlineClasses
              updateReducerState={updateReducerState}
              toggalClasses={toggalClasses}
              flightsAvailability={flightsAvailability}
              path={pathName}
              searchPanel={searchPanel}
              location={location}
          />
          <TravellerCount
            numberOfPassengers={numberOfPassengers}
            updateNumberOfPassanger={updateNumberOfPassanger}
          />

        </div>
        {journeyType !== 'return' &&
        <FlyToSearchSelector
          selectedValue = {flyToSearch}
          handleChange = {(e, { value })=> {
            handleToggleFlySearch(value)
          }}
        />
        }
        {flyToSearch === 'travelFrom' &&
        <div className="location-input-wrap">
          <SourceAutocomplete
            searchPanel={searchPanel}
            setSelectedLocation={updateReducerState}
            className={errors.sourceError ? 'select-location error-field mapPageLocationDropdown' : 'select-location mapPageLocationDropdown'}
            placeholder="Select Source"
            handlerSetError={handlerSetError}
            sourceLocation={sourceLocation}
            locationLabel={'mapview'}
            destinationLocation={destinationLocation}
            mapData={props.mapData}
            updateReducerState={updateReducerState}
            flyToSearch={flyToSearch}
            journeyType={journeyType}
          />
        </div>
         }
        {flyToSearch === 'travelTo' &&
        <div className="location-input-wrap">
          <DestinationAutocomplete
            searchPanel={searchPanel}
            setSelectedLocation={updateReducerState}
            className={
                errors.destinationError
                  ? 'select-location mapPageLocationDropdown error-field'
                  : 'select-location  mapPageLocationDropdown'
              }
            placeholder="Select Destination"
            handlerSetError={handlerSetError}
            location={location}
            sourceLocation={sourceLocation}
            locationLabel={'mapview'}
            destinationLocation={destinationLocation}
            flyToSearch={flyToSearch}
            journeyType={journeyType}
          />
        </div>
        }
        <div className={`depart-date-select date-select ${errors.departureDateError && 'error-field'}`}>
          <DateRangePicker
            startDate={startDateDep}
            startDateId="startDateDep"
            endDate={endDateDep}
            endDateId="endDateDep"
            onFocusChange={() => setFocusAndToggalModal('startDateDep')}
            displayFormat="DD/MM/YYYY"
            readOnly
            showClearDates
            locationLabel={'mapview'}
            onDatesChange={() => clearDatesHandler({ startDateId: 'startDateDep' })}
          />
        </div>
        {Boolean(journeyType === 'return') &&
        <div className={`arrival-date-select date-select ${errors.returnDateError && 'error-field'}`}>
          <DateRangePicker
            startDate={startDateReturn}
            startDateId="startDateReturn"
            endDate={endDateReturn}
            endDateId="endDateReturn"
            onFocusChange={() => setFocusAndToggalModal('startDateReturn')}
            displayFormat="DD/MM/YYYY"
            disabled={!Boolean(startDateDep && endDateDep) || Boolean(journeyType === 'one-way')}
            readOnly
            showClearDates
            onDatesChange={() => clearDatesHandler({ startDateId: 'startDateReturn' })}
          />
        </div>
          }

        <SelectDateRange
          depDates={depDates}
          retDates={retDates}
          toggalDatesModal={toggalDatesModal}
          focused={focused}
          focusedReturn={focusedReturn}
          setDepFocus={(data) => setFocus(data)}
          setReturnFocus={(data => setFocusReturn(data))}
          setdepDates={(data) => setDepDates({ ...depDates, ...data })}
          setReturnDates={(data) => setRetDates({ ...retDates, ...data })}
          setReturnDatesNullHandler={() => setReturnDatesNullHandler(null, null)}
          setToggalDatesModalHandler={(data) => setToggalDatesModal(data)}
          jType={journeyType}
          setSelctedDatesHandler={setSelctedDatesHandler}
          departureStartDate={startDateDep}
          departureEndDate={endDateDep}
          returnStartDate={startDateReturn}
          returnEndDate={endDateReturn}
          updateReducerState={updateReducerState}
        />
        <Button type="submit" className="map-search" onClick={searchHandler}>{intl(commonMessages.search)}</Button>
      </div>
    </div>
  )
}

MapSearch.propTypes = {
  searchPanel: PropTypes.object,
  updateReducerState: PropTypes.func,
  updateTicketsSearchBox: PropTypes.func,
  flightsAvailability: PropTypes.object,
  pathName: PropTypes.string,
  mapData: PropTypes.object,
  isUserBronzeMember: PropTypes.bool,
  toggleSideBar: PropTypes.bool,
  searchQuery: PropTypes.string,
  location: PropTypes.object,
  mapLocationsError: PropTypes.string,
  setOnRunTimeUpdate: PropTypes.bool
}

export default MapSearch
