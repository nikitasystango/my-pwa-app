import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Accordion } from 'semantic-ui-react'
import { Plus, Minus } from '../../utils/svgs'
import { retrieveFromLocalStorage, setInLocalStorage } from 'utils/helpers';
import { openUrlOnNewTab } from 'utils/helpers'
import env from 'utils/env_variables'
import intl from 'utils/intlMessage'
import helpCenterMessages from 'constants/messages/helpCenterMessages'
import commonMessages from 'constants/messages/commonMessages';
import { AppRoutes } from 'constants/appRoutes'

const EliteMemberShipHelp = (props) => {
  const { user } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const token = retrieveFromLocalStorage('token')

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  const redirectToFunctionality = (path) => {
    if (token) {
      openUrlOnNewTab(path)
    } else {
      setInLocalStorage('helpCenter', path)
      openUrlOnNewTab(AppRoutes.SIGN_IN)
    }
  }

  const OpenSelfCustomerPortal = () => {
    if (token) {
      //  window.location.href = `${env.REDIRECT_ON_RUBY}/chargebee/self_serve_portal?user_id=${user?.id}`
        const url = `${env.REDIRECT_ON_RUBY}/chargebee/self_serve_portal?user_id=${user?.id}`
        const newWin = window.open(`${url}${appendParams ? appendParams.replace('?', '&') : ''}`)
        if(!newWin || newWin.closed || typeof newWin.closed=='undefined')
        {
          pushNotification(Messages.ENABLED_POPUP, 'error', 'TOP_CENTER', 3000)
            // POPUP BLOCKED
        }
    } else {
      setInLocalStorage('helpCenter', '/chargebee/self_serve_portal')
      openUrlOnNewTab(AppRoutes.SIGN_IN)
    }
  }

  return (
    <>
      <Accordion>
        <div className="accordion__item">
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Minus />
            <Plus />
            {intl(helpCenterMessages.membershipOfferTitle)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>{intl(helpCenterMessages.membershipOfferTextOne)}</p>
            <p>{intl(helpCenterMessages.membershipOfferTextTwo)}</p>
            <p>{intl(helpCenterMessages.membershipOfferTextThree)}<span className="text-medium-blue cursor-pointer" onClick={() => openUrlOnNewTab(AppRoutes.PRICING)}>{intl(helpCenterMessages.hereIsPricingPage)}</span></p>
          </Accordion.Content>
        </div>

        <div className="accordion__item">
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <Minus />
            {intl(helpCenterMessages.cancelSubsciptionTitle)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>

            <p>{intl(helpCenterMessages.cancelSubsciptionTextOne)} <span className="text-medium-blue cursor-pointer" onClick={() => redirectToFunctionality(AppRoutes.MEMBERSHIP)}>{intl(commonMessages.hereSmall)}. </span>{intl(helpCenterMessages.cancelSubsciptionTextTwo)}</p>
          </Accordion.Content>
        </div>

        <div className="accordion__item">
          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={handleClick}
          >
            <Minus />
            <Plus />
            {intl(helpCenterMessages.paymentTitle)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>{intl(helpCenterMessages.paymentTextOne)} <span className="text-medium-blue cursor-pointer" onClick={OpenSelfCustomerPortal}>{intl(commonMessages.linkSmall)}</span>.</p>
            <p>{intl(helpCenterMessages.paymentTextTwo)}</p>
            <p>{intl(helpCenterMessages.paymentTextThree)}</p>
            <p>{intl(helpCenterMessages.paymentTextFour)}</p>
            <p>{intl(helpCenterMessages.paymentTextFive)}</p>
          </Accordion.Content>
        </div>
      </Accordion>
    </>
  )
}

EliteMemberShipHelp.propTypes = {
  user: PropTypes.object
}

export default EliteMemberShipHelp
