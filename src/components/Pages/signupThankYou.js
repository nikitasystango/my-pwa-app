import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import history from 'utils/history'
import SeoTexts from 'constants/seoConstants'
import { thankyouSnippet } from 'constants/seoScriptConstants'
import { retrieveFromLocalStorage, removeFromLocalStorage, setInLocalStorage } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import SignupOnBoardingModal from './signupOnBoardingModal'
import './assets/scss/thankyou.scss'
import SeoHelmet from 'utils/seoHelmet'
import Loader from 'components/LoadingSpinner'

const SignupThankyou = (props) => {

  const { updateReducerState, toggleSignupOnBoardingModal, updateProfileDetails, userDetails: user, fetchingProfileDetails } = props
  const token = retrieveFromLocalStorage('token')

  useEffect(() => {
    updateReducerState('pages', 'toggleSignupOnBoardingModal', true)
    return () => {
      updateReducerState('auth', 'userRegisterConfirmation', false)
      if (retrieveFromLocalStorage('firstTimeSignup')) {
        removeFromLocalStorage('firstTimeSignup')
      }
    }
    // eslint-disable-next-line
  }, [])

  const handleOnBoarded = () => {
       if(user && !user.onboarded) {
        const data = {
          user: {
            access_token: token,
            onboarded: true
          }
        }
        updateProfileDetails({ data, name: 'onboarded', onboardingExistingUser: true })
       }
  }

  const redirectToPricing = () => {
    setInLocalStorage('signupFirstTime', true)
    handleOnBoarded()
    if(retrieveFromLocalStorage('firstTimeSignup')) {
      history.push({ pathname: AppRoutes.PRICING_SIGNUP, state: { detailRedirection: true } })
    }else {
      history.push({ pathname: AppRoutes.HOME })
    }
  }

  return (
    <>
      <SeoHelmet
        title={SeoTexts.THANKYOU_TITLE}
        richSnippet={thankyouSnippet}
      />
      {fetchingProfileDetails ?
        <Loader />
          :
        <>
          <SignupOnBoardingModal
        toggleSignupOnBoardingModal={toggleSignupOnBoardingModal}
        updateReducerState={updateReducerState}
        redirectToPricing={redirectToPricing}
          />
        </>
      }
    </>
  )
}

SignupThankyou.propTypes = {
  userRegisterConfirmation: PropTypes.bool,
  updateReducerState: PropTypes.func,
  toggleSignupOnBoardingModal: PropTypes.bool,
  updateProfileDetails: PropTypes.func,
  userDetails: PropTypes.object,
  fetchingProfileDetails: PropTypes.bool
}

export default SignupThankyou
