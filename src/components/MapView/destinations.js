import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import mapViewMessages from 'constants/messages/mapViewMessages'
import { Close } from 'utils/svgs'
import './style.scss'

const Destinations = (props) => {
  const {
    mapLocations,
    setSearchLocation
  } = props
  const [searchDestination, setSearchDestination] = useState('')
  const [locations, setLocations] = useState([])

  const sortObjectArray = (a, b) => {
    const nameFirst = a.city_name.toUpperCase()
    const nameSecond = b.city_name.toUpperCase()

    let comparison = 0
    if (nameFirst > nameSecond) {
      comparison = 1
    } else if (nameFirst < nameSecond) {
      comparison = -1
    }
    return comparison
  }

  useEffect(() => {
    // only set locations if search value is not entered
    if (mapLocations && !searchDestination) {
      setLocations(mapLocations.sort(sortObjectArray))
    }
    // To update class in list if user unchecks cabin class
    if(searchDestination) {
      const newArr = []
      locations.map((list)=>{
        // eslint-disable-next-line
        const filData = mapLocations.filter((item) => item.code === list.code)[0]
         return newArr.push(filData)
      })
      setLocations(newArr.sort(sortObjectArray))
    }
    // eslint-disable-next-line
  }, [mapLocations])

  const onSearchHandler = (value) => {
    setSearchDestination(value.trimStart())
    const data = mapLocations.filter(
      (item) =>
        item.country_name.toLowerCase().includes(value.toLowerCase()) ||
        item.city_name.toLowerCase().includes(value.toLowerCase())
    )
    setLocations(data)
    if (value.trimStart() && data && data.length) {
      setSearchLocation(data[0])
    } else {
      setSearchLocation('')
    }
  }

  const handleListZoom = (item) => {
    setSearchLocation(item)
    setSearchDestination(item.city_name.trimStart())
    const data = mapLocations.filter((e) => e.code === item.code)
    setLocations(data)
  }

  return (
    <div className="destination-tab">
      <div className="destination-search">
        <div className="ui search">
          <div className="crossbtn-wrap">
            <input
              value={searchDestination}
              onChange={(e) => onSearchHandler(e.target.value)}
              className="prompt"
              type="text"
              placeholder={intl(mapViewMessages.searchAvailableRoutes)}
            />
            {searchDestination && (
              <span
                className="destination__close"
                onClick={() => onSearchHandler('')}
              >
                <Close />
              </span>
            )}
          </div>
          <div className="results" />
        </div>
      </div>
      <div className="ui list destination-list">
        {locations && locations.length ? (
          locations.map((item, index) => {
            const classes = item.available_classes
            return (
              <div
                className="item"
                key={`${item.code}_destinations`}
                onClick={() => handleListZoom(item)}
              >
                <div className="content">
                  <div className="destination-country-wrap">
                    <div className="header">
                      {item.city_name}
                      <div className="destination-country">
                        &nbsp;&nbsp;{item.country_name}
                      </div>
                    </div>
                    <div className="destination-ticket">
                      {classes?.economy && <span className="economy">E</span>}
                      {classes?.premium && <span className="premium">P</span>}
                      {classes?.business && <span className="business">B</span>}
                      {classes?.first && <span className="first">F</span>}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="dest-option-text">
            <p>{intl(commonMessages.noOptionsAvailable)} </p>
          </div>
        )}
      </div>
    </div>
  )
}

Destinations.propTypes = {
  mapLocations: PropTypes.array,
  setSearchLocation: PropTypes.func
}

export default Destinations
