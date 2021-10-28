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
import { InputBox } from 'utils/formUtils'
import Validator from 'utils/validator'
import SeoTexts from 'constants/seoConstants'
import { AppRoutes } from '../../constants/appRoutes'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import { aerLingusSnippet } from 'constants/seoScriptConstants'
import aerLingusMessages from 'constants/messages/aerLingusMessages'
import commonMessages from 'constants/messages/commonMessages'
import staticMessage from 'constants/messages/homeMessages'
import ProgressiveImage from 'utils/progressiveImage'

const AerLingus = (props) => {
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
          airline_name: 'aer_lingus'
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
        airline_name: 'aer_lingus'
      }
    }
    addEmail(data)
  }

  return (
    <div className="va-atlantics-wrap">
      <SeoTags
        title={SeoTexts.AER_TITLE}
        metaDescription={SeoTexts.AER_LINGUS_DESCRIPTION}
        canonicalLink={SeoTexts.AER_LINGUS_CANONICAL}
        ogImgUrl={SeoTexts.AER_LINGUS_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.AER_LINGUS_TWITTER_IMAGE_URL}
        richSnippet={aerLingusSnippet}
      />
      <BgWrap className="atlantics-banner">
        <SearchImageWrapper className="atlantics-banner-img">
          <picture className="d-b">
            <source
              data-srcSet={require('./assets/images/aer-lingus/al-banner-bg.webp')}
              type="image/webp"
            />
            <ProgressiveImage
              image={require('./assets/images/aer-lingus/al-banner-bg.png')}
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
            {intl(aerLingusMessages.sectionTitleAerLingus)}{' '}
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
          <SectionSubTitle className="sub_title">
            {intl(aerLingusMessages.provideEmailAerLingus)}
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
              {' '}
              {intl(aerLingusMessages.discoverAerLingusFlight)}
            </h2>
            <div className="ui three column grid">
              <div className="column">
                <div className="point-box">
                  <div className="point-svg">
                    <VaSearchIcon />
                  </div>
                  <h3>{intl(aerLingusMessages.yearRewardAvailiability)}</h3>
                  <p>{intl(aerLingusMessages.allMonthsonOnePage)}</p>
                </div>
              </div>
              <div className="  column">
                <div className="point-box">
                  <div className="point-svg">
                    <VaMusicIcon />
                  </div>
                  <h3>{intl(aerLingusMessages.aerLingusSeatAlerts)}</h3>
                  <p>{intl(aerLingusMessages.alertWhenNewSeatAvailable)}</p>
                </div>
              </div>
              <div className="  column">
                <div className="point-box">
                  <div className="point-svg">
                    <VaPoundIcon />
                  </div>
                  <h3>{intl(aerLingusMessages.spendAviosSpendAvios)}
                  <br></br>
                  {intl(aerLingusMessages.spendAviosSaveMoney)}
                  </h3>
                  <p>{intl(aerLingusMessages.bookAerLingusTickets)}</p>
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
                      ? 'Sign up to find BA Reward Seats too!'
                      : 'Sign up today! '}{' '}
                  </h5>
                  <p>{intl(aerLingusMessages.discoverBritishAirwaysAvios)} </p>
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
                      {intl(pagesMessages.searchNow)}{' '}
                    </Button>
                  ) : (
                    <Button
                      className="btn btn--medium-blue"
                      onClick={() => history.push(AppRoutes.SIGN_UP)}
                    >
                      {intl(commonMessages.signUpNow)}{' '}
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
                      data-srcSet={require('./assets/images/aer-lingus/flight.webp')}
                      type="image/webp"
                    />
                    <ProgressiveImage
                      image={require('./assets/images/aer-lingus/flight.png')}
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
                  <h2>{intl(aerLingusMessages.aboutAerLingus)} </h2>
                  <p>{intl(aerLingusMessages.aerLingusIntroTitle)}</p>
                  <p>{intl(aerLingusMessages.aerLingusSubTitle)}</p>
                  <p>{intl(aerLingusMessages.aerLinguscodeShareAgreement)}</p>
                  <p>
                    {intl(aerLingusMessages.aerLingusvalueForMoneyCabinClass)}
                  </p>
                  <p>{intl(aerLingusMessages.aerLingusLoyaltyProgramme)}</p>
                  <p>{intl(aerLingusMessages.needToEarnMoreTierCredits)}</p>
                  <p>{intl(aerLingusMessages.aerLingusConciergeTierMember)}</p>
                  <p>{intl(aerLingusMessages.aerClubMemberEarnAvios)}</p>
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
                  {intl(aerLingusMessages.helpingFrequentFliers)}{' '}
                </h2>
                <div className="testimonial__text">
                  <p>
                    {intl(aerLingusMessages.easytoCollectPoints)}
                    <br />
                    {intl(aerLingusMessages.seatsOnPopularRoutes)} <br />
                    {intl(aerLingusMessages.builtOiginalRewardFlight)}
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
                      onClick={() => history.push(AppRoutes.HOME)}
                    >
                      {intl(pagesMessages.searchNow)}
                    </Button>
                  ) : (
                    <Button
                      className="btn btn--medium-blue"
                      onClick={() => history.push(AppRoutes.SIGN_UP)}
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
        )} AerClub ${intl(pagesMessages.thankyouTextEnd)}`}
      />
    </div>
  )
}

AerLingus.propTypes = {
  mapPageUrl: PropTypes.string,
  addEmailLoading: PropTypes.bool,
  addEmail: PropTypes.func,
  updateReducerState: PropTypes.func,
  toggleThankyouVaModal: PropTypes.bool,
  userEmail: PropTypes.string
}

export default AerLingus
