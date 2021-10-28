import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import { CancelEliteMembershipImage } from '../../utils/svgs'
import SeoTags from 'common/SeoTags'
import SeoTexts from 'constants/seoConstants'
import { cancelMembershipSnippet } from 'constants/seoScriptConstants'
import { retrieveFromLocalStorage } from 'utils/helpers'
import history from 'utils/history'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import commonMessages from 'constants/messages/commonMessages'
import './assets/scss/cancel-elite-membership.scss'

const CancelEliteMembership = (props) => {
  const { pageAnalytics, cancelEliteMembership, cancelEliteLoading, isUserGoldMember,
    isUserSilverMember } = props

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
      <SeoTags
        title={SeoTexts.CANCEL_ELITE_TITLE}
        metaDescription={SeoTexts.CANCEL_ELITE_DESCRIPTION}
        canonicalLink={SeoTexts.CANCEL_ELITE_CANONICAL}
        ogImgUrl={SeoTexts.CANCEL_ELITE_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.CANCEL_ELITE_TWITTER_IMAGE_URL}
        richSnippet={cancelMembershipSnippet}
      />
      <div className="cancel-elite-membership">
        <CancelEliteMembershipImage className="cancel-elite-membership__image" />
        <h3 className="cancel-elite-membership__title">{intl(pagesMessages.cancelMembershipTitle)}</h3>
        <p className="cancel-elite-membership__text mx-auto">{intl(pagesMessages.thankyouForSupport)}</p>
        <p className="cancel-elite-membership__text mx-auto mb-10"><b>{intl(pagesMessages.areYouSure)}</b></p>
        <Button className="btn btn--dark cancel-elite-membership__btn" onClick={() => history.push(AppRoutes.MEMBERSHIP)}>{intl(commonMessages.no)}</Button>
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
