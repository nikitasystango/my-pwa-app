import {
  GET_BLOG_DETAILS, GET_BLOG_DETAILS_SUCCESS, GET_BLOG_DETAILS_FAILURE
} from './actionTypes'

// get single blog details
export const getBlogDetails = (slug) => ({
  type: GET_BLOG_DETAILS,
  payload: slug
})

export const getBlogDetailsSuccess = (data) => ({
  type: GET_BLOG_DETAILS_SUCCESS,
  payload: data
})

export const getBlogDetailsFailure = () => ({
  type: GET_BLOG_DETAILS_FAILURE
})
