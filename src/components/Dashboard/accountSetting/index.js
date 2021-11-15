import React, { useState, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import history from 'utils/history'
import { retrieveFromLocalStorage } from 'utils/helpers'
import 'semantic-ui-css/components/form.min.css'
import 'semantic-ui-css/components/input.min.css'
import '../assets/account-setting.scss'
import SeoHelmet from 'utils/seoHelmet'
import SeoTexts from 'constants/seoConstants'
import Loader from 'components/LoadingSpinner'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import dashboardMessages from 'constants/messages/dashboardMessages'
import MembershipTier from './membershipTier'
import EditProfile from './editProfile'
import CardNavigation from './cardNavigation'
import NotificationSetting from './notificationSettings'
import ChangePassword from './changePassword'
import AlternativeEmail from './alternateEmails'
import SocialUserPasswordModal from './socialUserPasswordModal'
import { profileCardDetails, airlineName } from 'constants/globalConstants'
import { GreaterIcon } from 'utils/svgs'
import publicIp from 'public-ip'

const AccountSetting = (props) => {
  // const [email, setEmail] = useState('')
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    currency: '',
    addressFirst: '',
    addressSecond: '',
    city: '',
    state: '',
    postCode: '',
    departureCity: '',
    gender: '',
    ageGroup: '',
    approxFlightNum: '',
    travelAbroad: ''
  })

  const [error, setErrors] = useState({})

  const {
    changePassword,
    updateProfileDetails,
    toggleModals,
    dashboard: { accountSettings, activeProfileView },
    pageAnalytics,
    setSocialUserPassword,
    addAlternateEmail,
    editAlternateEmail,
    deleteAlternateEmail,
    verifySmsOtp,
    resendSmsOtp,
    toggleSmsNotification,
    resendVerificationEmail,
    setEmailPrimary,
    toggleEmailsNotification,
    deletePhoneNumber,
    updateReducerState,
    getSouDesLocations,
    getSouDesPossibleRoutes,
    getUserNearestAirport,
    getAirlineList,
    searchPanel
  } = props
  const {
    userDetails,
    changeUserPasswordLoading,
    updateUserProfileLoading,
    toggleSetSocialUserPasswordModal,
    setSocialUserPasswordLoading,
    toggleSetAlternateEmailsModal,
    addAlternateEmailLoading,
    editAlternateEmailLoading,
    deleteAlternateEmailLoading,
    resendVerificationEmailLoading,
    toggleEmailsNotificationLoading,
    setEmailPrimaryLoading,
    verifySmsOtpLoading,
    toggleSmsOtpSection,
    toggleTimer,
    deletePhoneNumberLoading,
    resendSmsOtpLoading
  } = accountSettings || ''
  const setDataInState = (data) => {
    const {
      firstName,
      lastName,
      preferredCurrency
    } = data
    // setEmail(email ? email : '')
    setUserData({
      ...userData,
      firstName: firstName ? firstName : '',
      lastName: lastName ? lastName : '',
      currency: preferredCurrency ? preferredCurrency : ''
    })
  }
  const token = retrieveFromLocalStorage('token')

  useEffect(()=> {
    getSouDesLocations({ selectedAirline: airlineName.BA.CODE })
    getSouDesPossibleRoutes({ selectedAirline: airlineName.BA.CODE })
    getClientIp()
    // eslint-disable-next-line
  }, [])

  const getClientIp = async() => {
    try {
      const ipAdd = await publicIp.v4({ fallbackUrls: [
        'https://ifconfig.co/ip'
      ] })
      if(ipAdd) {
        getUserNearestAirport({ ipAddress: ipAdd })
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    pageAnalytics()
    if (userDetails) {
      setDataInState(userDetails)
    }
    // eslint-disable-next-line
  }, [userDetails])

  const renderLoader = () => {
    let loader = null
    if (toggleEmailsNotificationLoading) {
      loader = <Loader />
    } else if (setEmailPrimaryLoading) {
      loader = <Loader />
    }
    return loader
  }

  const toggleSmsNotificationHandler = () => {
    if (!userDetails?.phoneNumber) {
      updateReducerState('dashboard', 'activeProfileView', profileCardDetails[3].activeTab)
      return
    } else if (!userDetails?.isUserGoldMember) {
      history.push(AppRoutes.PRICING)
      return
    } else if (
      userDetails?.isUserGoldMember &&
      !userDetails?.phoneNumber?.verified
    ) {
      updateReducerState('dashboard', 'activeProfileView', profileCardDetails[3].activeTab)
      return
    }
    toggleSmsNotification({
      token,
      isActive: !userDetails?.phoneNumber?.enabled
    })
  }

  const renderActiveView = () => {
    switch (activeProfileView) {
      case 0:
        return <CardNavigation updateReducerState={updateReducerState} />
      case 1:
        return (
          <EditProfile
            {...props}
            error={error}
            setErrors={setErrors}
            setUserData={setUserData}
            userData={userData}
            updateProfileDetails={updateProfileDetails}
            userDetails={userDetails}
            updateUserProfileLoading={updateUserProfileLoading}
          />
        )
      case 2:
        return (
          <NotificationSetting
            userDetails={userDetails}
            toggleSmsNotificationHandler={toggleSmsNotificationHandler}
            toggleEmailsNotification={toggleEmailsNotification}
          />
        )
      case 3:
        return userDetails?.socialUserPasswordSet ? (
          <ChangePassword
            {...props}
            updateUserPassword={changePassword}
            changeUserPasswordLoading={changeUserPasswordLoading}
          />
        ) : (
          <SocialUserPasswordModal
            toggleSetSocialUserPasswordModal={toggleSetSocialUserPasswordModal}
            toggleModals={toggleModals}
            setSocialUserPasswordLoading={setSocialUserPasswordLoading}
            setSocialUserPassword={setSocialUserPassword}
          />
        )
      case 4:
        return (
          <AlternativeEmail
            toggleSetAlternateEmailsModal={toggleSetAlternateEmailsModal}
            toggleModals={toggleModals}
            userDetails={userDetails}
            addAlternateEmail={addAlternateEmail}
            editAlternateEmail={editAlternateEmail}
            deleteAlternateEmail={deleteAlternateEmail}
            addAlternateEmailLoading={addAlternateEmailLoading}
            editAlternateEmailLoading={editAlternateEmailLoading}
            deleteAlternateEmailLoading={deleteAlternateEmailLoading}
            resendVerificationEmail={resendVerificationEmail}
            setEmailPrimary={setEmailPrimary}
            verifySmsOtp={verifySmsOtp}
            resendVerificationEmailLoading={resendVerificationEmailLoading}
            resendSmsOtp={resendSmsOtp}
            verifySmsOtpLoading={verifySmsOtpLoading}
            toggleSmsOtpSection={toggleSmsOtpSection}
            updateProfileDetails={updateProfileDetails}
            updateUserProfileLoading={updateUserProfileLoading}
            deletePhoneNumber={deletePhoneNumber}
            toggleTimer={toggleTimer}
            deletePhoneNumberLoading={deletePhoneNumberLoading}
            resendSmsOtpLoading={resendSmsOtpLoading}
            updateReducerState={updateReducerState}
          />
        )
      case 5:
        return (
          <MembershipTier
           getAirlineList={getAirlineList}
           searchPanel={searchPanel}
           updateReducerState={updateReducerState}
           updateProfileDetails={updateProfileDetails}
           userDetails={userDetails}
           updateUserProfileLoading={updateUserProfileLoading}
          />)

      default:
          return <CardNavigation updateReducerState={updateReducerState} />
    }
  }

  const handleSubtitle = () => {
    // eslint-disable-next-line prefer-destructuring
    const faqDetail = profileCardDetails.filter(
      (list) => list.activeTab === activeProfileView
    )[0]
    return faqDetail?.header
  }

  return (
    <>
      <SeoHelmet title={SeoTexts.ACCOUNT_SETTING_TITLE} />
      <div className="account-setting">
        {renderLoader()}
        <Grid className="my-0">
          <Grid.Row>
            <Grid.Column className={`d-flex ${activeProfileView > 0 ? 'inside-tab' : ''} `} >
              <h3 className="account-setting__heading cursor-pointer" onClick={()=>updateReducerState('dashboard', 'activeProfileView', 0)}>
                {intl(dashboardMessages.accountSettingMyProfile)}
              </h3>
              {activeProfileView > 0 && (
                <>
                  <span className="mr-n5"> <GreaterIcon/> </span>
                  <h3 className="account-setting__heading account-heading-subtitle mt-0">
                    {handleSubtitle()}
                  </h3>
                </>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {renderActiveView()}
      </div>
    </>
  )
}

AccountSetting.propTypes = {
  updateProfileDetails: PropTypes.func,
  toggleModals: PropTypes.func,
  changePassword: PropTypes.func,
  changeUserPasswordLoading: PropTypes.bool,
  dashboard: PropTypes.object,
  updateUserProfileLoading: PropTypes.bool,
  pageAnalytics: PropTypes.func,
  setSocialUserPassword: PropTypes.func,
  addAlternateEmail: PropTypes.func,
  editAlternateEmail: PropTypes.func,
  deleteAlternateEmail: PropTypes.func,
  verifySmsOtp: PropTypes.func,
  resendSmsOtp: PropTypes.func,
  toggleSmsNotification: PropTypes.func,
  setEmailPrimary: PropTypes.func,
  resendVerificationEmail: PropTypes.func,
  toggleEmailsNotification: PropTypes.func,
  toggleEmailsNotificationLoading: PropTypes.bool,
  setEmailPrimaryLoading: PropTypes.bool,
  toggleSmsOtpSection: PropTypes.bool,
  deletePhoneNumber: PropTypes.func,
  updateReducerState: PropTypes.func,
  getSouDesLocations: PropTypes.func,
  getSouDesPossibleRoutes: PropTypes.func,
  getUserNearestAirport: PropTypes.func,
  getAirlineList: PropTypes.func,
  searchPanel: PropTypes.object
}
export default AccountSetting
