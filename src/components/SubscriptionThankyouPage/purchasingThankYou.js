import React, { useEffect, useState } from 'react'
import axios from 'axios'
import env from 'utils/env_variables'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import history from 'utils/history'
import { TransactionCompleteImage } from 'utils/svgs'
import SeoTexts from 'constants/seoConstants'
import { extractURLParams, retrieveFromLocalStorage } from 'utils/helpers'
import Loader from 'components/LoadingSpinner'
import { GoogleAdsParam, SilverThankyouRoutes, GoldThankyouRoutes } from 'constants/globalConstants'
import '../Pages/assets/scss/thankyou.scss'
import SeoHelmet from 'utils/seoHelmet'

import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import commonMessages from 'constants/messages/commonMessages'
import subscriptionThankyouMessages from 'constants/messages/subscriptionThankyouMessages'

const PurchasingThankYou = (props) => {
  const {
    location,
    getProfileDetails
  } = props
  const [getProfileLoadinbg, setProfileLoading] = useState(false)

  useEffect(() => {
    if (location?.search) {
      const data = extractURLParams(location.search)
      if (data?.user_id) {
        setProfileLoading(true)
        getProfileDetails(data.user_id)
        axios
          .get(
            `${env.REACT_APP_BASE_URL_RUBY}v1/users/${
              data.user_id
            }?user[access_token]=${retrieveFromLocalStorage('token')}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: env.AUTHORIZATION_KEY
              }
            }
          )
          .then((response) => {
            if (response?.data?.data) {
              setProfileLoading(false)
              const { silver_member, gold_member } = response.data.data
              if (
                silver_member &&
                !SilverThankyouRoutes.includes(location?.pathname)
              ) {
                history.push(AppRoutes.HOME)
              }

              if (
                gold_member &&
                !GoldThankyouRoutes.includes(location?.pathname)
              ) {
                history.push(AppRoutes.HOME)
              }

              const userValue = JSON.parse(
                retrieveFromLocalStorage('userDetails')
              )
              if (data.user_id !== String(userValue?.id)) {
                history.push(AppRoutes.HOME)
              }
            } else {
              history.push(AppRoutes.HOME)
            }
          })
          .catch((error) => {
            history.push(AppRoutes.HOME)
          })
      } else {
        const arrData = Object.keys(data)
        const isExist = GoogleAdsParam.includes(arrData[0])
        if (!isExist) {
          history.push(AppRoutes.HOME)
        }
      }
    } else {
      history.push(AppRoutes.HOME)
    }
    // eslint-disable-next-line
  }, [])

  const renderText = () => {
    const path = props.location.pathname

    switch (path) {
      case AppRoutes.SILVER_FREE_MONTHLY:
        return intl(subscriptionThankyouMessages.silverFreeTrialMonthlyText)

      case AppRoutes.SILVER_FREE_YEARLY:
        return intl(subscriptionThankyouMessages.silverFreeTrialYearlyText)

      case AppRoutes.GOLD_FREE_MONTHLY:
        return intl(subscriptionThankyouMessages.goldFreeTrialMonthlyText)

      case AppRoutes.GOLD_FREE_YEARLY:
        return intl(subscriptionThankyouMessages.goldFreeTrialYearlyText)

      case AppRoutes.SILVER_PAID_MONTHLY:
        return intl(subscriptionThankyouMessages.silverPaidMonthlyText)

      case AppRoutes.SILVER_PAID_YEARLY:
        return intl(subscriptionThankyouMessages.silverPaidYearlyText)

      case AppRoutes.GOLD_PAID_MONTHLY:
        return intl(subscriptionThankyouMessages.goldPaidMonthlyText)

      case AppRoutes.GOLD_PAID_YEARLY:
        return intl(subscriptionThankyouMessages.goldPaidYearlyText)

      case AppRoutes.UPGRADE_SILVER_PAID_MONTHLY:
        return intl(subscriptionThankyouMessages.silverUpgradeMonthlyText)

      case AppRoutes.UPGRADE_SILVER_PAID_YEARLY:
        return intl(subscriptionThankyouMessages.silverUpgradeYearlyText)

      case AppRoutes.UPGRADE_GOLD_PAID_MONTHLY:
        return intl(subscriptionThankyouMessages.goldUpgradeMonthlyText)

      case AppRoutes.UPGRADE_GOLD_PAID_YEARLY:
        return intl(subscriptionThankyouMessages.goldUpgradeYearlyText)

      case AppRoutes.CANCEL_SILVER_TRIAL:
        return intl(subscriptionThankyouMessages.cancelSilverTrialText)

      case AppRoutes.CANCEL_GOLD_TRIAL:
        return intl(subscriptionThankyouMessages.cancelGoldTrialText)

      case AppRoutes.DOWNGRADE_SILVER_TO_BRONZE:
        return intl(subscriptionThankyouMessages.downgradeToBronzeText)

      case AppRoutes.DOWNGRADE_GOLD_TO_BRONZE:
        return intl(subscriptionThankyouMessages.downgradeToBronzeText)

      case AppRoutes.DOWNGRADE_SILVER_TO_GOLD:
        return intl(subscriptionThankyouMessages.downgradeToSilverText)

      default:
        history.push(AppRoutes.PAGE_NOT_FOUND)
    }
  }

  return (
    <>
      <SeoHelmet title={SeoTexts.PURCHASE_MEMBERSHIP_TITLE} />
      {getProfileLoadinbg && <Loader />}
      <div className="thankyou-page">
        <TransactionCompleteImage />
        <h3 className="thankyou-page__title">
          {intl(pagesMessages.transactionComplete)}
        </h3>
        <p className="thankyou-page__text">{renderText()}</p>
        <Button
          onClick={() => history.push(AppRoutes.HOME)}
          className="thankyou-page__btn"
        >
          {intl(commonMessages.continue)}
        </Button>
      </div>
    </>
  )
}

PurchasingThankYou.propTypes = {
  location: PropTypes.object,
  getProfileDetails: PropTypes.func
}
export default PurchasingThankYou
