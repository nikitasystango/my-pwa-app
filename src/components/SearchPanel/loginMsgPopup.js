import React from 'react'
import { Close, PlaneCircle } from 'utils/svgs'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'
import { retrieveFromLocalStorage, navigateToRespectivePage } from 'utils/helpers';
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import searchPanelMessages from 'constants/messages/searchPanelMessages';

const LoginMagPopup = (props) => {
  const { toggalMapEliteLoginPopUp, updateReducerState } = props
  const token = retrieveFromLocalStorage('token')
  const appendParams = sessionStorage.getItem('queryParamsGA')

  const toggalMapElitePopuphandler = () => {
    updateReducerState('searchPanel', 'toggalMapEliteLoginPopUp', !toggalMapEliteLoginPopUp)
  }

  const redirectHandler = (path) => {
    toggalMapElitePopuphandler()
    navigateToRespectivePage(path, appendParams)
  }

  return (
    <Modal
      open={toggalMapEliteLoginPopUp}
      closeIcon={<div><Close className="cst-popup__close" /></div>}
      onClose={() => toggalMapElitePopuphandler()}
      size="small"
      className="cst-popup"
    >
      <PlaneCircle className="cst-popup__image" />
      {token ?
        <>

          <p className="cst-popup__text">{intl(searchPanelMessages.youNeedSilverOrGoldMembership)}
          </p>
          <div className="cst-popup__buttons justify-content-center">
            <Button onClick={() => redirectHandler(AppRoutes.PRICING)} className="btn btn--medium-blue">{intl(searchPanelMessages.upgradeMembershipTitle)}</Button>
          </div>
        </>
        :
        <>
          <p className="cst-popup__text">{intl(searchPanelMessages.loginToSearchMapTitle)}</p>
          <div className="cst-popup__buttons">
            <Button onClick={() => redirectHandler('sign-in')} className="btn btn--dark">{intl(commonMessages.signIn)}</Button>
            <Button onClick={() => redirectHandler('sign-up')} className="btn btn--medium-blue">{intl(commonMessages.signUpTitle)}</Button>
          </div>
        </>
      }
    </Modal>
  )
}

LoginMagPopup.propTypes = {
  toggalMapEliteLoginPopUp: PropTypes.bool,
  updateReducerState: PropTypes.func
}
export default LoginMagPopup

