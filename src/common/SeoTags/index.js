import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { checkRoutesForScript } from 'constants/globalConstants'

const SeoTages = (props) => {

  const { title, metaDescription, canonicalLink, richSnippet, ogImgUrl, twitterImgUrl, match } = props
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />

      {/* canonical tag link */}
      <link rel="canonical" href={canonicalLink} />

      {richSnippet ? richSnippet : null}

      {/* Og tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Reward Flight Finder" />
      <meta property="og:url" content={canonicalLink} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImgUrl} />

      {/* Twiiter tag */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:site_name" content="Reward Flight Finder" />
      <meta property="twitter:domain" content={canonicalLink} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={twitterImgUrl} />

      {/* robot txt */}
      {!checkRoutesForScript.includes(match?.path) && window.location.hostname === 'rewardflightfinder.com' &&
        <meta name="robots" content="index, follow" />}
      {checkRoutesForScript.includes(match?.path) && window.location.hostname === 'rewardflightfinder.com' &&
        <meta name="robots" content="noindex, nofollow" />
      }
      {window.location.hostname !== 'rewardflightfinder.com' &&
        <meta name="robots" content="noindex, nofollow" />
      }
      {/* Hreflang Tags  */}
      <link rel="alternate" hrefLang="en-gb" href={canonicalLink} />
    </Helmet>
  )
}

SeoTages.propTypes = {
  title: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  canonicalLink: PropTypes.string.isRequired,
  ogImgUrl: PropTypes.string,
  twitterImgUrl: PropTypes.string,
  match: PropTypes.object
}

export default withRouter(SeoTages)
