import React from 'react'
import AppleSignin from 'react-apple-signin-auth'
import { AppleIcon } from '../../utils/svgs'
import { pushNotification } from 'utils/notifications'
import jwt_decode from 'jwt-decode'
import PropTypes from 'prop-types'
import env from '../../utils/env_variables'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import authMessages from 'constants/messages/authMessages'
import toustifyMessages from 'constants/messages/toustifyMessages'
import './auth.scss'

const LoginWithApple = (props) => {
  const { appleLoginRequest, appleLoginLoading } = props

  const onhandleSuccessResponse = async(response, str) => {
    if(str === 'success') {
      const { authorization, user } = response ? response : {}
      const token = authorization && authorization.id_token ? authorization.id_token : null
      let decoded = ''
      if(token) {
         decoded = jwt_decode(token)
      const { sub, email } = decoded ? decoded : {}
      if(email) {
      let data = {
        user: {
          auth_uid: sub,
          auth_token: token,
          email: email.includes('privaterelay') ? email : email.toLowerCase(),
          provider: 'apple',
          platform: 'website'
        }
      }
      if (user && user.name) {
        data = {
          ...data,
          user: {
            ...data.user,
            first_name: user.name.firstName?.user.name.firstName,
            last_name: user.name.lastName?.user.name.lastName
          }
        }
      }
     appleLoginRequest({ data })
    }else {
      pushNotification(intl(authMessages.invalidEmail), 'error', 'TOP_CENTER', 3000)
    }
    }else {
      pushNotification(intl(toustifyMessages.appleLoginFailed), 'error', 'TOP_CENTER', 3000)
    }
    }else{
      if (response.error !== 'popup_closed_by_user') {
        pushNotification(intl(toustifyMessages.appleLoginFailed), 'error', 'TOP_CENTER', 3000)
      }
    }
  }

  return (
    <>
      <AppleSignin
        authOptions={{
          clientId: env.REACT_APP_APPLE_CLIENTID,
          scope: 'email name',
          redirectURI: env.REACT_APP_URL,
          /** State string that is returned with the apple response */
          state: 'state',
          nonce: 'nonce',
          usePopup: true
        }}
        uiType="dark"
        onSuccess={(response) => onhandleSuccessResponse(response, 'success')}
        onError={(error) => onhandleSuccessResponse(error, 'error')}
        /** Skips loading the apple script if true */
        skipScript={false}
        render={(props) => (
          <button className={`btn w-100 apple-log-btn ${appleLoginLoading ? 'btn--loader btn--disabled' : ''}`} {...props}>
            <p>
              <AppleIcon />
              <span> {intl(commonMessages.apple)}</span>
            </p>
          </button>
        )}
      />
    </>
  )
}

LoginWithApple.propTypes = {
  appleLoginRequest: PropTypes.func,
  appleLoginLoading: PropTypes.bool,
  appleLoginRequestSuccess: PropTypes.func,
  auth: PropTypes.object
}
export default LoginWithApple
