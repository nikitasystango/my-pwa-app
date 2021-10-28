import React, { useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import LocationMap from './locationMap'
import Layout from 'containers/Layout'
import PropTypes from 'prop-types'
import Loader from 'components/LoadingSpinner'
import SeoHelmet from 'utils/seoHelmet'
import SeoTexts from 'constants/seoConstants'
import moment from 'moment'
import { retrieveFromLocalStorage, extractURLParams, checkAnyTrueObjectValue } from 'utils/helpers'
import SidebarSearch from './sideBarSearch'
import { ShowBtnArrow } from '../../utils/svgs'
import LoginMagPopup from 'components/SearchPanel/loginMsgPopup'
import history from 'utils/history'
import { GoogleAdsParam } from 'constants/globalConstants'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import flightMessages from 'constants/messages/flightMessages'
import mapViewMessages from 'constants/messages/mapViewMessages'
import '../../common/DateRangePicker/dateRangePicker.scss'
import '../SearchPanel/index.scss'
import './style.scss'
import { removeFromLocalStorage } from 'utils/helpers'
import { ifObjectValueFalse, setObjectValueTrue } from 'utils/commonFunction'


const MapView = (props) => {
  const { updateReducerState, location: { pathname, search }, getMapLocations, searchPanel,
    updateTicketsSearchBox, flightsAvailability, getAirlineList, mapData, isUserBronzeMember, updateToggalClassesState, getSouDesPossibleRoutes,
    getSouDesLocations
  } = props
  const { airlines, toggalMapEliteLoginPopUp, toggalClasses, airportsWithMultiCity, souDesAirports,
    ticketsSearchBox: { numberOfPassengers }, selectedAirlineCode } = searchPanel
  const { toggleSideBar, mapLocations, getLocationLoading, availablePopupCabinClass, mapLocationsError } = mapData || ''

  const [searchLocation, setSearchLocation] = React.useState('')
  const [mapLocationsData, setMapLocationsData] = React.useState(null)
  // onRunTimeUpdate state is use to restrict API calling when change cabin class
  const [onRunTimeUpdate, setOnRunTimeUpdate] = React.useState(false)

  const { available_destinations, source } = mapLocationsData || ''


  useEffect(() => {
    if(mapLocations && mapLocations.available_destinations) {
      updateReducerState('mapData', 'getLocationLoading', false)
    }
      setMapLocationsData(mapLocations)
      handleInitialToggle()
      // eslint-disable-next-line
  }, [mapLocations])

  useEffect(()=> {
    if(available_destinations) {
      updateLocation()
    }
    // eslint-disable-next-line
  }, [toggalClasses])

  useEffect(()=> {
    getSouDesPossibleRoutes({ selectedAirline: selectedAirlineCode })
    getSouDesLocations({ selectedAirline: selectedAirlineCode })
    // eslint-disable-next-line
  }, [selectedAirlineCode])

const updateLocation = () => {
  setMapLocationsData({
    ...mapLocationsData,
    available_destinations: handleLocationFilter(available_destinations)
  })
}

// It filters destination list and update list with selected cabin class.
  const handleLocationFilter = () => {
    const mainObj = mapLocations && mapLocations.available_destinations && mapLocations.available_destinations.length ? mapLocations.available_destinations : []
    const data = []
    mainObj.map((list)=> {
      let finalClasses = { ...list.available_classes }
      Object.keys(list.available_classes).map((item) => {
        if (list.available_classes[item] && toggalClasses[item]) {
          finalClasses = { ...finalClasses, [item]: toggalClasses[item] }
        }else if(list.available_classes[item] && !toggalClasses[item]) {
          finalClasses = { ...finalClasses, [item]: toggalClasses[item] }
        }
        return finalClasses
      })
     return !checkAnyTrueObjectValue(finalClasses) ? false : data.push({ ...list, available_classes: finalClasses })
    })
    return data
  }

  useEffect(() => {
    removeFromLocalStorage('callbackUrl')
    const token = retrieveFromLocalStorage('token')
    if (!airlines.length) {
      getAirlineList({ isSetDefault: !Boolean(search), selectedAirline: 'BA' })
    }

    if (search && token && !onRunTimeUpdate) {
      const extractedParams = extractURLParams(search)
      if (extractedParams.tier && extractedParams.jType
        && extractedParams.passenger && extractedParams.ouStartDate && extractedParams.ouEndDate
        && extractedParams.dId && extractedParams.dPlace && extractedParams.airline && extractedParams.airlineCode &&
        extractedParams.eclass && extractedParams.pclass && extractedParams.fclass && extractedParams.bclass) {
        const { tier, jType, dPlace, dId, passenger, airlineCode, ouStartDate, ouEndDate, airline, inStartDate, inEndDate, desId, desPlace, eclass, pclass, fclass, bclass } = extractedParams || ''
        let data = {
          tier,
          travel_class: 'economy',
          trip_type: 'one_way',
          number_of_passengers: passenger,
          source_code: dId,
          outbound_start_date: ouStartDate,
          outbound_end_date: ouEndDate,
          airlineCode: airlineCode
        }
        if (inStartDate && inEndDate && jType === 'return') {
          data = {
            ...data,
            inbound_start_date: inStartDate,
            inbound_end_date: inEndDate,
            trip_type: 'return'
          }
        }
         getMapLocations(data)
        const dataJson = {
          selectedAirline: airline,
          airlineMembership: tier,
          selectedAirlineCode: airlineCode,
          membership: tier,
          ticketsSearchBox: {
            numberOfPassengers: Number(passenger),
            ticketClass: { label: 'Economy', value: 'economy' }
          },
          toggalClasses: {
            economy: eclass.toString() === 'true' ? true : false,
            premium: pclass.toString() === 'true' ? true : false,
            first: fclass.toString() === 'true'? true : false,
            business: bclass.toString() === 'true'? true : false
          }
        }
        Object.keys(dataJson).map(item => updateReducerState('searchPanel', item, dataJson[item]))
        const mapSearchJson = {
          startDateDep: moment(ouStartDate),
          endDateDep: moment(ouEndDate),
          startDateReturn: inStartDate ? moment(inStartDate) : null,
          endDateReturn: inEndDate ? moment(inEndDate) : null,
          mapPageUrl: `${pathname}${search}`,
          sourceLocation: {
            name: dPlace,
            value: dId
          },
          destinationLocation: {
            name: desPlace,
            value: desId
          }
        }
        Object.keys(mapSearchJson).map(item => (
          updateReducerState('mapData', item, mapSearchJson[item])
        ))
      } else {
        const arrData = Object.keys(extractedParams)
        const isExist = GoogleAdsParam.includes(arrData[0])
          if(!isExist) {
            history.push(AppRoutes.PAGE_NOT_FOUND)
          }
      }
    }
    // eslint-disable-next-line
  }, [props.location.search])


// Filter toggle cabin class according to available destinations
  const handleInitialToggle = () => {
    if (
      mapLocations &&
      mapLocations.available_destinations &&
      mapLocations.available_destinations.length
    ) {
      let finalClasses = {}
      mapLocations.available_destinations.map((list) => {
        Object.keys(list.available_classes).map((item) => {
          if (list.available_classes[item] && toggalClasses[item]) {
            finalClasses = { ...finalClasses, [item]: toggalClasses[item] }
          }else if(list.available_classes[item] && !toggalClasses[item]) {
            finalClasses = { ...finalClasses, [item]: toggalClasses[item] }
          }
          return finalClasses
        })
        return true
      })
      const data = ifObjectValueFalse(finalClasses) ? setObjectValueTrue(finalClasses) : finalClasses
      updateReducerState('searchPanel', 'toggalClasses', data)
    }
  }

  return (
    <Layout className="mapBoxContainer mapViewUi">
      <SeoHelmet
        title={SeoTexts.MAP_TITLE}
      />
      {!toggleSideBar ?
        <Button className="show-map-tab-btn" onClick={() => updateReducerState('mapData', 'toggleSideBar', !toggleSideBar)}>
          <ShowBtnArrow />
          {intl(commonMessages.showText)}
        </Button>
        :
        <Button className="show-map-tab-btn hide" onClick={() => updateReducerState('mapData', 'toggleSideBar', !toggleSideBar)}>
          <ShowBtnArrow />
          {intl(commonMessages.hideText)}
        </Button>
      }
      {getLocationLoading && <Loader />}
      {!search || (!getLocationLoading && available_destinations?.length) ?
        <LocationMap
          mapLocations={available_destinations}
          source={source}
          getLocationLoading={getLocationLoading}
          updateReducerState={updateReducerState}
          toggalClasses={toggalClasses}
          numberOfPassengers={numberOfPassengers}
          updateToggalClassesState={updateToggalClassesState}
          souDesAirports={souDesAirports}
          airportsWithMultiCity={airportsWithMultiCity}
          searchLocation={searchLocation}
          handleInitialToggle={handleInitialToggle}
          availablePopupCabinClass={availablePopupCabinClass}
          setOnRunTimeUpdate={setOnRunTimeUpdate}
        /> :
        !getLocationLoading &&
        <div className="noData">
          {mapLocationsError ?
          mapLocationsError === 'Network Error' ?
            <>
              <span> {intl(mapViewMessages.errorTimeout)} </span>
              <span> {intl(mapViewMessages.shortenMessgae)} </span>
              <span> {intl(mapViewMessages.errorReportedToTeam)} </span>
            </>
          :
            <>
              <span> {intl(flightMessages.noFlightsFound)} </span>
              <span> {mapLocationsError} </span>
            </>
          : intl(flightMessages.noFlightsFound)}
        </div>
      }
      <SidebarSearch
        toggleSideBar={toggleSideBar}
        searchPanel={searchPanel}
        updateTicketsSearchBox={updateTicketsSearchBox}
        updateReducerState={updateReducerState}
        flightsAvailability={flightsAvailability}
        pathName={props.location.pathname}
        mapData={mapData}
        mapLocations={available_destinations}
        isUserBronzeMember={isUserBronzeMember}
        getMapLocations={getMapLocations}
        souDesAirports={souDesAirports}
        airportsWithMultiCity={airportsWithMultiCity}
        searchQuery={search}
        setSearchLocation={setSearchLocation}
        location={props.location}
        mapLocationsError={mapLocationsError}
        setOnRunTimeUpdate={setOnRunTimeUpdate}
      />

      <LoginMagPopup
        toggalMapEliteLoginPopUp={toggalMapEliteLoginPopUp}
        updateReducerState={updateReducerState}
      />

    </Layout>
  )
}

MapView.propTypes = {
  getMapLocations: PropTypes.func,
  location: PropTypes.object,
  updateReducerState: PropTypes.func,
  ticketsSearchBox: PropTypes.object,
  searchPanel: PropTypes.object,
  updateTicketsSearchBox: PropTypes.func,
  flightsAvailability: PropTypes.object,
  getAirlineList: PropTypes.func,
  isUserBronzeMember: PropTypes.bool,
  updateToggalClassesState: PropTypes.func,
  mapData: PropTypes.object,
  userActionAudit: PropTypes.func,
  getSouDesPossibleRoutes: PropTypes.func
}

export default MapView
