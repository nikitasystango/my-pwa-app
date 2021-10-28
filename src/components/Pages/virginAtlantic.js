import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SeoTags from 'common/SeoTags'
import { Container, Grid, Button } from 'semantic-ui-react'
import RecentBlogs from 'common/RecentBlogs'
import Testimonials from 'common/Testimonials'
import TrustBox from '../../common/Trustpilot'
// import GetUsOn from 'components/Home/getuson'
import history from 'utils/history'
import {
  SearchImageWrapper,
  BgWrap,
  BgWrapInner,
  SectionTitle,
  SectionSubTitle
} from '../Home/style'
import MapBox from 'components/Home/mapBox'
import './assets/scss/virginAtlantic.scss'
import { retrieveFromLocalStorage } from 'utils/helpers'
import { VaSearchIcon, VaMusicIcon, VaPoundIcon } from '../../utils/svgs'
import ThankyouVirginModal from './thankyouVirginModal'
import SeoTexts from 'constants/seoConstants'
import { AppRoutes } from '../../constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import commonMessages from 'constants/messages/commonMessages'
import { virginAtlanticSnippet } from 'constants/seoScriptConstants'
import SearchPanel from 'containers/SearchPanel'
import staticMessage from 'constants/messages/homeMessages'
import ProgressiveImage from 'utils/progressiveImage'

const VirginAtlantic = (props) => {
  const {
    mapPageUrl,
    updateReducerState,
    toggleThankyouVaModal,
    vaEmail
  } = props
  const [details, setDetails] = useState({
    email: ''
  })
  const token = retrieveFromLocalStorage('token')

  useEffect(() => {
    setDetails({
      ...details,
      email: vaEmail
    })
    // eslint-disable-next-line
  }, [vaEmail])
  // For login form validation

  return (
    <div className="va-atlantics-wrap">
      <SeoTags
        title={SeoTexts.VIRGIN_TITLE}
        metaDescription={SeoTexts.VIRGIN_DESCRIPTION}
        canonicalLink={SeoTexts.VIRGIN_CANONICAL}
        ogImgUrl={SeoTexts.VIRGIN_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.VIRGIN_TWITTER_IMAGE_URL}
        richSnippet={virginAtlanticSnippet}
      />
      <BgWrap className="atlantics-banner">
        <SearchImageWrapper className="atlantics-banner-img">
          <picture className="d-b">
            <source
              data-srcSet={require('./assets/images/virgin-atlantics/va-flights-bg.webp')}
              type="image/webp"
            />
            <ProgressiveImage
              image={require('./assets/images/virgin-atlantics/va-flights-bg.png')}
              render={(currentImage, loading) => (
                <img
                  style={{
                    transition: '0.5s filter linear',
                    filter: `${loading ? 'blur(50px)' : ''}`
                  }}
                  src={currentImage}
                  alt="Search Background"
                  className="lazyload"
                  loading="lazy"
                />
              )}
            />
          </picture>
        </SearchImageWrapper>
        <BgWrapInner className="atlantics-banner-inner">
          <SectionTitle>{intl(pagesMessages.virginAtlanticTitle)}</SectionTitle>
          {/* // } */}
          <SectionSubTitle className="sub_title">
            {intl(pagesMessages.virginAtlanticSubTitle)}
          </SectionSubTitle>
          <Container className="virgin-search-panel">
            <SearchPanel />
            {/* {token ?
              <div >
                <Button loading={addEmailLoading} className="ui submit button" onClick={submitEmailForLoggedInUser}>{intl(pagesMessages.tellMeWhenItsBack)}!</Button>
              </div>
              :
              <div className="banner-form">
                <div className="ui form">
                  <InputBox
                    name="email"
                    type={'text'}
                    value={details.email}
                    placeholder={intl(commonMessages.enterEmail)}
                    maxLength={70}
                    onChange={value => onAddEmailHandler('email', value.trim())}
                    className={`required-field ${error.email ? 'error' : ''}`}
                  />
                  <Button loading={addEmailLoading} className="ui submit button" onClick={submitEmailHandler}>{intl(commonMessages.submit)}</Button>
                </div>
              </div>} */}
          </Container>
          <p className="RffFeatureTxt">{intl(commonMessages.featureOn)}</p>
        </BgWrapInner>
      </BgWrap>

      <div className="flights-logo">
        <div className="container">
          <picture className="d-b">
            <source
              data-srcSet={require('./assets/images/virgin-atlantics/va-flights-logo.webp')}
              type="image/webp"
            />
            <ProgressiveImage
              image={require('./assets/images/virgin-atlantics/va-flights-logo.png')}
              render={(currentImage, loading) => (
                <img
                  style={{
                    transition: '0.5s filter linear',
                    filter: `${loading ? 'blur(50px)' : ''}`
                  }}
                  src={currentImage}
                  alt="Search Background"
                  className="lazyload"
                  loading="lazy"
                />
              )}
            />
          </picture>
        </div>
      </div>
      <div className="va-club-wrap">
        <div className="va-club-points">
          <div className="container">
            <h2 className="va-club-points-title">
              {intl(pagesMessages.vAClubPintsTitle)}
            </h2>
            <div className="ui three column grid">
              <div className="column">
                <div className="point-box">
                  <div className="point-svg">
                    <VaSearchIcon />
                  </div>
                  <h3>{intl(pagesMessages.vAClubPintsTextOne)}</h3>
                  <p>{intl(pagesMessages.vAClubPintsTextTwo)}</p>
                </div>
              </div>
              <div className="  column">
                <div className="point-box">
                  <div className="point-svg">
                    <VaMusicIcon />
                  </div>
                  <h3>{intl(pagesMessages.vAClubMusicTextOne)}</h3>
                  <p>{intl(pagesMessages.vAClubMusicTextTwo)}</p>
                </div>
              </div>
              <div className="  column">
                <div className="point-box">
                  <div className="point-svg">
                    <VaPoundIcon />
                  </div>
                  <h3>{intl(pagesMessages.vAClubPoundTextOne)}</h3>
                  <p>{intl(pagesMessages.vAClubPoundTextTwo)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="va-signup-card">
          <Container>
            <Grid className="m-0 va-signup-card-inner">
              <Grid.Row className="m-0">
                <Grid.Column
                  mobile={16}
                  tablet={10}
                  computer={12}
                  widescreen={12}
                  verticalAlign="middle"
                  className="mini-signup-card__col-left"
                >
                  <h5 className="mini-signup-card__text">
                    {token
                      ? intl(pagesMessages.doYouCollectBritishAirways)
                      : intl(
                          pagesMessages.doYouCollectBritishAirwaysSignup
                        )}{' '}
                  </h5>
                  <p>{intl(pagesMessages.newSeatsAvailable)}</p>
                </Grid.Column>
                <Grid.Column
                  mobile={16}
                  tablet={6}
                  computer={4}
                  widescreen={4}
                  textAlign="right"
                  className="mini-signup-card__col-right"
                >
                  {token ? (
                    <Button
                      className="btn btn--medium-blue"
                      onClick={() => history.push(AppRoutes.HOME)}
                    >
                      {intl(pagesMessages.searchNow)}
                    </Button>
                  ) : (
                    <Button
                      className="btn btn--medium-blue"
                      onClick={() => history.push(AppRoutes.SIGN_UP)}
                    >
                      {intl(commonMessages.signUpNow)}
                    </Button>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
        <div className="about-va">
          <Container>
            <Grid className="m-0">
              <Grid.Row className="m-0">
                <Grid.Column
                  mobile={16}
                  tablet={7}
                  computer={6}
                  widescreen={6}
                  verticalAlign="middle"
                  className="about-va__col-left"
                >
                  <picture className="d-b">
                    <source
                      data-srcSet={require('./assets/images/virgin-atlantics/about-va.webp')}
                      type="image/webp"
                    />
                    <ProgressiveImage
                      image={require('./assets/images/virgin-atlantics/about-va.png')}
                      render={(currentImage, loading) => (
                        <img
                          style={{
                            transition: '0.5s filter linear',
                            filter: `${loading ? 'blur(50px)' : ''}`
                          }}
                          src={currentImage}
                          alt="Search Background"
                          className="lazyload"
                          loading="lazy"
                        />
                      )}
                    />
                  </picture>
                </Grid.Column>
                <Grid.Column
                  mobile={16}
                  tablet={8}
                  computer={10}
                  widescreen={10}
                  className="about-va__col-right"
                >
                  <h2>{intl(pagesMessages.aboutVirginTitle)}</h2>
                  <p>{intl(pagesMessages.aboutVirginTextOne)}</p>
                  <p>{intl(pagesMessages.aboutVirginTextTwo)}</p>
                  <p>{intl(pagesMessages.aboutVirginTextThree)}</p>
                  <p>{intl(pagesMessages.aboutVirginTextFour)}</p>
                  <p>{intl(pagesMessages.aboutVirginTextFive)}</p>
                  <p>{intl(pagesMessages.aboutVirginTextSix)}</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      </div>

      <MapBox
        mapPageUrl={mapPageUrl}
        mapBoxTitle={intl(staticMessage.mapBoxTitle)}
        mapBoxContent={intl(staticMessage.mapBoxText)}
      />
      <div className="cloud-bg">
        <div className="container">
          <div className="testimonial">
            <div className="testimonial__inner">
              <div className="testimonial__header">
                <h2 className="testimonial__title">
                  {intl(pagesMessages.vaTestimonialTitle)}
                </h2>
                <div className="testimonial__text">
                  <p>
                    {intl(pagesMessages.vaTestimonialTextOne)}
                    <br />
                    {intl(pagesMessages.vaTestimonialTextTwo)}
                    <br />
                    {intl(pagesMessages.vaTestimonialTextThree)}
                  </p>
                </div>
              </div>
              <div className="testimonial__body">
                <Testimonials />
              </div>
              <div className="testimonial__footer">
                <div className="trustpilot">
                  <TrustBox />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="va-signup-card va-signup-card-2">
          <Container>
            <Grid className="m-0 va-signup-card-inner">
              <Grid.Row className="m-0">
                <Grid.Column
                  mobile={16}
                  tablet={10}
                  computer={12}
                  widescreen={12}
                  verticalAlign="middle"
                  className="mini-signup-card__col-left"
                >
                  <h5 className="mini-signup-card__text">
                    {intl(pagesMessages.dontFrustated)}
                  </h5>
                </Grid.Column>
                <Grid.Column
                  mobile={16}
                  tablet={6}
                  computer={4}
                  widescreen={4}
                  textAlign="right"
                  className="mini-signup-card__col-right"
                >
                  {token ? (
                    <Button
                      className="btn btn--medium-blue"
                      onClick={() => history.push(AppRoutes.HOME)}
                    >
                      {intl(pagesMessages.searchNow)}
                    </Button>
                  ) : (
                    <Button
                      className="btn btn--medium-blue"
                      onClick={() => history.push(AppRoutes.SIGN_UP)}
                    >
                      {intl(commonMessages.signUpTitle)}
                    </Button>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>

        {/* <div className="container">
          <GetUsOn />
        </div> */}
      </div>

      <div className="recent-blogs-wrapper">
        <div className="container">
          <RecentBlogs btnClass="btn--medium-blue" />
        </div>
      </div>
      <ThankyouVirginModal
        toggleThankyouVaModal={toggleThankyouVaModal}
        updateReducerState={updateReducerState}
        thankyouMessage={`${intl(
          pagesMessages.thankyouTextStart
        )} Virgin Atlantic Flying Club ${intl(pagesMessages.thankyouTextEnd)}`}
      />
    </div>
  )
}

VirginAtlantic.propTypes = {
  mapPageUrl: PropTypes.string,
  addEmailLoading: PropTypes.bool,
  addEmail: PropTypes.func,
  updateReducerState: PropTypes.func,
  toggleThankyouVaModal: PropTypes.bool,
  userEmail: PropTypes.string
}

export default VirginAtlantic
