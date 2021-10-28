import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import history from 'utils/history'
import { Logo, FixHeader, Button, HeaderAction, MenuToggleButton, Nav, NavItem, ProfileImgDropdown, NavRight, DropdownAirline } from './style'
import { navigateToRespectivePage, retrieveFromLocalStorage } from 'utils/helpers'
import { isMobile } from 'react-device-detect'
import { withRouter } from 'react-router-dom'
import { ProfilePicSelectoreSvg } from 'utils/svgs'
import { Dropdown } from 'semantic-ui-react'
import { LogoFull } from '../../utils/svgs'
import { getInitialsProfileImage } from 'utils/helpers'
import { AppRoutes } from '../../constants/appRoutes'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import layoutMessages from 'constants/messages/layoutMessages'
import { profileCardDetails } from 'constants/globalConstants'

const Header = (props) => {
  const { toggleSidebar, logoutUserLoading, match, user,
    location, mapPageUrl, updateReducerState } = props
  const { profileImage, isUserGoldMember, firstName, lastName, isEmailVerified } = user || ''
  const token = retrieveFromLocalStorage('token')
  const navigateToPage = (type) => {
    if (type === 'sign-in') {
      history.push(AppRoutes.SIGN_IN)
    } else if (type === 'sign-up') {
      history.push(AppRoutes.SIGN_UP)
    }
  }

  const dropDownAirlineFunc = () => (
    <DropdownAirline>
      <Dropdown text="Airlines">
        <Dropdown.Menu>
          <Dropdown.Item
            description="British Airways"
            onClick={() => history.push(AppRoutes.HOME)}
            active={
              match && match.path && match.path === AppRoutes.HOME
            }
          />
          <Dropdown.Item
            description="Virgin Atlantic"
            onClick={() =>
              history.push(AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS)
            }
            active={
              match &&
              match.path &&
              match.path === AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS
            }
          />
        </Dropdown.Menu>
      </Dropdown>
    </DropdownAirline>
    )

  const renderDesktopHeaderActionButtons = () => {
    const { handleSignOutClick } = props
    if (!token) {
      return (
        <>
          <Nav>
            <NavItem onClick={() => history.push(AppRoutes.NEWS_AND_ADVICE)} className={match && match.path && (match.path === AppRoutes.NEWS_AND_ADVICE || match.path === `${AppRoutes.BLOG_CATEGORY}/:slug`) ? 'is-active' : ''}>{intl(commonMessages.blog)}</NavItem>
            <NavItem onClick={() => history.push(AppRoutes.HOW_IT_WORKS)} className={match && match.path && match.path === AppRoutes.HOW_IT_WORKS ? 'is-active' : ''}>{intl(layoutMessages.howItWorksLabel)}</NavItem>
            <NavItem onClick={() => history.push({ pathname: AppRoutes.PRICING })} className={match && match.path && match.path === AppRoutes.PRICING ? 'is-active' : ''}>{intl(layoutMessages.pricingTitle)}</NavItem>
            {dropDownAirlineFunc()}
          </Nav>
          <Button className={match?.path === AppRoutes.SIGN_IN ? 'is-active' : ''} onClick={() => navigateToPage('sign-in')} >
            {intl(commonMessages.signIn)}
          </Button>
          <Button onClick={() => navigateToPage('sign-up')} mediumBlue>
            {intl(commonMessages.signUpTitle)}
          </Button>
        </>
      )
    } else {
      return (
        <>
          <Nav>
            <NavItem onClick={() => history.push(AppRoutes.NEWS_AND_ADVICE)} className={match && match.path && (match.path === AppRoutes.NEWS_AND_ADVICE || match.path === `${AppRoutes.BLOG_CATEGORY}/:slug`) ? 'is-active' : ''}>{intl(commonMessages.blog)}</NavItem>
            <NavItem onClick={() => history.push(AppRoutes.HOW_IT_WORKS)} className={match && match.path && match.path === AppRoutes.HOW_IT_WORKS ? 'is-active' : ''}>{intl(layoutMessages.howItWorksLabel)}</NavItem>
            {dropDownAirlineFunc()}
          </Nav>

          <NavRight>
            <NavItem onClick={() => history.push(mapPageUrl ? mapPageUrl : AppRoutes.LOCATION)} className={match?.path === AppRoutes.LOCATION ? 'is-active' : ''}>{intl(layoutMessages.mapViewTitle)}</NavItem>
            <NavItem onClick={() => history.push(AppRoutes.MY_ALERT)} className={location?.pathname === AppRoutes.MY_ALERT ? 'is-active' : ''}>{intl(layoutMessages.myAlertsTitle)}</NavItem>
            {!isUserGoldMember && token &&
              <Button onClick={() => history.push({ pathname: AppRoutes.PRICING })} upgradeBtn>
                {intl(commonMessages.upgrade)}
              </Button>
            }
          </NavRight>
          <ProfileImgDropdown text={profileImage ? <img className="lazyload" src={profileImage} data-src={profileImage} alt="profile👤 header" /> : getInitialsProfileImage(firstName, lastName)} loading={logoutUserLoading} className="profile-img">

            <Dropdown.Menu>
              <Dropdown.Item description={intl(layoutMessages.myProfile)}
              onClick={() => {
                navigateToRespectivePage(AppRoutes.ACCOUNT_SETTINGS)
                updateReducerState('dashboard', 'activeProfileView', 0)
              }}
              />
              <Dropdown.Item description={intl(layoutMessages.signOutSmall)} onClick={() => handleSignOutClick()} />
            </Dropdown.Menu>
          </ProfileImgDropdown>
        </>
      )
    }
  }

  const renderMobileHeaderActionButtons = () => (
    <>
      <Nav className={`${isMobile ? 'mobile-nav' : ''}`}>
        <NavItem onClick={() => history.push(AppRoutes.NEWS_AND_ADVICE)} className={match && match.path && match.path === AppRoutes.NEWS_AND_ADVICE ? 'is-active' : ''}>{intl(commonMessages.blog)}</NavItem>
        <NavItem onClick={() => history.push(AppRoutes.HOW_IT_WORKS)} className={match && match.path && match.path === AppRoutes.HOW_IT_WORKS ? 'is-active' : ''}>{intl(layoutMessages.howItWorksLabel)}</NavItem>
        {dropDownAirlineFunc()}
      </Nav>
      <MenuToggleButton onClick={() => toggleSidebar()} aria-label="profile-image" >
        {!token ?
            <ProfilePicSelectoreSvg className="mr-0" />
          :
          profileImage && profileImage !== '' ?
            <img className="lazyload profile-img-mobile" src={profileImage} alt="profile👤" />
            :
            getInitialsProfileImage(firstName, lastName)
          }
      </MenuToggleButton>
    </>
  )

  const resetData = () => {
    navigateToRespectivePage(AppRoutes.HOME)
  }

  const openManageControlForm = () => {
    history.push(AppRoutes.ACCOUNT_SETTINGS)
    updateReducerState('dashboard', 'activeProfileView', profileCardDetails[3].activeTab)
  }

  return (
    <Fragment>
      <FixHeader id="main-header">
        <Logo onClick={() => resetData()}>
          {/* <img className="lazyload" src={require('../../assets/images/reward_finder_logo.svg')} alt="rff logo" /> */}
          <LogoFull className="lazyload" />
        </Logo>
        <HeaderAction className={`${isMobile ? 'justify-content-end' : ''}`}>
          {isMobile ?
            renderMobileHeaderActionButtons() :
            renderDesktopHeaderActionButtons()
          }
        </HeaderAction>
        {token && user?.alternateEmails?.length && !isEmailVerified && match?.path !== AppRoutes.THANK_YOU && <p onClick={openManageControlForm} className={`email-verify-msg ${ (match?.path === AppRoutes.LOCATION || match?.path === AppRoutes.CALENDER) ? 'email-verify-msg-bottom' : ' '}`}>{intl(layoutMessages.clickHereToVerifyYourEmail)}</p>}
      </FixHeader>
    </Fragment>
  )
}

Header.propTypes = {
  match: PropTypes.object,
  handleSignOutClick: PropTypes.func,
  toggleSidebar: PropTypes.func,
  logoutUserLoading: PropTypes.bool,
  user: PropTypes.object,
  location: PropTypes.object,
  mapPageUrl: PropTypes.string,
  updateReducerState: PropTypes.func
}

export default withRouter(Header)
