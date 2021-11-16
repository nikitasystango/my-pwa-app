import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import history from 'utils/history'
import SeoTexts from 'constants/seoConstants'
import SeoTags from 'common/SeoTags'
import { thankyouSnippet } from 'constants/seoScriptConstants'
import { retrieveFromLocalStorage, removeFromLocalStorage, setInLocalStorage, navigateToRespectivePage } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import SignupOnBoardingModal from './signupOnBoardingModal'
import './assets/scss/thankyou.scss'
import Loader from 'components/LoadingSpinner'

const SignupThankyou = (props) => {

  const { updateReducerState, toggleSignupOnBoardingModal, updateProfileDetails, userDetails: user, fetchingProfileDetails } = props
  const token = retrieveFromLocalStorage('token')
  const appendParams = sessionStorage.getItem('queryParamsGA')

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
      history.push({ pathname: AppRoutes.PRICING_SIGNUP, search: appendParams ? appendParams : '' , state: { detailRedirection: true } })
    }else {
      navigateToRespectivePage(AppRoutes.HOME, appendParams)
    }
  }

  return (
    <>
      <SeoTags
        title={SeoTexts.THANKYOU_TITLE}
        metaDescription={SeoTexts.THANKYOU_DESCRIPTION}
        canonicalLink={SeoTexts.THANKYOU_CANONICAL}
        ogImgUrl={SeoTexts.THANKYOU_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.THANKYOU_TWITTER_IMAGE_URL}
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
