import React, { useEffect } from 'react'
import Layout from 'containers/Layout'
import PropTypes from 'prop-types'
import PurchasingThankYou from './purchasingThankYou'
import Loader from 'components/LoadingSpinner'
import { retrieveFromLocalStorage } from 'utils/helpers'
import '../Pages/index.scss'
import '../Home/index.scss'

const SubscriptionThankyouPage = (props) => {
  const { user: { isUserGoldMember, isUserSilverMember }, fetchingProfileDetails, getProfileDetails } = props

    const token = retrieveFromLocalStorage('token')

  useEffect(()=>{
    const userId = retrieveFromLocalStorage('userId')
    if (token && userId) {
      getProfileDetails(userId)
    }
    // eslint-disable-next-line
  }, [])

  const thankyouPageMembersipHandler = () => (
    <PurchasingThankYou
      location={props.location}
      isUserGoldMember={isUserGoldMember}
      isUserSilverMember={isUserSilverMember}
      getProfileDetails={getProfileDetails}
    />
  )

    return (
      <Layout className="px-1">
        {fetchingProfileDetails &&
          <Loader />
        }
        {thankyouPageMembersipHandler()}
      </Layout>
    )

}

SubscriptionThankyouPage.propTypes = {
  user: PropTypes.object,
  fetchingProfileDetails: PropTypes.bool,
  getProfileDetails: PropTypes.func
}

export default SubscriptionThankyouPage
