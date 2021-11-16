import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SeoTags from 'common/SeoTags'
import { Container, Grid, Button } from 'semantic-ui-react'
import RecentBlogs from 'common/RecentBlogs'
import Testimonials from 'common/Testimonials'
import {
  SearchImageWrapper,
  BgWrap,
  BgWrapInner,
  SectionTitle,
  SectionSubTitle
} from '../Home/style'
import MapBox from 'components/Home/mapBox'
import './assets/scss/virginAtlantic.scss'
import './assets/scss/americanairline.scss'
import { retrieveFromLocalStorage, navigateToRespectivePage } from 'utils/helpers'
import { VaSearchIcon, VaMusicIcon, VaPoundIcon } from '../../utils/svgs'
import ThankyouVirginModal from './thankyouVirginModal'
import { InputBox } from 'utils/formUtils'
import Validator from 'utils/validator'
import SeoTexts from 'constants/seoConstants'
import { AppRoutes } from '../../constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import { americanAirlinesSnippet } from 'constants/seoScriptConstants'
import commonMessages from 'constants/messages/commonMessages'
import aerLingusMessages from 'constants/messages/aerLingusMessages'
import americanAirlineMessages from 'constants/messages/americanAirlineMessages'
import staticMessage from 'constants/messages/homeMessages'
import ProgressiveImage from 'utils/progressiveImage'
import { airlineName } from 'constants/globalConstants'

const AmericanAirlines = (props) => {
  const {
    mapPageUrl,
    addEmail,
    addEmailLoading,
    updateReducerState,
    toggleThankyouVaModal,
    userEmail,
    vaEmail
  } = props
  const [details, setDetails] = useState({
    email: ''
  })
  const [error, setErrors] = useState({})
  const token = retrieveFromLocalStorage('token')
  const appendParams = sessionStorage.getItem('queryParamsGA')

  useEffect(() => {
    setDetails({
      ...details,
      email: vaEmail
    })
    // eslint-disable-next-line
  }, [vaEmail])
  // For login form validation
  const _isValid = (field = null, value) => {
    if (field) {
      details[field] = value
    }
    const validate = Validator.createValidator(
      {
        email: ['required', 'email']
      },
      {
        email: details.email
      },
      field,
      {
        email: ''
      }
    )
    return validate
  }

  // Validations on blur
  const validateOnBlur = (name, value) => {
    const { errors } = _isValid(name, value)
    setErrors({ ...error, [name]: errors[name] })
  }

  const onAddEmailHandler = (name, value) => {
    setDetails({
      ...details,
      email: value
    })
    validateOnBlur(name, value)
  }

  const submitEmailHandler = () => {
    const { isValid } = _isValid()
    if (isValid) {
      const data = {
        upcoming_airline_request: {
          email: details.email,
          airline_name: airlineName.AA.AIRWAYS_NAME
        }
      }
      updateReducerState('pages', 'vaEmail', details.email)
      addEmail(data)
    } else {
      const { errors } = _isValid()
      setErrors({ ...errors })
    }
  }

  const submitEmailForLoggedInUser = () => {
    const data = {
      upcoming_airline_request: {
        email: userEmail,
        airline_name: airlineName.AA.AIRWAYS_NAME
      }
    }
    addEmail(data)
  }

  return (
    <div className="va-atlantics-wrap">
      <SeoTags
        title={SeoTexts.AMERICAN_AIRLINE_TITLE}
        metaDescription={SeoTexts.AMERICAN_AIRLINE_DESCRIPTION}
        canonicalLink={SeoTexts.AMERICAN_AIRLINE_CANONICAL}
        ogImgUrl={SeoTexts.AMERICAN_AIRLINE_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.AMERICAN_AIRLINE_TWITTER_IMAGE_URL}
        richSnippet={americanAirlinesSnippet}
      />
      <BgWrap className="atlantics-banner">
        <SearchImageWrapper className="atlantics-banner-img">
          <picture className="d-b">
            <source
              data-srcSet={require('./assets/images/americanairlines/americalairline-bg.png')}
              type="image/webp"
            />
            <ProgressiveImage
              image={require('./assets/images/americanairlines/americalairline-bg.png')}
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
          <SectionTitle>
            {intl(americanAirlineMessages.sectionTitleAmericanAirline)}{' '}
          </SectionTitle>
          {/* // } */}
          <Container>
            {token ? (
              <div>
                <Button
                  loading={addEmailLoading}
                  className="ui submit button"
                  onClick={submitEmailForLoggedInUser}
                >
                  {intl(aerLingusMessages.tellMeWhenHere)}{' '}
                </Button>
              </div>
            ) : (
              <div className="banner-form">
                <div className="ui form">
                  <InputBox
                    name="email"
                    type={'text'}
                    value={details.email}
                    placeholder={intl(commonMessages.enterEmail)}
                    maxLength={70}
                    onChange={(value) =>
                      onAddEmailHandler('email', value.trim())
                    }
                    className={`required-field ${error.email ? 'error' : ''}`}
                  />
                  <Button
                    loading={addEmailLoading}
                    className="ui submit button"
                    onClick={submitEmailHandler}
                  >
                    {intl(commonMessages.submit)}
                  </Button>
                </div>
              </div>
            )}
          </Container>
          <SectionSubTitle className="sub_title americanairline_sub_title">
            {intl(americanAirlineMessages.provideEmailAmericanAirline)}{' '}
          </SectionSubTitle>
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
              {intl(americanAirlineMessages.makingEasyToUseAA)}{' '}
            </h2>
            <div className="ui three column grid">
              <div className="column">
                <div className="point-box">
                  <div className="point-svg">
                    <VaSearchIcon />
                  </div>
                  <h3>{intl(americanAirlineMessages.oneYearOneSearch)} 
                  <br></br>
                  {intl(americanAirlineMessages.oneYearOneSearchText)}
                  </h3>
                  <p>{intl(americanAirlineMessages.yearOfAAAvailibility)}</p>
                </div>
              </div>
              <div className="  column">
                <div className="point-box">
                  <div className="point-svg">
                    <VaMusicIcon />
                  </div>
                  <h3>
                    {intl(americanAirlineMessages.seatAlertsForAADestination)}
                  </h3>
                  <p>
                    {intl(americanAirlineMessages.notifiedWithNewAwardSeat)}
                  </p>
                </div>
              </div>
              <div className="  column">
                <div className="point-box">
                  <div className="point-svg">
                    <VaPoundIcon />
                  </div>
                  <h3>{intl(americanAirlineMessages.saveMonetOnUSFlights)} 
                  <br></br>
                  {intl(americanAirlineMessages.saveMonetOnUSFlightsText)} 
                  </h3>
                  <p>{intl(americanAirlineMessages.useMilesToSaveMoney)} </p>
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
                      ? 'Fly using points on Oneworld airlines. Sign Up Today!'
                      : 'Fly using points on Oneworld airlines. Sign Up Today! '}{' '}
                  </h5>
                  <p>{intl(americanAirlineMessages.findAwardSeats)} </p>
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
                      onClick={() => navigateToRespectivePage(AppRoutes.HOME, appendParams)}
                    >
                      {intl(pagesMessages.searchNow)}
                    </Button>
                  ) : (
                    <Button
                      className="btn btn--medium-blue"
                      onClick={() => navigateToRespectivePage(AppRoutes.SIGN_UP, appendParams)}
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
                  <picture className="d-b american-about-img">
                    <source
                      data-srcSet={require('./assets/images/americanairlines/airline.png')}
                      type="image/webp"
                    />

                    <ProgressiveImage
                      image={require('./assets/images/americanairlines/airline.png')}
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
                  <h2>
                    {intl(americanAirlineMessages.aboutAmericanAirlines)}{' '}
                  </h2>
                  <p>
                    {intl(
                      americanAirlineMessages.americanAirlineOneWorldAlliance
                    )}
                  </p>
                  <p>
                    {intl(
                      americanAirlineMessages.americanAirlineFrequentFlierProgram
                    )}
                  </p>
                  <p>
                    {intl(americanAirlineMessages.freeToJoinWithBasicTiers)}
                  </p>
                  <p>
                    {intl(
                      americanAirlineMessages.americanAirlineLoyaltySchemes
                    )}
                  </p>
                  <p>{intl(americanAirlineMessages.biggestUSBasedAirline)}</p>
                  <p>{intl(americanAirlineMessages.homeBaseAtDollarsFort)}</p>
                  <p>
                    {intl(
                      americanAirlineMessages.americanOffersRangeCabinClass
                    )}
                  </p>
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
                  {intl(americanAirlineMessages.testimonalHeadingAirlineMiles)}{' '}
                </h2>
                <div className="testimonial__text">
                  <p>
                    {intl(
                      americanAirlineMessages.milesAreHardToEarnamericanAirline
                    )}
                  </p>
                </div>
              </div>
              <div className="testimonial__body">
                <Testimonials />
              </div>
              {/* <div className="testimonial__footer">
                <div className="trustpilot">
                  <TrustBox />
                </div>
              </div> */}
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
                    {intl(aerLingusMessages.dontFrustratedLetUsHelp)}{' '}
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
                      onClick={() => navigateToRespectivePage(AppRoutes.HOME, appendParams)}
                    >
                      {intl(pagesMessages.searchNow)}
                    </Button>
                  ) : (
                    <Button
                      className="btn btn--medium-blue"
                      onClick={() => navigateToRespectivePage(AppRoutes.SIGN_UP, appendParams)}
                    >
                      {intl(commonMessages.signUp)}
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
        )} AAdvantageⓇ ${intl(pagesMessages.thankyouTextEnd)}`}
      />
    </div>
  )
}

AmericanAirlines.propTypes = {
  mapPageUrl: PropTypes.string,
  addEmailLoading: PropTypes.bool,
  addEmail: PropTypes.func,
  updateReducerState: PropTypes.func,
  toggleThankyouVaModal: PropTypes.bool,
  userEmail: PropTypes.string
}

export default AmericanAirlines
