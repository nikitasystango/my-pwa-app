import axios from 'axios'
import browserHistory from 'utils/history'
import { pushNotification } from 'utils/notifications'
import messages from 'constants/messages'
import env from 'utils/env_variables'
import { AppRoutes } from 'constants/appRoutes'
const axiosAuth = axios.create({
  baseURL: env.CMS_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosAuth.interceptors.response.use((response) => {
  if (response.data.error) {
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
  // else if (error && error.response && error.response.status === 404) {
  //   browserHistory.replace('/page-not-found')
  // }

  return Promise.reject(error)
})

export default axiosAuth


