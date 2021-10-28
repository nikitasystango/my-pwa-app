import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Form, Button } from 'semantic-ui-react'
import { InputBox } from 'utils/formUtils'
import Validator from 'utils/validator'
import { ForgotPasswordImage } from '../../utils/svgs'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import forgotPassword from 'constants/messages/forgotPassword'
import PasswordAcceptance from 'common/PasswordAcceptance'
import authMessages from 'constants/messages/authMessages'
const ResetPasswordForm = (props) => {
  // state manupulation
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setErrors] = useState({})


  useEffect(() => {
    const { pageAnalytics } = props
    pageAnalytics()
    // eslint-disable-next-line
  }, [])

  // For reset form validation
  const _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        password: ['strongPassword'],
        confirmPassword: ['match|password']
      },
      {
        password,
        confirmPassword
      },
      field,
      {
        password: '',
        confirmPassword: ''
      }
    )
    return validate
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

  // handle reset password
  const handleSaveClick = () => {
    const { handleResetPassword, match: { params: { reset_token } } } = props
    if (reset_token) {
      const { isValid } = _isValid()
      if (isValid) {
        const data = {
          user: {
            reset_password_token: reset_token,
            password
          }
        }
        handleResetPassword(data)
      } else {
        const { errors } = _isValid()
        setErrors({ ...errors })
      }
    }
  }
   const handleChange = (value, label) =>{
    if (label === 'password') {
      setPassword(value)
    }else{
      setConfirmPassword(value)
    }
    setErrors({ ...error, [label]: null })
   }

  const { forgotPassword: { resetPasswordLoading, resetPasswordError } } = props

  const errorCond =
  error && (error.password || error.confirmPassword)
    ? true
    : false
const isDisable =
  errorCond || !password || !confirmPassword

  return (
    <div className="forgot-password">
      <ForgotPasswordImage className="forgot-password__image" />
      <h3 className="forgot-password__title">{intl(commonMessages.resetPassword)}</h3>
      <p className="forgot-password__text mx-auto">{intl(forgotPassword.resetPasswordText)}</p>
      <Form autoComplete="off" className="forgot-password__form">
        <Grid className="m-0">
          <Grid.Row className="pt-0">
            <Grid.Column width={16}>
              <InputBox
                errorMessage={error.password}
                placeholder={intl(authMessages.newPasswordText)}
                type={'password'}
                onChange={value => handleChange(value.trim(), 'password')}
                name={'password'}
                onBlur={(e) => password && validateOnBlur(e.target.name)}
                value={password}
              />
            </Grid.Column>
          </Grid.Row>
          <span className="mb-2 text-left">
            <PasswordAcceptance value={password} />
          </span>
          <Grid.Row className="pt-0">
            <Grid.Column width={16}>
              <InputBox
                errorMessage={error.confirmPassword}
                placeholder={intl(commonMessages.confirmPassword)}
                type={'password'}
                onChange={value => handleChange(value.trim(), 'confirmPassword')}
                name={'confirmPassword'}
                onBlur={(e) => validateOnBlur(e.target.name)}
                value={confirmPassword}
              />
            </Grid.Column>
            {error && error.confirmPassword && (
            <span className="error-text ml-1">{error.confirmPassword}</span>
              )}
          </Grid.Row>
          {
            resetPasswordError &&
            <Grid.Row className="pt-0">
              <Grid.Column columns={16}>
                <span className="error-msg">{resetPasswordError}</span>
              </Grid.Column>
            </Grid.Row>
          }
          <Grid.Row className="pt-0">
            <Grid.Column>
              <Button disabled={resetPasswordLoading || isDisable} loading={resetPasswordLoading} onClick={handleSaveClick} className="btn btn--medium-blue forgot-password__btn">{intl(commonMessages.save)}</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </div>
  )
}

ResetPasswordForm.propTypes = {
  handleResetPassword: PropTypes.func,
  forgotPassword: PropTypes.object,
  match: PropTypes.object,
  pageAnalytics: PropTypes.func
}

export default ResetPasswordForm
