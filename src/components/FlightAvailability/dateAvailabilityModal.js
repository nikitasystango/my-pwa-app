import React, { useState, useEffect } from 'react'
import { Modal, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Close, NextArrow, SadIcon, PreviousArrow } from 'utils/svgs'
import moment from 'moment'
import intl from 'utils/intlMessage'
import flightMessages from 'constants/messages/flightMessages'
import Loader from 'components/LoadingSpinner'
import {
  isEmptyObject,
  objectIntersection,
  checkObjectSet,
  sortDateObj
} from 'utils/commonFunction'
import { findMatchedArray } from 'utils/commonFunction'

const DateAvailibilityModal = (props) => {
  const {
    updateReducerState,
    toggalDateAvailibilityModal,
    availabilityAlertData,
    availabilityAlertLoading,
    extractedParams
  } = props

  const {
    arrival_start_date,
    current_availability = {},
    email_availability = {},
    travel_classes = ''
  } = availabilityAlertData || {}
  const travelClass = travel_classes && travel_classes.split(',')
  const [availabilityList, setAvailabilityList] = useState({})
  const [popupTitleText, setPopupTitleText] = useState('')
  const [showCurrentAvailablityText, setShowCurrentAvailablityText] = useState(
    ''
  )
  const [alertCounterOutbound, setAlertCounterOutbound] = useState(0)
  const [alertCounterInbound, setAlertCounterInbound] = useState(0)
  const [alertViewCount, setAlertViewCount] = useState(6)

  const journeyType = arrival_start_date ? 'return' : 'oneway'
  const isEmailLogIdExist = extractedParams?.emailLogId ? true : false

  const outBoundlength = availabilityList?.outbound_availability
      ? Object.keys(availabilityList.outbound_availability).length
      : 0,
    inBoundlength = availabilityList?.inbound_availability
      ? Object.keys(availabilityList.inbound_availability).length
      : 0

  useEffect(() => {
    if (current_availability) {
      setAvailabilityList(
        isEmailLogIdExist ? email_availability : Object.keys(current_availability).length ? {
          ...current_availability,
          inbound_availability: filterCurrentAvailability(current_availability?.inbound_availability),
          outbound_availability: filterCurrentAvailability(current_availability?.outbound_availability)
        } : {}
      )
         // update availabilityAlertLoading to false once its setstate
         updateReducerState('flights', 'availabilityAlertLoading', false)
    }
    if (isEmailLogIdExist) {
      setPopupTitleText(handlePopupText())
    } else {
      setPopupTitleText(handlePopupViewCalendar())
    }
    // eslint-disable-next-line
  }, [availabilityAlertData])

  //  Filter data according to cabin class available
  const filterCurrentAvailability = (availabilityList) => {
    const availability = JSON.parse(JSON.stringify(availabilityList))
    const data = availability
    if(isEmptyObject(availability)) {
      return data
    }else{
      Object.keys(availability)
      // eslint-disable-next-line
        .map((list, key) => {
          const arr = travel_classes.split(',') || []
          const newArr = findMatchedArray(arr, availability[list])
          if(newArr && newArr.length) {
          data[list] = findMatchedArray(arr, availability[list])
          } else{
            delete data[list]
          }
        }
        )
      }
      return data
  }

  //  Check conditions & show text when redirect from my alerts page
  const handlePopupViewCalendar = () => {
    let titleText = ''
    if (journeyType === 'return') {
      titleText =
        isEmptyObject(current_availability) ||
        (isEmptyObject(current_availability?.outbound_availability) &&
          isEmptyObject(current_availability?.inbound_availability))
          ? `None ${intl(flightMessages.noneDatesAvailableForALert)}`
          : intl(flightMessages.datesAvailableForALert)
    } else {
      titleText =
        isEmptyObject(current_availability) ||
        isEmptyObject(current_availability?.outbound_availability)
          ? `None ${intl(flightMessages.noneDatesAvailableForALert)}`
          : intl(flightMessages.datesAvailableForALert)
    }
    return titleText
  }

  // Handle popup text function if user redirects from email
  const handlePopupText = () => {
    let titleText = ''
    if (journeyType === 'return') {
      titleText = handleReturnCaseCondition()
    } else {
      titleText = handleOneWayCaseCondition()
    }
    return titleText
  }

  const handleReturnCaseCondition = () => {
    let titleText = ''
    if (
      isEmptyObject(current_availability) ||
      isEmptyObject(email_availability) ||
      (isEmptyObject(current_availability?.outbound_availability) &&
        isEmptyObject(current_availability?.inbound_availability)) ||
      (isEmptyObject(email_availability?.outbound_availability) &&
        isEmptyObject(email_availability?.inbound_availability))
    ) {
      setAvailabilityList({})
      titleText = `None ${intl(flightMessages.alertedDatesAvailable)}`
    } else {
      titleText = checkEmailAvailabilityReturn()
    }
    return titleText
  }

  const handleOneWayCaseCondition = () => {
    let titleText = ''
    if (
      isEmptyObject(current_availability) ||
      isEmptyObject(email_availability) ||
      isEmptyObject(current_availability?.outbound_availability) ||
      isEmptyObject(email_availability?.outbound_availability)
    ) {
      setAvailabilityList({})
      titleText = `None ${intl(flightMessages.alertedDatesAvailable)}`
    } else {
      titleText = checkEmailAvailabilityOneway()
    }
    return titleText
  }

  const checkEmailAvailabilityReturn = () => {
    let isOutBoundEqual = false,
      isInBoundEqual = false,
      titleText = ''
    if (email_availability?.outbound_availability) {
      isOutBoundEqual = checkObjectSet(
        email_availability.outbound_availability,
        current_availability.outbound_availability
      )
    }
    if (email_availability?.inbound_availability) {
      isInBoundEqual = checkObjectSet(
        email_availability.inbound_availability,
        current_availability.inbound_availability
      )
    }

    if (isOutBoundEqual && isInBoundEqual) {
      titleText = `All ${intl(flightMessages.alertedDatesAvailable)}`
      setAlertViewCount(12)
    } else if (
      objectIntersection(
        email_availability.outbound_availability,
        current_availability.outbound_availability
      ).length ||
      objectIntersection(
        email_availability.inbound_availability,
        current_availability.inbound_availability
      ).length
    ) {
      titleText = `Only some ${intl(flightMessages.alertedDatesAvailable)}`
    } else {
      if (
        current_availability.inbound_availability ||
        current_availability.outbound_availability
      ) {
        setShowCurrentAvailablityText(
          intl(flightMessages.previouslyAlertedDateAvailable)
        )
        setAvailabilityList(current_availability)
      }
      titleText = `None ${intl(flightMessages.alertedDatesAvailable)}`
    }
    return titleText
  }

  const checkEmailAvailabilityOneway = () => {
    let isOutBoundEqual = false,
      titleText = ''
    if (email_availability?.outbound_availability) {
      isOutBoundEqual = checkObjectSet(
        email_availability.outbound_availability,
        current_availability.outbound_availability
      )
    }
    if (isOutBoundEqual) {
      titleText = `All ${intl(flightMessages.alertedDatesAvailable)}`
      setAlertViewCount(12)
    } else if (
      objectIntersection(
        email_availability.outbound_availability,
        current_availability.outbound_availability
      ).length
    ) {
      titleText = `Only some ${intl(flightMessages.alertedDatesAvailable)}`
    } else {
      if (current_availability.outbound_availability) {
        setShowCurrentAvailablityText(
          intl(flightMessages.previouslyAlertedDateAvailable)
        )
        setAvailabilityList(current_availability)
      }
      titleText = `None ${intl(flightMessages.alertedDatesAvailable)}`
    }
    return titleText
  }

  const handleColorCircle = (selectedkeys) => {
    let coloreData = null
    switch (travelClass.length) {
      case 4:
        coloreData = (
          <div
            width="38"
            height="38"
            className={'date-svg__icon date-svg__icon--s4'}
            style={{
              '--c1': `${
                selectedkeys[0] === 'premium_economy'
                  ? 'var(--premium)'
                  : selectedkeys[0]
                  ? `var(--${selectedkeys[0]})`
                  : ''
              }`,
              '--c2': `${
                selectedkeys[1] === 'premium_economy'
                  ? 'var(--premium)'
                  : selectedkeys[1]
                  ? `var(--${selectedkeys[1]})`
                  : ''
              }`,
              '--c4': `${
                selectedkeys[2] === 'premium_economy'
                  ? 'var(--premium)'
                  : selectedkeys[2]
                  ? `var(--${selectedkeys[2]})`
                  : ''
              }`,
              '--c3': `${
                selectedkeys[3] === 'premium_economy'
                  ? 'var(--premium)'
                  : selectedkeys[3]
                  ? `var(--${selectedkeys[3]})`
                  : ''
              }`,
              '--ci-opacity': 0.08
            }}
          />
        )
        break
      case 3:
        coloreData = (
          <div
            width="38"
            height="38"
            className={'date-svg__icon date-svg__icon--s3'}
            style={{
              '--c1': `${
                selectedkeys[0] === 'premium_economy'
                  ? 'var(--premium)'
                  : selectedkeys[0]
                  ? `var(--${selectedkeys[0]})`
                  : ''
              }`,
              '--c2': `${
                selectedkeys[1] === 'premium_economy'
                  ? 'var(--premium)'
                  : selectedkeys[1]
                  ? `var(--${selectedkeys[1]})`
                  : ''
              }`,
              '--c3': `${
                selectedkeys[2] === 'premium_economy'
                  ? 'var(--premium)'
                  : selectedkeys[2]
                  ? `var(--${selectedkeys[2]})`
                  : ''
              }`,
              '--ci-opacity': 0.08
            }}
          />
        )
        break
      case 2:
        coloreData = (
          <div
            width="38"
            height="38"
            className={'date-svg__icon date-svg__icon--s2'}
            style={{
              '--c1': `${
                selectedkeys[0] === 'premium_economy'
                  ? 'var(--premium)'
                  : selectedkeys[0]
                  ? `var(--${selectedkeys[0]})`
                  : ''
              }`,
              '--c2': `${
                selectedkeys[1] === 'premium_economy'
                  ? 'var(--premium)'
                  : selectedkeys[1]
                  ? `var(--${selectedkeys[1]})`
                  : ''
              }`,
              '--ci-opacity': 0.08
            }}
          />
        )
        break
      case 1:
        coloreData = (
          <div
            width="38"
            height="38"
            className={'date-svg__icon date-svg__icon--s1'}
            style={{
              '--c1': `${
                selectedkeys[0] === 'premium_economy'
                  ? 'var(--premium)'
                  : selectedkeys[0]
                  ? `var(--${selectedkeys[0]})`
                  : ''
              }`,
              '--ci-opacity': 0.08
            }}
          />
        )
        break
      default:
        coloreData = (
          <div
            width="38"
            height="38"
            className={'date-svg__icon date-svg__icon--s0'}
            style={{
              '--ci-opacity': 0.08
            }}
          />
        )
    }
    return coloreData
  }

  const dataInboundPopupDisplay = (day, key) => {
    const date = moment(day).format('YYYY-MM-DD')
    const currentDayIdentifier = moment(date).format('YYYY-MM-DD')
    if (
      availabilityList &&
      availabilityList.inbound_availability &&
      availabilityList.inbound_availability[currentDayIdentifier]
    ) {
      return (
        <div className={'color-circle'} key={`inbound${key}`}>
          {handleColorCircle(
            availabilityList.inbound_availability[currentDayIdentifier]
          )}
          <span className={'color-circle__text'}>
            {moment(date).format('DD MMM')}
          </span>
        </div>
      )
    }
  }

  const dataOutboundPopupDisplay = (day, key) => {
    const date = moment(day).format('YYYY-MM-DD')
    if (
      availabilityList &&
      availabilityList.outbound_availability &&
      availabilityList.outbound_availability[date]
    ) {
      return (
        <div className={'color-circle'} key={`outbound${key}`}>
          {handleColorCircle(
            availabilityList.outbound_availability[date]
          )}
          <span className={'color-circle__text color-circle__text--peak'}>
            {moment(date).format('DD MMM')}
          </span>
        </div>
      )
    }
  }

  const handleOutboundAlertCounter = (str) => {
    if(str === 'next') {
      outBoundlength >= alertCounterOutbound && setAlertCounterOutbound(alertCounterOutbound + alertViewCount)
    }else {
      alertCounterOutbound > 0 && setAlertCounterOutbound(alertCounterOutbound - alertViewCount)
  }
 }

  const handleInboundAlertCounter = (str) => {
    if(str === 'next') {
      inBoundlength >= alertCounterInbound && setAlertCounterInbound(alertCounterInbound + alertViewCount)
    }else {
        alertCounterInbound > 0 && setAlertCounterInbound(alertCounterInbound - alertViewCount)
    }
  }


  return (
    <Modal
      open={toggalDateAvailibilityModal}
      onClose={() =>
        updateReducerState('flights', 'toggalDateAvailibilityModal', false)
      }
      closeIcon={
        <div>
          <Close className="cst-popup__close" />
        </div>
      }
      closeOnDimmerClick={false}
      className="cst-popup availabilityPopups"
    >
      <Header content={outBoundlength === 0 && inBoundlength === 0 ? intl(flightMessages.noDatesAvailable) : intl(flightMessages.newDatesAvailable)} />
      <Modal.Content className="mb-2">
        {availabilityAlertLoading ? (
          <Loader />
        ) : (
          <div>
            <p className="allDatesText">{popupTitleText} </p>
            {showCurrentAvailablityText && (
              <p> {showCurrentAvailablityText} </p>
            )}
            {outBoundlength === 0 && inBoundlength === 0 ? (
              <SadIcon className="cst-popup__image" />
            ) : (
              <>
                <div className="flight-availability-page">
                  {outBoundlength > 0 && (
                    <div>
                      <p className="cst-popup__text boundText"> Outbound </p>
                      <div className="ringTextWrapper">
                        {alertCounterOutbound > 0 &&
                        <div className="daysText prevarrow" onClick={()=> handleOutboundAlertCounter('prev')}>
                          <PreviousArrow/>
                        </div>
                       }
                        <div className="dates-popup-wrap DayPicker-Day ">
                          {Object.keys(availabilityList?.outbound_availability).sort((a, b)=> sortDateObj(a, b))
                            .slice(alertCounterOutbound, alertCounterOutbound + alertViewCount)
                            .map((list, key) =>
                              dataOutboundPopupDisplay(list, key)
                            )}
                        </div>
                        {(alertCounterOutbound + alertViewCount) < outBoundlength &&
                        <div className="daysText nextarrow" onClick={()=> handleOutboundAlertCounter('next')} >
                          <NextArrow/>
                        </div>
                        }
                      </div>
                    </div>
                  )}
                  {inBoundlength > 0 && (
                    <div className="inbound-wrap">
                      <p className="cst-popup__text boundText mt-2"> Inbound </p>
                      <div className="ringTextWrapper">
                        {alertCounterInbound > 0 &&
                        <div className="daysText prevarrow" onClick={()=> handleInboundAlertCounter('prev')}>
                          <PreviousArrow/>
                        </div>
                        }
                        <div className="dates-popup-wrap DayPicker-Day ">
                          {Object.keys(availabilityList?.inbound_availability).sort((a, b)=> sortDateObj(a, b))
                            .slice(alertCounterInbound, alertCounterInbound + alertViewCount)
                            .map((list, key) =>
                              dataInboundPopupDisplay(list, key)
                            )}
                        </div>
                        {alertCounterInbound + alertViewCount < inBoundlength &&
                        <div className="daysText nextarrow" onClick={()=> handleInboundAlertCounter('next')}>
                          <NextArrow/>
                        </div>
                       }
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </Modal.Content>
    </Modal>
  )
}

DateAvailibilityModal.propTypes = {
  updateReducerState: PropTypes.func,
  toggalDateAvailibilityModal: PropTypes.bool,
  availabilityAlertData: PropTypes.object,
  availabilityAlertLoading: PropTypes.bool,
  extractedParams: PropTypes.object
}

export default DateAvailibilityModal
