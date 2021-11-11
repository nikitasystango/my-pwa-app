import {
  GET_TESTIMONIAL, GET_TESTIMONIAL_SUCCESS, GET_TESTIMONIAL_FAILED,
  GET_PAGE_CONTENT, GET_PAGE_CONTENT_SUCCESS, GET_PAGE_CONTENT_FAILED,
  UPDATE_USER_NAME, UPDATE_USER_NAME_SUCCESS, UPDATE_USER_NAME_FAILED
} from 'actions/Common/actionTypes'
const initialState = {
  testimonialLoader: false,
  testimonialsArray: [],
  pageContentLoading: false,
  pageContentDetails: null,
  updateUserNameLoading: false,
  airlineMembershipToggle: false
}

const getTestimonials = (state, action) => ({
  ...state,
  testimonialLoader: true
})

const getTestimonialsSuccess = (state, action) => ({
  ...state,
  testimonialsArray: action.payload,
  testimonialLoader: false
})

const getTestimonialsFailed = (state, action) => ({
  ...state,
  testimonialLoader: false
})


const getPageContent = (state, action) => ({
  ...state,
  pageContentLoading: true
})

const getPageContentSucces = (state, action) => ({
  ...state,
  pageContentDetails: action.payload,
  pageContentLoading: false
})

const getPageContentFailed = (state, action) => ({
  ...state,
  pageContentLoading: false
})

// To update user firstname & lastname on popup
const updateUserName = (state, action) => {
  return ({
    ...state,
    updateUserNameLoading: true
  })
}

const updateUserNameSuccess = (state, action) => ({
  ...state,
  updateUserNameLoading: false
})

const updateUserNameFailed = (state, action) => ({
  ...state,
  updateUserNameLoading: false
})

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TESTIMONIAL: return getTestimonials(state, action)
    case GET_TESTIMONIAL_SUCCESS: return getTestimonialsSuccess(state, action)
    case GET_TESTIMONIAL_FAILED: return getTestimonialsFailed(state, action)
    case GET_PAGE_CONTENT: return getPageContent(state, action)
    case GET_PAGE_CONTENT_SUCCESS: return getPageContentSucces(state, action)
    case GET_PAGE_CONTENT_FAILED: return getPageContentFailed(state, action)
    case UPDATE_USER_NAME: return updateUserName(state, action)
    case UPDATE_USER_NAME_SUCCESS: return updateUserNameSuccess(state, action)
    case UPDATE_USER_NAME_FAILED: return updateUserNameFailed(state, action)
    default: return state
  }
}

export default commonReducer
