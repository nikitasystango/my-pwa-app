import React, { useEffect } from 'react'
import axios from 'axios'
import FacebookLoginButton from 'react-facebook-login'
import env from 'utils/env_variables'
import PropTypes from 'prop-types'
import { pushNotification } from 'utils/notifications'
import { setInLocalStorage, isFirstTimeLoginHandler } from 'utils/helpers'
import { FB } from '../../utils/svgs'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import toustifyMessages from 'constants/messages/toustifyMessages'

const FacebookLogin = (props) => {
  const { facebookLoginRequest, facebookLoginLoading, auth: { signedUrlAuth },
    getProfileDetails, facebookLoginRequestSuccess, removeProfilePicture, source } = props

  useEffect(() => {
    if (signedUrlAuth?.type === 'fb' && source !== 'login') {
      const { presigned_url, image, token, userId, isFirstTimeLogin } = signedUrlAuth || ''
      axios.put(presigned_url, image)
        .then(response => {
          if (response?.status === 200) {
            facebookLoginRequestSuccess(userId)
            setInLocalStorage('token', token)
            getProfileDetails(userId)
            isFirstTimeLoginHandler(isFirstTimeLogin)
          }
        }).catch(error => {
          facebookLoginRequestSuccess(userId)
          setInLocalStorage('token', token)
          getProfileDetails(userId)
          removeProfilePicture('preSignedFailed')
          isFirstTimeLoginHandler(isFirstTimeLogin)
        })
    }
    // eslint-disable-next-line
  }, [signedUrlAuth])

  const handleFacebookResponse = (response) => {
    if (response && response.accessToken && response.email && response.userID) {
      const { accessToken, email, userID, picture, name } = response
      let data = {
        user: {
          auth_uid: userID,
          auth_token: accessToken,
          email: email.toLowerCase(),
          provider: 'facebook',
          platform: 'website'
        }
      }

      if (name) {
        const firstName = name.substring(0, name.lastIndexOf(' ') + 1)
        const lastName = name.substring(name.lastIndexOf(' ') + 1, name.length)
        data = {
          ...data,
          user: {
            ...data.user,
            first_name: firstName,
            last_name: lastName
          }
        }
      }
      if (picture?.data?.url) {
        fetch(picture.data.url)
          .then(res => res.blob())
          .then(blob => {
            const image = new File([blob], 'facebook', blob)
            facebookLoginRequest({ data, image, source })
          })
          .catch(err => facebookLoginRequest({ data, image: null, source }))
      } else {
        facebookLoginRequest({ data, image: null, source })
      }
    } else {
      pushNotification(intl(toustifyMessages.facebookLoginFailed), 'error', 'TOP_CENTER', 1000);
    }
  }

  const handleFacebookLoginFailure = (error) => {
    if (error?.status !== 'unknown') {
      pushNotification(intl(toustifyMessages.facebookLoginFailed), 'error', 'TOP_CENTER', 3000);
    }
  }

  return (
    <FacebookLoginButton
      appId={env.FACEBOOK_APP_IDE}
      fields={'name,email,picture'}
      callback={handleFacebookResponse}
      onFailure={handleFacebookLoginFailure}
      textButton={
        <span className={`btn btn--facebook w-100 ${facebookLoginLoading ? 'btn--loader btn--disabled' : ''} `}><FB />{intl(commonMessages.facebook)}</span>
      }
      cssClass="fb-login-btn"
      isMobile={false}
      disableMobileRedirect
    />
  )
}

FacebookLogin.propTypes = {
  facebookLoginRequest: PropTypes.func,
  facebookLoginLoading: PropTypes.bool,
  facebookLoginRequestSuccess: PropTypes.func,
  getProfileDetails: PropTypes.func,
  auth: PropTypes.object,
  removeProfilePicture: PropTypes.func,
  source: PropTypes.string
}

export default FacebookLogin
