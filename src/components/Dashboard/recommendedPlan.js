import React from 'react'
import PropTypes from 'prop-types'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import dashboardMessages from 'constants/messages/dashboardMessages'
import { Grid, Button } from 'semantic-ui-react'
import history from 'utils/history'
import { AppRoutes } from 'constants/appRoutes'

const RecommendedPlan = (props) => {
  const {
    recommendedPlanList
  } = props

  return (
    <>
      {recommendedPlanList && recommendedPlanList.length ? (
        <div className="subscription__plan">
          <div className="subscription__plan-head">
            <span>{intl(dashboardMessages.recommendedPlan)}</span>
          </div>
          <Grid.Row className="subscribtionBoxColumn">
            {recommendedPlanList &&
              recommendedPlanList.map((list, key) => (
                <Grid.Column key={key} >
                  <div className="subscription__plan-body subscribtionBox">
                    <div className="subscription__plan-body-inner">
                      <h4>
                        {list.planVar}
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
                            <h2 className={'subscription__plan-price'}>
                              {`£${list.period_unit === 'year' ? list.display_price : list.price}`}
                              <small>
                                {`per ${ intl(commonMessages.monthSmallCase)} ${list.period_unit === 'year' ? intl(commonMessages.billedAnnuallyText): ''} `}
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
                              onClick={() => history.push({
                                pathname: AppRoutes.PRICING
                              }) }
                              className="btn btn--medium-blue subscription__button"
                            >
                              {intl(dashboardMessages.upgradePlanText)}
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Grid className="m-0 subscription__list">
                        <Grid.Row className="pb-0">
                          <Grid.Column width={16} className="px-0">
                            <ul>
                              {list.planVar === 'Silver' && (
                                <>
                                  <li>
                                    {intl(
                                      dashboardMessages.fiveActiveAlertFreq
                                    )}
                                  </li>
                                  <li>{intl(dashboardMessages.whereCanIGo)}</li>
                                  <li>
                                    {intl(dashboardMessages.hourlyAlertRreq)}
                                  </li>
                                </>
                              )}
                              {list.planVar === 'Gold' && (
                                <>
                                  <li>
                                    {intl(
                                      dashboardMessages.twentyActiveAlertFreq
                                    )}
                                  </li>
                                  <li>{intl(dashboardMessages.whereCanIGo)}</li>
                                  <li>
                                    {intl(dashboardMessages.instantAlertRreq)}
                                  </li>
                                  <li>
                                    {intl(
                                      dashboardMessages.alertForAllFutureAirline
                                    )}
                                  </li>
                                </>
                              )}
                            </ul>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </div>
                  </div>
                </Grid.Column>
              ))}
          </Grid.Row>
        </div>
      ): null}
    </>
  )
}

RecommendedPlan.propTypes = {
  recommendedPlanList: PropTypes.array
}

export default RecommendedPlan
