import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Form, Button } from 'semantic-ui-react'
import { InputBox, InputCheckBox } from 'utils/formUtils'
import { Link } from 'react-router-dom'
import {
  setInLocalStorage,
  removeFromLocalStorage,
  retrieveFromLocalStorage
} from 'utils/helpers'
import Validator from 'utils/validator'
import FacebookLogin from './facebookLogin'
import GoogleLogin from './googleLogin'
import SeoTags from 'common/SeoTags'
import SeoTexts from 'constants/seoConstants'
import { signInSnippet } from 'constants/seoScriptConstants'
import { AppRoutes } from 'constants/appRoutes'
import LoginWithApple from './appleLogin'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import authMessages from 'constants/messages/authMessages'

const LoginForm = (props) => {
  const {
    auth: { isLoggingIn, logginError },
    updateReducerState
  } = props
  // state manupulation
  const [logindetails, setLoginDetails] = useState({
    email: '',
    password: ''
  })
  const [rememberMe, setRemember] = useState(false)
  const [error, setErrors] = useState({})
  const appendParams = sessionStorage.getItem('queryParamsGA')
  const { email, password } = logindetails
  useEffect(() => {
    props.pageAnalytics()
    const userData = retrieveFromLocalStorage('remember')
    if (userData) {
      const user = JSON.parse(userData)
      if (user.rememberMe) {
        setLoginDetails({
          ...logindetails,
          email: user.email,
          password: user.password
        })
        setRemember(true)
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => () => {
      if (retrieveFromLocalStorage('helpCenter')) {
        removeFromLocalStorage('helpCenter')
      }
      updateReducerState('auth', 'logginError', null)
      // eslint-disable-next-line
    },[])

  // For login form validation
  const _isValid = (field = null, value) => {
    if (field) {
      logindetails[field] = value
    }
    const validate = Validator.createValidator(
      {
        email: ['email'],
        password: ['minLength|6']
      },
      {
        email: logindetails.email,
        password: logindetails.password
      },
      field,
      {
        email: '',
        password: ''
      }
    )

    return validate
  }

  // Validations on blur
  const validateOnBlur = (name, value) => {
    const { errors } = _isValid(name, value)
    setErrors({ ...error, [name]: errors[name] })
  }

  const handleSignInClick = () => {
    const { handleSignIn } = props
    const { isValid } = _isValid()
    if (isValid) {
      if (rememberMe) {
        const data = {
          email,
          password,
          rememberMe
        }
        setInLocalStorage('remember', JSON.stringify(data))
      } else {
        removeFromLocalStorage('remember')
      }
      const data = {
        user: {
          email: email.toLowerCase(),
          password: password
        }
      }
      handleSignIn(data)
    } else {
      const { errors } = _isValid()
      setErrors({ ...errors })
    }
  }

  const handlerSetDetails = (name, value) => {
    setLoginDetails({
      ...logindetails,
      [name]: value
    })
    setErrors({ ...error, [name]: null })
  }
  const errorCond = (error && (error.email
    || error.password
    )) ? true : false
  const isDisabled =
   (!email || !password) || errorCond
  return (
    <>
      <SeoTags
        title={SeoTexts.SIGN_IN_TITLE}
        metaDescription={SeoTexts.SIGN_IN_DESCRIPTION}
        canonicalLink={SeoTexts.SIGN_IN_CANONICAL}
        ogImgUrl={SeoTexts.SIGN_IN_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.SIGN_IN_TWITTER_IMAGE_URL}
        richSnippet={signInSnippet}
      />
      <Form autoComplete="off" className="signin-signup-form">
        <Grid>
          <InputBox
            errorMessage={error.email}
            label={intl(commonMessages.emailAddress)}
            placeholder={intl(commonMessages.emailAddress)}
            type={'text'}
            name={'email'}
            onChange={(value) => handlerSetDetails('email', value.trim())}
            onBlur={(e) => validateOnBlur(e.target.name, e.target.value)}
            value={email}
            maxLength={70}
            className="required-field emailInput"
          />
          <InputBox
            errorMessage={error.password}
            label={intl(commonMessages.password)}
            placeholder={intl(commonMessages.password)}
            type={'password'}
            onChange={(value) => handlerSetDetails('password', value.trim())}
            onBlur={(e) => validateOnBlur(e.target.name, e.target.value)}
            name={'password'}
            value={password}
            className="required-field"
          />
          {error && error.password && (
            <span className="error-message">{error.password}</span>
          )}
          <Grid.Row columns={2} className="pt-0 rm-fp">
            <Grid.Column className="pr-5px">
              <InputCheckBox
                label={intl(commonMessages.rememberMe)}
                value={rememberMe}
                name={'remember'}
                onClick={() => setRemember(!rememberMe)}
              />
            </Grid.Column>
            <Grid.Column className="pl-5px" textAlign="right">
              <Link
                to={`${AppRoutes.FORGET_PASSWORD}${appendParams? appendParams :''}`}
                className="link-dark link-hover-medium-blue"
              >
                {intl(commonMessages.forgotPassword)}?
              </Link>
            </Grid.Column>
          </Grid.Row>
          {logginError && (
            <Grid.Row className="py-0">
              <Grid.Column columns={16}>
                <span className="error-msg">{logginError}</span>
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row columns={2} className="pb-0">
            <Grid.Column className="pr-5px">
              <Button
                disabled={isLoggingIn || isDisabled}
                loading={isLoggingIn}
                onClick={handleSignInClick}
                className="btn btn--dark w-100 signin-signup-form--btn"
              >
                {intl(commonMessages.signIn)}
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-0">
            <Grid.Column width={16}>
              <div className="divider divider--with-text">
                <span>{intl(authMessages.loginSignInWith)}</span>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="py-0 social-login-wrap">
            <div className="social-login ">
              <GoogleLogin {...props} source={'login'} />
            </div>
            <div className="social-login ">
              <FacebookLogin {...props} source={'login'} />
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

LoginForm.propTypes = {
  history: PropTypes.object,
  handleSignIn: PropTypes.func,
  auth: PropTypes.object,
  pageAnalytics: PropTypes.func,
  updateReducerState: PropTypes.func
}

export default LoginForm
