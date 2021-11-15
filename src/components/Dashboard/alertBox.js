import React, { useState, useEffect } from 'react'
import { Button, Popup } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import history from 'utils/history'
import moment from 'moment'
import {
  MapMarker,
  Passanger,
  Way,
  Inbound,
  Outbound,
  Pencil
} from 'utils/svgs'
import AAIcon from '../../assets/images/aa-icon.png'
import BAIcon from '../../assets/images/ba-icon.svg'
import { extractURLParams } from 'utils/helpers'
import EditAlertModal from './editAlertModal'
import { GoogleAdsParam, BritishAirwaysAvailableClass } from 'constants/globalConstants'
import { AppRoutes } from 'constants/appRoutes'
import 'semantic-ui-css/components/popup.min.css'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import { airlineName } from 'constants/globalConstants'

const AlertBox = (props) => {
  const {
    alerts,
    airlines,
    cancelAlertSubscription,
    data,
    editAlert,
    editAlertLoading,
    search,
    updateReducerState,
    getFlightAvailability,
    flights,
    allowedAlertDateRange,
    isUserGoldMember,
    isUserSilverMember,
    availablePassengerCabinClasses
  } = props
  const {
    id,
    airline_name,
    destination_code,
    travel_classes,
    source_code,
    start_date,
    end_date,
    arrival_start_date,
    arrival_end_date,
    membership_type,
    trip_type,
    number_of_passengers,
    availability_url
  } = data || ''
  const extractedParams =
    availability_url && extractURLParams(availability_url)
  const [toggleEditAlertModal, setToggleEditAlertModal] = useState(false)
  const [toggleDeleteAlertModal, setToggleDeleteALertModal] = useState('edit')
  let cabinClasses = travel_classes ? travel_classes.split(',') : []

  const allCabinClass = BritishAirwaysAvailableClass
  if (cabinClasses?.length > 1) {
    cabinClasses = allCabinClass.filter((item) => cabinClasses.includes(item))
  }

  useEffect(() => {
    let extractedId = null
    if (search) {
      extractedId = extractURLParams(search)
      const isExist = alerts.some(
        (item) => parseInt(item.id) === parseInt(extractedId.id)
      )
      const arrData = Object.keys(extractedId)
      const isExistParam = GoogleAdsParam.includes(arrData[0])
      if (!isExist && !isExistParam) {
        history.push(AppRoutes.PAGE_NOT_FOUND)
      }
      setToggleEditAlertModal(parseInt(extractedId.id) === parseInt(id))
    }
    // eslint-disable-next-line
  }, [search]);

  const handleCancelClick = (id) => {
    cancelAlertSubscription(id)
  }

  const handelDeleteAlert = (id) => {
    handleCancelClick(id)
    setToggleEditAlertModal(false)
    setToggleDeleteALertModal('edit')
  }

  const handleViewCalendar = () => {
    let selectedClass = {}
    allCabinClass.map((list)=>{
      const name = list === 'premium_economy' ? 'premium' : list
      if (Object.values(cabinClasses).indexOf(list) > -1) {
        selectedClass = {
          ...selectedClass,
          [name]: true
        }
     }
     return selectedClass
    })
    updateReducerState('searchPanel', 'toggalClasses', selectedClass)
    updateReducerState('flights', 'flightsAvailability', {})
    history.push({
      pathname: AppRoutes.CALENDER,
      search: `?${avabilitySplit}&alertId=${id}`,
      state: { sourcePage: 'alerts', startDate: start_date,
      endDate: end_date,
      arrivalStartDate: arrival_start_date,
      arrivalEndDate: arrival_end_date }
  })
  }

const avabilitySplit = availability_url ? availability_url.split('?')[1] : ''
  return (
    <>
      <div className="alert-box">
        <div className="alert-box__header">
          <div className="alert-box__header-left">
            <MapMarker /> <span>{`${source_code} to ${destination_code}`}</span>
          </div>
          <div className="alert-box__header-right">
            {/* <span>
              {last_checked_at &&
                <>  Last checked <span className="text-medium-blue">{moment(last_checked_at).fromNow()}</span></>
              }
            </span> */}
            <span onClick={() => setToggleEditAlertModal(true)}>
              <Pencil />
            </span>
          </div>
        </div>
        <div className="alert-box__body">
          <div className="alert-box__body-left">
            <div className="alert-box__info">
              <span className="alert-box__info-airline">
                <img
                  className="lazyload airline-icon"
                  src={airline_name === airlineName.AA.AIRWAYS_NAME ? AAIcon : BAIcon}
                  alt="airlines"
                />
                {airline_name === airlineName.AA.AIRWAYS_NAME
                  ? airlineName.AA.AIRLINE
                  : airlineName.BA.AIRLINE}
                <Popup
                  content={`${membership_type} ${intl(commonMessages.member)}`}
                  size="mini"
                  trigger={
                    <i className="alert-box__info-membership">{`${membership_type} ${intl(
                      commonMessages.member
                    )}`}
                    </i>
                  }
                />
              </span>
              <span className="alert-box__info-passengers">
                <Passanger />
                {`${number_of_passengers} ${
                  number_of_passengers > 1
                    ? intl(commonMessages.passengers)
                    : intl(commonMessages.passenger)
                }`}
              </span>
              <span className="alert-box__info-way">
                <Way />
                {trip_type === 'return'
                  ? intl(commonMessages.return)
                  : intl(commonMessages.oneWay)}
              </span>
              <span className="alert-box__info-date">
                <span>
                  <Outbound />
                  {`${moment.utc(start_date).format('DD.MM.YYYY')} - ${moment.utc(
                    end_date
                  ).format('DD.MM.YYYY')}`}
                </span>
                {trip_type === 'return' && (
                  <span>
                    <Inbound />
                    {`${moment.utc(arrival_start_date).format(
                      'DD.MM.YYYY'
                    )} - ${moment.utc(arrival_end_date).format('DD.MM.YYYY')}`}
                  </span>
                )}
              </span>
            </div>
            <div
              className={`alert-box__classes-buttons classes-buttons ${
                trip_type === 'return' ? 'classes-buttons--floating' : ''
              }`}
            >
              {cabinClasses.map((item, index) => (
                <span
                    key={`cabin_${index + 1}`}
                    className={`classes-buttons__btn classes-buttons__btn--${item}`}
                >
                  {item === 'premium_economy' ? intl(commonMessages.premiumEconomy) : item}
                </span>
                ))}
            </div>
          </div>
          <div className="alert-box__body-right">
            {availability_url && (
              <Button
                className="btn btn--medium-blue"
                onClick={() => handleViewCalendar()}
              >
                {intl(commonMessages.viewCalendar)}
              </Button>
            )}
          </div>
        </div>
      </div>
      {toggleEditAlertModal && (
        <EditAlertModal
          toggleEditAlertModal={toggleEditAlertModal}
          setToggleEditAlertModal={setToggleEditAlertModal}
          airlines={airlines}
          data={data}
          toggleDeleteAlertModal={toggleDeleteAlertModal}
          handelDeleteAlert={handelDeleteAlert}
          setToggleDeleteALertModal={setToggleDeleteALertModal}
          editAlert={editAlert}
          extractedParams={extractedParams}
          editAlertLoading={editAlertLoading}
          getFlightAvailability={getFlightAvailability}
          flights={flights}
          updateReducerState={updateReducerState}
          allowedAlertDateRange={allowedAlertDateRange}
          isUserGoldMember={isUserGoldMember}
          isUserSilverMember={isUserSilverMember}
          availablePassengerCabinClasses={availablePassengerCabinClasses}
        />
      )}
    </>
  )
}

AlertBox.propTypes = {
  cancelAlertSubscription: PropTypes.func,
  data: PropTypes.object,
  airlines: PropTypes.array,
  editAlert: PropTypes.func,
  editAlertLoading: PropTypes.bool,
  search: PropTypes.object,
  alerts: PropTypes.array,
  updateReducerState: PropTypes.func,
  getFlightAvailability: PropTypes.func,
  flights: PropTypes.object,
  allowedAlertDateRange: PropTypes.number,
  isUserSilverMember: PropTypes.bool,
  isUserGoldMember: PropTypes.bool,
  availablePassengerCabinClasses: PropTypes.object
}

export default AlertBox
