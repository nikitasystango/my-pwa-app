import React, { useEffect } from 'react'
import { movePointerOnTop } from 'utils/helpers'
import SeoHelmet from 'utils/seoHelmet'
import SeoTexts from 'constants/seoConstants'
import { openUrlOnNewTab } from 'utils/helpers'
import intl from 'utils/intlMessage'
import policyMessages from 'constants/messages/policyMessages'

const CookiePolicy = (props) => {

  useEffect(() => {
    movePointerOnTop()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <SeoHelmet
        title={SeoTexts.COOKIE_POLICY_TITLE}
        canonicalLink={SeoTexts.COOKIE_POLICY_CANONICAL}
      />
      <div className="static-page">
        <div className="static-page__header text-center">
          <h1 className="static-page__title">{intl(policyMessages.titleCoookiePolicy)}</h1>
          {/* <p className="static-page__updated-date">Last Updated: July 1st, 2020</p> */}
        </div>
        <div className="static-page__body">
          <div className="static-page__content">
            <h3>{intl(policyMessages.whatIsCookieTitle)}</h3>
            <p>{intl(policyMessages.whatIsCookieDes)}</p>

            <h3>{intl(policyMessages.useCookieTitle)}</h3>
            <p>{intl(policyMessages.useCookieTextOne)}</p>
            <p>{intl(policyMessages.useCookieTextTwo)}</p>
            <p>{intl(policyMessages.useCookieTextThree)}</p>

            <p>{intl(policyMessages.discoverMoreAboutCookie)} <span className="text-medium-blue cursor-pointer" onClick={() => openUrlOnNewTab('https://www.allaboutcookies.org/')}>allaboutcookies.org</span></p>

            <h3>{intl(policyMessages.threeTypeCookie)} :</h3>

            <ol className="default-style">
              <li><b>{intl(policyMessages.essentialCookieTitle)} – </b>{intl(policyMessages.essentialCookieDes)}</li>
              <li><b>{intl(policyMessages.preferenceCookieTitle)} – </b>{intl(policyMessages.preferenceCookieDes)}</li>
              <li><b>{intl(policyMessages.performanceCookieTitle)} – </b>{intl(policyMessages.performanceCookieDes)}</li>
            </ol>

          </div>
        </div>
      </div>
    </>
  )
}

export default CookiePolicy
