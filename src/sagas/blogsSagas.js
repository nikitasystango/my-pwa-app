import { GET_BLOGS, GET_BLOGS_CATEGORIES }
  from 'actions/Blogs/actionTypes'
import { put, call, all, takeLatest } from 'redux-saga/effects'
import {
  getBlogsSuccess, getBlogsFailure,
  getBlogsCategoriesSuccess, getBlogsCategoriesFailure
} from 'actions/Blogs'
import { getCmsRequest } from './request'
import URls from 'constants/urls'
import textContent from 'constants/staticText'
import { AppRoutes } from 'constants/appRoutes'
import { navigateToRespectivePage } from 'utils/helpers'

const appendParams = sessionStorage.getItem('queryParamsGA')

function* getBlogs(action) {

  const { type, category, blogCount, tagsSlug } = action.payload
  let url = `${URls.GET_BLOGS}?_limit=3&_sort=id:DESC`
  if (type === 'blogs') {
    url = `${URls.GET_BLOGS}?_limit=${textContent.NINE}&_sort=id:DESC`
    if (category && blogCount) {
      url = `${URls.GET_BLOGS}?_limit=${textContent.NINE}&_sort=id:DESC&categories=${category}&_start=${blogCount * textContent.NINE}`
    } else if (category) {
      url = `${URls.GET_BLOGS}?_limit=${textContent.NINE}&_sort=id:DESC&categories=${category}`
    } else if (blogCount) {
      url = `${URls.GET_BLOGS}?_limit=${textContent.NINE}&_sort=id:DESC&_start=${blogCount * textContent.NINE}`
    }
  } else if (type === 'tags') {
    url = `${URls.GET_BLOGS}?tags=${tagsSlug}&_limit=${textContent.NINE}&_sort=id:DESC`
    if (blogCount) {
      url = `${URls.GET_BLOGS}?tags=${tagsSlug}&_limit=${textContent.NINE}&_sort=id:DESC&_start=${blogCount * textContent.NINE}`
    }
  }

  try {
    const response = yield call(getCmsRequest, url)
    if (response?.status === 200 && response?.data) {
      if(type === 'tags' && !response?.data?.entries?.length) {
        navigateToRespectivePage(AppRoutes.NEWS_AND_ADVICE, appendParams)
      }
      yield put(getBlogsSuccess(response.data, type))
    }
  } catch (error) {
    yield put(getBlogsFailure())
  }
}

function* watchGetBlogs() {
  yield takeLatest(GET_BLOGS, getBlogs)
}

// get categories of blog
function* getBlogsCategories() {

  try {
    const response = yield call(getCmsRequest, URls.GET_BLOGS_CATEGORIES)
    if (response?.status === 200 && response?.data) {
      yield put(getBlogsCategoriesSuccess(response.data))
    }
  } catch (error) {
    yield put(getBlogsCategoriesFailure())
  }
}

function* watchGetBlogsCategories() {
  yield takeLatest(GET_BLOGS_CATEGORIES, getBlogsCategories)
}

export default function* blogsSagas() {
  yield all([
    watchGetBlogs(),
    watchGetBlogsCategories()
  ])
}
