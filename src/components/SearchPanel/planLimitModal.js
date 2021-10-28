import React from 'react'
import { Close, PlaneCircle } from 'utils/svgs'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'
import history from 'utils/history'
import Messages from 'constants/messages'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import searchPanelMessages from 'constants/messages/searchPanelMessages'

const PlanLimitModal = (props) => {
  const { toggalPlanLimitModal, updateReducerState, createAlertsLimit} = props

  const redirectUser = () => {
    updateReducerState('searchPanel', 'toggalPlanLimitModal', false)
    history.push(AppRoutes.PRICING)
  }

  return (
    <Modal
      open={toggalPlanLimitModal}
      closeIcon={<div><Close className="cst-popup__close" /></div>}
      onClose={() => updateReducerState('searchPanel', 'toggalPlanLimitModal', false)}
      size="small"
      className="cst-popup"
    >
      <PlaneCircle className="cst-popup__image" />
        <>
          <p className="cst-popup__text">{`You can only have ${createAlertsLimit} ${Messages.CREATE_ALERT_LIMIT}`}</p>
          <div className="cst-popup__buttons justify-content-center">
            <Button onClick={redirectUser} className="btn btn--medium-blue">{intl(searchPanelMessages.upgradeMembershipTitle)} </Button>
          </div>
        </>
    </Modal>
  )
}

PlanLimitModal.propTypes = {
  toggalPlanLimitModal: PropTypes.bool,
  updateReducerState: PropTypes.func,
  createAlertsLimit: PropTypes.number
}
export default PlanLimitModal
