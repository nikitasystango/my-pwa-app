import React from 'react'
import PropTypes from 'prop-types'
import { SubractCount, AddCount } from 'utils/svgs'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import { AppRoutes } from 'constants/appRoutes'
import { updateQueryParams } from 'utils/commonFunction'

const TravellerCount = (props) => {
  const { updateNumberOfPassanger, numberOfPassengers, handleSearchClick, toggleEditAlertModal= false } = props
  const add = () => {
    if (numberOfPassengers < 9) {
      const sum = numberOfPassengers + 1
      updateNumberOfPassanger(sum)
      if (window.location.pathname === AppRoutes.CALENDER && !toggleEditAlertModal) {
        handleSearchClick(sum)
        updateQueryParams(props.searchPanel, 'numberOfPassengers', sum)
      }
    }
  }

  const remove = () => {
    if (numberOfPassengers > 1) {
      const sum = numberOfPassengers - 1
      updateNumberOfPassanger(sum)
      if (window.location.pathname === AppRoutes.CALENDER && !toggleEditAlertModal) {
        handleSearchClick(sum)
        updateQueryParams(props.searchPanel, 'numberOfPassengers', sum)
      }
    }
  }

  return (
    <ul className="passengers-modal-ul">
      <li>
        <div className="passengers_name ">{intl(commonMessages.passengers)}</div>
        <div className="passengers_cta">
          <button className={`removepas ${parseInt(numberOfPassengers) <= 1 ? 'disabled-passenger-cta': ''}`} onClick={remove} aria-label="substract">
            <SubractCount />
          </button>
          <div className="number_ui animated pulse">{numberOfPassengers}</div>
          <button className="addPas" onClick={add} aria-label="add">
            <AddCount />
          </button>
        </div>
      </li>
    </ul>
  )
}


TravellerCount.propTypes = {
  numberOfPassengers: PropTypes.number,
  updateNumberOfPassanger: PropTypes.func,
  handleSearchClick: PropTypes.func,
  toggleEditAlertModal: PropTypes.bool
}

export default React.memo(TravellerCount)
