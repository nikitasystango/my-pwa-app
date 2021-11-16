import { GET_TESTIMONIAL, GET_PAGE_CONTENT, UPDATE_USER_NAME }
  from 'actions/Common/actionTypes'
import { all, put, call, take, takeLatest, select } from 'redux-saga/effects'
import { getCmsRequest, putRequestRuby } from './request'
import {
  getTestimonialSucces, getTestimonialFailed,
  getWordpressContentSuccess, getWordpressContentFailure,
  updateUserNameSuccess, updateUserNameFailed
} from 'actions/Common'
import URls from 'constants/urls'
import intl from 'utils/intlMessage'
import toustifyMessages from 'constants/messages/toustifyMessages'
import { pushNotification } from 'utils/notifications'
import { updateReducerState } from 'actions/Common'
import { getProfileDetails as getProfileDetailsUser } from 'actions/Dashboard'
// get Testimonial data
function* getTestimonials() {
  try {
    const response = yield call(getCmsRequest, URls.GET_TESTIMONIAL_URL)
    if (response?.status === 200 && response?.data) {
      yield put(getTestimonialSucces(response.data))
    }
  } catch (error) {
    yield put(getTestimonialFailed())
  }
}

function* watchGetTestimonials() {
  while (true) {
    const action = yield take(GET_TESTIMONIAL)
    yield call(getTestimonials, action)
  }
}

// footer content
function* getPageContentData() {
  try {
    const response = yield call(getCmsRequest, URls.COMMON_CONTENT_URL)
    if (response?.status === 200 && response?.data) {
      yield put(getWordpressContentSuccess(response.data))
    } else {
      yield put(getWordpressContentSuccess({}))
    }
  } catch (error) {
    yield put(getWordpressContentFailure())
  }
}

function* watchGetPageContent() {
  yield takeLatest(GET_PAGE_CONTENT, getPageContentData)
}

function* updateProfileDetailsPopup(action) {
  const { data } = action.payload.data
  const user = yield select(state => state.auth.user)
  const url = `/v1/users/${user && user.id}${URls.UPDATE_PROFILE_NAME}`
  try {
    const response = yield call(putRequestRuby, url, data)
    if (response && response.status && response.status === 204) {
      yield put(getProfileDetailsUser(user?.id))
      yield put(updateUserNameSuccess())
      document.body.style.position = "static"
      document.body.style.width = "100%"
      // To close update profile modal once user details stored successfully
      yield put(updateReducerState('pages', 'toggleUpdateProfileDetailsModal', false))
    }
  } catch (error) {
    if (error?.response?.data?.error) {
      pushNotification(error?.response?.data?.error, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(intl(toustifyMessages.updateUserFailed), 'error', 'TOP_CENTER', 3000)
    }
    yield put(updateUserNameFailed())
  }
}

function* watchUpdateUserName() {
  while (true) {
    const action = yield take(UPDATE_USER_NAME)
    yield call(updateProfileDetailsPopup, action)
  }
}

export default function* commonSagas() {
  yield all([
    watchGetTestimonials(),
    watchGetPageContent(),
    watchUpdateUserName()
  ])
}
