import React, { forwardRef, useState, useImperativeHandle, useEffect } from 'react'
import PropTypes from 'prop-types'
import FlightAvailability from './flightAvailability'
import ColorCircleBox from './colorCircle'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import './assets/sa-popup.scss'

// eslint-disable-next-line react/display-name
const PopupFlightDetails = forwardRef((props, ref) => {
  const [inboundPopupContent, setInboundPopupContent] = useState('')
  const [outboundPopupContent, setOutboundPopupContent] = useState('')
  const { selectedClass, flightsAvailability, toggalClasses, highlightOffPeak, numberOfPassengers } = props

  const updateState = (date, type) => {
    if (type === 'out') {
      setOutboundPopupContent(date)
    } else if (type === 'in') {
      setInboundPopupContent(date)
    }
  }

  useImperativeHandle(ref, () => ({
      updateState: updateState
    }))
  const dataInboundPopupDisplay = () => {
    const day = inboundPopupContent
    const date = moment(day).format('YYYY-MM-DD')
    const currentDayIdentifier = moment(date).format('YYYY-MM-DD')
    if (flightsAvailability && flightsAvailability.inbound_availability &&
      flightsAvailability.inbound_availability[currentDayIdentifier]) {
      const dayCircle = <ColorCircleBox
        value={flightsAvailability.inbound_availability[currentDayIdentifier]}
        toggalClass={toggalClasses}
        date={date}
        selectedClass={selectedClass}
        passangerCount={numberOfPassengers || 1}
        highlightOffPeak={highlightOffPeak}
        peak={
          flightsAvailability.inbound_availability[currentDayIdentifier]
            ?.peak
        }
                        />
      return (
        <div className={`sa-popup ${'react-datepicker__tooltip-box' ? 'react-datepicker__tooltip-box' : ''}`}>
          <div className="sa-popup__inner">
            <div className="sa-popup__circle">
              {dayCircle}
            </div>
            <FlightAvailability
              toggalClass={toggalClasses}
              flightDetails={flightsAvailability.inbound_availability[currentDayIdentifier]}
              date={moment(date).format('DD MMM YYYY')}
            />
          </div>
        </div>
      )
    }
  }

  const dataOutboundPopupDisplay = () => {
    const day = outboundPopupContent
    const date = moment(day).format('YYYY-MM-DD')
    const currentDayIdentifier = moment(date).format('YYYY-MM-DD')
    if (flightsAvailability && flightsAvailability.outbound_availability &&
      flightsAvailability.outbound_availability[currentDayIdentifier]) {
      const dayCircle = <ColorCircleBox
        value={flightsAvailability.outbound_availability[currentDayIdentifier]}
        toggalClass={toggalClasses}
        date={date}
        selectedClass={selectedClass}
        passangerCount={numberOfPassengers || 1}
        highlightOffPeak={highlightOffPeak}
        peak={
          flightsAvailability.outbound_availability[currentDayIdentifier]
            ?.peak
        }
                        />
      return (
        <div className={`sa-popup ${'react-datepicker__tooltip-box' ? 'react-datepicker__tooltip-box' : ''}`}>
          <div className="sa-popup__inner">
            <div className="sa-popup__circle">
              {dayCircle}
            </div>
            <FlightAvailability
              toggalClass={toggalClasses}
              flightDetails={flightsAvailability.outbound_availability[currentDayIdentifier]}
              date={moment(date).format('DD MMM YYYY')}
            />
          </div>
        </div>
      )
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  // const [place, setPlace] = useState('top')

  useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.innerWidth)
    }
    // eslint-disable-next-line
  }, [])


  return (
    <>
      <div style={{ '--popup-width': windowWidth }}>
        <ReactTooltip
          id="outbound"
          globalEventOff="true"
          aria-haspopup="true"
          role="example"
          className="react-tooltip-wrapper"
          effect="solid"
          getContent={() => dataOutboundPopupDisplay()}
          overridePosition={ (
            { left, top },
            currentEvent, currentTarget, node, place, desiredPlace, effect, offset) => {
            // setPlace(place)
            const d = document.documentElement
            left = Math.min(d.clientWidth - node.clientWidth, left)
            top = Math.min(d.clientHeight - node.clientHeight, top)
            left = Math.max(0, left)
            top = Math.max(0, top)
            return { top, left }
          }}
          // place={windowWidth <= 520 ? 'top' : place}
        />
      </div>
      <div style={{ '--popup-width': windowWidth }}>
        <ReactTooltip
          id="inbound"
          globalEventOff="true"
          aria-haspopup="true"
          role="example"
          className="react-tooltip-wrapper"
          effect="solid"
          getContent={() => dataInboundPopupDisplay()}
          overridePosition={ (
            { left, top },
            currentEvent, currentTarget, node, place, desiredPlace, effect, offset) => {
            // setPlace(place)
            const d = document.documentElement
            left = Math.min(d.clientWidth - node.clientWidth, left)
            top = Math.min(d.clientHeight - node.clientHeight, top)
            left = Math.max(0, left)
            top = Math.max(0, top)
            return { top, left }
          }}
          // place={windowWidth <= 520 ? 'top' : place}
        />
      </div>
    </>
  )
})

PopupFlightDetails.propTypes = {
  flightsAvailability: PropTypes.object,
  toggalClasses: PropTypes.object,
  selectedClass: PropTypes.object,
  highlightOffPeak: PropTypes.bool,
  numberOfPassengers: PropTypes.number
}
export default PopupFlightDetails
