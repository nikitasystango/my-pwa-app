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

  return (
    <>
      <div className="sa-popup__header">
        <h4 className="sa-popup__header-title">{intl(flightMessages.seatAvailability)}  {peak ? `(${intl(commonMessages.peakFare)})` : `(${intl(commonMessages.offPeakFare)})`}</h4>
        <p className="sa-popup__header-date">{date}</p>
      </div>
      <div className="sa-popup__body">
        <div className={'sa-popup__row'}>
          <div className="sa-popup__col">
            <span className="sa-popup__col-head">&nbsp;</span>
            <span className="sa-popup__col-head">{intl(commonMessages.seats)}</span>
            <span className="sa-popup__col-head">{intl(commonMessages.points)}</span>
          </div>
          <div className="sa-popup__col">
            <div className="sa-popup__row">
              <div className="sa-popup__col">
                <span className="sa-popup__col-head text-economy"><RadioIcon color="var(--economy)" />Economy</span>
                <span className="sa-popup__col-points">{economy && economy.seats ? economy.seats : 0 }</span>
                <span className="sa-popup__col-seats">{ economy && economy.points ? formatPrice(economy.points) : '-' }</span>
              </div>
              <div className="sa-popup__col">
                <span className="sa-popup__col-head text-premium"><RadioIcon color="var(--premium)" />Premium</span>
                <span className="sa-popup__col-points">{ premium && premium.seats ? premium.seats : 0 }</span>
                <span className="sa-popup__col-seats">{ premium && premium.points ? formatPrice(premium.points) : '-'}</span>
              </div>
              <div className="sa-popup__col">
                <span className="sa-popup__col-head text-business"><RadioIcon color="var(--business)" />Business</span>
                <span className="sa-popup__col-points">{ business && business.seats ? business.seats : 0 }</span>
                <span className="sa-popup__col-seats">{ business && business.points ? formatPrice(business.points) : '-' }</span>
              </div>
              <div className="sa-popup__col">
                <span className="sa-popup__col-head text-first"><RadioIcon color="var(--first)" />First</span>
                <span className="sa-popup__col-points">{first && first.seats ? first.seats : 0 }</span>
                <span className="sa-popup__col-seats">{ first && first.points ? formatPrice(first.points) : '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

FlightAvailability.propTypes = {
  date: PropTypes.string,
  flightDetails: PropTypes.object
}

export default FlightAvailability
