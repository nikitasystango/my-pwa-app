import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import ReactSelect from './reactSelect'
import { pushNotification } from 'utils/notifications'
import { sortSlectedRouteValue } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import searchPanelMessages from 'constants/messages/searchPanelMessages'
import toustifyMessages from 'constants/messages/toustifyMessages'
import { sourceCodeOptionVirginAtlantic, sourceCodeOption } from 'constants/globalConstants'

const SourceAutocomplete = (props) => {
  const { searchPanel: { souDesAirports, airportsWithMultiCity, possibleRoutes, selectedAirlineCode,
    departure: { value: selectedDepartureName },
    arrival: { value: selectArrivalCode, name: selectArrivalName }, nearestAirports },
    setSelectedLocation, handlerSetError, location, sourceLocation, updateReducerState, isCalendarHover } = props
    const [isOpen, setIsOpen] = useState(false)

  const handlerGetGroupOptions = () => {
    if (location?.pathname === AppRoutes.LOCATION) {
      return selectedAirlineCode === 'VA' ? sourceCodeOptionVirginAtlantic : sourceCodeOption
    } else {
      return sortSlectedRouteValue(possibleRoutes, selectArrivalCode, souDesAirports, airportsWithMultiCity, nearestAirports)
    }
  }


  const handlerSetData = (data) => {
    const selectedLocation = {
      name: data.label,
      value: data.value
    }

    if (location?.pathname === AppRoutes.LOCATION) {
      setSelectedLocation('mapData', 'sourceLocation', selectedLocation)
      handlerSetError('sourceError', false)
    } else {
      if (selectArrivalCode === data.value && selectArrivalName === data.label) {
        pushNotification(intl(toustifyMessages.locationCantBeSame), 'error', 'TOP_CENTER', 4000)
      } else {
        setSelectedLocation('searchPanel', 'departure', selectedLocation)
        handlerSetError('sourceError', false)
      }
    }
  }

  const handleResetSource = () => {
    const selectedLocation = {
      name: '',
      value: ''
    }
    if (location?.pathname === AppRoutes.LOCATION) {
      setSelectedLocation('mapData', 'sourceLocation', selectedLocation)
    }else {
      setSelectedLocation('searchPanel', 'departure', selectedLocation)
    }
  }
  const closeCondition = location?.pathname === AppRoutes.LOCATION ? sourceLocation?.value ? 'flex' : 'none' : !selectedDepartureName ? 'none' : 'flex'

  return (
    <>
      <ReactSelect
        {...props}
        searchPanel={props.searchPanel}
        handlerSetData={handlerSetData}
        selectedValue={location?.pathname === AppRoutes.LOCATION ? sourceLocation : props.searchPanel.departure}
        className={props.className ? props.className : ''}
        placeholder={intl(searchPanelMessages.departureCityAirport)}
        groupedOptions={handlerGetGroupOptions()}
        locationLabel={props.locationLabel}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        isCalendarHover={isCalendarHover}
        updateReducerState={updateReducerState}
      />
      <span onClick={handleResetSource} className="search-panel-close-icon crossBtn" style={{ display: closeCondition }}>&times;</span>
    </>
  )
}

SourceAutocomplete.propTypes = {
  searchPanel: PropTypes.object,
  setSelectedLocation: PropTypes.func,
  className: PropTypes.string,
  handlerSetError: PropTypes.func,
  location: PropTypes.object,
  destinationLocation: PropTypes.object,
  sourceLocation: PropTypes.object,
  locationLabel: PropTypes.string,
  mapData: PropTypes.object,
  updateReducerState: PropTypes.func,
  isCalendarHover: PropTypes.bool
}

export default withRouter(SourceAutocomplete)
