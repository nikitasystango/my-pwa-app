import React from 'react'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import './assets/scss/mapBox.scss'
import { navigateToRespectivePage } from 'utils/helpers'
import { IntroBox } from './style'
import homeMessages from 'constants/messages/homeMessages'
import layoutMessages from 'constants/messages/layoutMessages'

const HomeIntroBox = () => {
  const appendParams = sessionStorage.getItem('queryParamsGA')
  return (
    <>
      <IntroBox className="introbox-main-wrap-one">
        <div className="container">
          <div className="ui two column grid ">
            <div className="row introbox-row">
              <div className="six wide column  ">
                <div className="IntroBox-image-wrap">
                  <picture className="d-b">
                    <source
                    srcSet={require('./assets/introbox-img-1.webp')}
                    type="image/webp"
                    />
                    <img
                        data-src={require('./assets/introbox-img-1.png')}
                        alt="Introbox-img"
                        className="lazyload"
                    />
                  </picture>
                </div>
              </div>
              <div className="ten wide column ">
                <div className="IntroBox-content-wrap">
                  <h3 className="IntroBox-head">
                    {intl(homeMessages.iAmDouglasText)}
                  </h3>
                  <h5 className="IntroBox-subhead">
                    {intl(homeMessages.welcomeToRewardFlightText)}
                  </h5>
                  <p>{intl(homeMessages.twoThingsLoveText)}</p>
                  <p>{intl(homeMessages.iAmPassionateIntroTitle)}</p>
                  <p>{intl(homeMessages.rewardAirlineTicketText)}</p>
                  <p>{intl(homeMessages.snagFindingFlightsText)}</p>
                  <p>{intl(homeMessages.joinRewardFlightFinderText)}</p>
                  <p>{intl(homeMessages.sundayTimesText)}</p>
                  <button
                  onClick={() => navigateToRespectivePage(AppRoutes.SIGN_UP, appendParams)}
                  className="ui button btn btn--medium-blue mt-2"
                  >
                    {intl(homeMessages.joinNowText)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IntroBox>
      <IntroBox className="introbox-main-wrap-two">
        <div className="container">
          <div className="ui two column grid ">
            <div className="row introbox-row introbox-two ">
              <div className="six wide column ">
                <div className="IntroBox-image-wrap">
                  <picture className="d-b">
                    <source
                    srcSet={require('./assets/introbox-img-2.webp')}
                    type="image/webp"
                    className="introbox-two-desk-img"
                    />
                    <img
                        data-src={require('./assets/introbox-img-2.png')}
                        alt="Introbox-img"
                        className="lazyload introbox-two-desk-img"
                        width="399"
                        height="491"
                    />
                  </picture>
                  <picture className="d-b">
                    <source
                    srcSet={require('./assets/introbox-img-2-mobile.webp')}
                    type="image/webp"
                    className="introbox-two-mobile-img"
                    />
                    <img
                        data-src={require('./assets/introbox-img-2-mobile.png')}
                        alt="Introbox-img"
                        className="lazyload introbox-two-mobile-img"
                        width="399"
                        height="388"
                    />
                  </picture>
                </div>
              </div>
              <div className="ten wide column ">
                <div className="IntroBox-content-wrap IntroBox-content-wrap-two">
                  <h3 className="IntroBox-head">
                    {intl(homeMessages.freeRewardAlerts)}
                  </h3>
                  <h5 className="IntroBox-subhead">
                    {intl(homeMessages.searchFreeRewardAlerts)}
                  </h5>
                  <p>{intl(homeMessages.setUpFreeRewardText)}</p>
                  <p>{intl(homeMessages.dontSpyAvailableRewardText)}</p>
                  <p>{intl(homeMessages.freeMembershipSearchText)}</p>
                  <p>{intl(homeMessages.keepSearchingText)}</p>
                  <p>{intl(homeMessages.homeSimpleText)}</p>
                  <button
                  onClick={() => navigateToRespectivePage(AppRoutes.HOW_IT_WORKS, appendParams)}
                  className="ui button btn btn--medium-blue mt-2"
                  >
                    {intl(layoutMessages.howItWorksLabel)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IntroBox>
      <IntroBox className="introbox-main-wrap-three">
        <div className="container">
          <div className="ui two column grid ">
            <div className="row introbox-row">
              <div className="six wide column ">
                <div className="IntroBox-image-wrap">
                  <picture className="d-b">
                    <source
                    srcSet={require('./assets/introbox-img-3.webp')}
                    type="image/webp"
                    className="introbox-two-desk-img"
                    />
                    <img
                        data-src={require('./assets/introbox-img-3.png')}
                        alt="Introbox-img"
                        className="lazyload introbox-two-desk-img"
                        width="399"
                        height="422"
                    />
                  </picture>
                </div>
              </div>
              <div className="ten wide column ">
                <div className="IntroBox-content-wrap">
                  <h3 className="IntroBox-head">
                    {intl(homeMessages.upgradesAvailableText)}
                  </h3>
                  <p>{intl(homeMessages.unlockHandyText)}</p>
                  <p>
                    {intl(
                    homeMessages.silverMembershipAvailabilityText
                  )}
                  </p>
                  <button
                  onClick={() => navigateToRespectivePage(AppRoutes.PRICING, appendParams)}
                  className="ui button btn btn--medium-blue mt-2"
                  >
                    Find Out More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IntroBox>
    </>
  )
}

export default React.memo(HomeIntroBox)
