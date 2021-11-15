import { Grid, Menu, Header } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import AccountSetting from './accountSetting'
import MyAlert from './myAlert'
import Subscription from './subscription'
import PropTypes from 'prop-types'
import { sidebarMenu } from 'constants/globalConstants'
import { getInitialsProfileImage } from 'utils/helpers'
import Layout from 'containers/Layout'
import Loader from 'components/LoadingSpinner'
import Messages from 'constants/messages'
import 'semantic-ui-css/components/menu.min.css'
import 'semantic-ui-css/components/header.min.css'
import './dashboard.scss'
import { retrieveFromLocalStorage } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'

const Dashboard = (props) => {
  const { editAlert, getAirlineList, airlines, user, getSubscribedAlerts, cancelSubscribedAlerts, getProfileDetails, location: { pathname, search },
    dashboard: { myAlerts, accountSettings: { fetchingProfileDetails } }, pageAnalytics, updateReducerState, getFlightAvailability, flights , getCountriesList, searchPanel } = props
  const [activeView, setActiveView] = useState(null)
  const { isUserBronzeMember, isUserSilverMember, isUserGoldMember } = user || {}
  useEffect(() => {
    setRespectivePage(pathname)
    // eslint-disable-next-line
  }, [pathname])

  useEffect(()=> {
    getCountriesList()
    // eslint-disable-next-line
  }, [])

  const setRespectivePage = (pagetype) => {
    let pageNumber = 0
    switch (pagetype) {
      case AppRoutes.MY_ALERT:
        pageNumber = 0
        break

      case AppRoutes.ACCOUNT_SETTINGS:
        pageNumber = 1
        break

      case AppRoutes.MEMBERSHIP:
        pageNumber = 2
        break

      default:
        pageNumber = 10
    }
    changeActiveView(pageNumber, true)
  }

  const changeActiveView = (activeView, callApi) => {
    window.scrollTo(0, 0)
    let url = AppRoutes.MY_ALERT
    switch (activeView) {
      case 0:
        if (callApi) {
          getSubscribedAlerts()
        }
        url = AppRoutes.MY_ALERT
        if (search) {
          url = `${AppRoutes.MY_ALERT}${search}`
        }
        break

      case 1:
        if (callApi && retrieveFromLocalStorage('token')) {
          const userDetail = JSON.parse(retrieveFromLocalStorage('userDetails'))
          if (userDetail && userDetail.id) {
            getProfileDetails(userDetail.id)
          }
        }
        url = AppRoutes.ACCOUNT_SETTINGS
        updateReducerState('dashboard', 'activeProfileView', 0)
        break
      case 2:
        url = AppRoutes.MEMBERSHIP
        if (search) {
          url = `${AppRoutes.MEMBERSHIP}${search}`
        }
        break

      case 10:
        url = AppRoutes.PAGE_NOT_FOUND
        break
      default:
        url = AppRoutes.MY_ALERT
    }
    setActiveView(activeView)
    props.history.push(url)
  }

  const renderView = (activeView) => {
    switch (activeView) {
      case 0:
        return (
          <MyAlert
            cancelSubscribedAlerts={cancelSubscribedAlerts}
            myAlerts={myAlerts}
            pageAnalytics={pageAnalytics}
            user={user}
            airlines={airlines}
            getAirlineList={getAirlineList}
            editAlert={editAlert}
            search={search}
            pathname={pathname}
            updateReducerState={updateReducerState}
            getFlightAvailability={getFlightAvailability}
            flights={flights}
            searchPanel={searchPanel}
          />
        )
      case 1:
        return (
          <AccountSetting {...props} />
        )
      case 2:
        return (
          <Subscription {...props} user={user} />
        )
      default:
        return (
          <AccountSetting {...props} />
        )
    }
  }

  const renderLoader = () => {
    let loader = null
    if (fetchingProfileDetails) {
      loader = <Loader message={Messages.FETCHING_PROFILE_DETAILS} />
    }
    return loader
  }

  const { firstName, lastName, profileImage } = user || ''

  return (
    <Layout className="dashboard-pages">
      {renderLoader()}
      <div className="user-dashboard">
        {/* <Container> */}
        <Grid stackable divided className="m-0">
          <Grid.Column width={4} only="computer" className="user-dashboard__col user-dashboard__col--left">
            <div className="user-image-wrap">
              <div className="user-image" onClick={props.profilePictureUploadModalToggle}>
                {profileImage && profileImage !== '' ?
                  <img className="lazyload" src={profileImage} alt="profile👤" />
                  :
                  getInitialsProfileImage(firstName, lastName)
                  // <svg width="82" height="83" viewBox="0 0 82 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                  //   <path fillRule="evenodd" clipRule="evenodd" d="M40.9992 0.753906C18.3563 0.753906 0 19.0597 0 41.6398C0 64.2193 18.3563 82.5265 40.9992 82.5265C63.6424 82.5265 82 64.2193 82 41.6398C82 19.0592 63.6424 0.753906 40.9992 0.753906ZM41.1241 60.9289L40.8737 60.9283H23.3604C23.3604 48.1564 34.6087 48.1593 37.1049 44.8197L37.3905 43.2968C33.8837 41.5246 31.4081 37.2515 31.4081 32.2542C31.4081 25.6704 35.7028 20.3322 40.9991 20.3322C46.2956 20.3322 50.5904 25.6704 50.5904 32.2542C50.5904 37.2091 48.1587 41.4553 44.6986 43.2557L45.0239 44.9863C47.7624 48.164 58.6366 48.3712 58.6366 60.9289H41.1241Z" fill="white" />
                  // </svg>
                }
              </div>
            </div>
            <Header
              as="h3"
              content={firstName && (`${firstName} ${lastName}` || <Loader inline active />)}
              className="user-name"
            />
            <p className="user-membership-text">{isUserBronzeMember && ` ${intl(commonMessages.bronze)}`}
              {isUserSilverMember && ` ${intl(commonMessages.silver)}`}
              {isUserGoldMember && ` ${intl(commonMessages.gold)}`} Member
            </p>
            <Menu vertical >
              {sidebarMenu.map((item, i) =>
                <Menu.Item key={i} active={activeView === item.page} as={'a'} onClick={() => changeActiveView(item.page, false)}>
                  {item.icon}
                  {item.name}
                </Menu.Item>
              )}
            </Menu>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={12} className="user-dashboard__col user-dashboard__col--right">
            <div className="user-dashboard__content">{renderView(activeView)}</div>
          </Grid.Column>
        </Grid>
        {/* </Container> */}
      </div>
    </Layout>
  )
}
Dashboard.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  getProfileDetails: PropTypes.func,
  getSubscribedAlerts: PropTypes.func,
  cancelSubscribedAlerts: PropTypes.func,
  dashboard: PropTypes.object,
  user: PropTypes.object,
  profilePictureUploadModalToggle: PropTypes.func,
  pageAnalytics: PropTypes.func,
  airlines: PropTypes.array,
  getAirlineList: PropTypes.func,
  editAlert: PropTypes.func,
  updateReducerState: PropTypes.func,
  getFlightAvailability: PropTypes.func,
  flights: PropTypes.object,
  getCountriesList: PropTypes.func,
  searchPanel: PropTypes.object
}
export default Dashboard
