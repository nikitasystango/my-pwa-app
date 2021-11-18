import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Close, DeleteAlertIcon } from 'utils/svgs'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import dashboardMessages from 'constants/messages/dashboardMessages'
import './assets/change-password-modal.scss'

const CancelMembershipModal = (props) => {
  const {
    toggleCaneleMembershipModal,
    toggleModal,
    cancelEliteMembership,
    cancelEliteLoading,
    userPlanId
  } = props
  return (
    <Modal
      open={toggleCaneleMembershipModal}
      onClose={() => toggleModal(false)}
      closeIcon={
        <div>
          <Close className="cst-popup__close" />
        </div>
      }
      closeOnDimmerClick={false}
      className="cst-popup change-password-modal cancel-plan"
    >
      <Modal.Content className="p-0">
        <>
          <DeleteAlertIcon className="cst-popup__image" />
          <h2 className="cst-popup__title">
            {intl(dashboardMessages.cancelModalTitle)}
          </h2>
          {/* <p className="cst-popup__text">Are you sure you want to cancel your trial plan?</p> */}
          <p className="cst-popup__text">
            {' '}
            {intl(dashboardMessages.cancelModalText)} <br />{' '}
            {intl(dashboardMessages.cancelModalTextImmediateDowngrade)}
          </p>
          <div className="cst-popup__buttons justify-content-center">
            <Button
              disabled={cancelEliteLoading}
              onClick={() => toggleModal(false)}
              className="btn btn--outline-medium-blue"
            >
              {intl(commonMessages.no)}
            </Button>
            <Button
              disabled={cancelEliteLoading}
              loading={cancelEliteLoading}
              className="btn btn--medium-blue"
              onClick={() => cancelEliteMembership({ type: 'membership', userPlanId: userPlanId })}
            >
              {intl(commonMessages.yes)}
            </Button>
          </div>
        </>
      </Modal.Content>
    </Modal>
  )
}

CancelMembershipModal.propTypes = {
  toggleCaneleMembershipModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  cancelEliteMembership: PropTypes.func,
  cancelEliteLoading: PropTypes.bool,
  userPlanId: PropTypes.string
}

export default CancelMembershipModal
