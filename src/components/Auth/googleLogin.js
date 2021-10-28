import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GoogleLoginButton from 'react-google-login'
import PropTypes from 'prop-types'
import env from 'utils/env_variables'
import { setInLocalStorage, isFirstTimeLoginHandler } from 'utils/helpers'
import { G } from '../../utils/svgs'
import { pushNotification } from 'utils/notifications'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import toustifyMessages from 'constants/messages/toustifyMessages'
import authMessages from 'constants/messages/authMessages'

const GoogleLogin = (props) => {
  const { googleLoginRequest, googleLoginLoading, auth: { signedUrlAuth }, getProfileDetails,
    googleLoginRequestSuccess, removeProfilePicture, source } = props
    const [isDisableCookie, setIsDisableCookie] = useState(false)

  useEffect(() => {
    if (signedUrlAuth?.type === 'google' && source !== 'login') {
      const { presigned_url, image, token, userId, isFirstTimeLogin } = signedUrlAuth || ''
      axios.put(presigned_url, image)
        .then(response => {
          if (response?.status === 200) {
            googleLoginRequestSuccess(userId)
            setInLocalStorage('token', token)
            getProfileDetails(userId)
            isFirstTimeLoginHandler(isFirstTimeLogin)
          }
        }).catch(error => {
          googleLoginRequestSuccess(userId)
          setInLocalStorage('token', token)
          getProfileDetails(userId)
          removeProfilePicture('preSignedFailed')
          isFirstTimeLoginHandler(isFirstTimeLogin)
        })
    }
    // eslint-disable-next-line
  }, [signedUrlAuth])

  const handleGoogleLoginSuccess = (googleResponse) => {
    if (googleResponse && googleResponse.profileObj && googleResponse.profileObj.email &&
      googleResponse.googleId && googleResponse.accessToken) {
      const { accessToken, googleId, profileObj: { email, imageUrl, familyName, givenName } } = googleResponse
      let data = {
        user: {
          auth_uid: googleId,
          auth_token: accessToken,
          email: email.toLowerCase(),
          provider: 'google',
          platform: 'website'
        }
      }

      if (givenName) {
        data = {
          ...data,
          user: {
            ...data.user,
            first_name: givenName
          }
        }
      }
      if (familyName) {
        data = {
          ...data,
          user: {
            ...data.user,
            last_name: familyName
          }
        }
      }
      if (imageUrl) {
        fetch(imageUrl)
          .then(res => res.blob())
          .then(blob => {
            const image = new File([blob], 'google', blob)
            googleLoginRequest({ data, image, source })
          })
          .catch(err => googleLoginRequest({ data, image: null, source }))
      } else {
        googleLoginRequest({ data, image: null, source })
      }
    }
  }

  const handleGoogleLoginFailure = (error) => {
    if(!isDisableCookie && error?.error === 'idpiframe_initialization_failed') {
      setIsDisableCookie(true)
    }
    if(isDisableCookie) {
       pushNotification(intl(authMessages.isCookieDisable), 'error', 'TOP_CENTER', 5000)
    }
    if (error?.error !== 'popup_closed_by_user' && error?.error !== 'idpiframe_initialization_failed') {
      pushNotification(intl(toustifyMessages.googleLoginFailed), 'error', 'TOP_CENTER', 3000)
      setIsDisableCookie(false)
    }
  }

  return (
    <GoogleLoginButton
      buttonText={
        <span className={`btn btn--google w-100 ${googleLoginLoading ? 'btn--loader btn--disabled' : ''} `}><G /> <span>{intl(commonMessages.google)}</span></span>
      }
      clientId={env.GOOGLE_CLIENT_ID}
      onSuccess={handleGoogleLoginSuccess}
      onFailure={handleGoogleLoginFailure}
      cookiePolicy={'single_host_origin'}
      className="google-login-btn"
    />
  )
}

GoogleLogin.propTypes = {
  googleLoginRequest: PropTypes.func,
  googleLoginLoading: PropTypes.bool,
  googleLoginRequestSuccess: PropTypes.func,
  getProfileDetails: PropTypes.func,
  auth: PropTypes.object,
  removeProfilePicture: PropTypes.func,
  source: PropTypes.string
}

export default GoogleLogin

