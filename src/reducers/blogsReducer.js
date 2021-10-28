import {
  GET_BLOGS, GET_BLOGS_FAILURE, GET_BLOGS_SUCCESS,
  GET_BLOGS_CATEGORIES, GET_BLOGS_CATEGORIES_SUCCESS, GET_BLOGS_CATEGORIES_FAILURE
} from 'actions/Blogs/actionTypes'
import textContent from 'constants/staticText'

const initialState = {
  blogsData: [],
  blogsLoading: false,
  allBlogsData: [],
  allBlogsLoading: false,
  totalCount: null,
  totalPages: null,
  blogsCategories: [],
  blogsCategoriesLoading: false
}

const getBlogs = (state) => ({
  ...state,
  blogsLoading: true,
  allBlogsLoading: true
})

const getBlogsSuccess = (state, action) => {
  const { data, type } = action.payload || ''
  const { entries, totalBlogs } = data || ''
  if (type === 'others') {
    return {
      ...state,
      blogsData: entries,
      blogsLoading: false,
      allBlogsLoading: false
    }
  }
  if (type === 'blogs' || type === 'tags') {
    const page = Math.ceil(totalBlogs / textContent.NINE)
    return {
      ...state,
      allBlogsData: entries,
      allBlogsLoading: false,
      blogsLoading: false,
      totalPages: page,
      totalCount: totalBlogs
    }
  }
  return {
    ...state
  }
}

const getBlogssFailed = (state, action) => ({
  ...state,
  blogsLoading: false,
  allBlogsLoading: false
})

// GET BLOG CATEGORIES
const getBlogsCategories = (state, action) => ({
  ...state,
  blogsCategoriesLoading: true
})

const getBlogsCategoriesSuccess = (state, action) => {
  const { data } = action.payload || ''
  return {
    ...state,
    blogsCategoriesLoading: false,
    blogsCategories: data || []
  }
}

const getBlogsCategoriesFailed = (state, action) => ({
  ...state,
  blogsCategoriesLoading: false
})

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS: return getBlogs(state, action)
    case GET_BLOGS_SUCCESS: return getBlogsSuccess(state, action)
    case GET_BLOGS_FAILURE: return getBlogssFailed(state, action)
    case GET_BLOGS_CATEGORIES: return getBlogsCategories(state, action)
    case GET_BLOGS_CATEGORIES_SUCCESS: return getBlogsCategoriesSuccess(state, action)
    case GET_BLOGS_CATEGORIES_FAILURE: return getBlogsCategoriesFailed(state, action)
    default: return state
  }
}

export default blogsReducer
