import React, { useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import PropTypes from 'prop-types'
import { movePointerOnTop } from 'utils/helpers'
import SeoTags from 'common/SeoTags'
import SeoTexts from 'constants/seoConstants'
import { termsofUseSnippet } from 'constants/seoScriptConstants'

const TermsOfUse = (props) => {
  const { termsOfUse, pageAnalytics } = props
  const { title, content } = termsOfUse || ''
  useEffect(() => {
    pageAnalytics()
    movePointerOnTop()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <SeoTags
        title={SeoTexts.TERMS_OF_USE_TITLE}
        metaDescription={SeoTexts.TERMS_OF_USE_DESCRIPTION}
        canonicalLink={SeoTexts.TERMS_OF_USE_CANONICAL}
        ogImgUrl={SeoTexts.TERMS_OF_USE_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.TERMS_OF_USE_TWITTER_IMAGE_URL}
        richSnippet={termsofUseSnippet}
      />
      <div className="static-page">
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

TermsOfUse.propTypes = {
  termsOfUse: PropTypes.object,
  pageAnalytics: PropTypes.func
}

export default TermsOfUse
