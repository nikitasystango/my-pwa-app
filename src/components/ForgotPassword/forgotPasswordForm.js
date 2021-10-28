import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Form, Button } from 'semantic-ui-react'
import { InputBox } from 'utils/formUtils'
import Validator from 'utils/validator'
import { ForgotPasswordImage } from '../../utils/svgs'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import forgotPasswordMessages from 'constants/messages/forgotPassword'

const ForgotPasswordForm = (props) => {

  // state manupulation
  const [email, setEmail] = useState('')
  const [error, setErrors] = useState({})

  useEffect(() => {
    const { pageAnalytics } = props
    pageAnalytics()
    // eslint-disable-next-line
  }, [])

  // For forgot password form validation
  const _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        email: ['email']
      },
      {
        email: email
      },
      field,
      {
        email: ''
      }
    )

    return validate
  }


  // Validations on blur
  const validateOnBlur = (name) => {
    const { errors } = _isValid(name)
    setErrors({ ...error, [name]: errors[name] })
  }

  const handleSubmitClick = () => {
    const { handleForgotPassword } = props
    const { isValid } = _isValid()
    if (isValid) {
      handleForgotPassword(email)
    } else {
      const { errors } = _isValid()
      setErrors({ ...errors })
    }
  }

  const handleEmailChange = (email) =>{
    setEmail(email)
    setErrors({})
  }
  const { forgotPassword: { forgotPasswordLoading, forgetPasswordError } } = props
  return (
    <div className="forgot-password">
      <ForgotPasswordImage className="forgot-password__image" />
      <h3 className="forgot-password__title">{intl(commonMessages.forgotPassword)}</h3>
      <p className="forgot-password__text mx-auto">{intl(forgotPasswordMessages.forgotPasswordText)}</p>
      <Form autoComplete="off" className="forgot-password__form">
        <Grid className="m-0">
          <Grid.Row className="pt-0">
            <Grid.Column width={16}>
              <InputBox
                errorMessage={error.email}
                placeholder={intl(commonMessages.emailAddress)}
                type={'text'}
                name={'email'}
                onChange={value => handleEmailChange(value.trim())}
                onBlur={(e) => validateOnBlur(e.target.name)}
                value={email}
                maxLength={70}
              />
            </Grid.Column>
          </Grid.Row>
          {
            forgetPasswordError &&
            <Grid.Row className="pt-0">
              <Grid.Column width={16}>
                <span className="error-msg">{forgetPasswordError}</span>
              </Grid.Column>
            </Grid.Row>
          }
          <Grid.Row className="pt-0">
            <Grid.Column width={16}>
              <Button disabled={forgotPasswordLoading || !email || (error && error.email)} loading={forgotPasswordLoading} onClick={handleSubmitClick} className="btn btn--medium-blue forgot-password__btn">{intl(commonMessages.submit)}</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </div>
  )
}

ForgotPasswordForm.propTypes = {
  handleForgotPassword: PropTypes.func,
  forgotPassword: PropTypes.object,
  pageAnalytics: PropTypes.func
}

export default ForgotPasswordForm
