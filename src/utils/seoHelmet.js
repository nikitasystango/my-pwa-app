import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { checkRoutesForScript } from 'constants/globalConstants'

const SeoHelmet = ({ title, richSnippet, canonicalLink, match }) => (
  <Helmet>
    <meta charSet="utf-8" />
    {title ? <title>{title}</title> : null}
    {richSnippet ? richSnippet : null}

    {/* canonical tag link */}
    {canonicalLink ? <link rel="canonical" href={canonicalLink} /> : null}

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
    {canonicalLink ? <link rel="alternate" hrefLang="en-gb" href={canonicalLink} />: null}
  </Helmet>
)

SeoHelmet.propTypes = {
  title: PropTypes.string.isRequired,
  richSnippet: PropTypes.any,
  canonicalLink: PropTypes.string,
  match: PropTypes.object
}

export default SeoHelmet
