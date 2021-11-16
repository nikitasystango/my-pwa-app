import React from 'react'
import PropTypes from 'prop-types'
import './assets/sa-popup.scss'
import { RadioIcon } from 'utils/svgs'
import { formatPrice } from 'utils/helpers'
import intl from 'utils/intlMessage'
import flightMessages from 'constants/messages/flightMessages'
import commonMessages from 'constants/messages/commonMessages'

const FlightAvailability = (props) => {
  const { flightDetails, date } = props
  const { economy, first, premium, business, peak } = flightDetails
  const objLength = Object.keys(flightDetails).length

  return (
    <>
      <div className="sa-popup__header">
        <h4 className="sa-popup__header-title">{intl(flightMessages.seatAvailability)}  {peak ? `(${intl(commonMessages.peakFare)})` : `(${intl(commonMessages.offPeakFare)})`}</h4>
        <p className="sa-popup__header-date">{date}</p>
      </div>
      <div className="sa-popup__body">
        <div className={`sa-popup__row ${objLength === 2 ? 'sa-popup__row-single': ''}`}> 
          <div className="sa-popup__col">
            <span className="sa-popup__col-head">&nbsp;</span>
            <span className="sa-popup__col-head">{intl(commonMessages.seats)}</span>
            <span className="sa-popup__col-head">{intl(commonMessages.points)}</span>
          </div>
          <div className="sa-popup__col">
            <div className="sa-popup__row">
              {economy && economy.seats &&
              <div className="sa-popup__col">
                <span className="sa-popup__col-head text-economy"><RadioIcon color="var(--economy)" />{intl(commonMessages.economy)} </span>
                <span className="sa-popup__col-points">{ economy.seats }</span>
                <span className="sa-popup__col-seats">{ economy.points ? formatPrice(economy.points) : '-' }</span>
              </div>}
              {premium && premium.seats &&
              <div className="sa-popup__col">
                <span className="sa-popup__col-head text-premium"><RadioIcon color="var(--premium)" />{intl(commonMessages.premium)}</span>
                <span className="sa-popup__col-points">{ premium.seats }</span>
                <span className="sa-popup__col-seats">{ premium.points ? formatPrice(premium.points) : '-'}</span>
              </div>}
              {business && business.seats &&
              <div className="sa-popup__col">
                <span className="sa-popup__col-head text-business"><RadioIcon color="var(--business)" />{intl(commonMessages.business)}</span>
                <span className="sa-popup__col-points">{ business.seats }</span>
                <span className="sa-popup__col-seats">{ business.points ? formatPrice(business.points) : '-' }</span>
              </div>}
              {first && first.seats &&
              <div className="sa-popup__col">
                <span className="sa-popup__col-head text-first"><RadioIcon color="var(--first)" />{intl(commonMessages.first)}</span>
                <span className="sa-popup__col-points">{first.seats }</span>
                <span className="sa-popup__col-seats">{ first.points ? formatPrice(first.points) : '-'}</span>
              </div>}
            </div>
          </div>
        </div>
        <p className="avios-point-text"> {intl(flightMessages.aviosPointsInAccurateTop)} </p>
        <p className="avios-point-text"> {intl(flightMessages.aviosPointsInAccurateBottom)} </p>
      </div>
    </>
  )
}

FlightAvailability.propTypes = {
  date: PropTypes.string,
  flightDetails: PropTypes.object
}

export default FlightAvailability
