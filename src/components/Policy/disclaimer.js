import React, { useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import PropTypes from 'prop-types'
import SeoTags from 'common/SeoTags'
import SeoTexts from 'constants/seoConstants'
import { disclamerSnippet } from 'constants/seoScriptConstants'
import { movePointerOnTop } from 'utils/helpers'

const Disclaimer = (props) => {
  const { disclaimer, pageAnalytics } = props
  const { title, content } = disclaimer || ''
  useEffect(() => {
    pageAnalytics()
    movePointerOnTop()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <SeoTags
        title={SeoTexts.DISCLAIMER_TITLE}
        metaDescription={SeoTexts.DISCLAIMER_DESCRIPTION}
        canonicalLink={SeoTexts.DISCLAIMER_CANONICAL}
        ogImgUrl={SeoTexts.DISCLAIMER_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.DISCLAIMER_TWITTER_IMAGE_URL}
        richSnippet={disclamerSnippet}
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

Disclaimer.propTypes = {
  disclaimer: PropTypes.object,
  pageAnalytics: PropTypes.func
}

export default Disclaimer
