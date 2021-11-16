import React, { useEffect, useState } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import PropTypes from 'prop-types'
import env from 'utils/env_variables'
import {
  extractURLParams,
  formatPrice,
  openCalendarPageHandler,
  jsonToQueryString
} from 'utils/helpers'
import { withRouter } from 'react-router-dom'
import './style.scss'
import { Icon, divIcon } from 'leaflet'
import ColorCircleBox from 'components/FlightAvailability/colorCircle'
import destinationImage from './map_pin.svg'
import sourceImage from './map_pin_source.svg'
import { Button, Popup as Tooltip } from 'semantic-ui-react'
import { CheckCircle, ColorCircle, OffColorCircleUpdated } from '../../utils/svgs'
import { britishAirwaysClasses } from 'constants/globalConstants'
import { renderToStaticMarkup } from 'react-dom/server'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import mapViewMessages from 'constants/messages/mapViewMessages'
import 'leaflet/dist/leaflet.css'
import '../FlightAvailability/flight-availability.scss'
import moment from 'moment'
import history from 'utils/history'
import { AppRoutes } from 'constants/appRoutes'
import { defaultBACabinClass } from 'constants/globalConstants'

const LocationMap = (props) => {
  const {
    mapLocations,
    source,
    toggalClasses,
    numberOfPassengers,
    updateToggalClassesState,
    airportsWithMultiCity,
    souDesAirports,
    updateReducerState,
    searchLocation,
    availablePopupCabinClass,
    setOnRunTimeUpdate
  } = props
  const position = [51.148056, -0.190278]
  const zoom = 2
  const [locationDetail, setLocationDetail] = useState(null)
  const [ponitDetails, setPointDetails] = useState(null)
  const [popupPosition, setPopupPosition] = useState(null)
  const extractedParams = props.location && props.location.search ? extractURLParams(props.location.search) : {}
  const mapRef = React.useRef()
  const skaterSource = new Icon({
    iconUrl: sourceImage,
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
  })
  let selectedClass = {}
  for (const key in toggalClasses)
    if (toggalClasses[key]) {
      selectedClass = {
        ...selectedClass,
        [key]: true
      }
    }

  const setPointsHandler = (points, date, name) => {
    const details = {
      ...points,
      date: date,
      name
    }
    setPointDetails(details)
  }

  const getColorCircles = (locationDetail, availability, seatCount, name) => {
    const availableDates = Object.keys(availability)
    const dates = availableDates.slice(0, 7)
    let popupClass = {}
    for (const key in availablePopupCabinClass)
      if (availablePopupCabinClass[key]) {
        popupClass = {
          ...popupClass,
          [key]: true
        }
      }
    return (
      <>
        {dates.map((date) => (
          <div
            key={`index_${date}`}
            className="DayPicker-Day"
            onMouseEnter={() =>
              setPointsHandler(availability[date], date, name)
            }
            onMouseLeave={() => setPointDetails(null)}
          >
            <Tooltip
              className="tooltip-popup"
              position={'bottom center'}
              content={moment(date).format('MMMM')}
              trigger={
                <div className="react-datepicker__day-date react-datepicker__day-date--available react-datepicker__tooltip-wrap">
                  <div
                  className={`date-svg ${
                    date === ponitDetails?.date && name === ponitDetails?.name
                      ? 'active'
                      : ''
                  }`}
                  >
                    <ColorCircleBox
                    value={availability[date]}
                    peak={availability[date]?.peak}
                    date={date}
                    selectedClass={popupClass}
                    passangerCount={numberOfPassengers}
                    highlightOffPeak
                    />
                  </div>
                </div>
                 }
            />
          </div>
        ))}
        {seatCount > 0 && (
          <span
            className="more-days text-medium-blue cursor-pointer"
            onClick={() => openCalendarHandler(locationDetail)}
          >
            <>
              {`+${seatCount}`}
              <span>{intl(mapViewMessages.moreDays)}</span >
            </>
          </span>
        )}
      </>
    )
  }

  const openCalendarHandler = (locationDetail) => {
    openCalendarPageHandler(
      locationDetail,
      extractedParams,
      airportsWithMultiCity,
      souDesAirports,
      availablePopupCabinClass
    )
  }

  const handleClassChange = (name) => {
    const filterClass = locationDetail ? availablePopupCabinClass : toggalClasses
    const checkedClassLength = Object.values(filterClass).filter(classStr => classStr).length - 1
    if(checkedClassLength >= 1 || !filterClass[name]) {
      updateQueryParamsData(name, filterClass)
      setOnRunTimeUpdate(true)
      updateToggalClassesState(name, !filterClass[name])
      if(locationDetail) {
        const data = {
          ...availablePopupCabinClass,
          [name]: !filterClass[name]
        }
        updateReducerState('mapData', 'availablePopupCabinClass', data)
      }
    }
  }

  // Update cabin class values on query params so that we get the same filter when refresh page
  const updateQueryParamsData = (name, filterClass) => {
    const classValue = {
      ...toggalClasses,
      [name] : !filterClass[name]
    }
    const data = {
      ...extractedParams,
      eclass: classValue?.economy,
      pclass: classValue?.premium,
      fclass: classValue?.first,
      bclass: classValue?.business
    }
    history.push(`${AppRoutes.LOCATION}${jsonToQueryString(data)}`)
  }

  const setLocationHandler = (e, location) => {
    e && handleWindowPopup(e)
    const cabinValue = { ...toggalClasses }
    Object.keys(location?.available_classes).map(item => {
      if (location?.available_classes[item]) {
        cabinValue[item] = location?.available_classes[item]
      }else{
        cabinValue[item] = undefined
      }
      return cabinValue
    })
    updateReducerState(
      'mapData',
      'availablePopupCabinClass',
      cabinValue
    )
     setLocationDetail(location)
    //  handleInitialToggle()
  }

  const handleWindowPopup = (e) => {
    const windowSize = (window.innerHeight/2) + 120
    const originalSize = e.originalEvent.clientY
      if(windowSize > originalSize) {
      setPopupPosition('bottom')
      }else{
      setPopupPosition('top')
      }
  }

  useEffect(() => {
    handleZoomOnSearch()
    // eslint-disable-next-line
  }, [searchLocation])

  const handleZoomOnSearch = () => {
    const { current } = mapRef ? mapRef : {}
    if (current && mapLocations && mapLocations.length) {
      const { latitude = position[0], longitude = position[1] } = searchLocation
        ? searchLocation
        : {}
      const latLng = { lat: latitude, lng: longitude }
      const zoomValue = searchLocation !== '' ? 13 : zoom
      const { leafletElement: map } = current
      if(searchLocation) {
        map.flyTo(latLng, zoomValue, { duration: 1 })
        setLocationHandler(null, searchLocation)
      }else{
        map.setView(latLng, zoomValue)
        setLocationDetail(null)
      }
    }
  }

  const colorDefination = (selectedkeys) => {
    let colorData = null
    switch (selectedkeys.length) {
      case 4:
        colorData = (
          <div
            className="date-svg__icon date-svg__icon--s4"
            style={{
              '--c1': `${selectedkeys[0] ? `var(--${selectedkeys[0]})` : ''}`,
              '--c2': `${selectedkeys[1] ? `var(--${selectedkeys[1]})` : ''}`,
              '--c3': `${selectedkeys[2] ? `var(--${selectedkeys[2]})` : ''}`,
              '--c4': `${selectedkeys[3] ? `var(--${selectedkeys[3]})` : ''}`,
              '--ci-opacity': 1
            }}
          >
            <img src={destinationImage} alt="" width="20px" height="20px" />
          </div>
        )
        break
      case 3:
        colorData = (
          <div
            className="date-svg__icon date-svg__icon--s3"
            style={{
              '--c1': `${selectedkeys[0] ? `var(--${selectedkeys[0]})` : ''}`,
              '--c2': `${selectedkeys[1] ? `var(--${selectedkeys[1]})` : ''}`,
              '--c3': `${selectedkeys[2] ? `var(--${selectedkeys[2]})` : ''}`,
              '--ci-opacity': 1
            }}
          >
            <img src={destinationImage} alt="" width="20px" height="20px" />
          </div>
        )
        break
      case 2:
        colorData = (
          <div
            className="date-svg__icon date-svg__icon--s2"
            style={{
              '--c1': `${selectedkeys[0] ? `var(--${selectedkeys[0]})` : ''}`,
              '--c2': `${selectedkeys[1] ? `var(--${selectedkeys[1]})` : ''}`,
              '--ci-opacity': 1
            }}
          >
            <img src={destinationImage} alt="" width="20px" height="20px" />
          </div>
        )
        break
      case 1:
        colorData = (
          <div
            className="date-svg__icon date-svg__icon--s1"
            style={{
              '--c1': `${selectedkeys[0] ? `var(--${selectedkeys[0]})` : ''}`,
              '--ci-opacity': 1
            }}
          >
            <img src={destinationImage} alt="" width="20px" height="20px" />
          </div>
        )
        break
      default:
        colorData = (
          <div
            className="date-svg__icon date-svg__icon--s0"
            style={{
              '--ci-opacity': 1
            }}
          >
            <img src={destinationImage} alt="" width="20px" height="20px" />
          </div>
        )
    }
    return colorData
  }

  const filterClass = locationDetail ? availablePopupCabinClass : toggalClasses

  return (
    <>
      <div className="map-view-btns">
        {ponitDetails && (
          <div className="ticket-types ticket-name">
            <div className="ticket-col">
              <ul>
                <li>
                  <span className="pop__item-icon">
                    <OffColorCircleUpdated />
                  </span>
                  {intl(commonMessages.offPeakFare)}
                </li>
                <li>
                  <span className="pop__item-icon">
                    <ColorCircle />
                  </span>
                  {intl(commonMessages.peakFare)}
                </li>
              </ul>
            </div>
          </div>
         )}
        {mapLocations && mapLocations.length &&
        <div className="ticket-types">
          {/* {locationDetail && ( */}
          <div className="ticket-name ticket-rows">
            {britishAirwaysClasses.map((item, index) => (
              filterClass[item.cabinClass] === undefined ? null :
              <div
                className={`ticket-col ${locationDetail ? 'has-data' : ''} ${filterClass[item.cabinClass] ? '':'no-date'}`}
                key={`${item.name}_${index + 1}`}
              >
                <Button
                  onClick={() => handleClassChange(item.cabinClass)}
                  className={`buttons_element__button buttons_element__button--${
                    item.cabinClass
                  } ${filterClass[item.cabinClass] ? 'active' : ''}`}
                >
                  <CheckCircle
                    color={item.color}
                    checked={Boolean(filterClass[item.cabinClass])}
                  />
                  <span>{item.title}</span>
                </Button>
                {ponitDetails && (
                  filterClass[item.cabinClass] !== undefined &&
                  <div className="ticket-col">
                    {filterClass[item.cabinClass] &&
                    <ul>
                      <li>
                        {!ponitDetails?.peak && ponitDetails[item.cabinClass] && ponitDetails[item.cabinClass]?.points
                      ? formatPrice(ponitDetails[item.cabinClass].points)
                      : '-'}
                      </li>

                      <li>
                        {ponitDetails?.peak && ponitDetails[item.cabinClass] && ponitDetails[item.cabinClass]?.points
                      ? formatPrice(ponitDetails[item.cabinClass].points)
                      : '-'}
                      </li>
                    </ul>
                }
                  </div>
                  )}
              </div>
            ))}
          </div>
        </div>
         }

      </div>
      <Map
        ref={mapRef}
        id="mapRef"
        center={position}
        zoom={zoom}
        minZoom={2}
        maxZoom={14}
        maxBounds={[
          [-89.98155760646617, -180],
          [89.99346179538875, 180]
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={
            mapLocations && mapLocations.length
              ? `https://api.mapbox.com/styles/v1/rffadmin/ckk5jibcx183717msfv2uy5vc/tiles/{z}/{x}/{y}?access_token=${env.MAP_BOX_GL_TOKEN}`
              : `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${env.REACT_APP_MAPTILER_ACCESS_TOKEN}`
          }
        />
        {source && (
          <Marker
            key={'source_12'}
            position={[source.latitude, source.longitude]}
            icon={skaterSource}
          />
        )}
        {mapLocations &&
          mapLocations.map((location, index) => {
            const keys = Object.keys(location.available_classes)
            const filtered = keys.filter(function (key) {
              return location.available_classes[key]
            })
            const iconMarkup = renderToStaticMarkup(colorDefination(filtered))
            const skaterDestination = new divIcon({
              iconSize: [25, 41],
              iconAnchor: [10, 41],
              popupAnchor: [2, -40],
              html: iconMarkup
            })
            return (
              <>
                <Marker
                  key={index}
                  position={[location.latitude, location.longitude]}
                  onClick={(e) => setLocationHandler(e, location)}
                  icon={skaterDestination}
                  marker_index={index}
                />
              </>
            )
          })}
        {locationDetail && (
          <Popup
            position={[locationDetail.latitude, locationDetail.longitude]}
            onClose={() => {
              setLocationDetail(null)
              setPopupPosition('bottom')
              updateReducerState(
                'mapData',
                'availablePopupCabinClass',
                 defaultBACabinClass
              )
            }}
            className={popupPosition === 'bottom' ? 'popup-bottom' : 'popup-top'}
          >
            <div className="map-search-result">
              <div className="map-search-place map-search-class">
                <h3>
                  {`${locationDetail.name} Airport`} {''}
                </h3>
                <h3>
                  {locationDetail.city_name}
                  <span>{locationDetail.country_name}</span>
                </h3>
                <span onClick={() => {
                  setLocationDetail(null)
                }}
                >
                  <a className="leaflet-popup-close-button" href="#close">×</a>
                </span>
              </div>
              <div className="map-search-time">
                <label>{intl(commonMessages.departure)}</label>
                <div className="map-search-date">
                  {getColorCircles(
                    locationDetail,
                    locationDetail?.availability?.outbound,
                    locationDetail?.availability?.outboundLeftCounter,
                    'outbound'
                  )}
                </div>
              </div>
              {locationDetail?.availability?.inbound && (
                <div className="map-search-time">
                  <label>{intl(commonMessages.return)}</label>
                  <div className="map-search-date">
                    {getColorCircles(
                      locationDetail,
                      locationDetail.availability.inbound,
                      locationDetail?.availability?.inboundLeftCounter,
                      'inbound'
                    )}
                  </div>
                </div>
              )}
              <div className="search-btn">
                <Button onClick={() => openCalendarHandler(locationDetail)}>
                  {intl(commonMessages.viewCalendar)}
                </Button>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </>
  )
}

LocationMap.propTypes = {
  mapLocations: PropTypes.array,
  location: PropTypes.object,
  updateToggalClassesState: PropTypes.func,
  source: PropTypes.object,
  toggalClasses: PropTypes.object,
  numberOfPassengers: PropTypes.number,
  airportsWithMultiCity: PropTypes.array,
  souDesAirports: PropTypes.array,
  updateReducerState: PropTypes.func,
  searchLocation: PropTypes.object,
  availablePopupCabinClass: PropTypes.object,
  setOnRunTimeUpdate: PropTypes.bool
}

export default withRouter(LocationMap)
