import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'
import { Close, ThankyouThumb } from '../../utils/svgs'
import { retrieveFromLocalStorage, navigateToRespectivePage } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import commonMessages from 'constants/messages/commonMessages';
import './assets/scss/virginAtlantic.scss'

const ThankyouVirginModal = (props) => {
  const { toggleThankyouVaModal, updateReducerState , thankyouMessage } = props
  const token = retrieveFromLocalStorage('token')
  const appendParams = sessionStorage.getItem('queryParamsGA')

  const redirectHandler = () => {
    updateReducerState('pages', 'toggleThankyouVaModal', false)
    navigateToRespectivePage(AppRoutes.SIGN_UP, appendParams)
  }

  return (
    <>
      <Modal
        open={toggleThankyouVaModal}
        onClose={() => updateReducerState('pages', 'toggleThankyouVaModal', false)}
        closeIcon={<div><Close className="cst-popup__close" /></div>}
        closeOnDimmerClick={false}
        className="thankyou-popup-class"
      >
        <Modal.Content className="p-0">
          <div className="thanyou-icon">
            <ThankyouThumb />
          </div>
          <h2>{intl(pagesMessages.thankyouTitle)}!</h2>
          <p> {thankyouMessage} </p>
          {!token &&
            <>
              <p>{intl(pagesMessages.thankyouTextTwo)} </p>
              <p>{intl(pagesMessages.thankyouTextThree)}</p>
              <Button onClick={redirectHandler} content={intl(commonMessages.signUpTitle)} className="btn btn--medium-blue" />
            </>
          }
        </Modal.Content>
      </Modal>
    </>
  )
}

ThankyouVirginModal.propTypes = {
  toggleThankyouVaModal: PropTypes.bool,
  updateReducerState: PropTypes.func
}

export default ThankyouVirginModal
