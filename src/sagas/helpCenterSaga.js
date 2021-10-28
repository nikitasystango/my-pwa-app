import { GET_FAQ, GET_FAQ_CATEGORIES }
  from 'actions/Faq/actionTypes'
import { put, call, all, takeLatest } from 'redux-saga/effects'
import {
  getFAQSuccess, getFAQFailure,
  getFAQCategoriesSuccess, getFAQCategoriesFailure
} from 'actions/Faq'
import { getCmsRequest } from './request'
import URls from 'constants/urls'

function* getFaqs(action) {

  const { category } = action.payload
  let url = `${URls.GET_FAQ}?_limit=9&_sort=orderNumber&category=${category}`

  try {
    const response = yield call(getCmsRequest, url)
    if (response?.status === 200 && response?.data) {
    //   if(type === 'tags' && !response?.data?.entries?.length) {
    //     history.push('/news-and-advice')
    //   }
      yield put(getFAQSuccess(response.data))
    }
  } catch (error) {
    yield put(getFAQFailure())
  }
}

function* watchGetFaqs() {
  yield takeLatest(GET_FAQ, getFaqs)
}

// get categories of FAQ
function* getFAQCategories() {

  try {
    const response = yield call(getCmsRequest, URls.GET_FAQ_CATEGORIES)
    if (response?.status === 200 && response?.data) {
      yield put(getFAQCategoriesSuccess(response.data))
    }
  } catch (error) {
    yield put(getFAQCategoriesFailure())
  }
}

function* watchGetFAQCategories() {
  yield takeLatest(GET_FAQ_CATEGORIES, getFAQCategories)
}

export default function* faqSagas() {
  yield all([
    watchGetFaqs(),
    watchGetFAQCategories()
  ])
}
