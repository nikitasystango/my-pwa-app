import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { extractURLParams, retrieveFromLocalStorage } from 'utils/helpers'
import { pushNotification } from 'utils/notifications'
import SeoHelmet from 'utils/seoHelmet'
import SeoTexts from 'constants/seoConstants'
import history from 'utils/history'
import { WelcomeImage } from 'utils/svgs'
import './assets/scss/thankyou.scss'
import { AppRoutes } from '../../constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import toustifiyMessages from 'constants/messages/toustifyMessages'

const VerifyUserNewEmail = (props) => {

  const { location, getProfileDetails } = props
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = retrieveFromLocalStorage('token')
    const userValue = JSON.parse(retrieveFromLocalStorage('userDetails'))
    if (token && userValue && userValue.id) {
      getProfileDetails(userValue.id)
    }
    if (location && location.search) {
      const data = extractURLParams(location.search)
      if (data?.error === 'Email was already confirmed, please try signing in' || data?.error === 'Confirmation token is invalid' || data?.error === 'invalid token') {
        setError(intl(toustifiyMessages.verificationLinkExpired))
      } else if (data?.error === 'Email has already been taken') {
        setError(intl(toustifiyMessages.emailAlreadyTaken))
      } else {
         history.push(AppRoutes.HOME)
        pushNotification(intl(toustifiyMessages.somethingWentWrong), 'error', 'TOP_CENTER', 3000)
      }
    }else {
       history.push(AppRoutes.HOME)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <SeoHelmet
        title={SeoTexts.VERIFY_USER_TITLE}
      />
      <div className="thankyou-page">
        <WelcomeImage />
        <h3 className="thankyou-page__title">{intl(pagesMessages.welcomeRffTitle)}</h3>
        {error ?
          <p className="thankyou-page__text">{error}</p>
          :
          <p className="thankyou-page__text">{intl(pagesMessages.emailVerifiedSuccess)}</p>
        }
      </div>
    </>
  )
}

VerifyUserNewEmail.propTypes = {
  location: PropTypes.object,
  getProfileDetails: PropTypes.func
}

export default VerifyUserNewEmail
