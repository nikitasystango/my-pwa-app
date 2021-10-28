import {
  GET_BLOGS, GET_BLOGS_FAILURE, GET_BLOGS_SUCCESS,
  GET_BLOGS_CATEGORIES, GET_BLOGS_CATEGORIES_SUCCESS, GET_BLOGS_CATEGORIES_FAILURE
} from './actionTypes'


// get blogs
export const getBlogs = (data) => ({
  type: GET_BLOGS,
  payload: data
})

export const getBlogsSuccess = (data, type) => ({
  type: GET_BLOGS_SUCCESS,
  payload: { data, type }
})

export const getBlogsFailure = () => ({
  type: GET_BLOGS_FAILURE
})

// get blogs CATEGORIE
export const getBlogsCategories = () => ({
  type: GET_BLOGS_CATEGORIES
})

export const getBlogsCategoriesSuccess = (data) => ({
  type: GET_BLOGS_CATEGORIES_SUCCESS,
  payload: { data }
})

export const getBlogsCategoriesFailure = () => ({
  type: GET_BLOGS_CATEGORIES_FAILURE
})
