import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

export const HeaderContent = styled.div`
    text-align: center;
    color: var(--white);
    padding: 70px 0 40px;

    @media (max-width: 1140px) {
        padding: 29.4px 0 21px;
    }
`

export const SectionTitle = styled.h1`
    font-display: swap;
    text-align: center;
    font-size: 40px;
    line-height: 1.2;
    margin: 0 0 5px;
    p {
      font-size: inherit
    }

    @media (max-width: 1140px) {
        font-size: 28px;
    }

    @media (max-width: 479px) {
        font-size: 18px;
    }
`

export const SectionSubTitle = styled.p`
  font-size: 16px;
  line-height: 1.1;
  font-display: swap;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

export const BgWrap = styled.div`
    padding: var(--header-height) 0 10px;
    position: relative;

    .RffFeatureTxt {
        margin: 90px 0 0;
        text-align: center;
        font-size: 16px;
        font-weight: normal;
        color: var(--white);
    }

    @media (max-width: 767px) {
      padding-left: 1rem;
      padding-right: 1rem;

      .RffFeatureTxt {
        margin: 50px 0 0;
        font-size: 14px;
      }
    }

`


export const BgWrapInner = styled.div`
  position: relative;
  z-index: 2;
`

export const SearchImageWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: var(--header-height);
  bottom: 0;

  picture {
    height: 100%;
  }

  img {
    object-fit: cover;
    object-position: bottom;
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    max-height: 420px;
    overflow: hidden;
  }
`

export const FeaturedLogos = styled.div`
  width:100%;
  text-align:center;
  padding: 1rem;
  background: linear-gradient(180deg, var(--white) 0%, rgba(var(--white-rgb), 0) 100%), #DBE2ED;

  .desktop-image,
  .mobile-image {
    display: block
  }
  .featured-mobile-img , .featured-mobile-img{
    height:100%;
  }
  @media (min-width: 768px) {
    .mobile-image {
      display: none
    }
  }
  @media (max-width: 767px) {
    .desktop-image {
      display: none;
    }
  }
`

export const HowItWorksButton = styled(Button)`
  font-weight: bold !important;
  font-size: 18px !important;
  line-height: 25px !important;
  text-transform: capitalize !important;
  max-width: 200px;
  width: 100% !important;
`

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
export const IntroBox = styled.div`
padding-bottom:50px;
padding-top:50px;
    @media(max-width:767px){
         padding-bottom: 25px;
        padding-top: 25px;
      }

  .ui.grid {
    .introbox-row{
    .ten.wide.column{
      @media(max-width:767px){
      width:95% !important;
      margin:0 auto;
    }
  }
  .six.wide.column{
      @media(max-width:767px){
      width:95% !important;
      margin:0 auto;
    }
  }
}
  }

.introbox-row{
  align-items:center !important;
    .IntroBox-image-wrap{
      position:relative;
      right:-30px;
  @media(max-width:767px){
      right: 0px !important;
      text-align:center;
    }
    img {
      width:100%;
    }
  }
}

.introbox-two{
  flex-direction:row-reverse !important;
  .IntroBox-content-wrap-two{
    right: -30px !important;
    padding: 20px 20px 20px 20px;
    @media(max-width:767px){
      right: 0px !important;
    }
    button{
      margin: 10px 0 !important;
    }
  }
  .IntroBox-image-wrap{
  position: relative;
  right: 30px;
  @media(max-width:767px){
      right: 0px !important;
      text-align:center;
    }
    img {
      width:100%;
      @media(max-width:767px){
        border-radius: 16px;
      }
    }
    .introbox-two-desk-img{
      @media(max-width:767px){
        display:none;
      }
    }
    .introbox-two-mobile-img{
      display:none;
      @media(max-width:767px){
        display:block;
      }
    }
  }
}
.IntroBox-image-wrap img{
      object-fit: cover;
    object-position: bottom;
    width: 100%;
    height: 100%;
}
.IntroBox-content-wrap{
    filter: drop-shadow(0px 4px 34px rgba(0, 0, 0, 0.06));
    padding:20px 20px 30px;
    border-radius:20px;
    border:1px solid #bfbfbf66;
    position: relative;
    right: 30px;
    background: white;
    @media(max-width:768px){
      right: 35px !important;
    }
    @media(max-width:767px){
      right: 0px !important;
      text-align:center;
    }
  .IntroBox-head{
      font-family: Open Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 28px;
      line-height: 160%;
      color: #132C52;
      @media(max-width:768px){
      font-size: 24px;
      }
  }
  .IntroBox-subhead{
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    color: #132C52;
    margin-top:0px;
  }
  p{
    margin-bottom:10px;
    line-height:26px;
    &.font-text-large{
      font-size:16px;
    }
  @media(max-width:1024px){
    font-size:14px;
    margin-bottom:15px;
    line-height:22px;
  }
  @media(max-width:768px){
    font-size: 14px;
    margin-bottom: 7px;
    line-height: 20px;
  }
  }
  .introbox-three{
  .IntroBox-content-wrap-two {
    padding: 30px 20px 35px 20px;
    position: relative;
    top: -2px;
  }
}
}`
// AppStore -->
