import {
    GET_FAQ, GET_FAQ_FAILURE, GET_FAQ_SUCCESS,
    GET_FAQ_CATEGORIES, GET_FAQ_CATEGORIES_SUCCESS, GET_FAQ_CATEGORIES_FAILURE
  } from './actionTypes'

// get FAQ
export const getFAQ = (data) => ({
    type: GET_FAQ,
    payload: data
  })

  export const getFAQSuccess = (data, type) => ({
    type: GET_FAQ_SUCCESS,
    payload: { data, type }
  })

  export const getFAQFailure = () => ({
    type: GET_FAQ_FAILURE
  })

// get FAQ CATEGORIE
export const getFAQCategories = () => ({
    type: GET_FAQ_CATEGORIES
  })

  export const getFAQCategoriesSuccess = (data) => ({
    type: GET_FAQ_CATEGORIES_SUCCESS,
    payload: { data }
  })

  export const getFAQCategoriesFailure = () => ({
    type: GET_FAQ_CATEGORIES_FAILURE
  })
