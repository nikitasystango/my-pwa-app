import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import forgotPasswordReducer from './forgotPasswordReducer'
import flightAvailabilityReducer from './flightAvailabilityReducer'
import searchPanelReducer from './searchPanelReducer'
import dashboardReducer from '../reducers/dashboardReducer'
import layoutReducer from '../reducers/layouReducer'
import commonReducer from '../reducers/commonReducer'
import blogsReducer from '../reducers/blogsReducer'
import blogDetailsReducer from '../reducers/blogDetailsReducer'
import MapViewReducer from '../reducers/mapViewReducer'
import PagesReducer from '../reducers/pagesReducer'
import faqReducer from '../reducers/faqReducer'

const appReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  flights: flightAvailabilityReducer,
  searchPanel: searchPanelReducer,
  dashboard: dashboardReducer,
  layout: layoutReducer,
  common: commonReducer,
  blogs: blogsReducer,
  blogDetails: blogDetailsReducer,
  mapData: MapViewReducer,
  pages: PagesReducer,
  faq: faqReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_AUTH_STATE') {
    state = {
      ...state,
      auth: {
        ...state.auth,
        signedUrlAuth: null,
        user: {
          email: null,
          isEmailVerified: false,
          id: null,
          firstName: null,
          lastName: null,
          profileImage: null,
          preferredCurrency: null,
          country: null,
          plan: {},
          isUserBronzeMember: false,
          isUserSilverMember: false,
          isUserGoldMember: false,
          notificationSettings: null,
          cancelledSubscription: false,
          goldFreeTrial: false,
          socialUserPasswordSet: false,
          alternateEmails: [],
          isSocialUser: false,
          phoneNumber: null,
          isEmailNotificationEnable: false,
          createAlertsLimit: 0,
          activeAlertsCount: 0,
          downgradeMembership: false
        }
      }
    }
  }
  else if (action.type === 'UPDATE_REDUCER_STATE') {
    if (action.payload.reducerKey && action.payload.key) {
      const { reducerKey, key, value = null } = action.payload
      state = {
        ...state,
        [reducerKey]: {
          ...state[reducerKey],
          [key]: value
        }
      }
    }
  }
  return appReducer(state, action)
}

export default rootReducer
