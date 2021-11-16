import React, { useEffect } from 'react'
import { List, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import { FooterWrap, FooterInner, FooterTop, FooterDivider, FooterBottom, CopyrightText, SocialIconsList, SocialIcon } from './style'
import { connect } from 'react-redux'
import { getWordpressContent } from 'actions/Common'
import PropTypes from 'prop-types'
import { Facebook, Twitter, Linkedin, Instagram } from '../../utils/svgs'
import { openUrlOnNewTab, navigateToRespectivePage } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import layoutMessages from 'constants/messages/layoutMessages'
import moment from 'moment'
import 'semantic-ui-css/components/list.min.css'
import './footer.scss'

const Footer = (props) => {
  const { pageContentLoading, getWordpressContent, pageContentDetails } = props
  const appendParams = sessionStorage.getItem('queryParamsGA')
  useEffect(() => {
    if (pageContentDetails === null && !pageContentLoading) {
      getWordpressContent()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <FooterWrap className="footer">
      <FooterInner>
        <FooterTop>
          <Grid className="m-0">
            <GridRow className="py-0">
              <GridColumn mobile={16} tablet={9} computer={8} widescreen={8} className="footer-col footer-col--links">
                <List horizontal className="footer-col__list">
                  <List.Item className="footer-col__list-item" onClick={() => navigateToRespectivePage(AppRoutes.CAMPANION_VOUCHER, appendParams)}>{intl(layoutMessages.companionVoucherGuide)}</List.Item>
                  <List.Item className="footer-col__list-item" onClick={() => navigateToRespectivePage(AppRoutes.NEWS_AND_ADVICE, appendParams)}>{intl(commonMessages.blog)}</List.Item>
                  <List.Item className="footer-col__list-item" onClick={() => navigateToRespectivePage(AppRoutes.PRICING, appendParams)}>{intl(layoutMessages.pricingTitle)}</List.Item>
                  <List.Item className="footer-col__list-item" onClick={() => navigateToRespectivePage(AppRoutes.FAQ, appendParams ? `${appendParams}&category=1`: '')}>{intl(layoutMessages.faqTitle)}</List.Item>
                </List>
                <List horizontal className="footer-col__list">
                  <List.Item className="footer-col__list-item" onClick={() => navigateToRespectivePage(AppRoutes.PRIVACY_POLICY, appendParams)}>{intl(layoutMessages.privacyPolicyTitle)}</List.Item>
                  <List.Item className="footer-col__list-item" onClick={() => navigateToRespectivePage(AppRoutes.DISCLAIMER, appendParams)}>{intl(layoutMessages.disclaimerTitle)}</List.Item>
                  <List.Item className="footer-col__list-item" onClick={() => navigateToRespectivePage(AppRoutes.TERMS_OF_USE, appendParams)}>{intl(layoutMessages.termsOfUseTitle)}</List.Item>
                  <List.Item className="footer-col__list-item" onClick={() => navigateToRespectivePage(AppRoutes.COOKIE_POLICY, appendParams)}>{intl(layoutMessages.cookiePolicyTitle)}</List.Item>
                </List>
              </GridColumn>
              {/* <GridColumn mobile={16} tablet={7} computer={4} widescreen={4} className="footer-col footer-col--trustpilot">
                <TrustBox />
              </GridColumn> */}
                {/* <GridColumn mobile={16} tablet={16} computer={4} widescreen={4} className="footer-col footer-col--app-store-btns">
                <AppStore>
                  <GooglePlay />
                  <AppStoreText><b>Google Play</b></AppStoreText>
                </AppStore>
                <AppStore className="mt-1">
                  <Apple />
                  <AppStoreText><b>App Store</b></AppStoreText>
                </AppStore>
              </GridColumn> */}
              </GridRow>
            </Grid>
          </FooterTop>
          <FooterDivider />
          <FooterBottom>
            <Grid className="m-0">
              <GridRow verticalAlign="middle">
                <GridColumn mobile={16} tablet={8} computer={8} widescreen={8}>
                  <CopyrightText>&copy;{moment().format('YYYY')} {intl(layoutMessages.copyWriteText)}</CopyrightText>
                </GridColumn>
                <GridColumn mobile={16} tablet={8} computer={8} widescreen={8}>
                  <SocialIconsList>
                    <SocialIcon onClick={() => openUrlOnNewTab('https://www.facebook.com/rewardflightfinder/')}>
                      <Facebook />
                    </SocialIcon>
                    <SocialIcon onClick={() => openUrlOnNewTab('https://twitter.com/rewardflightfdr')}>
                      <Twitter />
                    </SocialIcon>
                    <SocialIcon onClick={() => openUrlOnNewTab('https://www.linkedin.com/company/reward-flight-finder/')}>
                      <Linkedin />
                    </SocialIcon>
                    <SocialIcon onClick={() => openUrlOnNewTab('https://www.instagram.com/rewardflightfinder/')}>
                      <Instagram />
                    </SocialIcon>
                  </SocialIconsList>
                </GridColumn>
              </GridRow>
            </Grid>
          </FooterBottom>
        </FooterInner>
      </FooterWrap>
  )
}

const mapStateToProps = state => ({
  pageContentDetails: state.common.pageContentDetails,
  pageContentLoading: state.common.pageContentLoading
})

const mapDispatchToProps = dispatch => ({
  getWordpressContent: () => dispatch(getWordpressContent())
})


Footer.propTypes = {
  pageContentDetails: PropTypes.object,
  getWordpressContent: PropTypes.func,
  pageContentLoading: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
