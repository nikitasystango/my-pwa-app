import {
  GET_BLOG_DETAILS, GET_BLOG_DETAILS_SUCCESS, GET_BLOG_DETAILS_FAILURE
} from 'actions/BlogDetails/actionTypes'

const initialState = {
  blogDetail: [],
  blogDetailsLoading: false
}

const getBlogDetails = (state, action) => ({
  ...state,
  blogDetailsLoading: true
})

const getBlogDetailsSuccess = (state, action) => ({
    ...state,
    blogDetail: action?.payload?.entries || [],
    blogDetailsLoading: false
  })

const getBlogDetailsFailed = (state, action) => ({
  ...state,
  blogDetailsLoading: false
})

const blogDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOG_DETAILS: return getBlogDetails(state, action)
    case GET_BLOG_DETAILS_SUCCESS: return getBlogDetailsSuccess(state, action)
    case GET_BLOG_DETAILS_FAILURE: return getBlogDetailsFailed(state, action)
    default: return state
  }
}

export default blogDetailsReducer
