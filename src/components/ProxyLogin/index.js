import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { AppRoutes } from 'constants/appRoutes'
import { extractURLParams, setInLocalStorage } from 'utils/helpers'
import history from 'utils/history'
import Loader from 'components/LoadingSpinner'

const ProxyLoginComponent = (props) => {
    const { location: { search }, getProfileDetails } = props

    useEffect(()=>{
        let extractedParams = null
        if (search) {
          extractedParams = extractURLParams(search)
          if(extractedParams && extractedParams.token) {
          setInLocalStorage('token', extractedParams.token)
          setInLocalStorage('userIdproxy', extractedParams.userId)
          getProfileDetails(extractedParams.userId)
          history.push(AppRoutes.HOME)
          }
        }
        // eslint-disable-next-line
    }, [search])

  return (
    <React.Fragment>
      <Loader/>
    </React.Fragment>
  )
}

ProxyLoginComponent.propTypes = {
    location: PropTypes.object,
    getProfileDetails: PropTypes.func
}

export default ProxyLoginComponent
