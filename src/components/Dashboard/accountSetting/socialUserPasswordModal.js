import React, { useState } from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'
import { InputBox } from 'utils/formUtils'
import Validator from 'utils/validator'
import PropTypes from 'prop-types'
import { retrieveFromLocalStorage } from 'utils/helpers'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import '../assets/change-password-modal.scss'
import PasswordAcceptance from 'common/PasswordAcceptance'
import authMessages from 'constants/messages/authMessages'

const SocialUserPasswordModal = (props) => {

  const { setSocialUserPasswordLoading, setSocialUserPassword } = props
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setErrors] = useState({})
  const { newPassword, confirmPassword } = password

  const setPasswordHandler = () => {
    const { isValid } = _isValid()
    if (isValid) {
      const token = retrieveFromLocalStorage('token')
      const data = {
        user: {
          access_token: token,
          password: newPassword
        }
      }
      setSocialUserPassword(data)
    } else {
      const { errors } = _isValid()
      setErrors({ ...errors })
    }
  }

  // Validations on blur
  const validateOnBlur = (name, value) => {
    const { errors } = _isValid(name, value)
    if (name === 'confirmPassword') {
      setErrors({
        ...error,
        confirmPassword: confirmPassword ? errors?.confirmPassword : undefined
      })
    } else {
    setErrors({ ...error, [name]: errors[name] })
    }
  }

  const _isValid = (field = null, value) => {
    if (field) {
      password[field] = value
    }
    const validate = Validator.createValidator(
      {
        newPassword: ['minLength|8', 'strongPassword'],
        confirmPassword: ['match|newPassword']
      },
      {
        newPassword: password.newPassword,
        confirmPassword: password.confirmPassword
      },
      field,
      {
        newPassword: '',
        confirmPassword: ''
      }
    )

    return validate
  }

  const addPasswordHandler = (name, value) => {
    setPassword({
      ...password,
      [name]: value
    })
    setErrors({ ...error, [name]: undefined })
  }

  const errorCond =
  error && (error.newPassword || error.confirmPassword)
    ? true
    : false
const isDisable =
  errorCond || !newPassword || !confirmPassword

  return (
    <>
      <Form onSubmit={setPasswordHandler} className="text-left">
        <Grid>
          <Grid.Row className="py-0 mb-2">
            <Grid.Column mobile={16} tablet={6} computer={6}>
              <InputBox
              errorMessage={error.newPassword}
              name="newPassword"
              type={'password'}
              label={intl(authMessages.newPasswordText)}
              placeholder={intl(authMessages.newPasswordText)}
              value={newPassword}
              onChange={value => addPasswordHandler('newPassword', value.trim())}
              onBlur={(e) => newPassword && validateOnBlur(e.target.name, e.target.value)}
              />
            </Grid.Column>
          </Grid.Row>
          <span className="mb-2">
            <PasswordAcceptance value={newPassword} />
          </span>
          <Grid.Row className="py-0 mb-2">
            <Grid.Column mobile={16} tablet={6} computer={6}>
              <InputBox
              value={confirmPassword}
              errorMessage={error.confirmPassword}
              name="confirmPassword"
              type={'password'}
              label={intl(commonMessages.confirmPassword)}
              placeholder={intl(commonMessages.confirmPassword)}
              onChange={value => addPasswordHandler('confirmPassword', value.trim())}
              onBlur={(e) => validateOnBlur(e.target.name, e.target.value)}
              />
              {error && error.confirmPassword && (
              <span className="error-text">{error.confirmPassword}</span>
              )}
            </Grid.Column>
          </Grid.Row>
          <Form.Field className="cst-popup__buttons mt-1 mb-0">
            <Button disabled={setSocialUserPasswordLoading || isDisable} loading={setSocialUserPasswordLoading} size={'small'} color="grey" content={intl(commonMessages.save)} className="btn btn--medium-blue change-password-modal__btn" />
          </Form.Field>
        </Grid>
      </Form>
    </>
  )
}

SocialUserPasswordModal.propTypes = {
  setSocialUserPassword: PropTypes.func,
  setSocialUserPasswordLoading: PropTypes.bool,
  toggleSetSocialUserPasswordModal: PropTypes.bool,
  toggleModals: PropTypes.func
}

export default SocialUserPasswordModal
