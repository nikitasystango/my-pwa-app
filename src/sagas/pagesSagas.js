import { GET_PRICING_PLANS, CANCEL_ELITE_MEMBERSHIP, ADD_EMAIL } from 'actions/Pages/actionTypes'
import { all, put, call, take, select } from 'redux-saga/effects'
import { getRequestRuby, deleteRequestRuby, postRequestRuby } from './request'
import {
  getPricingPlansSuccess, getPricingPlansFailure,
  cancelEliteMembershipSuccess, cancelEliteMembershipFailed,
  addEmailSuccess, addEmailFailed
} from 'actions/Pages'
import URls from 'constants/urls'
import { retrieveFromLocalStorage, navigateToRespectivePage } from 'utils/helpers'
import { pushNotification } from 'utils/notifications'
import { getProfileDetails } from 'actions/Dashboard'
import { updateReducerState } from 'actions/Common'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import toustifyMessages from 'constants/messages/toustifyMessages'
import { FreePlans } from 'constants/globalConstants'

const appendParams = sessionStorage.getItem('queryParamsGA')

// get pricing plans
function* getPricingPlans() {
  try {
    const response = yield call(getRequestRuby, URls.GET_PRICING_PLANS)
    if (response && response.status && response.status === 200 && response.data && response.data.data) {
      yield put(getPricingPlansSuccess(response.data.data))
    }
  } catch (error) {
    yield put(getPricingPlansFailure())
  }
}

function* watchGetPricingPlans() {
  while (true) {
    const action = yield take(GET_PRICING_PLANS)
    yield call(getPricingPlans, action)
  }
}

// cancel elite membership

function* cancelEliteMembership(action) {
  const { data } = action.payload
  const token = retrieveFromLocalStorage('token')
  const url = `${URls.CANCEL_ELITE_MEMBERSHIP}?user[access_token]=${token}`
  try {
    const response = yield call(deleteRequestRuby, url)
    const user = yield select(state => state.auth.user)
    const searchUrl = `?user_id=${user && user.id}${appendParams ? appendParams.replace('?', '&'): ''}`
    if (response && response.status && response.status === 204) {
      yield put(cancelEliteMembershipSuccess())
      yield put(getProfileDetails(user && user.id))
      yield put(updateReducerState('dashboard', 'toggleCaneleMembershipModal', false))
      if (data?.type === 'changePlan' && data?.path) {
        navigateToRespectivePage(data?.path, searchUrl)
      }
      if(data?.userPlanId) {
        (data?.userPlanId === FreePlans.SILVER_MONTHLY_PLAN || data?.userPlanId === FreePlans.SILVER_YEARLY_PLAN) ?
        navigateToRespectivePage(AppRoutes.CANCEL_SILVER_TRIAL, searchUrl)
        : navigateToRespectivePage(AppRoutes.CANCEL_GOLD_TRIAL, searchUrl)
      }
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 1000)
    } else {
      pushNotification(intl(toustifyMessages.someThingWrongChargebee), 'error', 'TOP_CENTER', 1000)
    }
     yield put(cancelEliteMembershipFailed())
  }
}

function* watchCancelEliteMembership() {
  while (true) {
    const action = yield take(CANCEL_ELITE_MEMBERSHIP)
    yield call(cancelEliteMembership, action)
  }
}

// add email for va
function* addEmailHandler(action) {
  const { data } = action.payload
  try {
    const response = yield call(postRequestRuby, URls.ADD_EMAIL_URL, data)
    if (response.status === 201) {
      yield put(addEmailSuccess())
    }
  } catch (error) {
    yield put(addEmailFailed())
    if (error?.response?.data?.error) {
      if (error.response.data.error === 'Email has already been taken') {
        pushNotification(intl(toustifyMessages.emailAddressAlreadyExist), 'error', 'TOP_CENTER', 3000)
      } else {
        pushNotification(error.response.data.error, 'error', 'TOP_CENTER', 3000)
      }
    } else {
      pushNotification(intl(toustifyMessages.addEmailFailed), 'error', 'TOP_CENTER', 3000)
    }
  }
}

function* watchAddEmail() {
  while (true) {
    const action = yield take(ADD_EMAIL)
    yield call(addEmailHandler, action)
  }
}

export default function* pricingSagas() {
  yield all([
    watchGetPricingPlans(),
    watchCancelEliteMembership(),
    watchAddEmail()
  ])
}
