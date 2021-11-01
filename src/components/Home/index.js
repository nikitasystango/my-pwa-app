import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'
import Layout from 'containers/Layout'
import SearchPanel from 'containers/SearchPanel'
import Testimonials from 'common/Testimonials'
import RecentBlogs from 'common/RecentBlogs'
import { HeaderPlaceholder } from 'common/Placeholder'
import {
  HeaderContent,
  SectionTitle,
  SectionSubTitle,
  BgWrap,
  BgWrapInner,
  FeaturedLogos
} from './style'
import SeoTexts from 'constants/seoConstants'
import { HomeRichSnippet } from 'constants/seoScriptConstants'
import GetAhead from './getAhead'
import MiniSignupCard from './miniSignup'
import MapBox from './mapBox'
import '../Pages/assets/scss/virginAtlantic.scss'
// import GetUsOn from './getuson'
import './index.scss'
import ReactHtmlParser from 'react-html-parser'
import {
  retrieveFromLocalStorage,
  extractURLParams,
  setInLocalStorage
} from 'utils/helpers'
import history from 'utils/history'
import { GoogleAdsParam } from 'constants/globalConstants'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import staticMessage from 'constants/messages/homeMessages'
import commonMessages from 'constants/messages/commonMessages'
import { handleFingerPrintScrapper } from 'utils/FingerprintScrapper/source'
import SignupOnBoardingModal from '../Pages/signupOnBoardingModal'
import UpdateUserDetailModal from 'common/UpdateUserDetailModal'
// Import page css to fix onboarding sceen design
import '../Pages/index.scss'
import ProgressiveImage from 'utils/progressiveImage'
import SeoTags from 'common/SeoTags'
import HomeIntroBox from './homeIntroBox'

const Home = (props) => {
  const {
    pageAnalytics,
    testimonialLoader,
    pageContentLoading,
    pageContentDetails,
    mapPageUrl,
    updateReducerState,
    user: { isUserSilverMember, isUserGoldMember },
    location,
    addFingerprintScapperData,
    accountSettings: { userDetails },
    pages: { toggleSignupOnBoardingModal, toggleUpdateProfileDetailsModal },
    updateProfileDetails,
    updateUserName,
    updateUserNameLoading,
    getSouDesLocations,
    getSouDesPossibleRoutes,
    searchPanel,
    getProfileDetails
  } = props

  const token = retrieveFromLocalStorage('token')
  const userData = JSON.parse(retrieveFromLocalStorage('userDetails'))
  const userId = userData && userData.id ? userData.id : retrieveFromLocalStorage('userId')
  useEffect(() => {
    const isWebScrapper = retrieveFromLocalStorage('webScrapper')
    if (location?.search) {
      const data = extractURLParams(location.search)
      const arrData = Object.keys(data)
      if (data && data.ref) {
        setInLocalStorage('tapfiliateReference', data.ref)
      }
      const isExist = GoogleAdsParam.includes(arrData[0])
      if (!isExist) {
        history.push(AppRoutes.PAGE_NOT_FOUND)
      }
    }
    if (!isWebScrapper) {
      setInLocalStorage('webScrapper', true)
      handleScriptData()
    }
    pageAnalytics()

    if (token && userId) {
      getProfileDetails(userId)
    }
    return () => {
      updateReducerState('searchPanel', 'rangeDepartStartDate', null)
      updateReducerState('searchPanel', 'rangeDepartEndDate', null)
      updateReducerState('searchPanel', 'rangeReturnStartDate', null)
      updateReducerState('searchPanel', 'rangeReturnEndDate', null)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const { firstName, lastName, address, country, gender, ageBand, flightsTakenAnnually } = userDetails || {}
    if (userDetails && userDetails.onboarded === false) {
      updateReducerState('pages', 'toggleSignupOnBoardingModal', true)
    }
    if (token && userDetails && (!firstName || !lastName || !country || !address?.address1 || !address?.state || !gender || !ageBand || !flightsTakenAnnually)) {
      updateReducerState('pages', 'toggleUpdateProfileDetailsModal', true)
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    }
    // eslint-disable-next-line
  }, [userDetails])

  const handleScriptData = async () => {
    const fingerprint = await handleFingerPrintScrapper()
    const data = {
      user: {
        user_fingerprint: fingerprint
      }
    }
    addFingerprintScapperData(data)
  }

  const redirectToPricing = () => {
    const data = {
      user: {
        access_token: token,
        onboarded: true
      }
    }
    updateProfileDetails({
      data,
      name: 'onboarded',
      onboardingExistingUser: true
    })
  }

  const { content } =
    (pageContentDetails && pageContentDetails.landingPage) || ''
  return (
    <>
      <SeoTags
        title={SeoTexts.HOME_TITLE}
        metaDescription={SeoTexts.HOME_DESCRIPTION}
        canonicalLink={SeoTexts.HOME_CANONICAL}
        ogImgUrl={SeoTexts.HOME_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.HOME_TWITTER_IMAGE_URL}
        richSnippet={HomeRichSnippet}
      />
      <Layout className="p-0">
        <BgWrap className="homeBgWrap">
          <BgWrapInner className="homeSearchBg">
            {pageContentLoading ? (
              <HeaderPlaceholder />
            ) : (
              // <SectionTitle>{ReactHtmlParser(content)}</SectionTitle>
              <HeaderContent>
                <SectionTitle>
                  {content
                    ? ReactHtmlParser(content)
                    : intl(staticMessage.sectionTitle)}
                </SectionTitle>
                <SectionSubTitle>
                  {intl(staticMessage.sectionSubTitle)} checkkk deployment
                </SectionSubTitle>
              </HeaderContent>
            )}
            <Container>
              <SearchPanel />
            </Container>
            <p className="RffFeatureTxt">{intl(commonMessages.featureOn)}</p>
          </BgWrapInner>
        </BgWrap>

        <FeaturedLogos>
          <picture className="desktop-image">
            <source
              srcSet={require('./assets/featured-on.webp')}
              type="image/webp"
            />
            <ProgressiveImage
              preview={require('./assets/featured-on-low.png')}
              image={require('./assets/featured-on.png')}
              render={(currentImage, loading) => (
                <img
                  style={{
                    transition: '0.5s filter linear',
                    filter: `${loading ? 'blur(50px)' : ''}`
                  }}
                  data-src={currentImage}
                  alt="Featured On"
                  className="lazyload d-b max-width-100 mx-auto featured-mobile-img"
                  width="1100"
                  height="50"
                />
              )}
            />
          </picture>
          <picture className="mobile-image">
            <source
              srcSet={require('./assets/featured-on-mobile.webp')}
              type="image/webp"
            />
            <ProgressiveImage
              preview={require('./assets/featured-on-mobile-low.png')}
              image={require('./assets/featured-on-mobile.png')}
              render={(currentImage, loading) => (
                <img
                  style={{
                    transition: '0.5s filter linear',
                    filter: `${loading ? 'blur(50px)' : ''}`
                  }}
                  data-src={currentImage}
                  alt="Featured On"
                  className="lazyload d-b max-width-100 mx-auto featured-mobile-img"
                  width="396"
                  height="70"
                />
              )}
            />
          </picture>
        </FeaturedLogos>

        {!token && <GetAhead />}
        <MapBox
          mapPageUrl={mapPageUrl}
          mapBoxTitle={intl(staticMessage.mapBoxTitle)}
          mapBoxContent={intl(staticMessage.mapBoxText)}
        />
        <div className="cloud-bg">
          {!token && (
            <div className="container">
              <div className="testimonial">
                <div className="testimonial__inner">
                  <div className="testimonial__header">
                    <h2 className="testimonial__title">
                      {intl(staticMessage.testimonialTitleOne)}
                      <br />
                      {intl(staticMessage.testimonialTitleTwo)}
                    </h2>
                    <div className="testimonial__text">
                      <p>{intl(staticMessage.testimonialDescOne)}</p>
                      <p>{intl(staticMessage.testimonialDescTwo)}</p>
                      <p>{intl(staticMessage.testimonialDescThree)}</p>
                    </div>
                  </div>
                  <div className="testimonial__body">
                    <Testimonials testimonialLoader={testimonialLoader} />
                  </div>
                  {/* <div className="testimonial__footer">
                    <div className="trustpilot">
                      <TrustBox />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          )}
          {!isUserGoldMember && (
            <div className={`container ${token ? 'mscw' : ''}`}>
              <MiniSignupCard
                isUserSilverMember={isUserSilverMember}
                isUserGoldMember={isUserGoldMember}
              />
            </div>
          )}

          {/* <div className="container">
            <GetUsOn />
          </div> */}
        </div>
        <div
          className={`${
            token ? 'intro-main-wrap-logged-in' : 'intro-main-wrap'
          }`}
        >
          {!token && (
          <HomeIntroBox />
          )}
          <div className={`${token ? 'recent-blogs-wrapper' : ''}`}>
            <div className="container">
              <RecentBlogs btnClass="btn--medium-blue" />
            </div>
          </div>
        </div>
      </Layout>
      <SignupOnBoardingModal
        toggleSignupOnBoardingModal={toggleSignupOnBoardingModal}
        updateReducerState={updateReducerState}
        redirectToPricing={redirectToPricing}
      />
      <UpdateUserDetailModal
        {...props}
        toggleModal={toggleUpdateProfileDetailsModal}
        updateReducerState={updateReducerState}
        updateUserName={updateUserName}
        updateUserNameLoading={updateUserNameLoading}
        getSouDesLocations={getSouDesLocations}
        getSouDesPossibleRoutes={getSouDesPossibleRoutes}
        searchPanel={searchPanel}
        userDetails={userDetails || {}}
        userId={userId}
      />
    </>
  )
}

Home.propTypes = {
  testimonialLoader: PropTypes.bool,
  pageContentDetails: PropTypes.object,
  updateReducerState: PropTypes.func,
  pageContentLoading: PropTypes.bool,
  pageAnalytics: PropTypes.func,
  user: PropTypes.object,
  mapPageUrl: PropTypes.string,
  location: PropTypes.object,
  addFingerprintScapperData: PropTypes.func,
  accountSettings: PropTypes.object,
  pages: PropTypes.object,
  updateProfileDetails: PropTypes.func,
  updateUserName: PropTypes.func,
  updateUserNameLoading: PropTypes.bool,
  getSouDesPossibleRoutes: PropTypes.func,
  getSouDesLocations: PropTypes.func,
  getProfileDetails: PropTypes.func
}

export default Home
