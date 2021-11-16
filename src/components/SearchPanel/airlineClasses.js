import React, { useState, useEffect, useRef } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { CheckCircle } from 'utils/svgs'
import { AirlineClassesDropdown } from './style'
import { britishAirwaysClasses } from 'constants/globalConstants'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import { updateQueryParams } from 'utils/commonFunction'

const AirlineClasses = (props) => {
  const {
    toggalClasses,
    updateReducerState,
    flightsAvailability,
    location,
    setOnRunTimeUpdate
  } = props
  const [toggleCabinClassModal, setToggleCabinClassPopup] = useState(false)
  const [cabinClasses, setCabinClasses] = useState(toggalClasses)
  const { pathname: path } = location
  const ref = useRef(null)
  useEffect(() => {
    setCabinClasses(toggalClasses)
    // eslint-disable-next-line
  }, [toggalClasses])

  const toggleClasses = (name) => {
    const checkedClassLength =
      Object.values(cabinClasses).filter((classStr) => classStr).length - 1
    if (checkedClassLength >= 1 || !cabinClasses[name]) {
      setCabinClasses({
        ...cabinClasses,
        [name]: !cabinClasses[name]
      })
    }
  }

  // below is the same as componentDidMount and componentDidUnmount
  useEffect(() => {
    const data = document.getElementsByClassName('is--open')
    if(data && data.length > 0) {
      document.addEventListener('click', handleClickOutside, true)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
  }
  // eslint-disable-next-line
  })

  const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handlerClosePopUp()
      }
  }

  const handlerSetCabinClasses = () => {
    if (path === AppRoutes.CALENDER) {
      setOnRunTimeUpdate(true)
      updateQueryParams(props.searchPanel, 'toggalClasses', cabinClasses)
    }
    updateReducerState('searchPanel', 'toggalClasses', cabinClasses)
    setToggleCabinClassPopup(false)
  }

  const handlerClosePopUp = () => {
    setCabinClasses(toggalClasses)
    setToggleCabinClassPopup(false)
  }

  const getClassDropDownData = () => {
    if (path === AppRoutes.CALENDER && flightsAvailability?.availability) {
      return (
        <>
          {/* eslint-disable-next-line */}
          {britishAirwaysClasses.map((item, index) => {
            if (flightsAvailability.availability[item.cabinClass]) {
              return (
                <li
                  key={`${item.cabinClass}_${index}_223`}
                  onClick={() => toggleClasses(item.cabinClass)}
                  className={`acd__classes-btn acd__classes-btn--${
                    item.cabinClass
                  } ${cabinClasses[item.cabinClass] ? 'active' : ''}
                  `}
                >
                  <CheckCircle
                    color={item.color}
                    checked={cabinClasses[item.cabinClass]}
                  />
                  <span>{item.title}</span>
                </li>
              )
            }
          })}
        </>
      )
    } else {
      return (
        <>
          {britishAirwaysClasses.map((item, index) => (
            <li
              key={`${item.cabinClass}_${index}_223`}
              onClick={() => toggleClasses(item.cabinClass)}
              className={`acd__classes-btn acd__classes-btn--${
                item.cabinClass
              } ${cabinClasses[item.cabinClass] ? 'active' : ''}`}
            >
              <CheckCircle
                color={item.color}
                checked={cabinClasses[item.cabinClass]}
              />
              <span>{item.title}</span>
            </li>
          ))}
        </>
      )
    }
  }

  return (
    <Grid.Row>
      <AirlineClassesDropdown
        className={`acd ${toggleCabinClassModal ? 'is--open' : ''}`}
        ref={ref}
      >
        <div
          className="acd__text"
          onClick={() => setToggleCabinClassPopup(!toggleCabinClassModal)}
        >
          {intl(commonMessages.classes)}
        </div>
        <ul className="acd__menu">
          {getClassDropDownData()}
          <li>
            <Button
              onClick={() => handlerClosePopUp()}
              className="acd__btn acd__btn--cancel"
            >
              {intl(commonMessages.cancel)}
            </Button>
            <Button
              onClick={() => handlerSetCabinClasses()}
              className="acd__btn acd__btn--ok"
            >
              {intl(commonMessages.oK)}
            </Button>
          </li>
        </ul>
      </AirlineClassesDropdown>
    </Grid.Row>
  )
}

AirlineClasses.propTypes = {
  updateReducerState: PropTypes.func,
  toggalClasses: PropTypes.object,
  flightsAvailability: PropTypes.object,
  location: PropTypes.object,
  searchPanel: PropTypes.object,
  setOnRunTimeUpdate: PropTypes.bool
}

export default React.memo(AirlineClasses)
