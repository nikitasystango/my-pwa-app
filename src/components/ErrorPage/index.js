import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Segment, Container, Button } from 'semantic-ui-react'
import history from 'utils/history'
import Layout from 'containers/Layout'
import 'semantic-ui-css/components/segment.min.css'
import './errorPage.scss'
import { ErrorImage } from 'utils/svgs'
import SeoTags from 'common/SeoTags'
import SeoTexts from 'constants/seoConstants'
import { errorPageSnippet } from 'constants/seoScriptConstants'
import { AppRoutes } from '../../constants/appRoutes'
import intl from 'utils/intlMessage'
import erroMessages from 'constants/messages/errorMessages'
import { navigateToRespectivePage } from 'utils/helpers'

const ErrorPage = (props) => {
  const appendParams = sessionStorage.getItem('queryParamsGA')

  useEffect(() => {

    if (props && props.match && props.match.path && props.match.path !== AppRoutes.PAGE_NOT_FOUND) {
      history.push(AppRoutes.PAGE_NOT_FOUND)
    }
// eslint-disable-next-line
  }, [])
  const redirectToHomepage = () => {
    navigateToRespectivePage(AppRoutes.HOME, appendParams)
  }

  return (
    <Layout>
      <SeoTags
        title={SeoTexts.ERROR_PAGE_TITLE}
        metaDescription={SeoTexts.ERROR_PAGE_DESCRIPTION}
        canonicalLink={SeoTexts.ERROR_PAGE_CANONICAL}
        ogImgUrl={SeoTexts.ERROR_PAGE_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.ERROR_PAGE_TWITTER_IMAGE_URL}
        richSnippet={errorPageSnippet}
      />
      <Container textAlign="center" className="error-pageui">
        <Segment className="error-pageui-code">
          <div className="error-content">
            <ErrorImage />
            <span className="error-content__bold-text">{intl(erroMessages.oops)}...</span>
          </div>
          <div className="contentUpdate-nptf">
            <p> {intl(erroMessages.doesntExist)}</p>
            <div className="cta404">
              <Button onClick={redirectToHomepage} className="btn btn--medium-blue custom_static_btn" primary type={'submit'} content={intl(erroMessages.goBack)} />
            </div>
          </div>
        </Segment>
      </Container>
    </Layout>
  )
}

ErrorPage.propTypes = {
  match: PropTypes.object
}

export default ErrorPage
