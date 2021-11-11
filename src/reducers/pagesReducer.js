import {
  GET_PRICING_PLANS, GET_PRICING_PLANS_SUCCESS, GET_PRICING_PLANS_FAILURE,
  CANCEL_ELITE_MEMBERSHIP, CANCEL_ELITE_MEMBERSHIP_SUCCESS, CANCEL_ELITE_MEMBERSHIP_FAILURE,
  ADD_EMAIL, ADD_EMAIL_SUCCESS, ADD_EMAIL_FAILED, GET_COUPONS_LIST, GET_COUPONS_LIST_SUCCESS, GET_COUPONS_LIST_FAILURE, GET_COUPONS_BY_ID, GET_COUPONS_BY_ID_SUCCESS, GET_COUPONS_BY_ID_FAILURE
} from 'actions/Pages/actionTypes'
import Texts from 'constants/staticText'
import { existsArray } from 'utils/commonFunction'

const initialState = {
  getPricingLoading: false,
  pricingPlans: [],
  cancelEliteLoading: false,
  addEmailLoading: false,
  toggleThankyouVaModal: false,
  vaEmail: '',
  toggleSignupOnBoardingModal: false,
  toggleCouponsModal: false,
  couponsList: [],
  couponsListLoading: false,
  selectedCouponId: null,
  couponData: {},
  couponDataLoading: false,
  manualCouponValue: ''
}

const getPricingPlans = (state) => ({
  ...state,
  getPricingLoading: true
})

const getPricingPlansSucces = (state, action) => {
  const { data } = action.payload
  return ({
    ...state,
    pricingPlans: data,
    getPricingLoading: false
  })
}

const getPricingPlansFailed = (state) => ({
  ...state,
  getPricingLoading: false
})

// cancel elite membership
const cancelEliteMembership = (state) => ({
  ...state,
  cancelEliteLoading: true
})

const cancelEliteMembershipSuccess = (state) => ({
  ...state,
  cancelEliteLoading: false
})

const cancelEliteMembershipFailure = (state) => ({
  ...state,
  cancelEliteLoading: false
})

// add email for va
const addEmail = (state) => ({
  ...state,
  addEmailLoading: true
})

const addEmailSuccess = (state) => ({
  ...state,
  vaEmail: '',
  addEmailLoading: false,
  toggleThankyouVaModal: true
})

const addEmailFailure = (state) => ({
  ...state,
  addEmailLoading: false
})

//  Get Coupons List
const getCouponsList = (state) => ({
  ...state,
  couponsListLoading: true
})

const getCouponsListSuccess = (state, action) => {
  const { coupons, user } = action.payload.data
  const currentPlanId = (user && user.plan && user.plan.chargebee_plan_id) || ''
  // Remove array object which consists 'referral' in it's id
  const newArr = []
  coupons.map((list) => {
    const arr = list.id.split('_')
    // Filter only supported plans
     const cond = list && list.supported_plans ? list.supported_plans.includes(currentPlanId) : true
    if(cond && !existsArray(Texts.COUPON_SPLITTED_TEXT, arr)) {
    newArr.push(list)
    }
    return newArr
  })
  return ({
    ...state,
    couponsList: newArr,
    couponsListLoading: false
  })
}

const getCouponsListFailed = (state) => ({
  ...state,
  couponsListLoading: false
})


//  Get Coupons By Id
const getCouponsId = (state) => ({
  ...state,
  couponDataLoading: true
})

const getCouponsIdSuccess = (state, action) => {
  const { data } = action.payload
  return ({
    ...state,
    couponData: data,
    couponDataLoading: false
  })
}

const getCouponsIdFailed = (state) => ({
  ...state,
  couponDataLoading: false
})


const pagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRICING_PLANS: return getPricingPlans(state, action)
    case GET_PRICING_PLANS_SUCCESS: return getPricingPlansSucces(state, action)
    case GET_PRICING_PLANS_FAILURE: return getPricingPlansFailed(state, action)
    case CANCEL_ELITE_MEMBERSHIP: return cancelEliteMembership(state, action)
    case CANCEL_ELITE_MEMBERSHIP_SUCCESS: return cancelEliteMembershipSuccess(state, action)
    case CANCEL_ELITE_MEMBERSHIP_FAILURE: return cancelEliteMembershipFailure(state, action)
    case ADD_EMAIL: return addEmail(state, action)
    case ADD_EMAIL_SUCCESS: return addEmailSuccess(state, action)
    case ADD_EMAIL_FAILED: return addEmailFailure(state, action)
    case GET_COUPONS_LIST: return getCouponsList(state, action)
    case GET_COUPONS_LIST_SUCCESS: return getCouponsListSuccess(state, action)
    case GET_COUPONS_LIST_FAILURE: return getCouponsListFailed(state, action)
    case GET_COUPONS_BY_ID: return getCouponsId(state, action)
    case GET_COUPONS_BY_ID_SUCCESS: return getCouponsIdSuccess(state, action)
    case GET_COUPONS_BY_ID_FAILURE: return getCouponsIdFailed(state, action)
    default: return state
  }
}

export default pagesReducer
