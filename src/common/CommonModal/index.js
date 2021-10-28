import React from 'react'
import { Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Close, SadIcon } from 'utils/svgs'

const CommonModalComponent = (props) => {
  const { toggalAlertModal, setToggalAlertModal, subTitleMessage } = props
  return (
    <Modal
      open={toggalAlertModal}
      onClose={() => setToggalAlertModal(false)}
      closeIcon={
        <div>
          <Close className="cst-popup__close" />
        </div>
      }
      closeOnDimmerClick={false}
      className="cst-popup change-password-modal cancel-plan"
    >
      <Modal.Content className="p-0 mb-2">
        <>
          <SadIcon className="cst-popup__image" />
          <p className="cst-popup__text mt-1"> {subTitleMessage}</p>
        </>
      </Modal.Content>
    </Modal>
  )
}

CommonModalComponent.propTypes = {
  toggalAlertModal: PropTypes.bool,
  setToggalAlertModal: PropTypes.func,
  subTitleMessage: PropTypes.string
}

export default CommonModalComponent
