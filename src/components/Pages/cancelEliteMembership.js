import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { CancelEliteMembershipImage } from '../../utils/svgs'
import SeoTexts from 'constants/seoConstants'
import { retrieveFromLocalStorage, navigateToRespectivePage } from 'utils/helpers'
import history from 'utils/history'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import commonMessages from 'constants/messages/commonMessages'
import SeoHelmet from 'utils/seoHelmet'
import './assets/scss/cancel-elite-membership.scss'

const CancelEliteMembership = (props) => {
  const { pageAnalytics, cancelEliteMembership, cancelEliteLoading, isUserGoldMember,
    isUserSilverMember } = props
    const appendParams = sessionStorage.getItem('queryParamsGA')

  useEffect(() => {
    const userValue = JSON.parse(retrieveFromLocalStorage('userDetails'))
    if (!userValue?.current_plan || userValue?.cancelled_subscription) {
      history.push(AppRoutes.PAGE_NOT_FOUND)
    }
    pageAnalytics()
    // eslint-disable-next-line
  }, [])
  const userHavePlan = isUserSilverMember || isUserGoldMember || false
  return (
    <>
      <SeoHelmet
        title={SeoTexts.CANCEL_ELITE_TITLE}
      />
      <div className="cancel-elite-membership">
        <CancelEliteMembershipImage className="cancel-elite-membership__image" />
        <h3 className="cancel-elite-membership__title">{intl(pagesMessages.cancelMembershipTitle)}</h3>
        <p className="cancel-elite-membership__text mx-auto">{intl(pagesMessages.thankyouForSupport)}</p>
        <p className="cancel-elite-membership__text mx-auto mb-10"><b>{intl(pagesMessages.areYouSure)}</b></p>
        <Button className="btn btn--dark cancel-elite-membership__btn" onClick={() => navigateToRespectivePage(AppRoutes.MEMBERSHIP, appendParams)}>{intl(commonMessages.no)}</Button>
        <Button disabled={!userHavePlan} loading={cancelEliteLoading} className="btn btn--medium-blue cancel-elite-membership__btn" onClick={() => cancelEliteMembership()}>{intl(commonMessages.yes)}</Button>
      </div>
    </>
  )
}

CancelEliteMembership.propTypes = {
  pageAnalytics: PropTypes.func,
  cancelEliteMembership: PropTypes.func,
  isUserGoldMember: PropTypes.bool,
  isUserSilverMember: PropTypes.bool,
  cancelEliteLoading: PropTypes.bool
}
export default CancelEliteMembership
