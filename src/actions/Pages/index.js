import {
  GET_PRICING_PLANS, GET_PRICING_PLANS_SUCCESS, GET_PRICING_PLANS_FAILURE,
  CANCEL_ELITE_MEMBERSHIP, CANCEL_ELITE_MEMBERSHIP_SUCCESS, CANCEL_ELITE_MEMBERSHIP_FAILURE,
  ADD_EMAIL, ADD_EMAIL_SUCCESS, ADD_EMAIL_FAILED
} from './actionTypes'

// get pricing plans
export const getPricingPlans = () => ({
  type: GET_PRICING_PLANS
})

export const getPricingPlansSuccess = (data) => ({
  type: GET_PRICING_PLANS_SUCCESS,
  payload: { data }
})

export const getPricingPlansFailure = () => ({
  type: GET_PRICING_PLANS_FAILURE
})

// cancel elite membership
export const cancelEliteMembership = (data) => ({
  type: CANCEL_ELITE_MEMBERSHIP,
  payload: { data }
})

export const cancelEliteMembershipSuccess = () => ({
  type: CANCEL_ELITE_MEMBERSHIP_SUCCESS
})

export const cancelEliteMembershipFailed = () => ({
  type: CANCEL_ELITE_MEMBERSHIP_FAILURE
})

// add email for va
export const addEmail = (data) => ({
  type: ADD_EMAIL,
  payload: { data }
})

export const addEmailSuccess = () => ({
  type: ADD_EMAIL_SUCCESS
})

export const addEmailFailed = () => ({
  type: ADD_EMAIL_FAILED
})
