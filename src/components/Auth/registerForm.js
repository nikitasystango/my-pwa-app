import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Form, Button } from 'semantic-ui-react'
import { InputBox } from 'utils/formUtils'
import Validator from 'utils/validator'
import FacebookLogin from './facebookLogin'
import GoogleLogin from './googleLogin'
import SeoTags from 'common/SeoTags'
import SeoTexts from 'constants/seoConstants'
import { signUpSnippet } from 'constants/seoScriptConstants'
import LoginWithApple from './appleLogin'
import axios from 'axios'
import env from '../../utils/env_variables'
import { isEmpty } from '../../utils/validator/rules'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import authMessages from 'constants/messages/authMessages'
import { retrieveFromLocalStorage } from 'utils/helpers'
import { validateEmail } from 'utils/helpers'
import PasswordAcceptance from 'common/PasswordAcceptance'
import { Link } from 'react-router-dom'
import layoutMessages from 'constants/messages/layoutMessages'
import { AppRoutes } from 'constants/appRoutes'

const RegisterForm = (props) => {
  const {
    updateReducerState,
    auth: { isRegistering, signupError },
    label = ''
  } = props
  // state manupulation
  const [signupDetails, setSinupDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setErrors] = useState({})
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  } = signupDetails

  useEffect(() => {
    const { pageAnalytics } = props
    pageAnalytics()
    return () => {
      updateReducerState('auth', 'signupError', null)
    }
    // eslint-disable-next-line
  }, []);

  // For login form validation
  const _isValid = (field = null, value) => {
    if (field) {
      signupDetails[field] = value
    }
    const validate = Validator.createValidator(
      {
        firstName: ['minLength|2', 'noSpecialCharacter'],
        lastName: ['minLength|2', 'noSpecialCharacter'],
        password: ['minLength|8', 'strongPassword'],
        confirmPassword: ['match|password']
      },
      {
        firstName: signupDetails.firstName,
        lastName: signupDetails.lastName,
        email: signupDetails.email,
        password: signupDetails.password,
        confirmPassword: signupDetails.confirmPassword
      },
      field,
      {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    )
    return validate
  }

  const handlerSetSignupdetails = (name, value) => {
    setSinupDetails({
      ...signupDetails,
      [name]: value
    })
    if (signupError && name !== 'firstName' && name !== 'lastName') {
      updateReducerState('auth', 'signupError', null)
    }
    setErrors({ ...error, [name]: null })
  }

  // Validations on blur email
  const validateOnBlurEmail = async (name, value) => {
    const emailAddress = value.toLowerCase()
    if (!validateEmail(email)) {
      setErrors({ ...error, email: intl(authMessages.invalidEmail) })
      return true
    }
    const url = `https://apilayer.net/api/check?access_key=${env.REACT_APP_MAILBOX_API_ACCESSKEY}&email=${emailAddress}`
    const response = await axios.get(url)
    if (
      !isEmpty(value) &&
      response &&
      response.data &&
      (response.data.disposable ||
        !response.data.format_valid ||
        !response.data.mx_found)
    ) {
      setErrors({
        ...error,
        [name]: response.data.disposable
          ? intl(authMessages.invalidDisposableEmail)
          : intl(authMessages.invalidEmail)
      })
    } else {
      setErrors({ ...error, [name]: undefined })
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

  // handle sign up
  const handleSignUpClick = () => {
    const { handleRegister } = props
    const { isValid } = _isValid()
    if (!validateEmail(email)) {
      setErrors({ ...error, email: intl(authMessages.invalidEmail) })
      return true
    }
    if (
      isValid &&
      error &&
      (!error.email || error.email === undefined || error.email === '')
    ) {
      const tapfiliateReference = retrieveFromLocalStorage(
        'tapfiliateReference'
      )
      const data = {
        user: {
          first_name: firstName,
          last_name: lastName,
          email: email.toLowerCase(),
          password: password,
          password_confirmation: confirmPassword,
          affiliate_id: tapfiliateReference ? tapfiliateReference : null
        }
      }
      handleRegister(data)
    } else {
      const { errors } = _isValid()
      setErrors({ ...errors, email: error.email })
    }
  }
  const errorCond =
    error &&
    (error.firstName ||
      error.lastName ||
      error.email ||
      error.password ||
      error.confirmPassword)
      ? true
      : false
  const isDisabled =
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    errorCond
  return (
    <>
      <SeoTags
        title={SeoTexts.SIGN_UP_TITLE}
        metaDescription={SeoTexts.SIGN_UP_DESCRIPTION}
        canonicalLink={SeoTexts.SIGN_UP_CANONICAL}
        ogImgUrl={SeoTexts.SIGN_UP_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.SIGN_UP_TWITTER_IMAGE_URL}
        richSnippet={signUpSnippet}
      />
      <Form className="signin-signup-form">
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
              <InputBox
                errorMessage={error.firstName}
                label={intl(commonMessages.firstName)}
                placeholder={intl(commonMessages.firstName)}
                type={'text'}
                name={'firstName'}
                onBlur={(e) =>
                  validateOnBlur(
                    e.target.name,
                    e.target.value.trimStart().replace(/[^A-Za-z]/gi, '')
                  )
                }
                onChange={(value) =>
                  handlerSetSignupdetails(
                    'firstName',
                    value.trimStart().replace(/[^A-Za-z]/gi, '')
                  )
                }
                value={firstName}
                maxLength={25}
                className=" required-field signin-signup-form__first-name"
              />
              {error && error.firstName && (
                <span className="error-message">{error.firstName}</span>
              )}
            </Grid.Column>
            <Grid.Column
              className="last_name_column"
              mobile={16}
              tablet={8}
              computer={8}
              widescreen={8}
            >
              <InputBox
                errorMessage={error.lastName}
                label={intl(commonMessages.lastName)}
                placeholder={intl(commonMessages.lastName)}
                type={'text'}
                name={'lastName'}
                onBlur={(e) =>
                  validateOnBlur(
                    e.target.name,
                    e.target.value.trimStart().replace(/[^A-Za-z]/gi, '')
                  )
                }
                onChange={(value) =>
                  handlerSetSignupdetails(
                    'lastName',
                    value.trimStart().replace(/[^A-Za-z]/gi, '')
                  )
                }
                value={lastName}
                maxLength={25}
                className="required-field signin-signup-form__last-name"
              />
              {error && error.lastName && (
                <span className="error-message">{error.lastName}</span>
              )}
            </Grid.Column>
          </Grid.Row>
          <InputBox
            errorMessage={error.email}
            label={intl(commonMessages.emailAddress)}
            placeholder={intl(commonMessages.emailAddress)}
            type={'text'}
            name={'email'}
            onChange={(value) => handlerSetSignupdetails('email', value.trim())}
            onBlur={(e) =>
              e.target.value &&
              validateOnBlurEmail('email', e.target.value.trim())
            }
            value={email}
            maxLength={70}
            className="required-field emailInput"
          />
          <InputBox
            errorMessage={error.password}
            label={intl(commonMessages.password)}
            placeholder={intl(commonMessages.password)}
            onBlur={(e) =>
              password && validateOnBlur(e.target.name, e.target.value)
            }
            type={'password'}
            onChange={(value) =>
              handlerSetSignupdetails('password', value.trim())
            }
            name={'password'}
            value={password}
            className={`required-field ${
              label === 'signupPopup' ? 'signin-signup-form__first-name' : ''
            }`}
          />
          {password &&
          <span className="mb-2">
            <PasswordAcceptance value={password} />
          </span>
          }
          <InputBox
            errorMessage={error.confirmPassword}
            label={intl(commonMessages.confirmPassword)}
            placeholder={intl(commonMessages.password)}
            type={'password'}
            onBlur={(e) => validateOnBlur(e.target.name, e.target.value)}
            onChange={(value) =>
              handlerSetSignupdetails('confirmPassword', value.trim())
            }
            name={'confirmPassword'}
            value={confirmPassword}
            className={`required-field ${
              label === 'signupPopup'
                ? 'signin-signup-form__last-name co-pass'
                : ''
            }`}
          />
          {error && error.confirmPassword && (
            <span className="error-message">{error.confirmPassword}</span>
          )}
          {signupError && (
            <Grid.Row className="py-0">
              <Grid.Column>
                <span className="error-msg">{signupError}</span>
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row columns={2} className="pb-0 signup-button">
            <Grid.Column>
              <Button
                disabled={isRegistering || isDisabled}
                loading={isRegistering}
                onClick={handleSignUpClick}
                className="btn btn--dark w-100 signin-signup-form--btn"
              >
                {intl(commonMessages.signUp)}
              </Button>
            </Grid.Column>
          </Grid.Row>
          <span className="mt-2">
            {intl(authMessages.signupForAccountText)}{' '}
            <Link to={AppRoutes.PRIVACY_POLICY} className="text-medium-blue">
              {intl(layoutMessages.privacyPolicyTitle)}
            </Link> { '' }
            & { '' }
            <Link to={AppRoutes.TERMS_OF_USE} className="text-medium-blue">
              {intl(layoutMessages.termsOfUseTitle)}
            </Link>
          </span>
          <Grid.Row className="py-0">
            <Grid.Column width={16} className="pr-5px">
              <div className="divider divider--with-text">
                <span>{intl(authMessages.signUpWith)}</span>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-0 social-login-wrap">
            <div className="social-login ">
              <GoogleLogin {...props} source={'signup'} />
            </div>
            <div className="social-login ">
              <FacebookLogin {...props} source={'signup'} />
            </div>
            <div className="social-login ">
              <LoginWithApple {...props} />
            </div>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  )
}

RegisterForm.propTypes = {
  handleRegister: PropTypes.func,
  auth: PropTypes.object,
  pageAnalytics: PropTypes.func,
  updateReducerState: PropTypes.func
}

export default RegisterForm
