import React from 'react'
import { Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Close } from 'utils/svgs'
import MembershipTier from 'components/Dashboard/accountSetting/membershipTier'
import intl from 'utils/intlMessage'
import dashboardMessages from 'constants/messages/dashboardMessages'

const AirlineMembershipModal = (props) => {
  const { airlineMembershipToggle, getAirlineList, searchPanel, updateReducerState, updateProfileDetails, user } = props
  return (
    <Modal
      open={airlineMembershipToggle}
      onClose={() => updateReducerState('common', 'airlineMembershipToggle', false)}
      closeIcon={
        <div>
          <Close className="cst-popup__close " />
        </div>
      }
      closeOnDimmerClick={false}
      className="cst-popup change-password-modal airline-membership-modal"
      closeOnEscape={false}
    >
      <Modal.Content className="p-0 ">
        <>
          <MembershipTier
            getAirlineList={getAirlineList}
            searchPanel={searchPanel}
            updateReducerState={updateReducerState}
            updateProfileDetails={updateProfileDetails}
            modalPopup= "true"
            userDetails={user}
          />
          <div className="bottom-text-wrap">
            <span className="bottom-text">
              {intl(dashboardMessages.movedAirlineNoticeTop)}
            </span><br></br>
            <span className="bottom-text">
              {intl(dashboardMessages.movedAirlineNoticeBottom)}
            </span>
          </div>
        </>
      </Modal.Content>
    </Modal>
  )
}

AirlineMembershipModal.propTypes = {
  airlineMembershipToggle: PropTypes.bool,
  getAirlineList: PropTypes.func,
  searchPanel: PropTypes.object,
  updateReducerState: PropTypes.func,
  updateProfileDetails: PropTypes.func
}

export default AirlineMembershipModal
