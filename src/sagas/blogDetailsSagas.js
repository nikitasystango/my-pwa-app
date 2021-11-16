import { put, call, all, takeLatest } from 'redux-saga/effects'
import { GET_BLOG_DETAILS }
  from 'actions/BlogDetails/actionTypes'
import {
  getBlogDetailsSuccess, getBlogDetailsFailure
} from 'actions/BlogDetails'
import { getCmsRequest } from './request'
import URls from 'constants/urls'
import { AppRoutes } from 'constants/appRoutes'
import { navigateToRespectivePage } from 'utils/helpers'

const appendParams = sessionStorage.getItem('queryParamsGA')

function* getBlogDetails(action) {
  const url = `${URls.GET_SINGLE_BLOG}?slug=${action.payload}`
  try {
    const response = yield call(getCmsRequest, url)
    if (response?.status === 200 && response?.data?.entries?.length) {
      yield put(getBlogDetailsSuccess(response?.data))
    }else{
      navigateToRespectivePage(AppRoutes.NEWS_AND_ADVICE, appendParams)
    }
  } catch (error) {
    yield put(getBlogDetailsFailure())
  }
}

function* watchGetBlogDetails() {
  yield takeLatest(GET_BLOG_DETAILS, getBlogDetails)
}


export default function* blogDetailsSagas() {
  yield all([
    watchGetBlogDetails()
  ])
}
