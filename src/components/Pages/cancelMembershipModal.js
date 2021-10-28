import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Close, CancelEliteMembershipImage } from 'utils/svgs'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import commonMessages from 'constants/messages/commonMessages'
import { AppRoutes } from 'constants/appRoutes'

const CancelMembershipModal = (props) => {
  const { toggleCaneleMembershipModal, toggleModal, cancelEliteMembership, cancelEliteLoading, isUserSilverMember } = props
  return (
    <Modal
      open={toggleCaneleMembershipModal}
      onClose={() => toggleModal(false)}
      closeIcon={<div><Close className="cst-popup__close" /></div>}
      closeOnDimmerClick={false}
      className="cst-popup change-password-modal cancel-plan change-plan-popup"
    >
      <Modal.Content className="p-0">
        <>
          <CancelEliteMembershipImage className="cancel-elite-membership__image" />
          <h3 className="cancel-elite-membership__title">{intl(pagesMessages.cancelMembershipTitle)}</h3>
          <p className="cancel-elite-membership__text mx-auto">{intl(pagesMessages.thankyouForSupport)}<br/> {intl(pagesMessages.thankyouForSupportMembership)}</p>
          <h5 className="cancel-elite-membership__subhead  mx-auto mb-10">{intl(pagesMessages.areYouSure)}</h5>
          <div className="cst-popup__buttons justify-content-center">
            <Button disabled={cancelEliteLoading} onClick={() => toggleModal(false)} className="btn btn--dark cancel-elite-membership__btn">{intl(commonMessages.no)}</Button>
            <Button disabled={cancelEliteLoading} loading={cancelEliteLoading} className="btn btn--medium-blue cancel-elite-membership__btn" onClick={() => cancelEliteMembership({ type: 'changePlan', path: isUserSilverMember ? AppRoutes.DOWNGRADE_SILVER_TO_BRONZE : AppRoutes.DOWNGRADE_GOLD_TO_BRONZE })}>{intl(commonMessages.yes)}</Button>
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
  isUserSilverMember: PropTypes.bool
}

export default CancelMembershipModal
