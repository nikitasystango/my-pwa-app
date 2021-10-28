import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'
import { FirstScreenLogo } from '../../utils/svgs'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import './assets/scss/virginAtlantic.scss'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'

const SignupOnBoardingModal = (props) => {
  const { toggleSignupOnBoardingModal, redirectToPricing } = props

  return (
    <>
      <Modal
        open={toggleSignupOnBoardingModal}
        onClose={() =>
          redirectToPricing()
        }
        closeIcon={
          <div className="onboarding-close-btn">
            <svg className="cst-popup__close onboarding-close-btn" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22.5" cy="22.5" r="19" fill="#03B2D8" stroke="#425674" strokeWidth="7"/>
              <path d="M18 28L28 18" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <path d="M28 28L18 18" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
        }
        closeOnDimmerClick={false}
        className="thankyou-popup"
        closeOnEscape={false}
      >
        <Modal.Content className="p-0">
          <Carousel showThumbs={false}>
            <div>
              <div className="personolised-screen screen-0">
                <FirstScreenLogo/>
                <h2>{intl(pagesMessages.welcomeToRewardFlightFinder)} </h2>
                <p>
                  {intl(pagesMessages.upToDateRewardSeatAvailiability)}<br className="br-responsive"/> {intl(pagesMessages.findSeatsYouWant)}<br className="br-responsive"/> {intl(pagesMessages.becomeAvailable)}
                </p>
              </div>
            </div>
            <div>
              <div className="personolised-screen screen-boarding">
                <div className="personolised-screen-content" >
                  <h2>{intl(pagesMessages.earlySearchRoute)}</h2>
                  <p>
                    {intl(pagesMessages.supportAllBARoute)}
                  </p>
                </div>
                <div className="personolised-screen-img" >
                  <img src={require('./assets/images/signupscreens/screen-1-img.png')} alt="slideScreen" />
                </div>
              </div>
            </div>
            <div>
              <div className="personolised-screen screen-boarding">
                <div className="personolised-screen-content" >
                  <h2> {intl(pagesMessages.seeEntireYearAvailability)}
                  </h2>
                  <p>
                    {intl(pagesMessages.allAvailabilityWithOneClick)}
                  </p>
                </div>
                <div className="personolised-screen-img" >
                  <img src={require('./assets/images/signupscreens/screen-2-img.png')} alt="slideScreen"/>
                </div>
              </div>
            </div>
            <div>
              <div className="personolised-screen screen-boarding">
                <div className="personolised-screen-content" >
                  <h2>{intl(pagesMessages.datesNotAvailable)}</h2>
                  <p>
                    {intl(pagesMessages.checkOnceDailyFree)}
                  </p>
                </div>
                <div className="personolised-screen-img" >
                  <img src={require('./assets/images/signupscreens/screen-3-img.png')} alt="slideScreen"/>
                </div>
              </div>
            </div>
            <div>
              <div className="personolised-screen screen-boarding">
                <div className="personolised-screen-content" >
                  <h2> {intl(pagesMessages.seeWhereYouCanTravel)}</h2>
                  <p>
                    {intl(pagesMessages.findAvailableRoutesDest)}
                  </p>
                </div>
                <div className="personolised-screen-img" >
                  <img src={require('./assets/images/signupscreens/screen-4-img.png')} alt="slideScreen"/>
                </div>
              </div>
            </div>
            <div>
              <div className="personolised-screen screen-boarding screen-5 ">
                <div className="personolised-screen-content" >
                  <h2>{intl(pagesMessages.receiveAlertsByEmail)}</h2>
                  <p>
                    {intl(pagesMessages.receiveAlertsWhereverYouAre)}
                  </p>
                </div>
                <div className="personolised-screen-img" >
                  <img src={require('./assets/images/signupscreens/screen-5-img.png')} alt="slideScreen"/>
                </div>
              </div>
            </div>
            <div>
              <div className="personolised-screen screen-boarding screen-6">
                <div className="personolised-screen-content" >
                  <h2>{intl(pagesMessages.getSeatsYouDeserve)}
                  </h2>
                  <p>
                    {intl(pagesMessages.increaseChanceWithFlight)}
                  </p>
                  <Button onClick={() => redirectToPricing()} >{intl(pagesMessages.goToWebsite)} </Button>
                </div>
                <div className="personolised-screen-img" >
                  <img src={require('./assets/images/signupscreens/screen-6-img.png')} alt="slideScreen"/>
                </div>
              </div>
            </div>
          </Carousel>
        </Modal.Content>
      </Modal>
    </>
  )
}

SignupOnBoardingModal.propTypes = {
  toggleSignupOnBoardingModal: PropTypes.bool,
  redirectToPricing: PropTypes.func
}

export default SignupOnBoardingModal
