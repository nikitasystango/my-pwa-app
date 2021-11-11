import React, { useEffect } from 'react'
import { Header, Dropdown, Loader } from 'semantic-ui-react'
import '../assets/change-password-modal.scss'
import './style.scss'
import intl from 'utils/intlMessage'
import dashboardMessages from 'constants/messages/dashboardMessages'
import PropTypes from 'prop-types'
import { BritishLogo } from 'utils/svgs'
import AmericanLogo from '../../SearchPanel/assets/american_airlines.png'
import { retrieveFromLocalStorage } from 'utils/helpers'
import { airlineName } from 'constants/globalConstants'
import Texts from 'constants/staticText'
import commonMessages from 'constants/messages/commonMessages'

const MembershipTier = (props) => {
  const { getAirlineList, searchPanel, updateReducerState, modalPopup= null, updateProfileDetails, userDetails: { airlineMemberships } } = props
  const { airlines, airlinesLoading, membership } = searchPanel
  const token = retrieveFromLocalStorage('token')

  useEffect(() => {
    if(!airlines.length) {
      getAirlineList({ isSetDefault: airlineMemberships && airlineMemberships.length ? false : true })
    }
    // eslint-disable-next-line
  }, []);

  const handleOptions = (memberships, selectedairline) => {
    const data = []
    if (memberships && memberships.length) {
      memberships.map((list) => {
        data.push({
          key: list.value,
          text: list.value === Texts.DEFAULT_AIRLINE_TIER ? <>{list.title}<span className="choose-text"> {intl(commonMessages.chooseIfUnsure)} </span> </> : list.title,
          value: list.value,
          selectedairline
        })
        return data
      })
    }
    return data
  }

  const handleSelectedAirline = (value, selectedAirline) => {
    updateReducerState('searchPanel', 'selectedAirline', `${selectedAirline}_${value}`)
    updateReducerState('searchPanel', 'airlineMembership', value)
    updateReducerState('searchPanel', 'selectedAirlineCode', selectedAirline ? selectedAirline : null)
    updateReducerState('searchPanel', 'membership', value || null)
    formSubmitHandlerClick(selectedAirline, value)
  }

  const formSubmitHandlerClick = (selectedAirline, value) => {
      const data = {
        user: {
          access_token: token,
          airline_name: selectedAirline === 'BA' ? airlineName.BRITISH_AIRWAYS: airlineName.VIRGIN_AIRWAYS,
          membership_type: value
        }
      }
      updateProfileDetails({ data, name: 'userDetails' })
  }

  const handleMainText = (airlineData) => airlineData.value === 'AA' ? (
    <>
      <img
        className="airline-logo__img lazyload"
        src={AmericanLogo}
        alt="✈️airlines"
      />
      {airlineData.airline}
    </>
    ) : (
      <> <BritishLogo className="airline-logo__img lazyload" />
        {airlineData.airline} <span>{airlineMemberships && !airlineMemberships.length ? '' : membership ? membership : ''}</span>
      </>
    )

  return (
    <>
      <Header className="tabsHeading" content="Airline Membership Tier" />
      <p className="cst-popup__text">
        {intl(dashboardMessages.pleaseSelectMembershipTier, modalPopup ? 'confirm' : 'select')}{' '}
      </p>
      <div>
        {airlines && airlines.length ? airlines.map((airlineData, key) => (
          airlineData && airlineData.value === 'VA' ? null :
          <div key={key}>
            <Dropdown
            fluid
            selection
            options={handleOptions(airlineData.memberships, airlineData.value)}
            loading={airlinesLoading}
            text={handleMainText(airlineData)}
            onChange={(e, { value, options }) => handleSelectedAirline(value, options[0].selectedairline)}
            defaultOpen={modalPopup ? false : true}
            className="membership-dropdown"
            value = {airlineMemberships && !airlineMemberships.length ? undefined : membership}
            />
          </div>
        )):
          <div className="loader-wrapper" >
            <Loader/>
          </div> }
      </div>
    </>
  )
}
MembershipTier.propTypes = {
  getAirlineList: PropTypes.func,
  searchPanel: PropTypes.object,
  updateReducerState: PropTypes.func,
  modalPopup: PropTypes.string,
  updateProfileDetails: PropTypes.func,
  userDetails: PropTypes.object
}

export default MembershipTier
