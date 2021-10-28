import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import ReactHtmlParser from 'react-html-parser'
import { getTestimonialDetails } from 'actions/Common'
import { checkImageFormateIsWebp } from 'utils/helpers'
import { SectionWrapper, TestimonialBox, TestimonialBoxInner, TestimonialTop, TestimonialBottom, AuthorImage, AuthorText, AuthorName } from './style'
// import { TestimonialPlaceholder } from 'common/Placeholder'

const Testimonial = (props) => {
  const { getTestimonialDetails, testimonialsArray } = props

  useEffect(() => {
    if (testimonialsArray.length === 0) {
      getTestimonialDetails()
    }
    // eslint-disable-next-line
  }, [])

  const CustomTestimonial = ({ value, key }) => {
    const { title, image, content } = value || ''
    const webpImage = checkImageFormateIsWebp(image)
    return (
      <TestimonialBox>
        {/* <TestimonialLeft>
          <AuthorImage src={image} alt={`testimonial-${key}`} />
        </TestimonialLeft>
        <TestimonialRight>
          <AuthorText>{ReactHtmlParser(content)}</AuthorText>
          <AuthorName>{title}</AuthorName>
        </TestimonialRight> */}
        <TestimonialBoxInner>
          <TestimonialTop>
            <AuthorText>{ReactHtmlParser(content)}</AuthorText>
          </TestimonialTop>
          <TestimonialBottom>
            <picture>
              {webpImage && <source data-srcSet={webpImage} type="image/webp" className="lazyload" />}
              {image && <AuthorImage data-src={image} alt={`testimonial-${key}`} className="lazyload" />}
            </picture>
            <AuthorName>{title}</AuthorName>
          </TestimonialBottom>
        </TestimonialBoxInner>
      </TestimonialBox>
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 250,
    autoplaySpeed: 2000000,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  }

  return (
    <React.Fragment>
      <SectionWrapper>
        <div className="testimonial-slider-row">
          {
            // testimonialLoader ?
            // <TestimonialPlaceholder value={2} /> :
            // (
            testimonialsArray && (
              <Slider {...settings}>
                {testimonialsArray.map((value, index) => {
                  return (
                    <CustomTestimonial value={value} key={index} />
                  )
                })}
              </Slider>
            )
            // )
          }
        </div>
      </SectionWrapper>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  testimonialsArray: state.common.testimonialsArray
})

const mapDispatchToProps = dispatch => ({
  getTestimonialDetails: () => dispatch(getTestimonialDetails())
})

Testimonial.propTypes = {
  testimonialsArray: PropTypes.array,
  getTestimonialDetails: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Testimonial)
