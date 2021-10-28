import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { howItWorksSnippet } from 'constants/seoScriptConstants'
import history from 'utils/history'
import { GoogleAdsParam } from 'constants/globalConstants'
import { extractURLParams } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import commonMessages from 'constants/messages/commonMessages'
import './index.scss'
import './assets/scss/how-its-work.scss'
import SeoTexts from 'constants/seoConstants'
import ProgressiveImage from 'utils/progressiveImage'
import SeoTags from 'common/SeoTags'

const HowItWorks = (props) => {
  const { location } = props
  useEffect(() => {
    if (location?.search) {
      const data = extractURLParams(location.search)
      const arrData = Object.keys(data)
      const isExist = GoogleAdsParam.includes(arrData[0])
      if (!isExist) {
        history.push(AppRoutes.PAGE_NOT_FOUND)
      }
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <SeoTags
        title={SeoTexts.HOW_IT_WORKS_TITLE}
        metaDescription={SeoTexts.HOW_IT_WORKS_DESCRIPTION}
        canonicalLink={SeoTexts.HOW_IT_WORKS_CANONICAL}
        ogImgUrl={SeoTexts.HOW_IT_WORKS_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.HOW_IT_WORKS_TWITTER_IMAGE_URL}
        richSnippet={howItWorksSnippet}
      />
      <div className="how-it-works">
        <div className="how-it-works__header">
          <h2 className="how-it-works__header-title">
            {intl(pagesMessages.howItWorksTitle)}
          </h2>
          <p className="how-it-works__header-description">
            {intl(pagesMessages.howItWorksDes)}
          </p>
        </div>
        <div className="how-it-works__body">
          <div className="container">
            <Grid className="how-it-works__grid how-it-works__grid--ik">
              <h2 className="how-it-works__title">
                {intl(pagesMessages.iKnowWhereIWantToGo)}
              </h2>

              <Grid.Row className="how-it-works__section how-it-works__section--ik">
                <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
                  <div className="how-it-works__section-img">
                    <picture>
                      <source
                        data-srcSet={require('../../assets/images/i-know-1.webp')}
                        type="image/webp"
                      />
                      <ProgressiveImage
                        image={require('../../assets/images/i-know-1.png')}
                        render={(currentImage, loading) => (
                          <img
                            style={{
                              transition: '0.5s filter linear',
                              filter: `${loading ? 'blur(50px)' : ''}`
                            }}
                            src={currentImage}
                            alt="search"
                            className="lazyload"
                            width="394"
                            height="312"
                            loading="lazy"
                          />
                        )}
                      />
                    </picture>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
                  <div className="how-it-works__section-content">
                    <h3>{intl(commonMessages.search)}</h3>
                    <p>{intl(pagesMessages.iKnowSearchDes)}</p>
                  </div>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className="how-it-works__section how-it-works__section--ik">
                <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
                  <div className="how-it-works__section-content text-right">
                    <h3>{intl(pagesMessages.seeAllAvailableDates)}</h3>
                    <p>{intl(pagesMessages.datesOnOnePageDes)}</p>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
                  <div className="how-it-works__section-img">
                    <picture>
                      <source
                        data-srcSet={require('../../assets/images/i-know-2.webp')}
                        type="image/webp"
                      />
                      <ProgressiveImage
                        image={require('../../assets/images/i-know-2.png')}
                        render={(currentImage, loading) => (
                          <img
                            style={{
                              transition: '0.5s filter linear',
                              filter: `${loading ? 'blur(50px)' : ''}`
                            }}
                            src={currentImage}
                            alt="See All Available Dates On One Page"
                            className="lazyload"
                            width="460"
                            height="350"
                            loading="lazy"
                          />
                        )}
                      />
                    </picture>
                  </div>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className="how-it-works__section how-it-works__section--ik">
                <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
                  <div className="how-it-works__section-img">
                    <picture>
                      <source
                        data-srcSet={require('../../assets/images/i-know-3.webp')}
                        type="image/webp"
                      />
                      <ProgressiveImage
                        image={require('../../assets/images/i-know-3.png')}
                        render={(currentImage, loading) => (
                          <img
                            style={{
                              transition: '0.5s filter linear',
                              filter: `${loading ? 'blur(50px)' : ''}`
                            }}
                            src={currentImage}
                            alt="Get Alerts on"
                            className="lazyload"
                            width="394"
                            height="312"
                            loading="lazy"
                          />
                        )}
                      />
                    </picture>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
                  <div className="how-it-works__section-content">
                    <h3>{intl(pagesMessages.getAlertsTitle)}</h3>
                    <p>
                      {intl(pagesMessages.getAlertsTextOne)}
                      <br />
                      <br />
                      {intl(pagesMessages.getAlertsTextTwo)}{' '}
                    </p>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid className="how-it-works__grid how-it-works__grid--idk m-0">
              <h1 className="how-it-works__title">
                {intl(pagesMessages.iDontNoSearchTitle)}
              </h1>

              <Grid.Row className="how-it-works__section how-it-works__section--idk">
                <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
                  <div className="how-it-works__section-content how-it-works__section-content--right">
                    <h3>{intl(commonMessages.search)}</h3>
                    <p>{intl(pagesMessages.iDontNoSearchDes)}</p>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
                  <div className="how-it-works__section-img">
                    <picture>
                      <source
                        data-srcSet={require('../../assets/images/i-dont-know-1.webp')}
                        type="image/webp"
                      />
                      <ProgressiveImage
                        image={require('../../assets/images/i-dont-know-1.png')}
                        render={(currentImage, loading) => (
                          <img
                            style={{
                              transition: '0.5s filter linear',
                              filter: `${loading ? 'blur(50px)' : ''}`
                            }}
                            src={currentImage}
                            alt="search"
                            className="lazyload"
                            width="395"
                            height="269"
                            loading="lazy"
                          />
                        )}
                      />
                    </picture>
                  </div>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className="how-it-works__section how-it-works__section--idk">
                <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
                  <div className="how-it-works__section-img">
                    <picture>
                      <source
                        data-srcSet={require('../../assets/images/i-dont-know-2.webp')}
                        type="image/webp"
                      />
                      <ProgressiveImage
                        image={require('../../assets/images/i-dont-know-2.png')}
                        render={(currentImage, loading) => (
                          <img
                            style={{
                              transition: '0.5s filter linear',
                              filter: `${loading ? 'blur(50px)' : ''}`
                            }}
                            src={currentImage}
                            alt="See All Available Destinations"
                            className="lazyload"
                            width="394"
                            height="270"
                            loading="lazy"
                          />
                        )}
                      />
                    </picture>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
                  <div className="how-it-works__section-content">
                    <h3>{intl(pagesMessages.seeAllAvailableDestination)}</h3>
                    <p>{intl(pagesMessages.seeAllAvailableDestinationDes)}</p>
                  </div>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className="how-it-works__section how-it-works__section--idk">
                <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
                  <div className="how-it-works__section-content how-it-works__section-content--right">
                    <h3>{intl(pagesMessages.bookWithAirlineTitle)}</h3>
                    <p>{intl(pagesMessages.bookWithAirlineDes)}</p>
                  </div>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
                  <div className="how-it-works__section-img">
                    <picture>
                      <source
                        data-srcSet={require('../../assets/images/i-dont-know-3.webp')}
                        type="image/webp"
                      />
                      <ProgressiveImage
                        image={require('../../assets/images/i-dont-know-3.png')}
                        render={(currentImage, loading) => (
                          <img
                            style={{
                              transition: '0.5s filter linear',
                              filter: `${loading ? 'blur(50px)' : ''}`
                            }}
                            src={currentImage}
                            alt="Book With the Airline"
                            className="lazyload"
                            width="395"
                            height="269"
                            loading="lazy"
                          />
                        )}
                      />
                    </picture>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </div>
    </>
  )
}

HowItWorks.propTypes = {
  location: PropTypes.object
}

export default HowItWorks
