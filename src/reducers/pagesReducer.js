import {
  GET_PRICING_PLANS, GET_PRICING_PLANS_SUCCESS, GET_PRICING_PLANS_FAILURE,
  CANCEL_ELITE_MEMBERSHIP, CANCEL_ELITE_MEMBERSHIP_SUCCESS, CANCEL_ELITE_MEMBERSHIP_FAILURE,
  ADD_EMAIL, ADD_EMAIL_SUCCESS, ADD_EMAIL_FAILED
} from 'actions/Pages/actionTypes'

const initialState = {
  getPricingLoading: false,
  pricingPlans: [],
  cancelEliteLoading: false,
  addEmailLoading: false,
  toggleThankyouVaModal: false,
  vaEmail: '',
  toggleSignupOnBoardingModal: false,
  toggleUpdateProfileDetailsModal: false,
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
    default: return state
  }
}

export default pagesReducer
