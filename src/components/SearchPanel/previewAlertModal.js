import React, { useState } from 'react'
import { Close, Pencil, MapMarker, Passanger, Way } from 'utils/svgs'
import PropTypes from 'prop-types'
import { Modal, Grid, Header } from 'semantic-ui-react'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import dashboardMessages from 'constants/messages/dashboardMessages'
import EditAlertModal from '../Dashboard/editAlertModal'
import { extractURLParams } from 'utils/helpers'
import {
  CreateAlertPopUpPlaneIcon,
  CreateAlertPopUpPlaneIconDown
} from 'utils/svgs'
import AAIcon from '../../assets/images/aa-icon.png'
import BAIcon from '../../assets/images/ba-icon.svg'
import moment from 'moment'
import { Loader } from 'semantic-ui-react'
import { BritishAirwaysAvailableClass, airlineName } from 'constants/globalConstants'

const PreviewAlertModal = (props) => {
  const {
    toggalPreviewAlertModal,
    updateReducerState,
    cancelSubscribedAlerts,
    airlines,
    dashboard: {
      myAlerts: { editAlertLoading }
    },
    previewAlertData,
    editAlert,
    toggleEditAlertModal,
    allowedAlertDateRange,
    isUserGoldMember,
    getFlightAvailability,
    flights,
    availablePassengerCabinClasses
  } = props
  const [toggleDeleteAlertModal, setToggleDeleteALertModal] = useState('edit')

  const {
    airline_name = '',
    destination_code = '',
    travel_classes = '',
    source_code = null,
    start_date = '',
    end_date = '',
    arrival_start_date = null,
    arrival_end_date = '',
    membership_type = '',
    trip_type = '',
    number_of_passengers = 1,
    availability_url
  } =
    previewAlertData && previewAlertData !== undefined ? previewAlertData : ''
  const extractedParams =
    availability_url && extractURLParams(availability_url)

  let cabinClasses = travel_classes ? travel_classes.split(',') : []

  if (cabinClasses?.length > 1) {
    const allCabinClass = BritishAirwaysAvailableClass
    cabinClasses = allCabinClass.filter((item) => cabinClasses.includes(item))
  }

  const handleCancelClick = (id) => {
    cancelSubscribedAlerts(id)
  }

  const handelDeleteAlert = (id) => {
    handleCancelClick(id)
    updateReducerState('searchPanel', 'toggleEditAlertModal', false)
    updateReducerState('searchPanel', 'toggalPreviewAlertModal', false)
    setToggleDeleteALertModal('edit')
  }


  return (
    <>
      <Modal
        open={toggalPreviewAlertModal}
        closeIcon={
          <div>
            <Close className="cst-popup__close" />
          </div>
        }
        onClose={() =>
          updateReducerState('searchPanel', 'toggalPreviewAlertModal', false)
        }
        size="small"
        className="cst-popup create-alert-modal"
      >
        <Modal.Header className="create-alert-modal-header">
          <>
            <Header as="h2">
              {intl(dashboardMessages.yourAlertModalTitle)}
              <span
                onClick={() =>
                  updateReducerState(
                    'searchPanel',
                    'toggleEditAlertModal',
                    true
                  )
                }
              >
                <Pencil />
              </span>
            </Header>
          </>
        </Modal.Header>
        <Modal.Content className="create-alert-modal-content">
          {source_code === null ? (
            <div className="loader-wrap">
              <Loader />
            </div>
          ) : editAlertLoading ? (
            <div className="loader-wrap">
              <Loader />
            </div>
          ) : (
            <>
              <Grid columns={2} className="m-0">
                <Grid.Row className="pt-0">
                  <Grid.Column className="text-left create-alert-modal-column">
                    <div className="american-alert-popup__fields">
                      <MapMarker />{' '}
                      <span className="city-text-span">{`${source_code} to ${destination_code}`}</span>
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="pt-0">
                  <Grid.Column className="text-left create-alert-modal-column">
                    <span className="alert-box__info-passengers create-alert-text">
                      <Passanger />
                      <span>
                        {' '}
                        {`${number_of_passengers} ${
                          number_of_passengers > 1
                            ? intl(commonMessages.passengers)
                            : intl(commonMessages.passenger)
                        }`}
                      </span>
                    </span>
                  </Grid.Column>
                  <Grid.Column className="text-left create-alert-modal-column">
                    <span className="alert-box__info-way create-alert-text">
                      <Way />
                      {trip_type === 'return'
                        ? intl(commonMessages.return)
                        : intl(commonMessages.oneWay)}
                    </span>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={2} className="m-0">
                <Grid.Row className="pt-0 pb-0">
                  <Grid.Column className="text-left create-alert-modal-column">
                    <span className="alert-box__info-date create-alert-text">
                      <span className="alert-box__info-date-span ">
                        <CreateAlertPopUpPlaneIcon />
                        {`${moment.utc(start_date).format('DD.MM.YYYY')} - ${moment.utc(
                          end_date
                        ).format('DD.MM.YYYY')}`}
                      </span>
                    </span>
                  </Grid.Column>
                  <Grid.Column className="text-left create-alert-modal-column">
                    <span className="alert-box__info-date create-alert-text">
                      {trip_type === 'return' && (
                        <span className="alert-box__info-date-span ">
                          <CreateAlertPopUpPlaneIconDown />
                          {`${moment.utc(arrival_start_date).format(
                            'DD.MM.YYYY'
                          )} - ${moment.utc(arrival_end_date).format(
                            'DD.MM.YYYY'
                          )}`}
                        </span>
                      )}
                    </span>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={1} className="m-0">
                <Grid.Row className="pt-0">
                  <Grid.Column className="text-left create-alert-modal-column mt-1">
                    <div className="american-alert-popup__fields ">
                      <img
                        className="lazyload airline-img"
                        src={
                          airline_name === airlineName.AA.AIRWAYS_NAME ? AAIcon : BAIcon
                        }
                        alt="airlines"
                      />
                      <label className=" create-alert-text">
                        {airline_name === airlineName.AA.AIRWAYS_NAME
                          ? airlineName.AA.AIRLINE
                          : airlineName.BA.AIRLINE}
                      </label>
                      <div className="classes-buttons member-text">
                        {`${membership_type} ${intl(commonMessages.member)}`}
                      </div>
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="pt-0">
                  <Grid.Column className="text-left create-alert-modal-column">
                    <div className="d-flex create-alert-buttons">
                      {cabinClasses.map((item, index) => (
                        <span
                          key={`cabin_${index + 1}`}
                          className={`${item}-btn`}
                        >
                          {item === 'premium_economy'
                            ? intl(commonMessages.premiumEconomy)
                            : item}
                        </span>
                      ))}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </>
          )}
        </Modal.Content>
      </Modal>
      {toggleEditAlertModal && (
        <EditAlertModal
          toggleEditAlertModal={toggleEditAlertModal}
          setToggleEditAlertModal={(value) =>
            updateReducerState('searchPanel', 'toggleEditAlertModal', value)
          }
          airlines={airlines}
          data={previewAlertData}
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
          availablePassengerCabinClasses={availablePassengerCabinClasses}
        />
      )}
    </>
  )
}

PreviewAlertModal.propTypes = {
  toggalPreviewAlertModal: PropTypes.bool,
  toggleEditAlertModal: PropTypes.bool,
  updateReducerState: PropTypes.func,
  airlines: PropTypes.array,
  cancelSubscribedAlerts: PropTypes.func,
  dashboard: PropTypes.object,
  editAlert: PropTypes.func,
  previewAlertData: PropTypes.object,
  allowedAlertDateRange: PropTypes.number,
  isUserGoldMember: PropTypes.bool,
  getFlightAvailability: PropTypes.func,
  flights: PropTypes.object
}
export default PreviewAlertModal
