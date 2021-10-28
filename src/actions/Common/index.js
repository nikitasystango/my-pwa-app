import {
  UPDATE_REDUCER_STATE,
  GET_TESTIMONIAL, GET_TESTIMONIAL_SUCCESS, GET_TESTIMONIAL_FAILED,
  GET_PAGE_CONTENT, GET_PAGE_CONTENT_SUCCESS, GET_PAGE_CONTENT_FAILED,
  UPDATE_USER_NAME, UPDATE_USER_NAME_SUCCESS, UPDATE_USER_NAME_FAILED
} from './actionTypes'
import { EventTypes } from 'redux-segment'

export const updateReducerState = (reducerKey, key, value) => ({
  type: UPDATE_REDUCER_STATE,
  payload: { reducerKey, key, value }
})

// Testimonial
export const getTestimonialDetails = () => ({
  type: GET_TESTIMONIAL
})

export const getTestimonialSucces = (data) => ({
  type: GET_TESTIMONIAL_SUCCESS,
  payload: data
})

export const getTestimonialFailed = () => ({
  type: GET_TESTIMONIAL_FAILED
})

// footer content
export const getWordpressContent = () => ({
  type: GET_PAGE_CONTENT
})

export const getWordpressContentSuccess = (data) => ({
  type: GET_PAGE_CONTENT_SUCCESS,
  payload: data
})

export const getWordpressContentFailure = () => ({
  type: GET_PAGE_CONTENT_FAILED
})

export const pageAnalytics = () => ({
  type: 'PAGE_ANALYTICS',
  meta: {
    analytics: EventTypes.page
  }
})

// Update Profile Details in popup
export const updateUserName = (data) => ({
  type: UPDATE_USER_NAME,
  payload: { data }
})

export const updateUserNameSuccess = () => ({
  type: UPDATE_USER_NAME_SUCCESS
})

export const updateUserNameFailed = () => ({
  type: UPDATE_USER_NAME_FAILED
})