import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button, Dropdown } from 'semantic-ui-react'
import moment from 'moment'
import env from 'utils/env_variables'
import history from 'utils/history'
import './assets/subscription.scss'
import SeoHelmet from 'utils/seoHelmet'
import SeoTexts from 'constants/seoConstants'
import CancelMembershipModal from './cancelMembershipModal'
import { extractURLParams, retrieveFromLocalStorage, navigateToRespectivePage } from 'utils/helpers'
import { pushNotification } from 'utils/notifications'
import { GoogleAdsParam, SubscriptionPlan } from 'constants/globalConstants'
import { AppRoutes } from '../../constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import dashboardMessages from 'constants/messages/dashboardMessages'
import toustifyMessages from 'constants/messages/toustifyMessages'
import pagesMessages from 'constants/messages/pagesMessages'

const Subscription = (props) => {
  const {
    getPricingPlans,
    pricingPlans,
    user: {
      id,
      plan: { expiryTime, chargebee_plan_id: userPlanId },
      downgradeMembership,
      cancelledSubscription,
      isUserSilverMember,
      isUserGoldMember,
      isUserBronzeMember,
      goldFreeTrial
    },
    cancelEliteMembership,
    cancelEliteLoading,
    dashboard: {
      toggleCaneleMembershipModal,
      cancelDowngradeSubscriptionLoading
    },
    updateReducerState,
    location,
    cancelDowngradeSubscription
  } = props

  const token = retrieveFromLocalStorage('token')
  const appendParams = sessionStorage.getItem('queryParamsGA')

  useEffect(() => {
    getPricingPlans()
    if (location && location.search) {
      const data = extractURLParams(props.location.search)
      if (data?.error === 'something went wrong with chargebee') {
        pushNotification(
          intl(toustifyMessages.someThingWrongChargebee),
          'error',
          'TOP_CENTER',
          3000
        )
      } else if (data?.error === 'invalid user id') {
        pushNotification(
          intl(toustifyMessages.invalidUserId),
          'error',
          'TOP_CENTER',
          3000
        )
      } else if (
        data?.success === 'your subscription has been downgraded successfully'
      ) {
        pushNotification(
          intl(toustifyMessages.downgradeSuccess),
          'success',
          'TOP_CENTER',
          3000
        )
      } else {
        const arrData = Object.keys(data)
        const isExist = GoogleAdsParam.includes(arrData[0])
        if (!isExist) {
          history.push(AppRoutes.HOME)
        }
      }
    }
    // eslint-disable-next-line
  }, [])

  let details = null
  if (isUserBronzeMember) {
    details =
      pricingPlans &&
      pricingPlans.find((item) => item.name === 'Silver plan GBP monthly')
  } else if (isUserSilverMember) {
    details =
      pricingPlans &&
      pricingPlans.find((item) => item.name === 'Gold plan GBP monthly launch')
  }else{
    details = pricingPlans &&
    pricingPlans.find((item) =>item.period_unit === 'month' && item.name === SubscriptionPlan.GOLD_PLAN
    )
  }

  const redirectForChargebee = (id, name, chargebee_plan_id) => {
    const url =
      name === 'memberships'
        ? `${env.REDIRECT_ON_RUBY}/memberships?user_id=${id}&chargebee_plan_id=${chargebee_plan_id}`
        : `${env.REDIRECT_ON_RUBY}/chargebee/self_serve_portal?user_id=${id}`
    const newWin = window.open(`${url}${appendParams ? appendParams.replace('?', '&') : ''}`)
    if (!newWin || newWin.closed || typeof newWin.closed == 'undefined') {
      pushNotification(
        intl(toustifyMessages.enablePopup),
        'error',
        'TOP_CENTER',
        3000
      )
      // POPUP BLOCKED
    }
  }

  const redirectGoldMembershipPortal = (id) => {
    if (!goldFreeTrial) {
      const goldFree = pricingPlans.find((item) => item.name === SubscriptionPlan.GOLD_FREE)
      redirectForChargebee(id, 'memberships', goldFree?.chargebee_plan_id)
    }
  }

  const { price, period_unit, chargebee_plan_id } = details || ''
  const today = moment().format('DD-MM-YYYY')
  const todaysdate = moment(today, 'DD-MM-YYYY')
  const eventdate = moment.utc(expiryTime * 1000).format('DD-MM-YYYY')
  const datediff = moment(eventdate, 'DD-MM-YYYY')
  const daysLeft = datediff.diff(todaysdate, 'days')
  return (
    <>
      <SeoHelmet title={SeoTexts.SUBSCRIPTION_TITLE} />
      <div className="subscription">
        <Grid className="m-0 subscription__head">
          <div className="subscription__header">
            <h2 className="subscription__title">
              {intl(dashboardMessages.yourPlan)}:
              <span className="text-medium-blue">
                {isUserBronzeMember && ` ${intl(commonMessages.bronze)}`}
                {isUserSilverMember && ` ${intl(commonMessages.silver)}`}
                {isUserGoldMember && ` ${intl(commonMessages.gold)}`}
              </span>
              {(isUserSilverMember || isUserGoldMember) &&
              cancelledSubscription &&
              expiryTime ? (
                <small>
                  {` (${intl(dashboardMessages.scheduledForFree)} ${
                    downgradeMembership
                      ? intl(commonMessages.silver)
                      : intl(commonMessages.bronzeFreePlan)
                  } ${intl(commonMessages.downgrade)} ${intl(commonMessages.onText)} ${moment.unix(expiryTime).format('MMMM Do')})`}
                </small>
              ) : expiryTime &&
                daysLeft &&
                goldFreeTrial &&
                userPlanId === 'gold-free' ? (
                ` (${daysLeft} ${intl(dashboardMessages.daysLeftOfFreeTrial)})`
              ) : (
                ''
              )}
            </h2>
            <div className="setting-cancel-btn-main-wrap">
              <div className="ui dropdown member-icon">
                <p className="membership-text">{intl(dashboardMessages.membershipText)}</p>
                <i className="setting icon" />
                <Dropdown.Menu>
                  <Dropdown.Item
                    description={intl(dashboardMessages.viewEditBillinData)}
                    onClick={() => redirectForChargebee(id, 'selfServePortal')}
                  />
                  {cancelledSubscription && (
                  <Dropdown.Item className="text-red"
                    description={intl(dashboardMessages.cancelDowngrade)}
                    onClick={() =>
                      !cancelDowngradeSubscriptionLoading &&
                      cancelDowngradeSubscription({ token })
                    }
                  />
                  )}
                  {goldFreeTrial && userPlanId === 'gold-free' ? (
                    <Dropdown.Item
                      description={intl(dashboardMessages.cancelTrial)}
                      onClick={() =>
                        updateReducerState(
                          'dashboard',
                          'toggleCaneleMembershipModal',
                          true
                        )
                      }
                    />
                  ) : (
                    (isUserSilverMember || isUserGoldMember) &&
                    !cancelledSubscription && (
                      <Dropdown.Item
                        description={intl(dashboardMessages.changePlan)}
                        onClick={() => navigateToRespectivePage(AppRoutes.CHANGE_PLAN, appendParams)}
                      />
                    )
                  )}
                </Dropdown.Menu>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="my-0 subscription__list">
          <Grid.Row>
            <Grid.Column width={16}>
              <ul>
                {isUserBronzeMember && (
                  <>
                    <li>{intl(dashboardMessages.twoActiveAlertsAtOnce)}</li>
                    <li>{intl(dashboardMessages.dailyAlertFreq)}</li>
                  </>
                )}
                {isUserGoldMember && (
                  <>
                    <li>{intl(dashboardMessages.twentyActiveAlertFreq)}</li>
                    <li>{intl(dashboardMessages.instantAlertNotificaton)}</li>
                    <li>{intl(dashboardMessages.whereCanIGo)}</li>
                    <li>{intl(commonMessages.smsAlerts)}</li>
                    {/* <li>WhatsApp alerts - Coming Soon</li> */}
                    {/* <li>SMS alerts - Coming Soon</li> */}
                  </>
                )}
                {/* {isUserGoldMember && <li>SMS alerts</li>} */}
                {isUserSilverMember && (
                  <>
                    <li>{intl(dashboardMessages.fiveActiveAlertFreq)}</li>
                    <li>{intl(dashboardMessages.hourlyAlertRreq)}</li>
                    <li>{intl(dashboardMessages.whereCanIGo)}</li>
                  </>
                )}
              </ul>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {isUserBronzeMember && (
          <div className="text-card">
            <p>{intl(dashboardMessages.runningRewards)}</p>
          </div>
        )}
        {!isUserGoldMember && details && (
          <div className="subscription__plan">
            <div className="subscription__plan-head">
              <span>{intl(dashboardMessages.recommendedPlan)}</span>
            </div>
            <div className="subscription__plan-body">
              <div className="subscription__plan-body-inner">
                <h4>
                  {isUserBronzeMember && ` ${intl(commonMessages.silver)}`}
                  {isUserSilverMember && ` ${intl(commonMessages.gold)}`}
                  {/* {isUserSilverMember &&
                    goldFreeTrial &&
                    ` ${intl(commonMessages.gold)}`}
                  {!goldFreeTrial && isUserSilverMember && !isUserBronzeMember && intl(pagesMessages.fourteenDayFreeTrial)} */}
                </h4>

                <Grid className="m-0 subscription__head subscription__plan-body-head">
                  <Grid.Row className="pt-0" verticalAlign="middle">
                    <Grid.Column
                      mobile={10}
                      tablet={11}
                      computer={11}
                      widescreen={11}
                      className="recommendedPlanRate"
                    >
                      <h2 className={`subscription__plan-price ${!goldFreeTrial && isUserSilverMember && !isUserBronzeMember ? 'subscription-gold-free-price-wrap' : '' }`}>
                        {`£${!goldFreeTrial && isUserSilverMember && !isUserBronzeMember ? details.original_price : price}`}
                        <small>{`Per ${
                          period_unit === 'month'
                            ? intl(commonMessages.month)
                            : intl(commonMessages.year)
                        }`}
                        </small>
                      </h2>
                    </Grid.Column>
                    <Grid.Column
                      mobile={6}
                      tablet={5}
                      computer={5}
                      widescreen={5}
                    >
                      <Button
                        onClick={() =>
                          !goldFreeTrial && isUserSilverMember && !isUserBronzeMember ?
                          redirectGoldMembershipPortal(id)
                          :
                          redirectForChargebee(
                            id,
                            'memberships',
                            chargebee_plan_id
                          )
                        }
                        className="btn btn--medium-blue subscription__button"
                      >
                        {!goldFreeTrial && isUserSilverMember && !isUserBronzeMember ? intl(pagesMessages.fourteenDayFreeTrial):
                        intl(commonMessages.subscribe)}
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid className="m-0 subscription__list">
                  <Grid.Row className="pb-0">
                    <Grid.Column width={16} className="px-0">
                      <ul>
                        {isUserBronzeMember && (
                          <>
                            <li>
                              {intl(dashboardMessages.fiveActiveAlertFreq)}
                            </li>
                            <li>{intl(dashboardMessages.whereCanIGo)}</li>
                            <li>{intl(dashboardMessages.hourlyAlertRreq)}</li>
                            {/* <li>WhatsApp alerts - Coming Soon</li> */}
                          </>
                        )}
                        {isUserSilverMember && (
                          <>
                            <li>
                              {intl(dashboardMessages.twentyActiveAlertFreq)}
                            </li>
                            <li>{intl(dashboardMessages.whereCanIGo)}</li>
                            {/* <li>WhatsApp alerts - Coming Soon</li> */}
                            <li>{intl(dashboardMessages.instantAlertRreq)}</li>
                            {/* <li>SMS alerts - Coming Soon</li> */}
                            <li>
                              {intl(dashboardMessages.alertForAllFutureAirline)}
                            </li>
                          </>
                        )}
                      </ul>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </div>
          </div>
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

Subscription.propTypes = {
  user: PropTypes.object,
  getPricingPlans: PropTypes.func,
  pricingPlans: PropTypes.array,
  cancelEliteMembership: PropTypes.func,
  cancelEliteLoading: PropTypes.bool,
  dashboard: PropTypes.object,
  updateReducerState: PropTypes.func,
  location: PropTypes.object,
  cancelDowngradeSubscription: PropTypes.func
}

export default Subscription
