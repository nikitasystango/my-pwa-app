import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Sidebar } from 'semantic-ui-react'
import 'semantic-ui-css/components/segment.min.css'
import 'semantic-ui-css/components/sidebar.min.css'
import Destinations from './destinations'
import MapSearch from './mapSearch'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'

const SidebarSearch = (props) => {
  const { toggleSideBar, searchPanel, updateTicketsSearchBox, updateReducerState, flightsAvailability, pathName,
    mapData, isUserBronzeMember, getMapLocations, mapLocations,
    souDesAirports, airportsWithMultiCity, searchQuery, setSearchLocation, location, mapLocationsError, setOnRunTimeUpdate } = props
  const { toggleTab } = mapData || ''

  const setTabHandler = () => {
    if (mapLocations) {
      updateReducerState('mapData', 'toggleTab', true)
    }
  }

  return (
    <div className="formSidebar">
      <div />
      <Sidebar
        as={Segment}
        animation={'overlay'}
        direction={'left'}
        icon="labeled"
        inverted
        vertical
        visible={toggleSideBar}
        width="wide"
        className="formSidebar__inner map-sidebar"
      >
        <>
          <div className="ui attached tabular menu">
            {/* eslint-disable-next-line */}
            <a className={`${!toggleTab ? 'active' : ''} item`} onClick={() => updateReducerState('mapData', 'toggleTab', false)}>{intl(commonMessages.search)}</a>
            {/* eslint-disable-next-line */}
            <a className={`${toggleTab ? 'active' : ''} item ${!mapLocations ? 'disabled d-n' : ''}`} onClick={setTabHandler} >{intl(commonMessages.destinations)}</a>
          </div>
          {!toggleTab ?
            <MapSearch
              searchPanel={searchPanel}
              updateTicketsSearchBox={updateTicketsSearchBox}
              updateReducerState={updateReducerState}
              flightsAvailability={flightsAvailability}
              pathName={pathName}
              mapData={mapData}
              isUserBronzeMember={isUserBronzeMember}
              getMapLocations={getMapLocations}
              searchQuery={searchQuery}
              setSearchLocation={setSearchLocation}
              location={location}
              mapLocationsError={mapLocationsError}
              setOnRunTimeUpdate={setOnRunTimeUpdate}
            />
            :
            <Destinations
              mapLocations={mapLocations}
              souDesAirports={souDesAirports}
              airportsWithMultiCity={airportsWithMultiCity}
              searchQuery={searchQuery}
              setSearchLocation={setSearchLocation}
            />}
        </>
      </Sidebar>
    </div>
  )

}

SidebarSearch.propTypes = {
  toggleSideBar: PropTypes.bool,
  searchPanel: PropTypes.object,
  updateTicketsSearchBox: PropTypes.func,
  airportsWithMultiCity: PropTypes.array,
  souDesAirports: PropTypes.array,
  searchQuery: PropTypes.string,
  updateReducerState: PropTypes.func,
  flightsAvailability: PropTypes.object,
  pathName: PropTypes.string,
  mapData: PropTypes.object,
  isUserBronzeMember: PropTypes.bool,
  getMapLocations: PropTypes.func,
  mapLocations: PropTypes.array,
  setSearchLocation: PropTypes.func,
  location: PropTypes.object,
  mapLocationsError: PropTypes.string,
  setOnRunTimeUpdate: PropTypes.bool
}

export default SidebarSearch
