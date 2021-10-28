import styled from 'styled-components'
import footerBgWebp from '../../assets/images/footer-bg.webp'
import footerBg from '../../assets/images/footer-bg.png'

// <!-- Footer Components
export const FooterWrap = styled.div `
    --inner-container-width: 1110px;

    background-color: var(--footer-bg);
    padding: 0 20px;
    position: relative;

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }

    &::before {
      z-index: 1;
      background-image: url(${footerBgWebp});
      @supports (-ms-ime-align: auto) {
        background-image: url(${footerBg});
        }
        @supports (-ms-accelerator: true) {
        background-image: url(${footerBg});
        }
        @media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none) {
        background-image: url(${footerBg});
        }
        @supports (display:-ms-grid) {
        background-image: url(${footerBg});
        }
        @media not all and (min-resolution:.001dpcm) {
        background-image: url(${footerBg});
        }
      background-size: auto;
      background-repeat: no-repeat;
      background-position: top center;
      mix-blend-mode: overlay;
    }

    &::after {
      z-index: 2;
      background-color: rgba(5, 0, 38, 0.4);
      mix-blend-mode: multiply;
    }

    @media (max-width: 479px) {
        padding: 0;
    }

`
export const FooterInner = styled.div`
  margin: 0 auto;
  position: relative;
  z-index: 3;
`

export const FooterTop = styled.div `
    padding: 45px 4px 25px;
    width: 100%;
    max-width: var(--inner-container-width);
    margin: 0 auto;

    @media (max-width: 480px) {
      padding: 35px 4px 25px;
    }
`
export const FooterDivider = styled.hr `
    height: 1px;
    width: 100%;
    background: rgba(255, 255, 255, 0.08);
    margin: 0;
    border: 0;
`
export const FooterBottom = styled.div `
    padding: 4px;
    width: 100%;
    max-width: var(--inner-container-width);
    margin: 0 auto;

    .ui.grid > .row > [class*="right aligned"] {
        @media (max-width: 991px) {
            text-align: center !important;
        }
    }
`

export const CopyrightText = styled.p `
    color: var(--white);
    font-size: 12px;

    @media (max-width: 767px) {
      text-align: center;
      margin-bottom: 15px !important;
    }
`
// Footer Components -->

// <!-- Social Icons
export const SocialIconsList = styled.div `
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px) {
      justify-content: flex-end;
    }
`
export const SocialIcon = styled.i `
    --size: 40px;
    --opacity: 0.15;

    border-radius: 4px;
    width: var(--size) !important;
    height: var(--size) !important;
    line-height: var(--size) !important;
    text-align: center !important;
    margin: 0 !important;
    color: var(--white);
    transition: all 0.2s ease-in;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    justify-content: center;

    &:not(:last-child) {
        margin-right: 15px !important;
    }
    &:hover {
        cursor: pointer;

        svg {
          path {
            transition: all 0.2s ease-in;
            fill: var(--medium-blue);
          }
        }
    }
`
// Social Icons -->

// <!-- AppStore
export const AppStore = styled.button`
    padding: 10px 20px;
    border: 1px solid #fff;
    border-radius: 8px;
    background: transparent;
    display: flex;
    align-items: center;
    transition: all 0.2s ease-in;
    min-height: 55px;
    min-width: 210px;

    svg {
      width: 25px;
      height: auto;
      path {
        transition: all 0.2s ease-in;
      }
    }
    b {
      font-weight: 600;
    }

    &:hover {
      cursor: pointer;
      border-color: var(--medium-blue);
      svg {
        path {
          fill: var(--medium-blue);
        }
      }
      span {
        color: var(--medium-blue);

        b {
          color: var(--medium-blue);
        }
      }
    }
`
export const AppStoreText = styled.span`
    color: #BDBDBD;
    font-size: 12px;
    line-height: 16px;
    text-align: left;
    margin-left: 17.5px;
    transition: inherit;

    b {
      font-size: 18px;
      line-height: 25px;
      color: var(--white);
      transition: all 0.2s ease-in;
    }
`
// AppStore -->
