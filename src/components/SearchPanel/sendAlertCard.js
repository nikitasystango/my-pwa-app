import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Button } from 'semantic-ui-react'
import { SendMeAlertCard } from './style'
import { BellIcon, BellIconBlue } from 'utils/svgs'
import { retrieveFromLocalStorage } from 'utils/helpers'
import history from 'utils/history'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import searchPanelMessages from 'constants/messages/searchPanelMessages'
import commonMessages from 'constants/messages/commonMessages'

const SendAlertCard = (props) => {
  const { isUserSilverMember, isUserGoldMember, pathname, handleScrollToStickyHeader, label= null, alertMessage, hideSearchButton } = props
  const token = retrieveFromLocalStorage('token')

  return (
    <>
      {pathname && (pathname === AppRoutes.CALENDER || pathname === AppRoutes.MY_ALERT) &&
        <SendMeAlertCard className="smac">
          <Grid className="m-0">
            <Grid.Row>
              <Grid.Column mobile={16} tablet={12} computer={12} widescreen={12} verticalAlign="middle">
                {!token &&
                  <>
                    <p>{intl(searchPanelMessages.chooseCabinClassTitle)}</p>
                    <p>{intl(searchPanelMessages.chooseCabinClassTextOne)} <b>{intl(searchPanelMessages.chooseCabinClassTextTwo)}</b> {intl(searchPanelMessages.chooseCabinClassTextThree)}</p>
                  </>
                }
                {token && !isUserSilverMember && !isUserGoldMember && label === null &&
                  <>
                    <p>{intl(searchPanelMessages.bronzeDailyAlertTitle)}</p>
                    <p className="cursor-pointer hover-text-underline" onClick={() => history.push(AppRoutes.PRICING)}>{intl(searchPanelMessages.upgradeToMembership)} <b>{intl(searchPanelMessages.upgradeToBronzeChance)}</b> {intl(searchPanelMessages.upgradeToBronzeHourCheck)}</p>
                  </>
                }
                {isUserSilverMember &&
                  <>
                    <p>{intl(searchPanelMessages.silverHourAlertTitle)}</p>
                    <p className="cursor-pointer hover-text-underline" onClick={() => history.push(AppRoutes.PRICING)}>{intl(searchPanelMessages.upgradeToMembership)} <b>{intl(searchPanelMessages.upgradeToSilverChance)}</b> {intl(searchPanelMessages.upgradeToSilverMultiCheck)}</p>
                  </>
                }
                {isUserGoldMember &&
                  <>
                    {/* <p>Dates not available? Set up an alert! We’ll check multiple times per hour</p>
                    <p>We will notify you when seats become available</p> */}
                    <p>{intl(searchPanelMessages.goldMultiTimeAlertTitle)}</p>
                    <p>{intl(searchPanelMessages.upgradeGoldText)}</p>
                  </>
                }
                {label === 'myAlerts' &&
                <>
                  <div className="myAlerts-wrap-banner" >
                    <BellIconBlue />
                    <p> {alertMessage} </p>
                  </div>
                </>
                }
              </Grid.Column>
              <Grid.Column mobile={16} tablet={4} computer={4} widescreen={4}>
                {label === 'myAlerts' ?
                  !hideSearchButton && <Button primary className="btn btn--dark" onClick={()=> history.push(AppRoutes.HOME)}>{intl(commonMessages.search)} </Button>
                :
                  <Button primary className="btn btn--dark" onClick={handleScrollToStickyHeader}>{intl(searchPanelMessages.createAlert)} <BellIcon /></Button>
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </SendMeAlertCard>
      }
    </>
  )
}


SendAlertCard.propTypes = {
  isUserSilverMember: PropTypes.bool,
  isUserGoldMember: PropTypes.bool,
  pathname: PropTypes.string,
  handleScrollToStickyHeader: PropTypes.func,
  label: PropTypes.string,
  alertMessage: PropTypes.string,
  hideSearchButton: PropTypes.bool
}

export default React.memo(SendAlertCard)
