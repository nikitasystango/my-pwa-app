import styled from 'styled-components'

export const SectionWrapper = styled.div`
    /* padding: 60px 100px;

    @media (max-width: 991px) {
        padding: 50px 0 75px;
    }

    @media (max-width: 767px) {
        padding-top: 35px;
        padding-bottom: 50px;
    } */
`

export const SectionTitle = styled.h2`
    padding: 0px 0px 10px;
    font-size: 25px;
    color: var(--dark);
    text-align: center;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 991px) {
        font-size: 24px;
        padding: 24px 0;
    }

    @media (max-width: 479px) {
        font-size: 18px;
        padding: 18px 0 3px;
    }
`

// <!-- Testimonial Components
export const TestimonialBox = styled.div`
    /* margin: 20px 30px; */
    margin: 20px 30px;
    background: var(--white);
    border-radius: 8px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 10px;
      left: 10px;
      right: 0;
      bottom: 0;
      z-index: 1;
      display: block;
      box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08),
                  0px 4px 30px rgba(16, 87, 175, 0.04);
      border-radius: 8px;
    }

    &:before {
        content: '';
        display: block;
        position: absolute;
        left: 15px;
        top: -11px;
        height: 25.38px;
        width: 30px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 30px 25.38px;
        background-image: var(--quote-left);
        z-index: 3;
    }


    @media (max-width: 1140px) {
      margin: 15px 20px;

      &::after {
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08),
                  0px 4px 20px rgba(16, 87, 175, 0.04);
      }
    }

    @media (max-width: 575px) {

      &::after {
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08),
                  0px 2px 10px rgba(16, 87, 175, 0.04);
      }
    }

`
export const TestimonialBoxInner = styled.div`
    position: relative;
    z-index: 2;
    padding: 30px 20px 20px 35px;
    border-radius: 8px;
    background: var(--white);
`
export const TestimonialTop = styled.div`
  margin-bottom: 10px;
  position: relative;
  z-index: 3;
`
export const TestimonialBottom = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 3;
`
export const AuthorImage = styled.img`
    --size: 48px;
    height: var(--size);
    width: var(--size);
    object-fit: cover;
    border-radius: 50%;
    margin-right: 13px;
    display: block;
`
export const AuthorText = styled.div`
    color: var(--grey2);
    font-size: 12px;
    line-height: 22px;

    p {
        color: inherit;
        margin: 0 !important;
    }
`
export const AuthorName = styled.h5`
    color: var(--dark);
    font-size: 12px;
    line-height: 22px;
    font-weight: 700;
    margin: 0;
`
// Testimonial Components -->