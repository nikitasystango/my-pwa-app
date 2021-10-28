import React, { useState, useEffect } from 'react'
import { Modal, Header, Grid, Button, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Close } from 'utils/svgs'
import intl from 'utils/intlMessage'
import pagesMessages from 'constants/messages/pagesMessages'
import { InputBox } from 'utils/formUtils'
import Loader from 'components/LoadingSpinner'
import Slider from 'react-slick'
import { pushNotification } from 'utils/notifications'
import validationMessages from 'constants/messages/validationMessages'
import moment from 'moment'
import { retrieveFromLocalStorage } from 'utils/helpers'
import './couponModalstyle.scss'
import ProgressiveImage from 'utils/progressiveImage'

const CouponToggleModal = (props) => {
  const {
    toggleCouponsModal,
    updateReducerState,
    getCouponsList,
    couponsListLoading,
    couponsList,
    redeemedCouponIds,
    selectedCouponId,
    getCouponsById,
    couponDataLoading,
    couponData,
    manualCouponValue
  } = props

  const [isManualInputVisible, setIsManualInputVisible] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const token = retrieveFromLocalStorage('token')

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    afterChange: function (currentSlide) {
      setActiveSlide(currentSlide)
    }
  }


  useEffect(() => {
    getCouponsList('active')
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
   if(manualCouponValue && couponData && couponData.id) {
    handleApplyCoupon(couponData)
   }
    // eslint-disable-next-line
  }, [couponData]);

  useEffect(() => {
    if(manualCouponValue) {
    setIsManualInputVisible(true)
    }
  }, [manualCouponValue])

  const handleApplyCoupon = (selectedCoupon) => {
    const today = moment().format('YYYY-MM-DD')
    const expireDate = moment.unix(selectedCoupon?.validity).format('YYYY-MM-DD')
    if(selectedCouponId && selectedCouponId.id) {
      pushNotification(intl(validationMessages.applyOneCouponAtATime), 'error', 'TOP_CENTER', 3000)
      return true
    }
    else if(token && redeemedCouponIds && redeemedCouponIds.length && redeemedCouponIds.includes(selectedCoupon.id)) {
      pushNotification(intl(validationMessages.couponAlreadyRedemmed), 'error', 'TOP_CENTER', 3000)
      return true
    }
    else if(selectedCoupon?.validity && today > expireDate) {
      pushNotification(intl(validationMessages.couponValidityExpire), 'error', 'TOP_CENTER', 3000)
      return true
    }
    else if(selectedCoupon?.redemptions >= selectedCoupon?.max_redemptions) {
      pushNotification(intl(validationMessages.couponValidityExpire), 'error', 'TOP_CENTER', 3000)
      return true
    }
    updateReducerState('pages', 'selectedCouponId', selectedCoupon)
    updateReducerState('pages', 'toggleCouponsModal', false)
    couponData && updateReducerState('pages', 'couponData', {})

    pushNotification(intl(validationMessages.couponAppliedSuccessfully), 'success', 'TOP_CENTER', 3000)
  }

  const submitCoupon = () => {
    if(selectedCouponId && selectedCouponId.id) {
      pushNotification(intl(validationMessages.applyOneCouponAtATime), 'error', 'TOP_CENTER', 3000)
      return true
    }
    getCouponsById(manualCouponValue)
  }

  return (
    <Modal
      open={toggleCouponsModal}
      onClose={() => {
        updateReducerState('pages', 'toggleCouponsModal', false)
        if(selectedCouponId && (selectedCouponId.id.toLowerCase() !== manualCouponValue.toLowerCase())) {
          updateReducerState('pages', 'manualCouponValue', '')
          setIsManualInputVisible(false)
        }
      }}
      closeIcon={
        <div>
          <Close className="cst-popup__close" />
        </div>
      }
      closeOnDimmerClick={false}
      className="cst-popup coupon-modal-wrap"
      closeOnEscape={false}
    >
      <Header content={intl(pagesMessages.yourCoupons)} />
      <Modal.Content className="p-0 ">
        {couponsListLoading ? (
          <Loader />
        ) : (
          couponsList && couponsList.length ?
            <>
              <div>
                <Slider className="coupon-slider-wrap" {...settings}>
                  {couponsList.map((slide, key) => (
                    <div key={key}>
                      <h3 className="coupon-value" >
                        {slide && slide.discount_percentage
                          ? `${slide.discount_percentage}%`
                          : `£${slide?.discount_amount}`}
                      </h3>
                      <ProgressiveImage
                                preview={require('./coupon-card-img.png')}
                                image={require('./coupon-card-img.png')}
                                render={(currentImage, loading) => (
                                  (
                                    <img
                                      style={{
                                        transition: '0.5s filter linear',
                                        filter: `${loading ? 'blur(50px)' : ''}`
                                      }}
                                      src={currentImage}
                                      alt="coupon-card"
                                      className="lazyload coupon-card"
                                      loading="lazy"
                                    />
                                  )
                                )}
                              />
                      <p className="coupon-text">
                        {intl(pagesMessages.getDiscountOnCoupon, slide && slide.discount_percentage
                          ? `${slide.discount_percentage}%`
                          : slide?.discount_amount ? `£${slide?.discount_amount}` : '')}{' '}
                      </p>
                      <p className="coupon-text mt-0">
                        {intl(pagesMessages.getDiscountOnCouponbottom)}
                      </p>
                    </div>
                  ))}
                </Slider>
              </div>
              <Button
                onClick={()=>handleApplyCoupon(couponsList[activeSlide])}
                className="btn apply-coupon-btn"
              >
                {intl(pagesMessages.appleCoupon)}
              </Button>
              {!isManualInputVisible && (
              <p className="add-another-cou-text"
                onClick={() => setIsManualInputVisible(!isManualInputVisible)}
              >
                {intl(pagesMessages.addAnotherCoupon)}{' '}
              </p>
            )}
              {isManualInputVisible && (
              <Form autoComplete="off" className="signin-signup-form another-coupon-form">
                <Grid>
                  <InputBox
                    placeholder={intl(pagesMessages.enterCoupon)}
                    type={'text'}
                    name={'manualCouponValue'}
                    onChange={(value) =>  updateReducerState('pages', 'manualCouponValue', value.trim())}
                    value={manualCouponValue.toUpperCase()}
                    maxLength={70}
                    className="required-field"
                  />

                  <Grid.Row className="p-0">
                    <Grid.Column className="pr-5px text-center">
                      <Button
                        disabled={couponDataLoading || !manualCouponValue}
                        onClick={submitCoupon}
                        className="btn apply-coupon-btn"
                        loading={couponDataLoading}
                      >
                        {intl(pagesMessages.appleCoupon)}
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            )}
            </>
          :
            <div className="failed-coupon-wrap">
              <img className="coupon-card" alt="coupon-card" src={require('./coupon-failed.png')}/>
              <h4 className="failed-coupon-text">Oops!! No Coupon Available</h4>
            </div>
        )}
      </Modal.Content>
    </Modal>
  )
}

CouponToggleModal.propTypes = {
  toggleCouponsModal: PropTypes.bool,
  updateReducerState: PropTypes.func,
  getCouponsList: PropTypes.func,
  couponsListLoading: PropTypes.bool,
  couponsList: PropTypes.array,
  redeemedCouponIds: PropTypes.array,
  selectedCouponId: PropTypes.object,
  getCouponsById: PropTypes.func
}

export default CouponToggleModal
