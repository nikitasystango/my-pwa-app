import React, { useState } from 'react'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import commonMessages from 'constants/messages/commonMessages'
import {
  InfoIcon,
  IconCheckboxCircle,
  IconCrossCircle,
  PaperPlane,
  Plane,
  Rocket
} from 'utils/svgs'
import { Button, Popup } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { retrieveFromLocalStorage } from 'utils/helpers'
import history from 'utils/history'
import {
  SubscriptionPlan,
  silverPlansList,
  goldPlansList,
  FreePlans
} from 'constants/globalConstants'
import { getPercentDiscountPrice } from 'utils/commonFunction'

const PricingTableComponent = (props) => {
  const token = retrieveFromLocalStorage('token')

  const [selectedCol, toggleSelectedCol] = useState(1)
  const {
    location,
    updateReducerState,
    isUserBronzeMember,
    pricingPlans,
    planMonthYear,
    plan,
    isUserGoldMember,
    goldFreeTrial,
    silverFreeTrial,
    isUserSilverMember,
    redirectForPurchase,
    selectedCouponId
  } = props

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
  const toggleSelectedClass = (n) => {
    toggleSelectedCol(n)
  }

  const handlerFreeSubscribe = () => {
    if (token) {
      history.push(AppRoutes.HOME)
    } else {
      history.push(AppRoutes.SIGN_UP)
    }
  }

  const redirectSilverMembershipPortal = (id) => {
    if (silverFreeTrial) {
      const silverFree = pricingPlans.find(
        (item) =>
          item.chargebee_plan_id ===
          (planMonthYear === 'year'
            ? FreePlans.SILVER_YEARLY_PLAN
            : FreePlans.SILVER_MONTHLY_PLAN)
      )
      redirectForPurchase(silverFree?.chargebee_plan_id)
    } else {
      redirectForPurchase(id)
    }
  }

  const redirectGoldMembershipPortal = (id) => {
    if (goldFreeTrial) {
      const goldFree = pricingPlans.find(
        (item) =>
          item.chargebee_plan_id ===
          (planMonthYear === 'year'
            ? FreePlans.GOLD_YEARLY_FREE
            : FreePlans.GOLD_MONTHLY_FREE)
      )
      redirectForPurchase(goldFree?.chargebee_plan_id)
    } else {
      redirectForPurchase(id)
    }
  }

  //  Calculate discounted value after applying coupon
  const onCalculateDiscountValue = (price) => {
    const { discount_percentage, discount_type, discount_amount } = selectedCouponId || {}
    let totalValue = ''
    if(discount_type === 'percentage' && discount_percentage) {
      const discountVal = getPercentDiscountPrice(price.toFixed(2), discount_percentage)
      // eslint-disable-next-line prefer-destructuring
      totalValue = (price - discountVal).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    }else if(discount_type === 'fixed_amount' && discount_amount) {
      totalValue = (price - discount_amount).toFixed(2)
    }
    return totalValue
  }

  // Manage conditions to disable button according to current plan for pricing page
  const isDisable = React.useMemo(() => {
    let disableCond = false
    if (!token) {
      disableCond = false
      return
    }
    if (isUserBronzeMember) {
      disableCond = false
    } else if (isUserSilverMember) {
      if (plan?.period_unit === 'month') {
        disableCond = false
      } else {
        disableCond = planMonthYear === 'month' ? true : false
      }
    } else {
      if (plan?.period_unit === 'year') {
        disableCond = true
      } else {
        disableCond = planMonthYear === 'month' ? true : false
      }
    }
    return disableCond
    // eslint-disable-next-line
  }, [isUserBronzeMember, isUserSilverMember, planMonthYear]);

  // filter list of all silver plans
  const silverplanlisting = pricingPlans.filter((item) =>
    silverPlansList.includes(item.chargebee_plan_id)
  )

  let silverPlan =
    silverplanlisting &&
    silverplanlisting.filter(
      (item) =>
        item.period_unit === planMonthYear &&
        item.chargebee_plan_id === plan?.chargebee_plan_id
    )[0]

  // if silver plan is not subscribed, use deafult plan as Silver plan GBP monthly
  if (!silverPlan || silverPlan === undefined) {
    silverPlan =
      pricingPlans &&
      pricingPlans.find(
        (item) =>
          item.period_unit === planMonthYear &&
          item.chargebee_plan_id ===
            (planMonthYear === 'year'
              ? SubscriptionPlan.SILVER_PLAN_ANNUALLY
              : SubscriptionPlan.SILVER_PLAN)
      )
  }

  const { chargebee_plan_id } = silverPlan || ''

  const freePlanDisable =
    token &&
    isUserBronzeMember &&
    !Boolean(retrieveFromLocalStorage('signupFirstTime'))
      ? intl(commonMessages.currentPlan)
      : intl(commonMessages.subscribe)

  const isSilverPlanDisable =
    plan?.chargebee_plan_id === chargebee_plan_id ? true : false

  const silverPlanByPeriodUnit = isSilverPlanDisable
    ? intl(pagesMessages.currentPlan)
    : silverPlan?.period_unit === 'year'
    ? intl(commonMessages.upgrade)
    : intl(commonMessages.downgrade)

  // Gold Plan Conditions
  const goldPlanlisting = pricingPlans.filter((item) =>
    goldPlansList.includes(item.chargebee_plan_id)
  )

  let goldPlan =
    goldPlanlisting &&
    goldPlanlisting.filter(
      (item) =>
        item.period_unit === planMonthYear &&
        item.chargebee_plan_id === plan?.chargebee_plan_id
    )[0]

  // if gold plan is not subscribed, use deafult plan as Gold plan GBP monthly
  if (!goldPlan || goldPlan === undefined) {
    goldPlan =
      pricingPlans &&
      pricingPlans.find(
        (item) =>
          item.period_unit === planMonthYear &&
          item.chargebee_plan_id ===
            (planMonthYear === 'year'
              ? SubscriptionPlan.GOLD_PLAN_ANNUALLY
              : SubscriptionPlan.GOLD_PLAN)
      )
  }
  //  Gold plan Button label
  const isGoldPlanDisable =
    plan?.chargebee_plan_id === goldPlan?.chargebee_plan_id ? true : false

  const goldPlanByPeriodUnit = isGoldPlanDisable
    ? intl(pagesMessages.currentPlan)
    : goldPlan?.period_unit === 'year'
    ? intl(commonMessages.upgrade)
    : intl(commonMessages.downgrade)

  const originalGoldPlan =
    pricingPlans &&
    pricingPlans.find(
      (item) =>
        item.period_unit === planMonthYear &&
        item.chargebee_plan_id ===
          (planMonthYear === 'year'
            ? SubscriptionPlan.GOLD_PLAN_ANNUALLY
            : SubscriptionPlan.GOLD_PLAN)
    )

  const originalSilverPlan =
    pricingPlans &&
    pricingPlans.find(
      (item) =>
        item.period_unit === planMonthYear &&
        item.chargebee_plan_id ===
          (planMonthYear === 'year'
            ? SubscriptionPlan.SILVER_PLAN_ANNUALLY
            : SubscriptionPlan.SILVER_PLAN)
    )

  return (
    <div className="pricing-table pricing-table--desktop">
      <div className="pricing-table__inner">
        <div className="pricing-table__left">
          <div className="pricing-table__col">
            <div className="pricing-table__td">
              <div className="billing-method-box" />
            </div>
            <div className="pricing-table__td pricing-table__td--with-bg">
              {intl(pagesMessages.alertFrequency)}
            </div>
            <div className="pricing-table__td ">
              {intl(pagesMessages.airlinesSearch)}{' '}
            </div>
            <div className="pricing-table__td pricing-table__td--with-bg">
              {intl(pagesMessages.whereCanIGoMapSearch)}
            </div>
            <div className="pricing-table__td ">
              {intl(pagesMessages.activeAlertOnce)}
              <Popup
                content={intl(pagesMessages.activeAlertOnceDes)}
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
                      ? intl(pagesMessages.currentPlan)
                      : intl(commonMessages.downgrade)}
                  </Button>
                ) : (
                  <Button
                    disabled={
                      token
                        ? !Boolean(retrieveFromLocalStorage('signupFirstTime'))
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
              <div className="mobile-content">{PricingTable[1].col1}</div>
              {intl(pagesMessages.daily)}
            </div>
            <div className="pricing-table__td ">
              <div className="mobile-content">{PricingTable[2].col1}</div>
              {intl(commonMessages.unlimited)}
            </div>
            <div className="pricing-table__td pricing-table__td--with-bg">
              <div className="mobile-content">{PricingTable[4].col1}</div>
              <IconCrossCircle
                bgColor="var(--icon-bg-clr)"
                fgColor="var(--icon-fg-clr)"
                className="mobile-icon"
              />
            </div>
            <div className="pricing-table__td ">
              <div className="mobile-content">{PricingTable[3].col1}</div>2
            </div>
            <div className="pricing-table__td pricing-table__td--with-bg">
              <div className="mobile-content">{PricingTable[5].col1}</div>
              <IconCheckboxCircle
                bgColor="var(--icon-bg-clr)"
                fgColor="var(--icon-fg-clr)"
              />
            </div>
            <div className="pricing-table__td  pricing-table__td--top-bdr">
              <div className="mobile-content">{PricingTable[6].col1}</div>
              <IconCrossCircle
                bgColor="var(--icon-bg-clr)"
                fgColor="var(--icon-fg-clr)"
                className="mobile-icon"
              />
            </div>
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
                  {`£${selectedCouponId?.id ?
                    onCalculateDiscountValue(planMonthYear === 'year' ? Number(originalSilverPlan?.display_price) : originalSilverPlan?.price)
                    : planMonthYear === 'year' ? originalSilverPlan?.display_price : originalSilverPlan?.price}`}
                  <small>
                    {`/${intl(pagesMessages.monthSmall)}`}
                  </small>
                  {planMonthYear === 'year' && <small>{intl(commonMessages.billedAnnuallyText)}</small> }
                </span>
                {location.pathname === AppRoutes.CHANGE_PLAN ? (
                  <Button
                    disabled={Boolean(
                      silverPlanByPeriodUnit === intl(pagesMessages.currentPlan)
                    )}
                    onClick={() =>
                      redirectSilverMembershipPortal(chargebee_plan_id)
                    }
                    className="btn btn--medium-blue plan-box__button silver"
                  >
                    {isUserGoldMember && plan?.period_unit === 'year'
                      ? intl(commonMessages.downgrade)
                      : silverFreeTrial
                      ? intl(pagesMessages.fourteenDayFreeTrial)
                      : silverPlanByPeriodUnit}
                  </Button>
                ) : (
                  <Button
                    disabled={isDisable || isSilverPlanDisable}
                    onClick={() =>
                      redirectSilverMembershipPortal(chargebee_plan_id)
                    }
                    className="btn btn--medium-blue plan-box__button silver"
                  >
                    {isSilverPlanDisable
                      ? intl(pagesMessages.currentPlan)
                      : silverFreeTrial
                      ? intl(pagesMessages.fourteenDayFreeTrial)
                      : intl(commonMessages.subscribe)}
                  </Button>
                )}
              </div>
            </div>
            <div className="pricing-table__td pricing-table__td--with-bg">
              <div className="mobile-content">{PricingTable[1].col1}</div>
              {intl(pagesMessages.hourly)}
            </div>
            <div className="pricing-table__td ">
              <div className="mobile-content">{PricingTable[2].col1}</div>
              {intl(commonMessages.unlimited)}
            </div>
            <div className="pricing-table__td pricing-table__td--with-bg">
              <div className="mobile-content">{PricingTable[4].col1}</div>
              <IconCheckboxCircle
                bgColor="var(--icon-bg-clr)"
                fgColor="var(--icon-fg-clr)"
              />
            </div>
            <div className="pricing-table__td ">
              <div className="mobile-content">{PricingTable[3].col1}</div>5
            </div>
            <div className="pricing-table__td pricing-table__td--with-bg">
              <div className="mobile-content">{PricingTable[5].col1}</div>
              <IconCheckboxCircle
                bgColor="var(--icon-bg-clr)"
                fgColor="var(--icon-fg-clr)"
              />
            </div>
            <div className="pricing-table__td  pricing-table__td--top-bdr">
              <div className="mobile-content">{PricingTable[6].col1}</div>
              <IconCrossCircle
                bgColor="var(--icon-bg-clr)"
                fgColor="var(--icon-fg-clr)"
                className="mobile-icon"
              />
            </div>
          </div>
          {/* {!planMonthYear && ( */}
          <div
            className={`pricing-table__col ${
              selectedCol === 2 ? 'pricing-table__col--selected' : ''
            }`}
            onMouseEnter={() => toggleSelectedClass(2)}
          >
            <div className="pricing-table__td">
              {originalGoldPlan && originalGoldPlan.price && (
                <div className="offer-info">
                  <span>{intl(pagesMessages.limitedTimeOffer)}</span>
                  <span>
                    {`£${selectedCouponId?.id ?
                      onCalculateDiscountValue(planMonthYear === 'year' ? Number(originalGoldPlan?.display_price) : originalGoldPlan?.price)
                      : planMonthYear === 'year' ? originalGoldPlan?.display_price : originalGoldPlan && originalGoldPlan.price}`}
                    <small>{`/${intl(pagesMessages.monthSmall)}`}</small>{' '}
                    {intl(pagesMessages.forLife)}
                  </span>
                </div>
              )}
              <div className="plan-box">
                <span className="plan-box__name">
                  <Rocket /> {intl(pagesMessages.goldCapital)}
                </span>
                <span
                  className={`plan-box__price ${
                    originalGoldPlan && originalGoldPlan.price
                      ? 'plan-box__price--offer'
                      : ''
                  }`}
                >
                  {`£${originalGoldPlan && originalGoldPlan.original_price}`}
                  <small>
                    {`/${intl(pagesMessages.monthSmall)}`}
                  </small>
                  {planMonthYear === 'year' && <small>{intl(commonMessages.billedAnnuallyText)}</small> }
                </span>
                {location.pathname === AppRoutes.CHANGE_PLAN ? (
                  <Button
                    disabled={Boolean(
                      goldPlanByPeriodUnit === intl(pagesMessages.currentPlan)
                    )}
                    onClick={() =>
                      redirectGoldMembershipPortal(goldPlan?.chargebee_plan_id)
                    }
                    className="btn btn--medium-blue plan-box__button gold"
                  >
                    {goldFreeTrial
                      ? intl(pagesMessages.fourteenDayFreeTrial)
                      : goldPlanByPeriodUnit}
                  </Button>
                ) : (
                  <Button
                    disabled={isDisable}
                    onClick={() =>
                      redirectGoldMembershipPortal(goldPlan?.chargebee_plan_id)
                    }
                    className="btn btn--medium-blue plan-box__button gold"
                  >
                    {isGoldPlanDisable
                      ? intl(pagesMessages.currentPlan)
                      : goldFreeTrial
                      ? intl(pagesMessages.fourteenDayFreeTrial)
                      : intl(commonMessages.subscribe)}
                  </Button>
                )}
              </div>
            </div>
            <div className="pricing-table__td pricing-table__td--with-bg">
              <div className="mobile-content">{PricingTable[1].col1}</div>
              {intl(pagesMessages.instantly)}
            </div>
            <div className="pricing-table__td ">
              <div className="mobile-content">{PricingTable[2].col1}</div>
              {intl(commonMessages.unlimited)}
            </div>
            <div className="pricing-table__td pricing-table__td--with-bg">
              <div className="mobile-content">{PricingTable[4].col1}</div>
              <IconCheckboxCircle
                bgColor="var(--icon-bg-clr)"
                fgColor="var(--icon-fg-clr)"
              />
            </div>
            <div className="pricing-table__td ">
              <div className="mobile-content">{PricingTable[3].col1}</div>
              20
            </div>
            <div className="pricing-table__td pricing-table__td--with-bg">
              <div className="mobile-content">{PricingTable[5].col1}</div>
              <IconCheckboxCircle
                bgColor="var(--icon-bg-clr)"
                fgColor="var(--icon-fg-clr)"
              />
            </div>
            <div className="pricing-table__td  pricing-table__td--top-bdr">
              <div className="mobile-content">{PricingTable[6].col1}</div>
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
          {/* // )} */}
        </div>
      </div>
    </div>
  )
}
PricingTableComponent.propTypes = {
  location: PropTypes.object,
  updateReducerState: PropTypes.func,
  isUserBronzeMember: PropTypes.bool,
  pricingPlans: PropTypes.array,
  planMonthYear: PropTypes.string,
  plan: PropTypes.object,
  isUserGoldMember: PropTypes.bool,
  goldFreeTrial: PropTypes.bool,
  silverFreeTrial: PropTypes.bool,
  isUserSilverMember: PropTypes.bool,
  redirectForPurchase: PropTypes.func,
  selectedCouponId: PropTypes.object
}

export default PricingTableComponent
