import React, { useState, useEffect } from 'react'
import { Form, Grid, Button } from 'semantic-ui-react'
import OtpInput from 'react-otp-input'
import { InputBox } from 'utils/formUtils'
import Validator from 'utils/validator'
import PropTypes from 'prop-types'
import { retrieveFromLocalStorage } from 'utils/helpers'
import { pushNotification } from 'utils/notifications'
import '../assets/change-password-modal.scss'
import { DeleteIcon } from 'utils/svgs'
import CountDownTimer from '../countDownTimer'
import axios from 'axios'
import env from 'utils/env_variables'
import { isEmpty } from 'utils/validator/rules'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import dashboardMessages from 'constants/messages/dashboardMessages'
import toustifyMessages from 'constants/messages/toustifyMessages'
import authMessages from 'constants/messages/authMessages'
import CustomPhoneInput from 'utils/CustomPhoneInput'
import { validateEmail } from 'utils/helpers'
import { profileCardDetails } from 'constants/globalConstants'

const AlternativeEmail = (props) => {
  const {
    toggleModals,
    userDetails,
    addAlternateEmail,
    deleteAlternateEmail,
    addAlternateEmailLoading,
    deleteAlternateEmailLoading,
    setEmailPrimary,
    resendVerificationEmail,
    verifySmsOtp,
    resendVerificationEmailLoading,
    resendSmsOtp,
    verifySmsOtpLoading,
    toggleSmsOtpSection,
    updateProfileDetails,
    updateUserProfileLoading,
    deletePhoneNumber,
    toggleTimer,
    deletePhoneNumberLoading,
    resendSmsOtpLoading,
    updateReducerState
  } = props
  const { alternateEmails, isEmailVerified, email, phoneNumber } =
    userDetails || ''
  const [error, setErrors] = useState({})
  const [verifyOtpError, setVerifyOtpError] = useState(false)
  const [showResendButton, setShowResendButton] = useState(false)
  const [isDisposable, setIsDisposable] = useState(null)
  const [alternatEmailDetails, setAlternateEmailDetails] = useState({
    primaryEmailId: '',
    emailAddressFirst: '',
    isFirstEmailVerify: false,
    firstEmailId: '',
    emailAddressSecond: '',
    isSecondEmailVerify: false,
    secondEmailId: '',
    addEmail: ''
  })

  const [mobileDetails, setMobileDetails] = useState({
    countryCode: +44,
    phone: '',
    isoCode: 'GB',
    smsOtp: ''
  })

  const token = retrieveFromLocalStorage('token')
  useEffect(() => {
    if (alternateEmails?.length) {
      const primaryEmail = alternateEmails.filter((item) => item.is_primary)
      const secondaryEmails = alternateEmails.filter(
        (item) => !item.is_primary
      )
      setAlternateEmailDetails({
        primaryEmailId: primaryEmail[0]?.id || '',
        emailAddressFirst: secondaryEmails[0]?.email || '',
        isFirstEmailVerify: secondaryEmails[0]?.verified || false,
        firstEmailId: secondaryEmails[0]?.id || '',
        emailAddressSecond: secondaryEmails[1]?.email || '',
        isSecondEmailVerify: secondaryEmails[1]?.verified || false,
        secondEmailId: secondaryEmails[1]?.id || '',
        addEmail: ''
      })
    }
    setMobileDetails({
      ...mobileDetails,
      phone: phoneNumber?.number || '',
      countryCode:
        phoneNumber && phoneNumber.country_code
          ? `+${phoneNumber?.country_code}`
          : '+44',
      isoCode: phoneNumber?.iso_country_code || 'GB',
      smsOtp: ''
    })
    if (showResendButton) {
      setShowResendButton(false)
    }
    // eslint-disable-next-line
  }, [userDetails]);

  // Validations on blur
  const validateOnBlur = (name, value) => {
    const { errors } = _isValid(name, value)
    setErrors({ ...error, [name]: errors[name] })
  }

  // Validations on blur email
  const validateOnBlurEmail = async (name, value) => {
    setIsDisposable(true)
    const emailAddress = value.toLowerCase()
    if (isEmpty(value)) {
      setErrors({ ...error, [name]: 'Required' })
      setIsDisposable(false)
      return true
    }
    if (!validateEmail(emailAddress)) {
      setErrors({ ...error, [name]: intl(authMessages.invalidEmail) })
      setIsDisposable(false)
      return true
    }
    let response = null
    try {
      const url = `https://apilayer.net/api/check?access_key=${env.REACT_APP_MAILBOX_API_ACCESSKEY}&email=${emailAddress}`
      response = await axios.get(url)
    } catch (error) {
      setIsDisposable(false)
      setErrors({ ...error, [name]: intl(toustifyMessages.somethingWentWrong) })
    }
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
      addEmailsHandler()
    }
    setIsDisposable(false)
  }

  const _isValid = (field = null, value) => {
    if (field) {
      alternatEmailDetails[field] = value
    }
    const validate = Validator.createValidator(
      {
        addEmail: ['required']
      },
      {
        addEmail: alternatEmailDetails.addEmail
      },
      field,
      {
        addEmail: ''
      }
    )

    return validate
  }

  const changeEmailsHandler = (name, value) => {
    setAlternateEmailDetails({
      ...alternatEmailDetails,
      [name]: value
    })
    if (name !== 'addEmail') {
      validateOnBlur(name, value)
    } else {
      setIsDisposable(null)
      setErrors({ ...error, [name]: undefined })
    }
  }

  const addEmailsHandler = () => {
    if (
      error &&
      (!error.addEmail || error.addEmail === undefined || error.addEmail === '')
    ) {
      if (
        alternatEmailDetails.addEmail === email ||
        alternatEmailDetails.addEmail === emailAddressFirst
      ) {
        pushNotification(
          intl(toustifyMessages.emailAlreadyInUse),
          'error',
          'TOP_CENTER',
          3000
        )
        return
      }
      if (!validateEmail(addEmail)) {
        setErrors({ ...error, addEmail: intl(authMessages.invalidEmail) })
        return true
      }
      const details = {
        user: {
          access_token: token
        },
        notification_email: {
          email: alternatEmailDetails.addEmail
        }
      }
      addAlternateEmail(details)
    }
  }

  const setEmailPrimaryHandler = (id, token) => {
    setEmailPrimary({ id, token })
    updateReducerState('dashboard', 'activeProfileView', profileCardDetails[3].activeTab)
  }
  const getEmailDetails = (email, isVerify, id, deleteName, resendName) => {
    if (email) {
      return (
        <>
          {!isVerify && (
            <span className="email-label btn2">
              {intl(commonMessages.unVerified)}
            </span>
          )}
          {!userDetails.isSocialUser && isVerify && (
            <Button
              className="email_primary_btn"
              onClick={() => setEmailPrimaryHandler(id, token)}
              disabled={
                addAlternateEmailLoading ||
                deleteAlternateEmailLoading ||
                resendVerificationEmailLoading ||
                false
              }
            >
              {intl(dashboardMessages.setAsPrimary)}
            </Button>
          )}
          {!isVerify && (
            <Button
              disabled={
                Boolean(resendVerificationEmailLoading) ||
                Boolean(deleteAlternateEmailLoading) ||
                addAlternateEmailLoading
              }
              loading={resendVerificationEmailLoading === resendName || false}
              className="email_primary_btn"
              onClick={() => resendVerificationEmail({ id, token, resendName })}
            >
              {intl(dashboardMessages.resendVerification)}
            </Button>
          )}
          <Button
            className="ui icon button email_delete_btn"
            onClick={() => deleteAlternateEmail({ id, token, deleteName })}
            loading={deleteAlternateEmailLoading === deleteName || false}
            disabled={
              Boolean(resendVerificationEmailLoading) ||
              Boolean(deleteAlternateEmailLoading) ||
              addAlternateEmailLoading
            }
          >
            <DeleteIcon />
          </Button>
        </>
      )
    }
  }

  const handlerVerifySmsOtp = () => {
    if (smsOtp?.length !== 4) {
      setVerifyOtpError(true)
      return
    }
    verifySmsOtp({ token, smsOtp })
  }

  const handlerAddMobileNumber = () => {
    const elimateZero = phone.length > 10 ? phone.replace(/^0+/, '') : phone
    const data = {
      user: {
        access_token: token,
        phone_number: elimateZero.replace(/[^\d]/g, ''),
        country_code: countryCode.replace('+', ''),
        iso_country_code: isoCode
      }
    }
    updateProfileDetails({ data, name: 'phoneNumber' })
  }

  const sendVerificationHandler = () => {
    setShowResendButton(true)
    resendSmsOtp({ token })
  }

  const setOtpHandler = (e) => {
    setMobileDetails({
      ...mobileDetails,
      smsOtp: e
    })
    if (verifyOtpError) {
      setVerifyOtpError(false)
    }
  }

  const {
    emailAddressFirst,
    emailAddressSecond,
    isFirstEmailVerify,
    isSecondEmailVerify,
    firstEmailId,
    secondEmailId,
    addEmail,
    primaryEmailId
  } = alternatEmailDetails
  const { countryCode, smsOtp, phone, isoCode } = mobileDetails

  return (
    <>
      <Form className="account-setting__form">
        <Grid className="accordion-myprofile">
          <Grid className="w-100">
            <Grid.Row className="py-0">
              <Grid.Column mobile={12} tablet={8} computer={12}>
                <h2 className="tabsHeading">
                  {intl(dashboardMessages.accountSettingContactHead)}
                </h2>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="pb-0">
              <Grid.Column>
                <h3>
                  {userDetails?.phoneNumber
                    ? intl(dashboardMessages.mobileNumber)
                    : intl(dashboardMessages.addMobileNumber)}
                </h3>
                <p>
                  {userDetails?.phoneNumber
                    ? intl(dashboardMessages.addMobileTitle)
                    : `${intl(dashboardMessages.addMobileDes)} 
                      `}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
                mobile={12}
                tablet={12}
                computer={10}
                widescreen={10}
                className={`phone-verification ${
                  !userDetails?.phoneNumber ? 'add-phone' : ''
                }`}
              >
                <div className="phone_wrap contactphoneInput">
                  <div className="phone_field">
                    <CustomPhoneInput
                      mobileDetails={mobileDetails}
                      setMobileDetails={setMobileDetails}
                      validateOnBlur={validateOnBlur}
                      userNumber={Boolean(userDetails?.phoneNumber)}
                    />
                    <div className="other-tags-notification">
                      {userDetails?.isUserGoldMember &&
                        userDetails?.phoneNumber &&
                        !userDetails?.phoneNumber?.verified && (
                          <span className="email-label btn2">
                            {intl(commonMessages.unVerified)}
                          </span>
                        )}
                      {/* <span className="email-label btn1">Primary</span> */}
                      {userDetails?.isUserGoldMember &&
                        userDetails?.phoneNumber &&
                        !userDetails?.phoneNumber?.verified &&
                        !showResendButton && (
                          <Button
                            className="email_primary_btn"
                            onClick={sendVerificationHandler}
                            disabled={
                              verifySmsOtpLoading ||
                              resendSmsOtpLoading ||
                              toggleTimer ||
                              deletePhoneNumberLoading
                            }
                            loading={resendSmsOtpLoading}
                          >
                            {intl(dashboardMessages.sendOtp)}
                          </Button>
                        )}

                      {userDetails?.phoneNumber &&
                        !userDetails?.phoneNumber?.verified &&
                        showResendButton && (
                          <Button
                            className="email_primary_btn"
                            onClick={() => resendSmsOtp({ token })}
                            disabled={
                              verifySmsOtpLoading ||
                              resendSmsOtpLoading ||
                              toggleTimer ||
                              deletePhoneNumberLoading
                            }
                            loading={resendSmsOtpLoading}
                          >
                            {intl(dashboardMessages.resenOtp)}
                          </Button>
                        )}
                      {toggleTimer && (
                        <div className="count_down">
                          <CountDownTimer toggleModals={toggleModals} />
                        </div>
                      )}

                      {userDetails?.phoneNumber && (
                        <Button
                          loading={deletePhoneNumberLoading}
                          disabled={
                            verifySmsOtpLoading ||
                            deletePhoneNumberLoading ||
                            resendSmsOtpLoading
                          }
                          onClick={() => deletePhoneNumber({ token })}
                          className="ui icon button email_delete_btn"
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {!userDetails?.phoneNumber && (
                  <Button
                    className="submit_btn"
                    onClick={handlerAddMobileNumber}
                    loading={Boolean(
                      updateUserProfileLoading === 'phoneNumber'
                    )}
                    disabled={
                      Boolean(updateUserProfileLoading === 'phoneNumber') ||
                      !Boolean(phone?.length > 4)
                    }
                  >
                    {intl(commonMessages.add)}
                  </Button>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {toggleSmsOtpSection && (
            <div className="otpRowWrap">
              <p>{intl(dashboardMessages.enterFourDigitOtp)}</p>
              <div className={`otp_wrap ${verifyOtpError ? 'error' : ''}`}>
                <div className="otp_input" align="center">
                  <OtpInput
                    value={smsOtp}
                    onChange={(e) => setOtpHandler(e)}
                    numInputs={4}
                    isInputNum={'true'}
                    className="otpIputBox"
                  />
                </div>
                <Button
                  color="grey"
                  content={intl(commonMessages.verify)}
                  className="btn btn--medium-blue change-password-modal__btn"
                  loading={verifySmsOtpLoading}
                  disabled={verifySmsOtpLoading}
                  onClick={handlerVerifySmsOtp}
                />
              </div>
            </div>
          )}

          {/* Update email section */}
          <Grid className="w-100 text-left">
            <h3 className="mb-0">{intl(dashboardMessages.updateEmails)}</h3>
            <Grid.Row className="pb-0">
              <Grid.Column
                mobile={12}
                tablet={12}
                computer={10}
                widescreen={10}
                className="input_row_wrap 44 justify-content-between"
              >
                <div className="notification_input">
                  <InputBox
                    placeholder={intl(commonMessages.enterEmail)}
                    type={'text'}
                    name={'primaryEmail'}
                    value={email}
                    maxLength={70}
                    className="required-field"
                    disabled
                  />
                </div>
                <div className="other-tags-notification">
                  {email && (
                    <span className="email-label btn1">
                      {intl(dashboardMessages.primary)}
                    </span>
                  )}
                  {email && !isEmailVerified && (
                    <>
                      <span className="email-label btn2">
                        {intl(commonMessages.unVerified)}
                      </span>
                      <Button
                        className="email_primary_btn"
                        onClick={() =>
                          resendVerificationEmail({
                            id: primaryEmailId,
                            token,
                            resendName: 'primaryResend'
                          })
                        }
                        loading={
                          resendVerificationEmailLoading === 'primaryResend' ||
                          false
                        }
                        disabled={
                          Boolean(deleteAlternateEmailLoading) ||
                          Boolean(resendVerificationEmailLoading) ||
                          false
                        }
                      >
                        {intl(dashboardMessages.resendVerification)}
                      </Button>
                    </>
                  )}
                </div>
              </Grid.Column>
            </Grid.Row>
            {emailAddressFirst && (
              <Grid.Row>
                <Grid.Column
                  mobile={12}
                  tablet={12}
                  computer={10}
                  widescreen={10}
                  className="input_row_wrap updateEmailRow justify-content-between"
                >
                  <div className="notification_input">
                    <InputBox
                      placeholder={intl(dashboardMessages.firstEmail)}
                      type={'text'}
                      name={'emailAddressFirst'}
                      value={emailAddressFirst}
                      maxLength={70}
                      className="required-field"
                      disabled
                    />
                  </div>
                  <div className="other-tags-notification">
                    {getEmailDetails(
                      emailAddressFirst,
                      isFirstEmailVerify,
                      firstEmailId,
                      'deleteFirst',
                      'resendFirst'
                    )}
                  </div>
                </Grid.Column>
              </Grid.Row>
            )}
            {emailAddressSecond && (
              <Grid.Row>
                <Grid.Column
                  mobile={12}
                  tablet={12}
                  computer={10}
                  widescreen={10}
                  className="input_row_wrap updateEmailRow justify-content-between"
                >
                  <div className="notification_input">
                    <InputBox
                      placeholder={intl(dashboardMessages.secondEmail)}
                      type={'text'}
                      name={'emailAddressSecond'}
                      value={emailAddressSecond}
                      maxLength={70}
                      className="required-field"
                      disabled
                    />
                  </div>
                  <div className="other-tags-notification">
                    {getEmailDetails(
                      emailAddressSecond,
                      isSecondEmailVerify,
                      secondEmailId,
                      'deleteSecond',
                      'resendSecond'
                    )}
                  </div>
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
          {alternateEmails?.length <= 2 && (
            <Grid className="w-100">
              <Grid.Row className="pb-0">
                <Grid.Column mobile={12}
                  tablet={12}
                  computer={10}
                  widescreen={10}>
                  <h3>{intl(dashboardMessages.addAdditionalEmail)}</h3>
                  <p className="add-email-text">
                    {intl(dashboardMessages.addAdditionalEmailDes)}
                  </p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="secondary_email contact-modal-error pt-0">
                <Grid.Column
                  mobile={12}
                  tablet={12}
                  computer={10}
                  widescreen={10}
                  className="secondary_email_inner enterExtraMail"
                >
                  <InputBox
                    name="addEmail"
                    type={'text'}
                    value={addEmail}
                    placeholder={intl(commonMessages.enterEmail)}
                    maxLength={70}
                    onChange={(value) =>
                      changeEmailsHandler('addEmail', value.trim())
                    }
                    onBlur={(e) =>
                      validateOnBlurEmail('addEmail', e.target.value.trim())
                    }
                    className={`required-field w-50  ${
                      error.addEmail ? 'error' : ''
                    } ${isDisposable ? 'defocused' : 'focused'}`}
                    autoComplete="off"
                    errorMessage={
                      error && error.addEmail ? error.addEmail : null
                    }
                    loading={addEmail && Boolean(isDisposable) ? true : false}
                    icon={
                      addEmail &&
                      (error.addEmail === null ||
                        error.addEmail === undefined) &&
                      isDisposable !== null
                        ? 'check'
                        : null
                    }
                  />
                  <Button
                    disabled={
                      Boolean(alternatEmailDetails.addEmail === '') ||
                      Boolean(deleteAlternateEmailLoading) ||
                      Boolean(resendVerificationEmailLoading) ||
                      addAlternateEmailLoading ||
                      Boolean(isDisposable) ||
                      Boolean(error.addEmail)
                    }
                    loading={addAlternateEmailLoading}
                    className="submit_btn"
                    onClick={() => addEmailsHandler()}
                  >
                    {intl(commonMessages.add)}
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
        </Grid>
      </Form>
    </>
  )
}

AlternativeEmail.propTypes = {
  toggleSetAlternateEmailsModal: PropTypes.bool,
  toggleModals: PropTypes.func,
  userDetails: PropTypes.object,
  addAlternateEmail: PropTypes.func,
  deleteAlternateEmail: PropTypes.func,
  addAlternateEmailLoading: PropTypes.bool,
  resendVerificationEmailLoading: PropTypes.string,
  deleteAlternateEmailLoading: PropTypes.string,
  setEmailPrimary: PropTypes.func,
  resendVerificationEmail: PropTypes.func,
  resendSmsOtp: PropTypes.func,
  verifySmsOtp: PropTypes.func,
  verifySmsOtpLoading: PropTypes.bool,
  updateProfileDetails: PropTypes.func,
  deletePhoneNumber: PropTypes.func,
  updateUserProfileLoading: PropTypes.string,
  toggleSmsOtpSection: PropTypes.bool,
  resendSmsOtpLoading: PropTypes.bool,
  deletePhoneNumberLoading: PropTypes.bool,
  toggleTimer: PropTypes.bool,
  updateReducerState: PropTypes.func
}

export default AlternativeEmail
