import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Grid, Header, Loader, Menu, Button } from 'semantic-ui-react'
import { sidebarMenuMobile, sidebarMenuMobileNonLoggedIn } from 'constants/globalConstants'
import { profilePictureUploadModalToggle } from 'actions/Dashboard'
import { navigateToRespectivePage } from 'utils/helpers'
import { toggleSidebar } from 'actions/Layout'
import { retrieveFromLocalStorage } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages';
import 'semantic-ui-css/components/header.min.css'
import 'semantic-ui-css/components/loader.min.css'
import 'semantic-ui-css/components/menu.min.css'
import { getInitialsProfileImage } from 'utils/helpers'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeView: null
    }
  }

  changeActiveView = (activeView) => {
    window.scrollTo(0, 0)
    let url = AppRoutes.MY_ALERT
    switch (activeView) {
      case 0:
        url = AppRoutes.MY_ALERT
        break

      case 1:
        url = AppRoutes.ACCOUNT_SETTINGS
        this.props.updateReducerState('dashboard', 'activeProfileView', 0)
        break

      case 2:
        url = AppRoutes.MEMBERSHIP
        break

      case 6:
        url = AppRoutes.NEWS_AND_ADVICE
        break

      case 7:
        url = AppRoutes.HOW_IT_WORKS
        break

      case 8:
        url = AppRoutes.PRICING
        break

      case 9:
        url = this.props.mapPageUrl ? this.props.mapPageUrl : AppRoutes.LOCATION
        break

      default:
        url = '/'
    }

    this.setState({ activeView: activeView })
    const { toggleSidebar } = this.props
    toggleSidebar()
    navigateToRespectivePage(url)
  }

  loginHandler = () => {
    const { toggleSidebar } = this.props
    toggleSidebar()
    navigateToRespectivePage(AppRoutes.SIGN_IN)
  }

  registerHandler = () => {
    const { toggleSidebar } = this.props
    toggleSidebar()
    navigateToRespectivePage(AppRoutes.SIGN_UP)
  }

  handleSignoutToggle = () => {
    const { handleSignOutClick, toggleSidebar } = this.props
    toggleSidebar()
    handleSignOutClick()
  }

  render() {
    const { user, profilePictureUploadModalToggle, location } = this.props
    const { firstName, lastName, profileImage } = user || ''
    const { isUserBronzeMember, isUserSilverMember, isUserGoldMember } = user || {}
    return (
      <Grid stackable divided className="formSidebar__menu-items">
        <Grid.Column>
          {retrieveFromLocalStorage('token') &&
            <div className="p15">
              <div className="user-image-wrap">
                <div className="user-image" onClick={profilePictureUploadModalToggle}>
                  {profileImage && profileImage !== '' ?
                    <img className="lazyload" src={profileImage} alt="profile👤" />
                    :
                    getInitialsProfileImage(firstName, lastName)
                  }
                </div>
              </div>
              <Header
                as="h3"
                content={firstName && (`${firstName} ${lastName}` || <Loader inline active />)}
              />
              <p className="user-membership-text">{isUserBronzeMember && ` ${intl(commonMessages.bronze)}`}
                {isUserSilverMember && ` ${intl(commonMessages.silver)}`}
                {isUserGoldMember && ` ${intl(commonMessages.gold)}`} Member
              </p>
            </div>}

          <Menu vertical >
            {retrieveFromLocalStorage('token') ?
              <Fragment>
                {sidebarMenuMobile.map(item =>
                  <Menu.Item key={item.page} active={location && location.pathname === item.url} as={'a'} onClick={() => this.changeActiveView(item.page, item.url)}>
                    {/* {item.icon} */}
                    {item.name}
                  </Menu.Item>
                )}
                <Menu.Item>
                  <Button onClick={() => this.handleSignoutToggle()} className="btn btn--dark formSidebar__menu-items-btn">
                    {intl(commonMessages.signOut)}
                  </Button>
                </Menu.Item>
              </Fragment>
              :
              <Fragment>
                {sidebarMenuMobileNonLoggedIn.map(item =>
                  <Menu.Item key={item.page} active={location && location.pathname === item.url} as={'a'} onClick={() => this.changeActiveView(item.page, item.url)}>
                    {/* {item.icon} */}
                    {item.name}
                  </Menu.Item>
                )}
                <Menu.Item><Button fluid onClick={() => this.loginHandler()} className="btn btn--dark formSidebar__menu-items-btn">{intl(commonMessages.logIn)}</Button></Menu.Item>
                <Menu.Item><Button fluid onClick={() => this.registerHandler()} className="btn btn--dark formSidebar__menu-items-btn">{intl(commonMessages.register)}</Button></Menu.Item>
              </Fragment>}
          </Menu>
        </Grid.Column>
      </Grid>
    )
  }
}
Sidebar.propTypes = {
  profilePictureUploadModalToggle: PropTypes.func,
  user: PropTypes.object,
  toggleSidebar: PropTypes.func,
  handleSignOutClick: PropTypes.func,
  location: PropTypes.object,
  mapPageUrl: PropTypes.string
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  newProfilePicture: state.dashboard.newProfilePicture
})

const mapDispatchToProps = (dispatch) => ({
  profilePictureUploadModalToggle: () => dispatch(profilePictureUploadModalToggle()),
  toggleSidebar: () => dispatch(toggleSidebar())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))
