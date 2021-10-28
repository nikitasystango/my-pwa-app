import axios from 'axios'
import browserHistory from 'utils/history'
import { pushNotification } from 'utils/notifications'
import messages from 'constants/messages'
import env from 'utils/env_variables'
import { AppRoutes } from 'constants/appRoutes'

// --------------------Ruby Api-------------------------------------
export const axiosAuthRuby = axios.create({
  baseURL: env.REACT_APP_BASE_URL_RUBY,
  withCredentials: true,
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': env.AUTHORIZATION_KEY
  }
})

axiosAuthRuby.interceptors.response.use((response) => {
  if (response && response.data && response.data.error) {
    return Promise.reject(response)
  }
  return response
}, (error) => {
  if (error && error.response && error.response.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('userDetails')
    localStorage.removeItem('remember')
    localStorage.removeItem('recentSearch')
    localStorage.removeItem('signupFirstTime')
    pushNotification(messages.SESSION_EXPIRE, 'error')
    browserHistory.replace(AppRoutes.SIGN_IN)
  }
  return Promise.reject(error)
})

// -----------------------------NODE API---------------------------------

export const axiosAuthNode = axios.create({
  baseURL: env.BASE_URL_NODE,
  // withCredentials: true,
  // crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*'
  }
})

axiosAuthNode.interceptors.request.use(
  config => {
    const token = null
    if (token) {
      config.headers.Authorization = token
    }
    return config
  }
)

axiosAuthNode.interceptors.response.use((response) => {
  if (response && response.data && response.data.error) {
    return Promise.reject(response)
  }
  return response
}, (error) => {
  if (error && error.response && error.response.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('userDetails')
    localStorage.removeItem('remember')
    localStorage.removeItem('recentSearch')
    pushNotification(messages.SESSION_EXPIRE, 'error')
    browserHistory.replace(AppRoutes.SIGN_IN)
  }
  return Promise.reject(error)
})
