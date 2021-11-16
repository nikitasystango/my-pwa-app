import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Container, Grid, GridRow, GridColumn, Header, Button } from 'semantic-ui-react'
import SeoTags from 'common/SeoTags'
import SeoTexts from 'constants/seoConstants'
import { Title, Para, PoniterSection, PoniterSectionCount, PoniterSectionTitle, PoniterSectionText } from './style'
import { voucherCampain } from 'constants/seoScriptConstants'
import { GoogleAdsParam } from 'constants/globalConstants'
import { extractURLParams, navigateToRespectivePage } from 'utils/helpers'
import history from 'utils/history'
import { Tickets } from 'utils/svgs'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import { AppRoutes } from '../../constants/appRoutes'
import 'semantic-ui-css/components/header.min.css'
import './assets/scss/voucher.scss'

const Vouchers = (props) => {
  const { pageAnalytics, location } = props
  const appendParams = sessionStorage.getItem('queryParamsGA')

  useEffect(() => {
    if (location?.search) {
      const data = extractURLParams(props.location.search)
      const arrData = Object.keys(data)
      const isExist = GoogleAdsParam.includes(arrData[0])
       if(!isExist) {
         history.push(AppRoutes.PAGE_NOT_FOUND)
       }
    }
    pageAnalytics()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <SeoTags
        title={SeoTexts.VOUCHER_TITLE}
        metaDescription={SeoTexts.VOUCHER_DESCRIPTION}
        canonicalLink={SeoTexts.VOUCHER_CANONICAL}
        ogImgUrl={SeoTexts.VOUCHER_OG_IMAGE_URL}
        twitterImgUrl={SeoTexts.VOUCHER_TWITTER_IMAGE_URL}
        richSnippet={voucherCampain}
      />
      <div className="companion-vouvher">
        <Container>

          <Grid className="mx-0 campanion-voucher-ba" verticalAlign="middle">
            <GridRow>
              <GridColumn mobile={16} tablet={9} computer={9}>
                <div className="campanion-voucher-ba__content">
                  <Title as="h1" className="campanion-voucher-ba__title">{intl(pagesMessages.voucherTitle)}</Title>
                  <Para className="campanion-voucher-ba__description">{intl(pagesMessages.voucherDes)}</Para>
                </div>
              </GridColumn>
              <GridColumn mobile={16} tablet={7} computer={7}>
                {/* <picture>
                  <source srcSet={require('../../assets/images/flight-image.webp')} type="image/webp" />
                  <img src={require('assets/images/flight-image.png')} alt="✈️" className="campanion-voucher-ba__img lazyload" />
                </picture> */}
                <Tickets className="campanion-voucher-ba__img" />
              </GridColumn>
            </GridRow>
          </Grid>

          <Grid className="m-0" textAlign="center">
            <GridRow>
              <GridColumn width={16}>
                <div className="content-with-bg-img">
                  <picture>
                    {/* <source srcSet={require('../../assets/images/plane-bg.webp')} type="image/webp" /> */}
                    <img src={require('assets/images/plane-bg.webp')} alt="✈️" className="content-with-bg-img__img lazyload" />
                  </picture>
                  <div className="content-with-bg-img__row">
                    <div className="content-with-bg-img__content">
                      <Title as="h2" className="content-with-bg-img__title" white>{intl(pagesMessages.whatIsVoucherTitle)}</Title>
                      <div className="content-with-bg-img__text">
                        <Para white><b>{intl(pagesMessages.companionVoucher)}</b></Para>
                        <Para white>{intl(pagesMessages.companionVoucherDes)}</Para>
                      </div>
                    </div>
                  </div>
                </div>
              </GridColumn>
            </GridRow>
          </Grid>

          <Grid className="m-0 cards-section" verticalAlign="middle">
            <GridRow>
              <GridColumn mobile={16} tablet={8} computer={8}>
                <picture>
                  <source srcSet={require('../../assets/images/cards.webp')} type="image/webp" />
                  <img src={require('assets/images/cards.png')} alt="cards💳" className="cards-section__img lazyload" />
                </picture>
              </GridColumn>
              <GridColumn mobile={16} tablet={8} computer={8}>
                <div className="cards-section__content">
                  <Title as="h2" className="cards-section__title">{intl(pagesMessages.soundsGreatTitle)}</Title>
                  <Para>{intl(pagesMessages.soundsGreatTextOne)} <a className="text-medium-blue" href="https://www.americanexpress.com/uk/credit-cards/card-types/avios-credit-cards/" target="_blank" rel="noopener noreferrer">{intl(pagesMessages.soundsGreatTextTwo)}</a></Para>
                  <Header as="h5">{intl(pagesMessages.freeBlueCardTitle)}</Header>
                  <Para>{intl(pagesMessages.freeBlueCardTextOne)} <a className="text-medium-blue" href="https://www.americanexpress.com/uk/credit-cards/ba-credit-card/?linknav=UK-Acq-CreditCards-CardTypes-AviosCards-BAAmexCreditCard-LearnMore" target="_blank" rel="noopener noreferrer">{intl(pagesMessages.freeBlueCardTextThree)}</a> {intl(pagesMessages.freeBlueCardTextTwo)}</Para>
                  <Header as="h5">{intl(pagesMessages.blackPremiumCardTitle)}</Header>
                  <Para>{intl(pagesMessages.blackPremiumCardTextOne)} <a className="text-medium-blue" href="https://www.americanexpress.com/uk/credit-cards/ba-premium-plus-credit-card/?linknav=UK-Acq-CreditCards-CardTypes-AviosCards-BAAmexPremiumPlus-LearnMore" target="_blank" rel="noopener noreferrer">{intl(pagesMessages.blackPremiumCardTextTwo)}</a> {intl(pagesMessages.blackPremiumCardTextThree)}</Para>
                  <Para>{intl(pagesMessages.blackPremiumCardTextFour)}</Para>
                </div>
              </GridColumn>
            </GridRow>
          </Grid>

          <Grid className="m-0 solution-section" verticalAlign="middle">
            <GridRow>
              <GridColumn mobile={16} tablet={9} computer={9}>
                <div className="solution-section__content">
                  <Title as="h2" className="solution-section__title">{intl(pagesMessages.whatsTheSolutionTitle)}</Title>
                  <Para className="solution-section__description">{intl(pagesMessages.whatsTheSolutionTextOne)}</Para>
                  <Para className="solution-section__description">{intl(pagesMessages.whatsTheSolutionTextTwo)}</Para>
                </div>
              </GridColumn>
              <GridColumn mobile={16} tablet={7} computer={7}>
                <div className="solution-section__box">
                  <picture>
                    <source srcSet={require('../../assets/images/airplane-image.webp')} type="image/webp" />
                    <img src={require('assets/images/airplane-image.jpg')} alt="flight✈️" className="solution-section__img lazyload" />
                  </picture>
                  <span className="solution-section__floating-label">{intl(pagesMessages.trackDownTitle)}</span>
                </div>
              </GridColumn>
            </GridRow>
          </Grid>

          <Grid className="m-0 pointer-section">
            <GridRow textAlign="center">
              <GridColumn width={16}>
                <Title as="h2" className="pointer-section__title">{intl(pagesMessages.alreadyKnowWhereIWntGoTitle)}</Title>
              </GridColumn>
            </GridRow>
            <Grid stackable columns="3" className="w-100">
              <GridRow className="py-0">
                <GridColumn mobile={16} tablet={8} computer={5}>
                  <PoniterSection>
                    <PoniterSectionCount>1</PoniterSectionCount>
                    <PoniterSectionTitle as="h5">{intl(pagesMessages.flyFromTitle)}</PoniterSectionTitle>
                    <PoniterSectionText>{intl(pagesMessages.flyFromDes)}</PoniterSectionText>
                  </PoniterSection>
                </GridColumn>
                <GridColumn mobile={16} tablet={8} computer={5}>
                  <PoniterSection>
                    <PoniterSectionCount opac65>2</PoniterSectionCount>
                    <PoniterSectionTitle as="h5">{intl(pagesMessages.availableDatesTitle)}</PoniterSectionTitle>
                    <PoniterSectionText>{intl(pagesMessages.availableDatesTextOne)}</PoniterSectionText>
                    <PoniterSectionText>{intl(pagesMessages.availableDatesTextTwo)}</PoniterSectionText>
                  </PoniterSection>
                </GridColumn>
                <GridColumn mobile={16} tablet={16} computer={6}>
                  <PoniterSection>
                    <PoniterSectionCount opac40>3</PoniterSectionCount>
                    <PoniterSectionTitle as="h5">{intl(pagesMessages.notifyTitle)}</PoniterSectionTitle>
                    <PoniterSectionText>{intl(pagesMessages.notifyDes)}</PoniterSectionText>
                  </PoniterSection>
                </GridColumn>
              </GridRow>
            </Grid>
          </Grid>


          <Grid className="m-0">
            <GridRow>
              <GridColumn width={16}>
                <div className="content-card">
                  <p>{intl(pagesMessages.whenSignupTitle)}</p>
                  <p>{intl(pagesMessages.createFirstAlert)}</p>
                  <p>{intl(pagesMessages.recivedAlert)}</p>
                </div>
              </GridColumn>
            </GridRow>
          </Grid>

          <Grid className="m-0" textAlign="center">
            <GridRow>
              <GridColumn width={16}>
                <div className="full-width content-with-bg-img content-with-bg-img--light">
                  <picture>
                    <source srcSet={require('assets/images/airpot.webp')} type="image/webp" />
                    <img src={require('assets/images/airpot.jpg')} alt="airport✈️" className="content-with-bg-img__img lazyload" />
                  </picture>
                  <div className="content-with-bg-img__row">
                    <div className="content-with-bg-img__content">
                      <Title as="h2" className="content-with-bg-img__title">{intl(pagesMessages.catchUpTitle)}</Title>
                      <div className="content-with-bg-img__text">
                        <Para>{intl(pagesMessages.catchUpTextOne)}</Para>
                        <Para><b>{intl(pagesMessages.catchUpTextTwo)}</b></Para>
                        <Para><b>{intl(pagesMessages.catchUpTextFive)}</b></Para>
                      </div>
                    </div>
                  </div>
                </div>
              </GridColumn>
            </GridRow>
          </Grid>

          <Grid className="m-0" textAlign="center">
            <GridRow>
              <GridColumn width={16}>
                <div className="content-with-bg-img">
                  <picture>
                    <source srcSet={require('../../assets/images/sergio.webp')} type="image/webp" />
                    <img src={require('assets/images/sergio.jpg')} alt="sergio" className="content-with-bg-img__img lazyload" />
                  </picture>
                  <div className="content-with-bg-img__row">
                    <div className="content-with-bg-img__content">
                      <Title as="h2" className="content-with-bg-img__title" white>{intl(pagesMessages.whatShouldIDoTitle)}</Title>
                      <div className="content-with-bg-img__text">
                        <Para white><b>{intl(pagesMessages.whatShouldIDoTextTwo)}</b> {intl(pagesMessages.whatShouldIDoTextThree)}</Para>
                        <Para white>{intl(pagesMessages.whatShouldIDoTextFour)} <a className="text-medium-blue" href={AppRoutes.PRICING} target="_blank" rel="noopener noreferrer">{intl(pagesMessages.whatShouldIDoTextFourSilver)}</a> and <a className="text-medium-blue" href={AppRoutes.PRICING} target="_blank" rel="noopener noreferrer"> {intl(pagesMessages.whatShouldIDoTextFourGold)}</a> {intl(pagesMessages.whatShouldIDoTextFourMembers)}</Para>
                      </div>
                    </div>
                  </div>
                </div>
              </GridColumn>
            </GridRow>
          </Grid>

          <Grid className="m-0">
            <GridRow>
              <GridColumn width={16}>
                <div className="mini-banner-with-cta">
                  <Grid className="m-0">
                    <Grid.Row>
                      <Grid.Column mobile={9} tablet={8} computer={8} widescreen={8} verticalAlign="middle" className="mini-banner-with-cta__col-left">
                        <h5 className="mini-banner-with-cta__text">{intl(pagesMessages.tryRffYourSelf)}</h5>
                      </Grid.Column>
                      <Grid.Column mobile={7} tablet={8} computer={8} widescreen={8} textAlign="right" className="mini-banner-with-cta__col-right">
                        <Button className="btn btn--medium-blue" onClick={() => navigateToRespectivePage(AppRoutes.HOME, appendParams)}>{intl(pagesMessages.getStarted)}</Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </GridColumn>
            </GridRow>
          </Grid>
        </Container>
      </div>
    </>
  )
}

Vouchers.propTypes = {
  pageAnalytics: PropTypes.func,
  location: PropTypes.object
}
export default Vouchers
