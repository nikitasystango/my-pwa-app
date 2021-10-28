import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Grid,
  GridRow,
  GridColumn
} from 'semantic-ui-react'
import {
  retrieveFromLocalStorage,
  extractURLParams,
  removeFromLocalStorage
} from 'utils/helpers'
import history from 'utils/history'
import Loader from 'components/LoadingSpinner'
import { pushNotification } from 'utils/notifications'
import Messages from 'constants/messages'
import { GoogleAdsParam } from 'constants/globalConstants'
import env from 'utils/env_variables'
import 'semantic-ui-css/components/checkbox.min.css'
import 'semantic-ui-css/components/popup.min.css'
import '../assets/scss/pricing.scss'
import CancelMembershipModal from '../cancelMembershipModal'
import { memberShipSnippet } from 'constants/seoScriptConstants'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import commonMessages from 'constants/messages/commonMessages'
import toustifyMessages from 'constants/messages/toustifyMessages'
import SeoTexts from 'constants/seoConstants'
import SeoTags from 'common/SeoTags'
import PricingTableComponent from './pricingTable'
import PricingFrequencyComponent from './pricingFrequency'
import CouponToggleModal from './couponsModal'
import { CouponGiftIcon } from 'utils/svgs'

const PricingPage = (props) => {
  const {
    getPricingPlans,
    pricingPlans,
    getPricingLoading,
    location,
    plan,
    id,
    isUserBronzeMember,
    isUserSilverMember,
    isUserGoldMember,
    cancelEliteMembership,
    cancelEliteLoading,
    updateReducerState,
    toggleCaneleMembershipModal,
    trialEligibilty,
    getProfileDetails,
    toggleCouponsModal,
    getCouponsList,
    pages: { couponsList, couponsListLoading, selectedCouponId, couponDataLoading, couponData, manualCouponValue },
    redeemedCouponIds,
    getCouponsById
  } = props
  const { silver: silverFreeTrial, gold: goldFreeTrial } = trialEligibilty || {}

  const [planMonthYear, setPlanMonthYear] = useState('month')
  const token = retrieveFromLocalStorage('token')


  useEffect(() => {
    const userValue = JSON.parse(retrieveFromLocalStorage('userDetails'))
    if (
      location.pathname === AppRoutes.CHANGE_PLAN &&
      !(userValue?.silver_member || userValue?.gold_member)
    ) {
      history.push(AppRoutes.HOME)
    } else if (
      location.pathname === AppRoutes.CHANGE_PLAN &&
      (userValue?.current_plan?.chargebee_plan_id === 'gold-free' ||
        userValue?.cancelled_subscription)
    ) {
      history.push(AppRoutes.HOME)
    }
    if(userValue?.id) {
      getProfileDetails(userValue?.id)
    }
    getPricingPlans()
    if(location && location.state && location.state.toggle) {
      setPlanMonthYear(location.state.toggle)
    }
    if (location && location.search) {
      const data = extractURLParams(props.location.search)
      if (data?.error === 'something went wrong with chargebee') {
        pushNotification(intl(toustifyMessages.someThingWrongChargebee), 'error', 'TOP_CENTER', 3000)
      } else if (data?.error === 'invalid user id') {
        pushNotification(intl(toustifyMessages.invalidUserId), 'error', 'TOP_CENTER', 3000)
      } else {
       const arrData = Object.keys(data)
       const isExist = GoogleAdsParam.includes(arrData[0])
       if (!isExist) {
           history.push(AppRoutes.PAGE_NOT_FOUND)
      }
      }
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => () => {
      if (retrieveFromLocalStorage('signupFirstTime')) {
        removeFromLocalStorage('signupFirstTime')
      }
      // eslint-disable-next-line
    }, [])


  const redirectForPurchase = (planId) => {
    if (token) {
      const subUrl = selectedCouponId?.id ? `&chargebee_coupon_id=${selectedCouponId?.id}` : ''
        const url = `${env.REDIRECT_ON_RUBY}/memberships?user_id=${id}&chargebee_plan_id=${planId}${subUrl}`
        const newWin = window.open(url)
        if(!newWin || newWin.closed || typeof newWin.closed=='undefined')
        {
          pushNotification(Messages.ENABLED_POPUP, 'error', 'TOP_CENTER', 3000)
            // POPUP BLOCKED
        }
    } else {
      history.push(AppRoutes.SIGN_UP)
    }
  }

  return (
    <>
      <SeoTags
        title={location.pathname === AppRoutes.PRICING_SIGNUP ? SeoTexts.PRICING_SECOND_TITLE : SeoTexts.PRICING_TITLE}
        metaDescription={SeoTexts.PRICING_DESCRIPTION}
        canonicalLink={location.pathname === AppRoutes.PRICING_SIGNUP ? SeoTexts.PRICING_SECOND_CANONICAL : SeoTexts.PRICING_CANONICAL}
        ogImgUrl={SeoTexts.PRICING_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.PRICING_TWITTER_IMAGE_URL}
        richSnippet={memberShipSnippet}
      />
      <div className="page pricing-page">
        {getPricingLoading && <Loader />}
        {pricingPlans?.length ? (
          <>
            <div className="page__header">
              <Grid className="m-0">
                <GridRow className="m-0">
                  <GridColumn width={16}>
                    <div className="coupon-modal-wrap">
                      <h1 className="page__title">
                        {location.pathname === AppRoutes.CHANGE_PLAN
                      ? intl(commonMessages.changePlan) : intl(pagesMessages.pricingTitle)}
                      </h1>
                      {token &&
                      <Button className="coupon-button" onClick={()=> {
                      updateReducerState('pages', 'toggleCouponsModal', true)
                    }}
                      >
                        <CouponGiftIcon/>  {`${intl(pagesMessages.couponsText)} (${couponsList.length})`}
                      </Button>
                     }
                    </div>
                    <p className="page__sub-title">{intl(pagesMessages.pricingSubTitle)}</p>
                    <Button.Group className="pricingToggleButton">
                      <Button value="month" positive={planMonthYear === 'month'} onClick={()=> {
                      setPlanMonthYear('month')
                      // Use history.push to remove state varible to remove toggle to yearly when refresh if available
                      if(location && location.state && location.state.toggle) {
                        history.push({
                          pathname: AppRoutes.PRICING
                        })
                      }
                    }}
                      >{intl(pagesMessages.monthly)}
                      </Button>
                      <Button positive={planMonthYear === 'year'} value="year" onClick={()=> {
                      setPlanMonthYear('year')}}
                      >{intl(pagesMessages.yearlyTwoMonthsFree)}<span>{intl(pagesMessages.yearlyTwoMonthsFreeText)}</span>
                      </Button>
                    </Button.Group>
                  </GridColumn>
                </GridRow>
              </Grid>
            </div>
            <div className="page__body">
              <PricingTableComponent
              location={location}
              updateReducerState={updateReducerState}
              isUserBronzeMember={isUserBronzeMember}
              pricingPlans={pricingPlans}
              planMonthYear={planMonthYear}
              plan={plan}
              isUserGoldMember={isUserGoldMember}
              goldFreeTrial={goldFreeTrial}
              silverFreeTrial={silverFreeTrial}
              isUserSilverMember={isUserSilverMember}
              redirectForPurchase={redirectForPurchase}
              selectedCouponId={selectedCouponId}
              />

              <div className="plp-section">
                <div className="plp-section__inner">
                  <h2 className="plp-section__title">
                    {intl(pagesMessages.postLockdownPromotion)}
                  </h2>
                  <div className="plp-section__content">
                    {/* <p>If you downgrade, and the promotion is over, you won't be able to resubscribe at the discounted price.</p> */}
                    <p>{intl(pagesMessages.postLockdownPromotionTextOne)}</p>
                    <p>{intl(pagesMessages.postLockdownPromotionTextTwo)}</p>
                    <p>{intl(pagesMessages.postLockdownPromotionTextThree)}</p>
                  </div>
                </div>
              </div>

              <div className="points-section">
                <PricingFrequencyComponent/>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
      <CancelMembershipModal
        toggleCaneleMembershipModal={toggleCaneleMembershipModal}
        toggleModal={() =>
          updateReducerState('dashboard', 'toggleCaneleMembershipModal', false)
        }
        cancelEliteMembership={cancelEliteMembership}
        cancelEliteLoading={cancelEliteLoading}
        isUserSilverMember = {isUserSilverMember}
      />
      <CouponToggleModal
       updateReducerState={updateReducerState}
       toggleCouponsModal={toggleCouponsModal}
       getCouponsList={getCouponsList}
       couponsList={couponsList}
       couponsListLoading={couponsListLoading}
       redeemedCouponIds={redeemedCouponIds}
       plan={plan}
       selectedCouponId={selectedCouponId}
       getCouponsById={getCouponsById}
       couponDataLoading={couponDataLoading}
       couponData={couponData}
       manualCouponValue={manualCouponValue}
      />
    </>
  )
}

PricingPage.propTypes = {
  getPricingPlans: PropTypes.func,
  pricingPlans: PropTypes.array,
  getPricingLoading: PropTypes.bool,
  location: PropTypes.object,
  plan: PropTypes.object,
  id: PropTypes.number,
  isUserBronzeMember: PropTypes.bool,
  isUserGoldMember: PropTypes.bool,
  cancelEliteMembership: PropTypes.func,
  cancelEliteLoading: PropTypes.bool,
  updateReducerState: PropTypes.func,
  toggleCaneleMembershipModal: PropTypes.bool,
  trialEligibilty: PropTypes.object,
  isUserSilverMember: PropTypes.bool,
  getProfileDetails: PropTypes.func,
  toggleCouponsModal: PropTypes.bool,
  getCouponsList: PropTypes.func
}
export default PricingPage
