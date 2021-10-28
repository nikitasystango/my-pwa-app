import React, { useState } from 'react'
import { Accordion } from 'semantic-ui-react'
import { Plus, Minus } from '../../utils/svgs'
import { retrieveFromLocalStorage, setInLocalStorage } from 'utils/helpers'
import { openUrlOnNewTab } from 'utils/helpers'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import helpCenterMessages from 'constants/messages/helpCenterMessages'

const AccountDetailsHelp = () => {

  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  const redirectToFunctionality = (path) => {
    const token = retrieveFromLocalStorage('token')
    if (token) {
      openUrlOnNewTab(path)
    } else {
      setInLocalStorage('helpCenter', path)
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
            {intl(helpCenterMessages.changingEmailAddress)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>
              {intl(helpCenterMessages.changingEmailAddressTextOne)}<span className="text-medium-blue cursor-pointer" onClick={() => redirectToFunctionality(AppRoutes.ACCOUNT_SETTINGS)}>{intl(commonMessages.clickHereSmall)}</span>{intl(commonMessages.needToLoggedIn)}
            </p>
          </Accordion.Content>
        </div>
        <div className="accordion__item">
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleClick}
          >
            <Minus />
            <Plus />
            {intl(helpCenterMessages.changingPhoneNumberTitle)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>
              {intl(helpCenterMessages.changingPhoneNumberTextOne)}<span className="text-medium-blue cursor-pointer" onClick={() => redirectToFunctionality(AppRoutes.ACCOUNT_SETTINGS)}>{intl(commonMessages.linkSmall)}</span>.
            </p>
            <p>
              {intl(helpCenterMessages.changingPhoneNumberTextTwo)}
            </p>
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
            {intl(helpCenterMessages.changingYourPasswordTitle)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>
              {intl(helpCenterMessages.changingYourPasswordTextOne)}<span className="text-medium-blue cursor-pointer" onClick={() => redirectToFunctionality(AppRoutes.ACCOUNT_SETTINGS)}>{intl(commonMessages.clickHereSmall)}</span>{intl(helpCenterMessages.changingEmailAddressTextCommon)}
            </p>
          </Accordion.Content>
        </div>
        <div className="accordion__item">
          <Accordion.Title
            active={activeIndex === 3}
            index={3}
            onClick={handleClick}
          >
            <Minus />
            <Plus />
            {intl(helpCenterMessages.updateBritishTierTitle)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <p>
              {intl(helpCenterMessages.updateBritishTierText)}<span className="text-medium-blue cursor-pointer" onClick={() => redirectToFunctionality(AppRoutes.ACCOUNT_SETTINGS)}>{intl(commonMessages.clickHereSmall)}</span>{intl(helpCenterMessages.changingEmailAddressTextCommon)}
            </p>
          </Accordion.Content>
        </div>
      </Accordion>
    </>
  )
}

export default AccountDetailsHelp
