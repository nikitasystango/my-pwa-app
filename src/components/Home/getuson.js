import React from 'react'
import { Grid } from 'semantic-ui-react'
// import LeftArrow from '../../assets/images/get-us-on-left-arrow.svg'
// import RightArrow from '../../assets/images/get-us-on-right-arrow.svg'
import './assets/scss/getUsOn.scss'

import { AppStore, AppStoreText } from './style'
import { Apple, GooglePlay, GetUsOnLeftArrow, GetUsOnRightArrow } from '../../utils/svgs'
import intl from 'utils/intlMessage'
import homeMessages from 'constants/messages/homeMessages'
import WebPMobileImage from '../../assets/images/mobile-img.webp'
import MobileImage from '../../assets/images/mobile-img.png'

export const GetUsOn = () => (
  <div className="get-us-on">
    {/* <img src={LeftArrow} alt="⇦" className="get-us-on__left-arrow lazyload" /> */}
    <GetUsOnLeftArrow className="get-us-on__left-arrow lazyload" />
    <div className="get-us-on__inner">
      <Grid className="m-0">
        <Grid.Row>
          <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
            <div className="get-us-on__left">
              <div className="get-us-on__content">
                <h2 className="get-us-on__title">{intl(homeMessages.getUsOn)}</h2>
                <AppStore>
                  <Apple />
                  <AppStoreText>{intl(homeMessages.downloadOnThe)}<br /><b>App Store</b></AppStoreText>
                </AppStore>
                <AppStore className="mt-1">
                  <GooglePlay />
                  <AppStoreText>{intl(homeMessages.downloadOn)}<br /><b>Google Play</b></AppStoreText>
                </AppStore>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8} widescreen={8}>
            <div className="get-us-on__right">
              {/* <img src={RightArrow} alt="⇨" className="get-us-on__right-arrow lazyload" /> */}
              <GetUsOnRightArrow className="get-us-on__right-arrow lazyload" />
              <picture>
                <source className="lazyload" data-srcSet={WebPMobileImage} type="image/webp" />
                <img data-src={MobileImage} alt="📱" className="get-us-on__img lazyload" />
              </picture>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  </div>
)

export default GetUsOn

