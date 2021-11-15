import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactSelect from './reactSelect'
import { sortSlectedRouteValue } from 'utils/helpers'
import intl from 'utils/intlMessage'
import searchPanelMessages from 'constants/messages/searchPanelMessages'
import { AppRoutes } from 'constants/appRoutes'
import { sourceCodeOptionVirginAtlantic, sourceCodeOption } from 'constants/globalConstants'
import { airlineName } from 'constants/globalConstants'

const DestinationAutocomplete = (props) => {
  const { searchPanel: { departure: { value: selectedDepartureValue }, arrival: { value: selectedArrivalName }, souDesAirports, airportsWithMultiCity, possibleRoutes, selectedAirlineCode },
    setSelectedLocation, handlerSetError, location, destinationLocation, isCalendarHover, updateReducerState } = props
    const [isOpen, setIsOpen] = useState(false)
  const handlerSetData = (data) => {
    const selectedLocation = {
      name: data.label,
      value: data.value
    }
    if (location?.pathname === AppRoutes.LOCATION) {
      setSelectedLocation('mapData', 'destinationLocation', selectedLocation)
    }else {
      setSelectedLocation('searchPanel', 'arrival', selectedLocation)
    }
    handlerSetError('destinationError', false)
  }

  const handlerGetGroupOptions = () => {
    if (location?.pathname === AppRoutes.LOCATION) {
      return selectedAirlineCode === airlineName.VA.CODE ? sourceCodeOptionVirginAtlantic : sourceCodeOption
    } else {
      return sortSlectedRouteValue(possibleRoutes, selectedDepartureValue, souDesAirports, airportsWithMultiCity)
    }
  }

  const handleResetSource = () => {
    const selectedLocation = {
      name: '',
      value: ''
    }
    if (location?.pathname === AppRoutes.LOCATION) {
      setSelectedLocation('mapData', 'destinationLocation', selectedLocation)
    }else {
      setSelectedLocation('searchPanel', 'arrival', selectedLocation)
    }
  }
const closeCondition = location?.pathname === AppRoutes.LOCATION ? destinationLocation?.value ? 'flex' : 'none' : !selectedArrivalName ? 'none' : 'flex'

  return (
    <>
      <ReactSelect
        {...props}
        searchPanel={props.searchPanel}
        handlerSetData={handlerSetData}
        selectedValue={location?.pathname === AppRoutes.LOCATION ? destinationLocation : props.searchPanel.arrival}
        className={props.className ? props.className : ''}
        placeholder={intl(searchPanelMessages.arrivalCityAirport)}
        groupedOptions={handlerGetGroupOptions()}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        isCalendarHover={isCalendarHover}
        updateReducerState={updateReducerState}
      />
      <span onClick={handleResetSource} className="search-panel-close-icon crossBtn" style={{ display: closeCondition }}>&times;</span>
    </>
  )
}

DestinationAutocomplete.propTypes = {
  searchPanel: PropTypes.object,
  setSelectedLocation: PropTypes.func,
  className: PropTypes.string,
  handlerSetError: PropTypes.func,
  location: PropTypes.object,
  destinationLocation: PropTypes.object,
  isCalendarHover: PropTypes.bool
}

export default React.memo(DestinationAutocomplete)

