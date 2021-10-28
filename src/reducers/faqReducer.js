import {
    GET_FAQ, GET_FAQ_FAILURE, GET_FAQ_SUCCESS,
    GET_FAQ_CATEGORIES, GET_FAQ_CATEGORIES_SUCCESS, GET_FAQ_CATEGORIES_FAILURE
  } from 'actions/Faq/actionTypes'

  const initialState = {
    faqData: [],
    faqLoading: false,
    faqCategories: [],
    faqCategoriesLoading: false
  }

  const getFaqs = (state) => ({
    ...state,
    faqLoading: true,
  })

  const getFaqSuccess = (state, action) => {
    const { data } = action.payload || ''
      return {
        ...state,
        faqData: data,
        faqLoading: false,
      }
    }

  const getFaqFailed = (state, action) => ({
    ...state,
    faqLoading: false,
  })

  // GET BLOG CATEGORIES
  const getFaqCategories = (state, action) => ({
    ...state,
    faqCategoriesLoading: true
  })

  const getFaqCategoriesSuccess = (state, action) => {
    const { data } = action.payload || ''
    return {
      ...state,
      faqCategoriesLoading: false,
      faqCategories: data || []
    }
  }

  const getFaqCategoriesFailed = (state, action) => ({
    ...state,
    faqCategoriesLoading: false
  })

  const faqReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_FAQ: return getFaqs(state, action)
      case GET_FAQ_SUCCESS: return getFaqSuccess(state, action)
      case GET_FAQ_FAILURE: return getFaqFailed(state, action)
      case GET_FAQ_CATEGORIES: return getFaqCategories(state, action)
      case GET_FAQ_CATEGORIES_SUCCESS: return getFaqCategoriesSuccess(state, action)
      case GET_FAQ_CATEGORIES_FAILURE: return getFaqCategoriesFailed(state, action)
      default: return state
    }
  }

  export default faqReducer
