import React, { useState } from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'
import { InputBox } from 'utils/formUtils'
import Validator from 'utils/validator'
import PropTypes from 'prop-types'
import { retrieveFromLocalStorage } from 'utils/helpers'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import '../assets/change-password-modal.scss'
import dashboardMessages from 'constants/messages/dashboardMessages'
import PasswordAcceptance from 'common/PasswordAcceptance'

const ChangePassword = (props) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setErrors] = useState({})

  const { changeUserPasswordLoading, updateUserPassword } = props

  const changePasswordHandler = () => {
    const { isValid } = _isValid()
    if (isValid) {
      const token = retrieveFromLocalStorage('token')
      const data = {
        user: {
          access_token: token,
          current_password: oldPassword,
          password: newPassword,
          password_confirmation: confirmPassword
        }
      }
      updateUserPassword(data)
    } else {
      const { errors } = _isValid()
      setErrors({ ...errors })
    }
  }

  // Validations on blur
  const validateOnBlur = (name) => {
    const { errors } = _isValid(name)
    if (name === 'confirmPassword') {
      setErrors({
        ...error,
        confirmPassword: confirmPassword ? errors?.confirmPassword : undefined
      })
    } else {
      setErrors({ ...error, [name]: errors[name] })
    }
  }

  const _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        newPassword: ['minLength|8', 'strongPassword'],
        confirmPassword: ['match|newPassword']
      },
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      },
      field,
      {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    )

    return validate
  }

  const errorCond =
    error && (error.oldPassword || error.newPassword || error.confirmPassword)
      ? true
      : false
  const isDisable =
    errorCond || !oldPassword || !newPassword || !confirmPassword

  return (
    <>
      <Form onSubmit={changePasswordHandler} className="text-left">
        <Grid>
          <Grid.Row className="py-0 mb-1">
            <Grid.Column mobile={16} tablet={5} computer={8}>
              <h2 className="tabsHeading">
                {intl(dashboardMessages.accountSettingPassHead)}
              </h2>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-0 mb-2">
            <Grid.Column mobile={16} tablet={6} computer={6}>
              <InputBox
              errorMessage={error.oldPassword}
              name="oldPassword"
              type={'password'}
              value={oldPassword}
              label={intl(commonMessages.oldPassword)}
              placeholder={intl(commonMessages.oldPassword)}
              onChange={value => {
                setOldPassword(value.trim())
                setErrors({ ...error, oldPassword: undefined })
              }}
              onBlur={(e) => validateOnBlur(e.target.name)}
              className="mandetory-field"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-0 mb-2">
            <Grid.Column mobile={16} tablet={6} computer={6}>
              <InputBox
          errorMessage={error.newPassword}
          name="newPassword"
          type={'password'}
          label={intl(commonMessages.newPassword)}
          placeholder={intl(commonMessages.newPassword)}
          value={newPassword}
          onChange={value => {
            setNewPassword(value.trim())
            setErrors({ ...error, newPassword: undefined })
          }}
          onBlur={(e) => newPassword && validateOnBlur(e.target.name)}
          className="mandetory-field"
              />
            </Grid.Column>
          </Grid.Row>
          <span className="mb-2">
            <PasswordAcceptance value={newPassword} />
          </span>
          <Grid.Row className="py-0 mb-1">
            <Grid.Column mobile={16} tablet={6} computer={6}>
              <InputBox
              value={confirmPassword}
              errorMessage={error.confirmPassword}
              name="confirmPassword"
              type={'password'}
              label={intl(commonMessages.confirmPassword)}
              placeholder={intl(commonMessages.confirmPassword)}
              onChange={value => {
                setConfirmPassword(value.trim())
                setErrors({ ...error, confirmPassword: undefined })
              }}
              onBlur={(e) => validateOnBlur(e.target.name)}
              className="mandetory-field"
              />
              {error && error.confirmPassword && (
                <span className="error-text">{error.confirmPassword}</span>
              )}
            </Grid.Column>
          </Grid.Row>
          <Form.Field className="cst-popup__buttons mt-1 mb-0">
            <Button
              disabled={isDisable || changeUserPasswordLoading}
              loading={changeUserPasswordLoading}
              size={'small'}
              color="grey"
              content={intl(commonMessages.saveChanges)}
              className="btn btn--medium-blue change-password-modal__btn"
            />
          </Form.Field>
        </Grid>
      </Form>
    </>
  )
}

ChangePassword.propTypes = {
  updateUserPassword: PropTypes.func,
  changeUserPasswordLoading: PropTypes.bool
}

export default ChangePassword
