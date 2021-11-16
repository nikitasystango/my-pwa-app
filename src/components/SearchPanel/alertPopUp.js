import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Close, BellIconCircle } from '../../utils/svgs'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import searchPanelMessages from 'constants/messages/searchPanelMessages'
import { navigateToRespectivePage } from 'utils/helpers'


const AlertPopUp = (props) => {
  const { toggalAlertModal, handlerToggalAlertModal } = props
  const appendParams = sessionStorage.getItem('queryParamsGA') || ''

  const continueWithoutLoginHandler = () => {
    handlerToggalAlertModal()
  }

  return (
    <Modal
      open={toggalAlertModal}
      closeIcon={<div><Close className="cst-popup__close" /></div>}
      onClose={handlerToggalAlertModal}
      size="small"
      className="cst-popup alert-popup signUpAvailability-modal"
    >
      <BellIconCircle className="cst-popup__image" />
      <h2 className="cst-popup__title">{intl(searchPanelMessages.alertPopUpTitle)}</h2>
      <p className="cst-popup__text">{intl(searchPanelMessages.alertPopUpText)}</p>
      <div className="cst-popup__buttons">
        <Button onClick={() => continueWithoutLoginHandler()} className="btn btn--outline-medium-blue">{intl(searchPanelMessages.continueWithSearch)}</Button>
        <Button onClick={() => navigateToRespectivePage(AppRoutes.SIGN_UP, appendParams)} className="btn btn--medium-blue">{intl(commonMessages.signUpNow)}</Button>
      </div>
      <p className="cst-popup__text">{intl(commonMessages.AlreadyHaveAnAccount)} <Link to={`${AppRoutes.SIGN_IN}${appendParams ? appendParams : ''}`} className="text-medium-blue">{intl(commonMessages.signIn)}</Link></p>
    </Modal>
  )
}

AlertPopUp.propTypes = {
  toggalAlertModal: PropTypes.bool,
  handlerToggalAlertModal: PropTypes.func
}
export default AlertPopUp

