import React, { useEffect, useState } from 'react'
import axios from 'axios'
import env from 'utils/env_variables'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { TransactionCompleteImage } from 'utils/svgs'
import SeoTexts from 'constants/seoConstants'
import { extractURLParams, retrieveFromLocalStorage, navigateToRespectivePage } from 'utils/helpers'
import Loader from 'components/LoadingSpinner'
import { GoogleAdsParam } from 'constants/globalConstants'
import './assets/scss/thankyou.scss'
import SeoHelmet from 'utils/seoHelmet'
import { AppRoutes } from '../../constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import commonMessages from 'constants/messages/commonMessages'

const PurchasingThankYou = (props) => {
  const { location, isUserSilverMember, isUserGoldMember, getProfileDetails } = props
  const [getProfileLoadinbg, setProfileLoading] = useState(false)
  const appendParams = sessionStorage.getItem('queryParamsGA')

  useEffect(() => {
    if (location?.search) {
      const data = extractURLParams(location.search)
      if (data?.user_id) {
        setProfileLoading(true)
        getProfileDetails(data.user_id)
        axios.get(`${env.REACT_APP_BASE_URL_RUBY}v1/users/${data.user_id}?user[access_token]=${retrieveFromLocalStorage('token')}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': env.AUTHORIZATION_KEY
            }
          }
        ).then(response => {
          if (response?.data?.data) {
            setProfileLoading(false)
            const { silver_member, gold_member } = response.data.data
            if (!silver_member && !gold_member && location?.pathname !== AppRoutes.BRONZE_SIGNUP_THANKYOU) {
              navigateToRespectivePage(AppRoutes.HOME, appendParams)
            }

            if (silver_member && location?.pathname !== AppRoutes.SILVER_SIGNUP_THANKYOU) {
              navigateToRespectivePage(AppRoutes.HOME, appendParams)
            }

            if (gold_member && location?.pathname !== AppRoutes.GOLD_SIGNUP_THANKYOU) {
              navigateToRespectivePage(AppRoutes.HOME, appendParams)
            }

            const userValue = JSON.parse(retrieveFromLocalStorage('userDetails'))
            if (data.user_id !== String(userValue?.id)) {
              navigateToRespectivePage(AppRoutes.HOME, appendParams)
            }

          } else {
            navigateToRespectivePage(AppRoutes.HOME, appendParams)
          }
        })
          .catch(error => {
            navigateToRespectivePage(AppRoutes.HOME, appendParams)
          })
      } else {
        const arrData = Object.keys(data)
        const isExist = GoogleAdsParam.includes(arrData[0])
            if(!isExist) {
              navigateToRespectivePage(AppRoutes.HOME, appendParams)
            }
      }
    } else {
      navigateToRespectivePage(AppRoutes.HOME, appendParams)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <SeoHelmet
        title={SeoTexts.PURCHASE_MEMBERSHIP_TITLE}
      />
      {getProfileLoadinbg &&
        <Loader />
      }
      <div className="thankyou-page">
        <TransactionCompleteImage />
        <h3 className="thankyou-page__title">{intl(pagesMessages.transactionComplete)}</h3>
        {!isUserSilverMember && !isUserGoldMember &&
          <p className="thankyou-page__text">{intl(pagesMessages.thankyouForPurchaseBronze)}</p>
        }
        {isUserSilverMember &&
          <p className="thankyou-page__text">{intl(pagesMessages.thankyouForPurchaseSilver)}</p>
        }
        {isUserGoldMember &&
          <p className="thankyou-page__text">{intl(pagesMessages.thankyouForPurchaseGold)}</p>
        }
        <Button onClick={() => navigateToRespectivePage(AppRoutes.HOME, appendParams)} className="thankyou-page__btn">{intl(commonMessages.continue)}</Button>
      </div>
    </>
  )
}

PurchasingThankYou.propTypes = {
  location: PropTypes.object,
  isUserSilverMember: PropTypes.bool,
  isUserGoldMember: PropTypes.bool,
  getProfileDetails: PropTypes.func
}
export default PurchasingThankYou
