import React, { useState } from 'react'
import { Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Close } from 'utils/svgs'
import RegisterForm from 'components/Auth/registerForm'
import { FbIconPopup , AppleIconPopup , GoogleIconPopup  } from 'utils/svgs'

const CalendarSignupPopup = (props) => {
  const { calendarSignupModal, updateReducerState, handleRegister } = props
  const [closeCounter, setCloseCounter] = useState(0)

  return (
    <Modal
      open={calendarSignupModal}
      onClose={() => {
          setCloseCounter(closeCounter + 1)
          updateReducerState('flights', 'calendarSignupModal', false)
        }}
      closeIcon={
        closeCounter < 1 &&
        <div>
          <Close className="cst-popup__close" />
        </div>
      }
      closeOnDimmerClick={false}
      className="cst-popup cal-popup"
      closeOnEscape={false}
    >
      <Modal.Content className="p-0 mb-2">
        <>
          <h2 className="px-3">Sign Up to See Full Year Flights  Availability </h2>
          <RegisterForm {...props} handleRegister={handleRegister} label={'signupPopup'} />
        </>
      </Modal.Content>
      <div className="cal-social-login-wrap"> 
          <GoogleIconPopup/>
          <FbIconPopup/>
          <AppleIconPopup/>
      </div>
    </Modal>
  )
}

CalendarSignupPopup.propTypes = {
  calendarSignupModal: PropTypes.bool,
  updateReducerState: PropTypes.func,
  handleRegister: PropTypes.func
}

export default CalendarSignupPopup
