import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import PrivacyPolicy from './privacyPolicy'
import TermsOfUse from './termsOfUse'
import Disclaimer from './disclaimer'
import CookiePolicy from './cookiePolicy'
import Loader from 'components/LoadingSpinner'
import Layout from 'containers/Layout'
import { movePointerOnTop, extractURLParams } from 'utils/helpers'
import history from 'utils/history'
import { GoogleAdsParam } from 'constants/globalConstants'
import { AppRoutes } from 'constants/appRoutes'
const Policy = (props) => {
  const { pageContentDetails, pageContentLoading, pageAnalytics, location } = props

  useEffect(() => {
    if (location?.search) {
      const data = extractURLParams(location.search)
      const arrData = Object.keys(data)
      const isExist = GoogleAdsParam.includes(arrData[0])
          if(!isExist) {
            history.push(AppRoutes.PAGE_NOT_FOUND)
          }
    }
    movePointerOnTop()
    // eslint-disable-next-line
  }, [])

  const { disclaimer, privacyPolicy, termsOfUse } = pageContentDetails || ''

  const pageRender = () => {

    if (location.pathname === AppRoutes.DISCLAIMER) {
      return <Disclaimer disclaimer={disclaimer} pageAnalytics={pageAnalytics} />
    }
    else if (location.pathname === AppRoutes.TERMS_OF_USE) {
      return <TermsOfUse termsOfUse={termsOfUse} pageAnalytics={pageAnalytics} />
    }
    else if (location.pathname === AppRoutes.PRIVACY_POLICY) {
      return <PrivacyPolicy privacyPolicy={privacyPolicy} pageAnalytics={pageAnalytics} />
    }
    else if (location.pathname === AppRoutes.COOKIE_POLICY) {
      return <CookiePolicy />
    }
  }

  return (
    <Layout>
      {pageContentLoading && <Loader />}
      {pageRender()}
    </Layout>
  )
}

Policy.propTypes = {
  location: PropTypes.object,
  pageContentDetails: PropTypes.object,
  pageContentLoading: PropTypes.bool,
  pageAnalytics: PropTypes.func
}

export default Policy
