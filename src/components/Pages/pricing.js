import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Grid,
  GridRow,
  GridColumn,
  Popup
} from 'semantic-ui-react'
import {
  retrieveFromLocalStorage,
  extractURLParams,
  removeFromLocalStorage,
  navigateToRespectivePage
} from 'utils/helpers'
import {
  IconCheckboxCircle,
  IconCrossCircle,
  InfoIcon,
  PaperPlane,
  Plane,
  Rocket,
  AlertFrequency,
  WhereCanIGo,
  AvailabilityAlertMethod,
  MoreAirlines
} from '../../utils/svgs'
import Loader from 'components/LoadingSpinner'
import { pushNotification } from 'utils/notifications'
import Messages from 'constants/messages'
import SeoTags from 'common/SeoTags'
import SeoTexts from 'constants/seoConstants'
import { silverPlansList, SubscriptionPlan, GoogleAdsParam } from 'constants/globalConstants'
import env from 'utils/env_variables'
import 'semantic-ui-css/components/checkbox.min.css'
import 'semantic-ui-css/components/popup.min.css'
import './assets/scss/pricing.scss'
import CancelMembershipModal from './cancelMembershipModal'
import { memberShipSnippet } from 'constants/seoScriptConstants'
import { AppRoutes } from '../../constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import commonMessages from 'constants/messages/commonMessages'
import toustifyMessages from 'constants/messages/toustifyMessages'

const PricingPage = (props) => {
  const {
    getPricingPlans,
    pricingPlans,
    getPricingLoading,
    location,
    plan,
    id,
    goldFreeTrial,
    isUserBronzeMember,
    isUserGoldMember,
    cancelEliteMembership,
    cancelEliteLoading,
    updateReducerState,
    toggleCaneleMembershipModal
  } = props
  // eslint-disable-next-line
  const [planMonthYear, setPlanMonthYear] = useState(false)
  const [selectedCol, toggleSelectedCol] = useState(1)
  const token = retrieveFromLocalStorage('token')
  const appendParams = sessionStorage.getItem('queryParamsGA')

  const period = planMonthYear ? 'year' : 'month'
  const toggleSelectedClass = (n) => {
    toggleSelectedCol(n)
  }

  useEffect(() => {
    const userValue = JSON.parse(retrieveFromLocalStorage('userDetails'))
    if (
      location.pathname === AppRoutes.CHANGE_PLAN &&
      !(userValue?.silver_member || userValue?.gold_member)
    ) {
      navigateToRespectivePage(AppRoutes.HOME, appendParams)
    } else if (
      location.pathname === AppRoutes.CHANGE_PLAN &&
      (userValue?.current_plan?.chargebee_plan_id === 'gold-free' ||
        userValue?.cancelled_subscription)
    ) {
      navigateToRespectivePage(AppRoutes.HOME, appendParams)
    }
    getPricingPlans()
    if (location && location.search) {
      const data = extractURLParams(props.location.search)
      if (data?.error === 'something went wrong with chargebee') {
        pushNotification(intl(toustifyMessages.someThingWrongChargebee), 'error', 'TOP_CENTER', 3000)
      } else if (data?.error === 'invalid user id') {
        pushNotification(intl(toustifyMessages.invalidUserId), 'error', 'TOP_CENTER', 3000)
      } else {
       const arrData = Object.keys(data)
       const isExist = GoogleAdsParam.includes(arrData[0])
        if(!isExist) {
          navigateToRespectivePage(AppRoutes.PAGE_NOT_FOUND, appendParams)
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

  // filter list of all silver plans
  const silverplanlisting = pricingPlans.filter((item) => silverPlansList.includes(item.name))

    let silverPlan =
    silverplanlisting &&
    silverplanlisting.filter(
      (item) =>
        item.period_unit === period && (item.chargebee_plan_id === plan?.chargebee_plan_id)
    )[0]

    // if silver plan is not subscribed, use deafult plan as Silver plan GBP monthly
    if(!silverPlan || silverPlan === undefined) {
      silverPlan = pricingPlans &&
        pricingPlans.find(
          (item) =>
            item.period_unit === period && (item.name === SubscriptionPlan.SILVER_PLAN)
        )
    }

  const goldPlan =
    pricingPlans &&
    pricingPlans.find(
      (item) =>
        item.period_unit === 'month' &&
        item.name === SubscriptionPlan.GOLD_PLAN
    )
  const { price, chargebee_plan_id } = silverPlan || ''

  const isSilverPlanDisable =
    plan?.chargebee_plan_id === chargebee_plan_id ? true : false

    const freePlanDisable = (token && isUserBronzeMember && !Boolean(retrieveFromLocalStorage('signupFirstTime'))) ? intl(commonMessages.currentPlan) : intl(commonMessages.subscribe)

    const silverPlanByPeriodUnit = isSilverPlanDisable ? intl(pagesMessages.currentPlan) : silverPlan?.period_unit === 'year' ? intl(commonMessages.upgrade) : intl(commonMessages.downgrade)

  const handlerFreeSubscribe = () => {
    if (token) {
      navigateToRespectivePage(AppRoutes.HOME, appendParams)
    } else {
      navigateToRespectivePage(AppRoutes.SIGN_UP, appendParams)
    }
  }

  const PricingTable = [
    {
      col1: <></>
    },
    {
      col1: <>{intl(pagesMessages.alertFrequency)}</>
    },
    {
      col1: <>{intl(pagesMessages.airlinesSearch)} </>
    },
    {
      col1: (
        <>
          {intl(pagesMessages.activeAlertOnce)}{' '}
          <Popup
            content={intl(pagesMessages.activeAlertOnceDes)}
            trigger={
              <span>
                <InfoIcon className="info-icon" />
              </span>
            }
            position="right center"
          />
        </>
      )
    },
    {
      col1: <>{intl(pagesMessages.whereCanIGoMapSearch)}</>
    },
    {
      col1: intl(pagesMessages.emailAlerts)
    },
    {
      col1: (
        <>
          {intl(pagesMessages.smsAlerts)}&nbsp;<em> </em>
        </>
      )
    }
  ]

  const redirectForPurchase = (planId) => {
    if (token) {
        // window.location.href = `${env.REDIRECT_ON_RUBY}/memberships?user_id=${id}&chargebee_plan_id=${planId}`
        const url = `${env.REDIRECT_ON_RUBY}/memberships?user_id=${id}&chargebee_plan_id=${planId}`
        const newWin = window.open(`${url}${appendParams ? appendParams.replace('?', '&') : ''}`)
        if(!newWin || newWin.closed || typeof newWin.closed=='undefined')
        {
          pushNotification(Messages.ENABLED_POPUP, 'error', 'TOP_CENTER', 3000)
            // POPUP BLOCKED
        }
    } else {
      navigateToRespectivePage(AppRoutes.SIGN_UP, appendParams)
    }
  }

  const Pointer = ({ icon, title, content }) => (
    <div className="points-section__point">
      <div className="points-section__point-left">
        <span className="points-section__point-icon">{icon}</span>
      </div>
      <div className="points-section__point-right">
        <h4 className="points-section__point-title">{title}</h4>
        <div className="points-section__point-content">{content}</div>
      </div>
    </div>
  )

  const redirectGoldMembershipPortal = (id) => {
    if (!goldFreeTrial) {
      const goldFree = pricingPlans.find((item) => item.name === SubscriptionPlan.GOLD_FREE)
      redirectForPurchase(goldFree?.chargebee_plan_id)
    } else {
      redirectForPurchase(id)
    }
  }

  return (
    <>
      <SeoTags
        title={SeoTexts.PRICING_TITLE}
        metaDescription={SeoTexts.PRICING_DESCRIPTION}
        canonicalLink={SeoTexts.PRICING_CANONICAL}
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
                    <h1 className="page__title">
                      {location.pathname === AppRoutes.CHANGE_PLAN
                      ? intl(commonMessages.changePlan) : intl(pagesMessages.pricingTitle)}
                    </h1>
                    <p className="page__sub-title">{intl(pagesMessages.pricingSubTitle)}</p>
                  </GridColumn>
                </GridRow>
              </Grid>
            </div>
            <div className="page__body">
              <div className="pricing-table pricing-table--desktop">
                <div className="pricing-table__inner">
                  <div className="pricing-table__left">
                    <div className="pricing-table__col">
                      <div className="pricing-table__td">
                        {/* <div className="billing-method-box">
                          <div className="bill-texts">
                            <span className={`${!planMonthYear ? 'is-selected' : ''}`}>{intl(pagesMessages.monthly)}</span>
                            <Radio toggle onChange={() => setPlanMonthYear(!planMonthYear)} checked={planMonthYear} />
                            <span className={`${planMonthYear ? 'is-selected' : ''}`}>Yearly <span>(2 months Free)</span></span>
                          </div>
                        </div> */}
                      </div>
                      <div className="pricing-table__td pricing-table__td--with-bg">
                        {intl(pagesMessages.alertFrequency)}
                      </div>
                      <div className="pricing-table__td ">{intl(pagesMessages.airlinesSearch)} </div>
                      <div className="pricing-table__td pricing-table__td--with-bg">
                        {intl(pagesMessages.whereCanIGoMapSearch)}
                      </div>
                      <div className="pricing-table__td ">
                        {intl(pagesMessages.activeAlertOnce)}
                        <Popup content={intl(pagesMessages.activeAlertOnceDes)}
                          trigger={
                            <span>
                              <InfoIcon className="info-icon" />
                            </span>
                          }
                          position="right center"
                        />
                      </div>
                      <div className="pricing-table__td pricing-table__td--with-bg">
                        {intl(pagesMessages.emailAlerts)}
                      </div>
                      <div className="pricing-table__td  pricing-table__td--top-bdr">
                        {intl(commonMessages.smsAlerts)}
                      </div>
                      {/* <div className="pricing-table__td pricing-table__td--with-bg pricing-table__td--top-bdr">
                        WhatsApp Alerts&nbsp;<em> Coming Soon</em>
                      </div> */}
                      {/* <div className="pricing-table__td pricing-table__td--with-bg pricing-table__td--top-bdr">
                        Push Notification Alerts
                      </div>
                      <div className="pricing-table__td pricing-table__td--top-bdr">
                        iOS & Android App
                      </div> */}
                    </div>
                  </div>
                  <div className="pricing-table__right">
                    <div
                      className={`pricing-table__col ${
                        selectedCol === 0 ? 'pricing-table__col--selected' : ''
                      }`}
                      onMouseEnter={() => toggleSelectedClass(0)}
                    >
                      <div className="pricing-table__td">
                        <div className="plan-box">
                          <span className="plan-box__name">
                            <PaperPlane /> {intl(pagesMessages.bronzeCapital)}
                          </span>
                          <span className="plan-box__price">
                            {intl(commonMessages.free)}
                            <small />
                            {/* <small>&nbsp;</small> */}
                          </span>
                          {location.pathname === AppRoutes.CHANGE_PLAN ? (
                            <Button
                              className="btn btn--medium-blue plan-box__button bronze"
                              disabled={isUserBronzeMember}
                              onClick={() =>
                                updateReducerState(
                                  'dashboard',
                                  'toggleCaneleMembershipModal',
                                  true
                                )
                              }
                            >
                              {isUserBronzeMember
                                ? intl(pagesMessages.currentPlan) : intl(commonMessages.downgrade)}
                            </Button>
                          ) : (
                            <Button
                              disabled={
                                token
                                  ? !Boolean(
                                      retrieveFromLocalStorage(
                                        'signupFirstTime'
                                      )
                                    )
                                  : false
                              }
                              onClick={() => handlerFreeSubscribe()}
                              className="btn btn--medium-blue plan-box__button bronze"
                            >
                              {freePlanDisable}
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="pricing-table__td pricing-table__td--with-bg">
                        <div className="mobile-content">
                          {PricingTable[1].col1}
                        </div>
                        {intl(pagesMessages.daily)}
                      </div>
                      <div className="pricing-table__td ">
                        <div className="mobile-content">
                          {PricingTable[2].col1}
                        </div>
                        {intl(commonMessages.unlimited)}
                      </div>
                      <div className="pricing-table__td pricing-table__td--with-bg">
                        <div className="mobile-content">
                          {PricingTable[4].col1}
                        </div>
                        <IconCrossCircle
                          bgColor="var(--icon-bg-clr)"
                          fgColor="var(--icon-fg-clr)"
                          className="mobile-icon"
                        />
                      </div>
                      <div className="pricing-table__td ">
                        <div className="mobile-content">
                          {PricingTable[3].col1}
                        </div>
                        2
                      </div>
                      <div className="pricing-table__td pricing-table__td--with-bg">
                        <div className="mobile-content">
                          {PricingTable[5].col1}
                        </div>
                        <IconCheckboxCircle
                          bgColor="var(--icon-bg-clr)"
                          fgColor="var(--icon-fg-clr)"
                        />
                      </div>
                      <div className="pricing-table__td  pricing-table__td--top-bdr">
                        <div className="mobile-content">
                          {PricingTable[6].col1}
                        </div>
                        <IconCrossCircle
                          bgColor="var(--icon-bg-clr)"
                          fgColor="var(--icon-fg-clr)"
                          className="mobile-icon"
                        />
                      </div>
                      {/* <div className="pricing-table__td pricing-table__td--with-bg pricing-table__td--top-bdr">
                        <div className="mobile-content">{PricingTable[5].col1}</div>
                        <IconCrossCircle bgColor="var(--icon-bg-clr)" fgColor="var(--icon-fg-clr)" className="mobile-icon" />
                      </div> */}
                      {/* <div className="pricing-table__td pricing-table__td--with-bg pricing-table__td--top-bdr">
                        <div className="mobile-content">{PricingTable[6].col1}</div>
                        <IconCrossCircle bgColor="var(--icon-bg-clr)" fgColor="var(--icon-fg-clr)" className="mobile-icon" />
                        <IconCheckboxCircle bgColor="var(--icon-bg-clr)" fgColor="var(--icon-fg-clr)" />
                      </div>
                      <div className="pricing-table__td pricing-table__td--top-bdr">
                        <div className="mobile-content">{PricingTable[7].col1}</div>
                        <IconCheckboxCircle bgColor="var(--icon-bg-clr)" fgColor="var(--icon-fg-clr)" />
                      </div> */}
                    </div>
                    <div
                      className={`pricing-table__col ${
                        selectedCol === 1 ? 'pricing-table__col--selected' : ''
                      }`}
                      onMouseEnter={() => toggleSelectedClass(1)}
                    >
                      <div className="pricing-table__td">
                        <div className="plan-box">
                          <span className="plan-box__name">
                            <Plane /> {intl(pagesMessages.silverCapital)}
                          </span>
                          <span className="plan-box__price">
                            {`£${price}`}
                            <small>{`/${
                              planMonthYear ? intl(pagesMessages.yearlySmall) : intl(pagesMessages.monthSmall)
                            }`}
                            </small>
                            {/* <small>billed {planMonthYear ? 'annually' : 'monthly'}</small> */}
                          </span>
                          {location.pathname === AppRoutes.CHANGE_PLAN ? (
                            <Button
                              disabled={Boolean(
                                silverPlanByPeriodUnit === 'Current Plan'
                              )}
                              onClick={() =>
                                redirectForPurchase(chargebee_plan_id)
                              }
                              className="btn btn--medium-blue plan-box__button silver"
                            >
                              {isUserGoldMember
                                ? intl(commonMessages.downgrade)
                                : silverPlanByPeriodUnit}
                            </Button>
                          ) : (
                            <Button
                              disabled={isUserGoldMember || isSilverPlanDisable}
                              onClick={() =>
                                redirectForPurchase(chargebee_plan_id)
                              }
                              className="btn btn--medium-blue plan-box__button silver"
                            >
                              {isSilverPlanDisable
                                ? intl(pagesMessages.currentPlan) : intl(commonMessages.subscribe)}
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="pricing-table__td pricing-table__td--with-bg">
                        <div className="mobile-content">
                          {PricingTable[1].col1}
                        </div>
                        {intl(pagesMessages.hourly)}
                      </div>
                      <div className="pricing-table__td ">
                        <div className="mobile-content">
                          {PricingTable[2].col1}
                        </div>
                        {intl(commonMessages.unlimited)}
                      </div>
                      <div className="pricing-table__td pricing-table__td--with-bg">
                        <div className="mobile-content">
                          {PricingTable[4].col1}
                        </div>
                        <IconCheckboxCircle
                          bgColor="var(--icon-bg-clr)"
                          fgColor="var(--icon-fg-clr)"
                        />
                      </div>
                      <div className="pricing-table__td ">
                        <div className="mobile-content">
                          {PricingTable[3].col1}
                        </div>
                        5
                      </div>
                      <div className="pricing-table__td pricing-table__td--with-bg">
                        <div className="mobile-content">
                          {PricingTable[5].col1}
                        </div>
                        <IconCheckboxCircle
                          bgColor="var(--icon-bg-clr)"
                          fgColor="var(--icon-fg-clr)"
                        />
                      </div>
                      <div className="pricing-table__td  pricing-table__td--top-bdr">
                        <div className="mobile-content">
                          {PricingTable[6].col1}
                        </div>
                        <IconCrossCircle
                          bgColor="var(--icon-bg-clr)"
                          fgColor="var(--icon-fg-clr)"
                          className="mobile-icon"
                        />
                      </div>
                      {/* <div className="pricing-table__td pricing-table__td--with-bg pricing-table__td--top-bdr">
                        <div className="mobile-content">{PricingTable[5].col1}</div>
                        <IconCheckboxCircle bgColor="var(--icon-bg-clr)" fgColor="var(--icon-fg-clr)" />
                      </div> */}
                      {/* <div className="pricing-table__td pricing-table__td--with-bg pricing-table__td--top-bdr">
                        <div className="mobile-content">{PricingTable[6].col1}</div>
                        <IconCheckboxCircle bgColor="var(--icon-bg-clr)" fgColor="var(--icon-fg-clr)" />
                      </div>
                      <div className="pricing-table__td pricing-table__td--top-bdr">
                        <div className="mobile-content">{PricingTable[7].col1}</div>
                        <IconCheckboxCircle bgColor="var(--icon-bg-clr)" fgColor="var(--icon-fg-clr)" />
                      </div> */}
                    </div>
                    {!planMonthYear && (
                      <div
                        className={`pricing-table__col ${
                          selectedCol === 2
                            ? 'pricing-table__col--selected'
                            : ''
                        }`}
                        onMouseEnter={() => toggleSelectedClass(2)}
                      >
                        <div className="pricing-table__td">
                          {goldPlan && goldPlan.price && (
                            <div className="offer-info">
                              <span>{intl(pagesMessages.limitedTimeOffer)}</span>
                              <span>
                                {`£${goldPlan && goldPlan.price}`}
                                <small>{`/${intl(pagesMessages.monthSmall)}`}</small> {intl(pagesMessages.forLife)}
                              </span>
                            </div>
                          )}
                          <div className="plan-box">
                            <span className="plan-box__name">
                              <Rocket /> {intl(pagesMessages.goldCapital)}
                            </span>
                            <span
                              className={`plan-box__price ${
                                goldPlan && goldPlan.price
                                  ? 'plan-box__price--offer'
                                  : ''
                              }`}
                            >
                              {`£${goldPlan && goldPlan.original_price}`}
                              <small>{`/${intl(pagesMessages.monthSmall)}`}</small>
                              {/* <small>{intl(pagesMessages.billedMonthly)}</small> */}
                              {/* <small>billed {planMonthYear ? 'annually' : 'monthly' }</small> */}
                            </span>
                            {location.pathname === AppRoutes.CHANGE_PLAN ? (
                              <Button
                                disabled={isUserGoldMember}
                                onClick={() =>
                                  redirectGoldMembershipPortal(
                                    goldPlan?.chargebee_plan_id
                                  )
                                }
                                className="btn btn--medium-blue plan-box__button gold"
                              >
                                {isUserGoldMember
                                  ? intl(pagesMessages.currentPlan) : goldFreeTrial ? intl(commonMessages.upgrade) : intl(pagesMessages.fourteenDayFreeTrial)}
                              </Button>
                            ) : (
                              <Button
                                disabled={isUserGoldMember}
                                onClick={() =>
                                  redirectGoldMembershipPortal(
                                    goldPlan?.chargebee_plan_id
                                  )
                                }
                                className="btn btn--medium-blue plan-box__button gold"
                              >
                                {isUserGoldMember
                                  ? intl(pagesMessages.currentPlan)
                                  : goldFreeTrial
                                  ? intl(commonMessages.subscribe)
                                  : intl(pagesMessages.fourteenDayFreeTrial)}
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="pricing-table__td pricing-table__td--with-bg">
                          <div className="mobile-content">
                            {PricingTable[1].col1}
                          </div>
                          {intl(pagesMessages.instantly)}
                        </div>
                        <div className="pricing-table__td ">
                          <div className="mobile-content">
                            {PricingTable[2].col1}
                          </div>
                          {intl(commonMessages.unlimited)}
                        </div>
                        <div className="pricing-table__td pricing-table__td--with-bg">
                          <div className="mobile-content">
                            {PricingTable[4].col1}
                          </div>
                          <IconCheckboxCircle
                            bgColor="var(--icon-bg-clr)"
                            fgColor="var(--icon-fg-clr)"
                          />
                        </div>
                        <div className="pricing-table__td ">
                          <div className="mobile-content">
                            {PricingTable[3].col1}
                          </div>
                          20
                        </div>
                        <div className="pricing-table__td pricing-table__td--with-bg">
                          <div className="mobile-content">
                            {PricingTable[5].col1}
                          </div>
                          <IconCheckboxCircle
                            bgColor="var(--icon-bg-clr)"
                            fgColor="var(--icon-fg-clr)"
                          />
                        </div>
                        <div className="pricing-table__td  pricing-table__td--top-bdr">
                          <div className="mobile-content">
                            {PricingTable[6].col1}
                          </div>
                          <IconCheckboxCircle
                            bgColor="var(--icon-bg-clr)"
                            fgColor="var(--icon-fg-clr)"
                          />
                        </div>
                        {/* <div className="pricing-table__td pricing-table__td--with-bg pricing-table__td--top-bdr">
                        <div className="mobile-content">{PricingTable[5].col1}</div>
                        <IconCheckboxCircle bgColor="var(--icon-bg-clr)" fgColor="var(--icon-fg-clr)" />
                      </div> */}
                        {/* <div className="pricing-table__td pricing-table__td--with-bg pricing-table__td--top-bdr">
                        <div className="mobile-content">{PricingTable[6].col1}</div>
                        <IconCheckboxCircle bgColor="var(--icon-bg-clr)" fgColor="var(--icon-fg-clr)" />
                      </div>
                      <div className="pricing-table__td pricing-table__td--top-bdr">
                        <div className="mobile-content">{PricingTable[7].col1}</div>
                        <IconCheckboxCircle bgColor="var(--icon-bg-clr)" fgColor="var(--icon-fg-clr)" />
                      </div> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>

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
                <div className="points-section__inner">
                  <Pointer
                    icon={<AlertFrequency />}
                    title={intl(pagesMessages.alertFrequency)}
                    content={
                      <>
                        <p>{intl(pagesMessages.alertFrequencyGold)}</p>
                        <p>{intl(pagesMessages.alertFrequencySilver)}</p>
                        <p>{intl(pagesMessages.alertFrequencyBronze)}</p>
                      </>
                    }
                  />
                  <Pointer
                    icon={<WhereCanIGo />}
                    title={intl(pagesMessages.whereCanIGoMapSearch)}
                    content={
                      <p>{intl(pagesMessages.whereCanIGoMapSearchDesc)}</p>
                    }
                  />
                  <Pointer
                    icon={<AvailabilityAlertMethod />}
                    title={intl(pagesMessages.availabilityMethod)}
                    content={
                      <>
                        <p><b>{intl(pagesMessages.availabilityMethodEmail)}:</b> {intl(pagesMessages.availabilityMethodEmailDesc)}</p>
                        <p><b>{intl(pagesMessages.availabilityMethodSms)}:</b> {intl(pagesMessages.availabilityMethodSmsDes)}</p>
                      </>
                    }
                  />
                  {/* <Pointer
                    icon={<MobileApp />}
                    title="iOS & Android App"
                    content={
                      <>
                        <p>Easily see all of your alerts, and receive push notifications whenever we find new reward seat availability.</p>
                      </>
                    }
                  /> */}
                  <Pointer
                    icon={<MoreAirlines />}
                    title={intl(pagesMessages.moreAirlinesTitle)}
                    content={
                      <>
                        <p>{intl(pagesMessages.moreAirlinesDes)}</p>
                      </>
                    }
                  />
                </div>
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
  goldFreeTrial: PropTypes.bool,
  isUserBronzeMember: PropTypes.bool,
  isUserGoldMember: PropTypes.bool,
  cancelEliteMembership: PropTypes.func,
  cancelEliteLoading: PropTypes.bool,
  updateReducerState: PropTypes.func,
  toggleCaneleMembershipModal: PropTypes.bool
}
export default PricingPage
