import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Header from 'common/Header'
import { isMobile } from 'react-device-detect'
import SidebarPanel from 'common/SideBar'
import MobileSidebar from 'components/SideBar'
import Footer from '../Footer'
import { MainContent, MainContentWrap } from './style'
import ProfilePictureModal from 'common/ProfilePictureModal'
import { retrieveFromLocalStorage, removeFromLocalStorage } from 'utils/helpers'
import { movePointerOnTop } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import history from 'utils/history'
import env from 'utils/env_variables'
import { trackUserIdConversion } from 'utils/commonFunction'

const Layout = (props) => {
  const { isSidebarVisible, toggleSidebar, user, updateReducerState, className,
    logoutUserLoading, mapPageUrl, location } = props
  const token = retrieveFromLocalStorage('token')
  useEffect(() => {
    const { getProfileDetails } = props
    const userId = retrieveFromLocalStorage('userId')
    if (user && !user.id && token && userId) {
      getProfileDetails(userId)
    }
    if(token && user && user.id) {
      trackUserIdConversion(userId)
    }
    movePointerOnTop()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
  const token = retrieveFromLocalStorage('token')
    const onbeforeunloadFn = () => {
      if(!token) {
        removeFromLocalStorage('guest_id')
        removeFromLocalStorage('event_id')
      }
      removeFromLocalStorage('webScrapper')
    }
    window.addEventListener('beforeunload', onbeforeunloadFn)
    return () => {
      window.removeEventListener('beforeunload', onbeforeunloadFn)
    }
    // eslint-disable-next-line
  }, [])

  const handleSignOutClick = () => {
    const { logoutUser } = props
    const userIdproxy = JSON.parse(retrieveFromLocalStorage('userIdproxy'))
    if(userIdproxy) {
      removeFromLocalStorage('token')
      removeFromLocalStorage('userIdproxy')
      history.push(AppRoutes.HOME)
      const url = `${env.REDIRECT_ON_RUBY}/admin/users/${userIdproxy}?active=yes`
      window.open(url, '_blank')
    }else{
      logoutUser()
      updateReducerState('mapData', 'mapLocations', null)
      updateReducerState('mapData', 'mapPageUrl', null)
    }
  }



  if (token && user && !user.id) {
    const userValue = JSON.parse(retrieveFromLocalStorage('userDetails'))
    let plan = {}
    if (userValue && userValue.current_subscription_expiry && userValue.current_plan) {
      plan = {
        expiryTime: userValue.current_subscription_expiry,
        ...userValue.current_plan
      }
    }
    const data = {
      email: userValue && userValue.email ? userValue.email : null,
      id: userValue && userValue.id ? userValue.id : null,
      country: userValue && userValue.country ? userValue.country : null,
      firstName: userValue && userValue.first_name ? userValue.first_name : null,
      lastName: userValue && userValue.last_name ? userValue.last_name : null,
      preferredCurrency: userValue && userValue.preferred_currency ? userValue.preferred_currency : null,
      profileImage: userValue && userValue.image ? userValue.image : null,
      plan: plan,
      isUserSilverMember: userValue?.silver_member || false,
      isUserGoldMember: userValue?.gold_member || false,
      notificationSettings: userValue?.notification_setting ? userValue.notification_setting : null,
      cancelledSubscription: userValue?.cancelled_subscription || false,
      goldFreeTrial: userValue?.opted_free_trial || false,
      isUserBronzeMember: userValue?.bronze_member || false,
      socialUserPasswordSet: userValue?.password_configured_manually || false,
      alternateEmails: userValue?.alternate_emails || [],
      isSocialUser: userValue?.social_user || false,
      phoneNumber: userValue?.phone || null,
      isEmailVerified: userValue?.email_verified || false,
      isEmailNotificationEnable: userValue?.email_notifiable || false,
      createAlertsLimit: userValue?.allowed_active_alerts || 0,
      activeAlertsCount: userValue?.current_active_alerts || 0,
      downgradeMembership: userValue?.gold_to_silver_downgrade || false,
      allowedAlertDateRange: userValue?.allowed_date_range_for_alerts || 0,
      trialEligibilty: userValue?.trial_eligibility || {},
      downgradedPlan: userValue?.downgraded_plan || null,
      address: userValue?.address || {},
      ageBand: userValue?.age_band || null,
      flightsTakenAnnually: userValue?.flights_taken_annually || null,
      gender: userValue?.gender || null,
      travellingAbroad: userValue?.travelling_abroad_in_next_12_months || null,
      redeemedCouponIds: userValue?.redeemed_coupon_ids || null
    }
    if (data && data.id) {
      updateReducerState('auth', 'user', data)
    }
  }

  return (
    <Fragment>
      <Header
        class="pt-10"
        user={user}
        mapPageUrl={mapPageUrl}
        logoutUserLoading={logoutUserLoading}
        handleSignOutClick={handleSignOutClick}
        toggleSidebar={toggleSidebar}
        updateReducerState={updateReducerState}
      />
      {isMobile &&
        <SidebarPanel {...props} isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar}>
          <MobileSidebar {...props} handleSignOutClick={handleSignOutClick} mapPageUrl={mapPageUrl}/>
        </SidebarPanel>}
      <MainContentWrap className={`rff_main_content ${token && user?.alternateEmails?.length && !user?.isEmailVerified && location?.pathname !== AppRoutes.THANK_YOU ? 'email-verify-pending' : ''}`}>
        <MainContent className={className}>

          {props.children}

        </MainContent>
      </MainContentWrap>
      {location?.pathname !== AppRoutes.LOCATION && <Footer user={user} location={location}/>}
      <ProfilePictureModal />
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  logoutUserLoading: PropTypes.bool,
  isSidebarVisible: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  user: PropTypes.object,
  updateReducerState: PropTypes.func,
  className: PropTypes.any,
  logoutUser: PropTypes.func,
  getProfileDetails: PropTypes.func,
  mapPageUrl: PropTypes.string,
  location: PropTypes.object,
  toggleModals: PropTypes.func
}

export default withRouter(Layout)
