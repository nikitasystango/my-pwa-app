import React, { useEffect } from 'react'
import Layout from 'containers/Layout'
import CancelEliteMembership from './cancelEliteMembership'
import Vouchers from './vouchers'
import PropTypes from 'prop-types'
import PurchasingThankYou from './purchasingThankYou'
import HowItWorks from './howItWorks'
import PricingPage from './pricing'
import SignupThankyou from './signupThankYou'
import history from 'utils/history'
import Loader from 'components/LoadingSpinner'
import VerifyUserNewEmail from './verifiyUserNewEmail'
import VirginAtlantic from './virginAtlantic'
import AmericanAirlines from './americanAirlines'
import AerLingus from './aerLingus'
import Vueling from './vuelingAirlines'
import Iberia from './iberiaAirlines'
import KLM from './klmAirlines'
import DELTA from './deltaAirlines'
import AirFrance from './airFranceAirlines'
import { AppRoutes } from 'constants/appRoutes'
import { retrieveFromLocalStorage, navigateToRespectivePage } from 'utils/helpers'
import './index.scss'
import '../Home/index.scss'

const Pages = (props) => {
  const { pages: { getPricingLoading, pricingPlans, cancelEliteLoading, addEmailLoading, toggleThankyouVaModal, vaEmail, toggleSignupOnBoardingModal }, getPricingPlans, pageAnalytics,
    user: { isUserBronzeMember, goldFreeTrial, isUserGoldMember, isUserSilverMember, plan, id, email },
    cancelEliteMembership, fetchingProfileDetails, userRegisterConfirmation, updateReducerState, mapPageUrl, addEmail, toggleCaneleMembershipModal, updateProfileDetails, getProfileDetails, accountSettings: { userDetails } } = props

    const token = retrieveFromLocalStorage('token')
    const appendParams = sessionStorage.getItem('queryParamsGA')

  useEffect(()=>{
    const userId = retrieveFromLocalStorage('userId')
    if (token && userId) {
      getProfileDetails(userId)
    }
    // eslint-disable-next-line
  }, [])

  const thankyouPageMembersipHandler = () => (
    <PurchasingThankYou
      location={props.location}
      isUserGoldMember={isUserGoldMember}
      isUserSilverMember={isUserSilverMember}
      getProfileDetails={getProfileDetails}
    />
  )
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    // eslint-disable-next-line
   }, [props.location.pathname])

  const pageRender = () => {
    const path = props.location.pathname
    const detailRedirection = props.location.state && props.location.state.detailRedirection

    switch (path) {
      case AppRoutes.CANCEL_ELITE_MEMBER:
        return (<CancelEliteMembership
          pageAnalytics={pageAnalytics}
          cancelEliteMembership={cancelEliteMembership}
          cancelEliteLoading={cancelEliteLoading}
          isUserGoldMember={isUserGoldMember}
          isUserSilverMember={isUserSilverMember}
                />)

      case AppRoutes.CAMPANION_VOUCHER:
        return <Vouchers pageAnalytics={pageAnalytics} location={props.location} />

        case AppRoutes.THANK_YOU:
        if (!retrieveFromLocalStorage('firstTimeSignup') && !userRegisterConfirmation) {
          if(token) {
            navigateToRespectivePage(AppRoutes.HOME, appendParams)
            break
          }else {
            navigateToRespectivePage(AppRoutes.SIGN_UP, appendParams)
            break
          }
        }else {
          return <SignupThankyou userRegisterConfirmation={userRegisterConfirmation}
         updateReducerState={updateReducerState}
         toggleSignupOnBoardingModal={toggleSignupOnBoardingModal}
         updateProfileDetails={updateProfileDetails}
         userDetails={userDetails}
         fetchingProfileDetails= {fetchingProfileDetails}
                 />
        }

      case AppRoutes.BRONZE_SIGNUP_THANKYOU:
        return thankyouPageMembersipHandler()

      case AppRoutes.SILVER_SIGNUP_THANKYOU:
        return thankyouPageMembersipHandler()

      case AppRoutes.GOLD_SIGNUP_THANKYOU:
        return thankyouPageMembersipHandler()

        case AppRoutes.PRICING_SIGNUP:
          if(detailRedirection) {
            return (<PricingPage
              getPricingPlans={getPricingPlans}
              pricingPlans={pricingPlans}
              getPricingLoading={getPricingLoading}
              location={props.location}
              plan={plan}
              id={id}
              goldFreeTrial={goldFreeTrial}
              isUserBronzeMember={isUserBronzeMember}
              isUserGoldMember={isUserGoldMember}
              isUserSilverMember={isUserSilverMember}
                    />)
          }else{
            history.push(AppRoutes.HOME)
            break
          }

      case AppRoutes.PRICING:
        return (<PricingPage
          getPricingPlans={getPricingPlans}
          pricingPlans={pricingPlans}
          getPricingLoading={getPricingLoading}
          location={props.location}
          plan={plan}
          id={id}
          goldFreeTrial={goldFreeTrial}
          isUserBronzeMember={isUserBronzeMember}
          isUserGoldMember={isUserGoldMember}
          isUserSilverMember={isUserSilverMember}
                />)

      case AppRoutes.CHANGE_PLAN:
        return (<PricingPage
          getPricingPlans={getPricingPlans}
          pricingPlans={pricingPlans}
          getPricingLoading={getPricingLoading}
          location={props.location}
          plan={plan}
          id={id}
          goldFreeTrial={goldFreeTrial}
          isUserSilverMember={isUserSilverMember}
          isUserBronzeMember={isUserBronzeMember}
          isUserGoldMember={isUserGoldMember}
          cancelEliteMembership={cancelEliteMembership}
          cancelEliteLoading={cancelEliteLoading}
          updateReducerState={updateReducerState}
          toggleCaneleMembershipModal={toggleCaneleMembershipModal}
                />)
      case AppRoutes.HOW_IT_WORKS:
        return <HowItWorks location={props.location} />

      case AppRoutes.VERIFY_USER:
        return (<VerifyUserNewEmail
          location={props.location}
          getProfileDetails={getProfileDetails}
                />)

      case AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS:
        return (<VirginAtlantic
          mapPageUrl={mapPageUrl}
          addEmail={addEmail}
          addEmailLoading={addEmailLoading}
          toggleThankyouVaModal={toggleThankyouVaModal}
          updateReducerState={updateReducerState}
          userEmail={email}
          vaEmail={vaEmail}
                />)
        case AppRoutes.AMERICAN_AIRLINE_REWARD_FLIGHTS:
          return (<AmericanAirlines
            mapPageUrl={mapPageUrl}
            addEmail={addEmail}
            addEmailLoading={addEmailLoading}
            toggleThankyouVaModal={toggleThankyouVaModal}
            updateReducerState={updateReducerState}
            userEmail={email}
            vaEmail={vaEmail}
                  />)
          case AppRoutes.AER_LINGUS:
            return (<AerLingus
              mapPageUrl={mapPageUrl}
              addEmail={addEmail}
              addEmailLoading={addEmailLoading}
              toggleThankyouVaModal={toggleThankyouVaModal}
              updateReducerState={updateReducerState}
              userEmail={email}
              vaEmail={vaEmail}
                    />)
          case AppRoutes.VUELING_AIRLINES:
            return (<Vueling
              mapPageUrl={mapPageUrl}
              addEmail={addEmail}
              addEmailLoading={addEmailLoading}
              toggleThankyouVaModal={toggleThankyouVaModal}
              updateReducerState={updateReducerState}
              userEmail={email}
              vaEmail={vaEmail}
                    />)
          case AppRoutes.IBERIA_AIRLINES:
            return (<Iberia
              mapPageUrl={mapPageUrl}
              addEmail={addEmail}
              addEmailLoading={addEmailLoading}
              toggleThankyouVaModal={toggleThankyouVaModal}
              updateReducerState={updateReducerState}
              userEmail={email}
              vaEmail={vaEmail}
                    />)
          case AppRoutes.AIRFRANCE_AIRLINES:
            return (<AirFrance
              mapPageUrl={mapPageUrl}
              addEmail={addEmail}
              addEmailLoading={addEmailLoading}
              toggleThankyouVaModal={toggleThankyouVaModal}
              updateReducerState={updateReducerState}
              userEmail={email}
              vaEmail={vaEmail}
                    />)
          case AppRoutes.KLM_AIRLINES:
            return (<KLM
              mapPageUrl={mapPageUrl}
              addEmail={addEmail}
              addEmailLoading={addEmailLoading}
              toggleThankyouVaModal={toggleThankyouVaModal}
              updateReducerState={updateReducerState}
              userEmail={email}
              vaEmail={vaEmail}
                    />)
          case AppRoutes.DELTA_AIRLINES:
            return (<DELTA
              mapPageUrl={mapPageUrl}
              addEmail={addEmail}
              addEmailLoading={addEmailLoading}
              toggleThankyouVaModal={toggleThankyouVaModal}
              updateReducerState={updateReducerState}
              userEmail={email}
              vaEmail={vaEmail}
                    />)

      default:
        history.push(AppRoutes.PAGE_NOT_FOUND)
    }
  }
  const path = props.location.pathname
  if(path === AppRoutes.THANK_YOU || (path === AppRoutes.PRICING_SIGNUP )) {
    return (
      <div>
        {fetchingProfileDetails &&
          <Loader />
        }
        {pageRender()}
      </div>
    )
  } else {
    return (
      <Layout className="px-1">
        {fetchingProfileDetails && <Loader />}
        {pageRender()}
      </Layout>
    )
  }
}

Pages.propTypes = {
  pageAnalytics: PropTypes.func,
  location: PropTypes.object,
  getPricingPlans: PropTypes.func,
  pages: PropTypes.object,
  user: PropTypes.object,
  userRegisterConfirmation: PropTypes.bool,
  updateReducerState: PropTypes.func,
  cancelEliteMembership: PropTypes.func,
  fetchingProfileDetails: PropTypes.bool,
  goldFreeTrial: PropTypes.bool,
  mapPageUrl: PropTypes.string,
  addEmail: PropTypes.func,
  updateProfileDetails: PropTypes.func,
  getProfileDetails: PropTypes.func
}

export default Pages
