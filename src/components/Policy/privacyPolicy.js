import React, { useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import PropTypes from 'prop-types'
import SeoTags from 'common/SeoTags'
import SeoTexts from 'constants/seoConstants'
import { privacyPolicySnippet } from 'constants/seoScriptConstants'
import { movePointerOnTop } from 'utils/helpers'
import './index.scss'

const PrivacyPolicy = (props) => {
  const { privacyPolicy, pageAnalytics } = props
  const { title, content } = privacyPolicy || ''
  useEffect(() => {
    pageAnalytics()
    movePointerOnTop()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <SeoTags
        title={SeoTexts.PRIVACY_POLICY_TITLE}
        metaDescription={SeoTexts.PRIVACY_POLICY_DESCRIPTION}
        canonicalLink={SeoTexts.PRIVACY_POLICY_CANONICAL}
        ogImgUrl={SeoTexts.PRIVACY_POLICY_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.PRIVACY_POLICY_TWITTER_IMAGE_URL}
        richSnippet={privacyPolicySnippet}
      />
      <div className="static-page privacy-policy-wrap">
        <div className="static-page__header text-center">
          <h1 className="static-page__title">{title}</h1>
        </div>
        <div className="static-page__body">
          <div className="static-page__content">
            {ReactHtmlParser(content)}
          </div>
        </div>
      </div>
    </>
  )
}

PrivacyPolicy.propTypes = {
  privacyPolicy: PropTypes.object,
  pageAnalytics: PropTypes.func
}

export default PrivacyPolicy
