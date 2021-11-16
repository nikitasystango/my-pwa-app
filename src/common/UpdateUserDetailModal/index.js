import React, { useState } from 'react'
import { Modal, Button, Form, Grid, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { InputBox } from 'utils/formUtils'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import { retrieveFromLocalStorage } from 'utils/helpers'
import Validator from 'utils/validator'
import './index.scss'

const UpdateUserDetailModal = (props) => {
  const [error, setErrors] = useState({})
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: ''
  })

  const { toggleModal, updateUserName, updateUserNameLoading, userId } = props
  const token = retrieveFromLocalStorage('token')
  const { firstName, lastName } = userData || {}

  const formSubmitHandlerClick = () => {
    const { isValid } = _isValid()
    if (isValid) {
      const data = {
        user: {
          access_token: token,
          first_name: firstName,
          last_name: lastName
        },
        id: userId
      }
      updateUserName({ data })
    } else {
      const { errors } = _isValid()
      setErrors({ ...errors })
    }
  }

  // Validations on blur
  const validateOnBlur = (name) => {
    const { errors } = _isValid(name)
    setErrors({ ...error, [name]: errors[name] })
  }

  // For profile form validation
  const _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        firstName: ['minLength|2', 'noSpecialCharacter'],
        lastName: ['minLength|2', 'noSpecialCharacter']
      },
      {
        firstName: firstName,
        lastName: lastName
      },
      field,
      {
        firstName: '',
        lastName: ''
      }
    )

    return validate
  }

  const handleInputChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value
    })
    setErrors({ ...error, [name]: null })
  }

  const errorCond = (error && (error.firstName || error.lastName)) ? true : false

  const isDisabled =
   (!firstName ||
    !lastName) || errorCond

  return (
    <Modal
      open={toggleModal}
      closeOnDimmerClick={false}
      className="cst-popup updateProfilePopup"
    >
      <Header content={intl(commonMessages.updateProfileDetails)} />
      <Modal.Content className="p-0 mb-2">
        <>
          <Form className="account-popup-setting__form">
            <Grid className="">
              <Grid.Row className="py-0">
                <Grid.Column className="mb-1 text-left">
                  <InputBox
                    errorMessage={error.firstName}
                    label={intl(commonMessages.firstName)}
                    placeholder={intl(commonMessages.firstName)}
                    type={'text'}
                    name={'firstName'}
                    value={firstName}
                    onChange={(name) =>
                      handleInputChange('firstName', name.trimStart().replace(/[^A-Za-z]/gi, ''))
                    }
                    maxLength={25}
                    onBlur={(e) => validateOnBlur(e.target.name)}
                    className="required-field"
                  />
                  {error && error.firstName &&
                  <span className="error-text">{error.firstName}</span>
               }
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="py-0">
                <Grid.Column className="mb-1 text-left">
                  <InputBox
                    label={intl(commonMessages.lastName)}
                    placeholder={intl(commonMessages.lastName)}
                    errorMessage={error.lastName}
                    type={'text'}
                    name={'lastName'}
                    value={lastName}
                    onChange={(name) =>
                      handleInputChange('lastName', name.trimStart().replace(/[^A-Za-z]/gi, ''))
                    }
                    maxLength={25}
                    onBlur={(e) => validateOnBlur(e.target.name)}
                    className="required-field"
                  />
                  {error && error.lastName &&
                  <span className="error-text">{error.lastName}</span>
               }
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className="py-0">
                <Grid.Column className="mt-10">
                  <Button
                    disabled={Boolean(updateUserNameLoading) || isDisabled}
                    loading={Boolean(updateUserNameLoading)}
                    size={'small'}
                    primary
                    content={intl(commonMessages.save)}
                    onClick={formSubmitHandlerClick}
                    className="btn btn--medium-blue btn--account-setting"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </>
      </Modal.Content>
    </Modal>
  )
}

UpdateUserDetailModal.propTypes = {
  toggleModal: PropTypes.bool,
  updateUserName: PropTypes.func,
  updateUserNameLoading: PropTypes.bool,
  userId: PropTypes.number
}

export default UpdateUserDetailModal
