import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Button } from 'semantic-ui-react'
import SearchPanel from 'containers/SearchPanel'
import {
  CheckCircle,
  Outbound,
  Inbound,
  OffColorCircleUpdated
} from '../../utils/svgs'
// Components
import './flight-availability.scss'
import 'react-day-picker/lib/style.css'
import intl from 'utils/intlMessage'
import flightMessages from 'constants/messages/flightMessages'
import ReactTooltip from 'react-tooltip'

const FlightsHeader = (props) => {
  const {
    showMobileSearch,
    toggleMobileSearch,
    flightsAvailabilityList,
    handleClassChange,
    toggalClasses,
    handleOffPeakHighlight,
    highlightOffPeak,
    showReturnDates,
    showReturnDatesHandle,
    selectedAirlineCode,
    journeyType,
    activeAirlineClass,
    availablePassengerCabinClasses,
    setOnRunTimeUpdate,
    numberOfPassengers
  } = props
  return (
    <header
    id="myHeader"
    className={`header ${showMobileSearch ? 'header--mobile' : ''}`}
    >
      <div className="header__inner">
        <div className="flight-availability-page__header">
          <SearchPanel
          closeAlert={() => toggleMobileSearch(!showMobileSearch)}
          setOnRunTimeUpdate={setOnRunTimeUpdate}
          />
        </div>
        <Grid className="my-0 flight-classes">
          <Grid.Row className="py-0">
            <Grid.Column
            className="buttons_element left-classes-wrap"
            mobile={16}
            tablet={16}
            computer={9}
            >
              {/* eslint-disable-next-line */}
            {activeAirlineClass.map((item, index) => {
              if (
                flightsAvailabilityList?.availability &&
                flightsAvailabilityList.availability[item.cabinClass]
              ) {
                return (
                  <>
                    <Button
                     data-tip data-for={`notAvailableForPassengerCount${item.name}_${index + 1}`}
                    key={`${item.name}_${index + 1}`}
                    onClick={() => availablePassengerCabinClasses[item.cabinClass] ? handleClassChange(item.cabinClass) : null}
                    className={`alertBoxClasses buttons_element__button buttons_element__button--${
                      item.cabinClass
                    } ${
                      toggalClasses[item.cabinClass] ? 'active' : ''
                    }
                    ${!availablePassengerCabinClasses[item.cabinClass] ? 'inactive-cabin-class' : ''}
                    `}
                    >
                      <CheckCircle
                      color={item.color}
                      checked={toggalClasses[item.cabinClass]}
                      />
                      <span>{item.title}</span>
                      <ReactTooltip id={`notAvailableForPassengerCount${item.name}_${index + 1}`} disable={!availablePassengerCabinClasses[item.cabinClass] ? false: true} >
                        <span>
                          {`${numberOfPassengers} ${intl(flightMessages.notAvailableForPassengerCount, numberOfPassengers > 1 ? intl(flightMessages.seatsText) : intl(flightMessages.singleSeatText))}`}
                        </span>
                      </ReactTooltip>
                    </Button>
                  </>
                )
              }
            })}
            </Grid.Column>
            <Grid.Column
            mobile={16}
            tablet={16}
            computer={7}
            verticalAlign="middle"
            className="pop-wrapper"
            >
              { selectedAirlineCode &&
              selectedAirlineCode === 'BA' && (
                <div className="pop">
                  <div
                    onClick={() => handleOffPeakHighlight()}
                    className={`pop__item pop__item--peak off-peak-btn-wrap ${
                      highlightOffPeak ? 'peakactive' : 'peakinactive'
                    }`}
                  >
                    <CheckCircle
                      className="offpickcheck"
                      color={'#132C52'}
                      checked={highlightOffPeak}
                    />
                    <Button
                      className={`highlightOffPeakBtn buttons_element__button peak-btn buttons_element__button-- ${
                        highlightOffPeak ? 'active' : ''
                      }`}
                    >
                      <span>
                        {intl(flightMessages.highlightOffPeak)}
                      </span>
                    </Button>
                    {highlightOffPeak ? (
                      <div className="offcircleupdated">
                        <OffColorCircleUpdated />
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns="equal" className="my-0 calendar-header">
          <Grid.Row className="py-0">
            <Grid.Column>
              <h3 className="flight-availability-page__calender-heading">
                <Outbound />
                {intl(flightMessages.outboundSeats)}
              </h3>
              <h3
              className={`flight-availability-page__calender-heading flight-availability-page__calender-heading--mobile-only ${
                showReturnDates === 'outbound-seats'
                  ? 'flight-availability-page__calender-heading--active'
                  : ''
              } ${
                journeyType === 'return'
                  ? 'flight-availability-page__calender-heading--return'
                  : ''
              }`}
              onClick={() => showReturnDatesHandle('outbound-seats')}
              >
                <Outbound />
                {intl(flightMessages.outboundSeatsText)}{' '}
              </h3>
            </Grid.Column>
            {journeyType === 'return' && (
            <Grid.Column>
              <h3 className="flight-availability-page__calender-heading">
                <Inbound />
                {intl(flightMessages.returnSeats)}
              </h3>
              <h3
                className={`flight-availability-page__calender-heading flight-availability-page__calender-heading--mobile-only ${
                  showReturnDates === 'return-seats'
                    ? 'flight-availability-page__calender-heading--active'
                    : ''
                } ${
                  journeyType === 'return'
                    ? 'flight-availability-page__calender-heading--return'
                    : ''
                }`}
                onClick={() => showReturnDatesHandle('return-seats')}
              >
                <Inbound />
                {intl(flightMessages.inboundSeatsText)}{' '}
              </h3>
            </Grid.Column>
          )}
          </Grid.Row>
        </Grid>
      </div>
    </header>
  )
}
FlightsHeader.propTypes = {
  showMobileSearch: PropTypes.bool,
  toggleMobileSearch: PropTypes.func,
  flightsAvailabilityList: PropTypes.object,
  handleClassChange: PropTypes.func,
  toggalClasses: PropTypes.object,
  handleOffPeakHighlight: PropTypes.func,
  highlightOffPeak: PropTypes.bool,
  showReturnDates: PropTypes.string,
  showReturnDatesHandle: PropTypes.func,
  selectedAirlineCode: PropTypes.string,
  journeyType: PropTypes.string,
  activeAirlineClass: PropTypes.array,
  availablePassengerCabinClasses: PropTypes.object,
  setOnRunTimeUpdate: PropTypes.bool,
  numberOfPassengers: PropTypes.number
}

export default FlightsHeader
