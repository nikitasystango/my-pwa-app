import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Dropdown } from 'semantic-ui-react'
import moment from 'moment'
import env from 'utils/env_variables'
import history from 'utils/history'
import './assets/subscription.scss'
import SeoHelmet from 'utils/seoHelmet'
import SeoTexts from 'constants/seoConstants'
import CancelMembershipModal from './cancelMembershipModal'
import { extractURLParams, retrieveFromLocalStorage, navigateToRespectivePage, hasWord } from 'utils/helpers'
import { pushNotification } from 'utils/notifications'
import { GoogleAdsParam, SubscriptionPlan, FreePlans, RecommendedBronze, RecommendedSilver } from 'constants/globalConstants'
import { AppRoutes } from '../../constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import dashboardMessages from 'constants/messages/dashboardMessages'
import toustifyMessages from 'constants/messages/toustifyMessages'
import RecommendedPlan from './recommendedPlan'

const Subscription = (props) => {
  const {
    getPricingPlans,
    pricingPlans,
    user: {
      id,
      plan: { expiryTime, chargebee_plan_id: userPlanId },
      cancelledSubscription,
      isUserSilverMember,
      isUserGoldMember,
      isUserBronzeMember,
      downgradedPlan
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

  const handlePlanNameCondition = (str) => hasWord(str, 'gold') ? 'Gold' : hasWord(str, 'elite') ? 'Silver' : 'Bronze'

  const recommendedPlanList = React.useMemo(()=> {
    const data = []
    pricingPlans &&
    // eslint-disable-next-line
    pricingPlans.map((list) => {
      if(isUserBronzeMember) {
        if(RecommendedBronze.includes(list.chargebee_plan_id)) {
          data.push({
            ...list,
            planVar: handlePlanNameCondition(list.chargebee_plan_id)
          })
        }
      }else if (isUserSilverMember) {
        if(RecommendedSilver.includes(list.chargebee_plan_id)) {
          data.push({
            ...list,
            planVar: handlePlanNameCondition(list.chargebee_plan_id)
          })
        }
      }
    })
    return data
    // eslint-disable-next-line
  }, [pricingPlans, isUserBronzeMember, isUserSilverMember])


  const downgradePlanText = React.useMemo(()=> {
  let text = intl(commonMessages.bronzeFreePlan)
    if(downgradedPlan) {
      text = downgradedPlan === SubscriptionPlan.SILVER_PLAN ? `${intl(commonMessages.silver)} ${intl(commonMessages.monthlyText)}` : downgradedPlan === SubscriptionPlan.GOLD_PLAN ? `${intl(commonMessages.gold)} ${intl(commonMessages.monthlyText)}` : downgradedPlan === SubscriptionPlan.SILVER_PLAN_ANNUALLY ? `${intl(commonMessages.silver)} ${intl(commonMessages.annuallyText)}` : intl(commonMessages.bronzeFreePlan)
    }
    return text
    // eslint-disable-next-line
  }, [downgradedPlan])

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
                   downgradePlanText
                  } ${intl(commonMessages.downgrade)} ${intl(commonMessages.onText)} ${moment.unix(expiryTime).format('MMMM Do')})`}
                </small>
              ) : expiryTime &&
                daysLeft &&
                (userPlanId === FreePlans.SILVER_MONTHLY_PLAN || userPlanId === FreePlans.GOLD_MONTHLY_FREE || userPlanId === FreePlans.SILVER_YEARLY_PLAN || userPlanId === FreePlans.GOLD_YEARLY_FREE) ? (
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
                  {(userPlanId === FreePlans.GOLD_MONTHLY_FREE || userPlanId === FreePlans.SILVER_MONTHLY_PLAN
                  || userPlanId === FreePlans.SILVER_YEARLY_PLAN || userPlanId === FreePlans.GOLD_YEARLY_FREE
                  ) ? (
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
        <RecommendedPlan
        recommendedPlanList={recommendedPlanList}
        />
      </div>
      <CancelMembershipModal
        toggleCaneleMembershipModal={toggleCaneleMembershipModal}
        toggleModal={() =>
          updateReducerState('dashboard', 'toggleCaneleMembershipModal', false)
        }
        cancelEliteMembership={cancelEliteMembership}
        cancelEliteLoading={cancelEliteLoading}
        userPlanId={userPlanId}
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
