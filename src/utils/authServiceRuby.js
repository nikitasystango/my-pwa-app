import axios, { CancelToken } from 'axios'
import env from 'utils/env_variables'

class AuthServiceRuby {
  constructor() {
    this.accessToken = this.getToken('token')
    this.axios = this.axiosInit()
    this.CancelToken = CancelToken
  }

  axiosInit = () => axios.create({
    baseURL: env.REACT_APP_BASE_URL_RUBY,
    headers: {
      // 'x-access-token': this.accessToken,
      'Authorization': env.AUTHORIZATION_KEY
    }
  })

  getToken(key) {
    return localStorage.getItem(key)
  }

  isLoggedIn() {
    const token = this.getToken('token')
    if (token) return true
    return false
  }
}

export default new AuthServiceRuby()
