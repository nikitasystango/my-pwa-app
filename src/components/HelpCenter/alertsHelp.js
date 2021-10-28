import React, { useState } from 'react'
import { Accordion } from 'semantic-ui-react'
import { Plus, Minus } from '../../utils/svgs'
import { retrieveFromLocalStorage, setInLocalStorage } from 'utils/helpers';
import { openUrlOnNewTab } from 'utils/helpers'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import helpCenterMessages from 'constants/messages/helpCenterMessages'

const AlertsHelp = () => {

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
            {intl(helpCenterMessages.whySetupAlertTitle)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>{intl(helpCenterMessages.whySetupAlertTextOne)}</p>
            <p>{intl(helpCenterMessages.whySetupAlertTextTwo)}</p>
            <p>{intl(helpCenterMessages.whySetupAlertTextThree)}</p>
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
            {intl(helpCenterMessages.howDoAlertWorkTitle)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>{intl(helpCenterMessages.howDoAlertWorkTextOne)}</p>
            <p>{intl(helpCenterMessages.howDoAlertWorkTextTwo)}</p>
            <p>{intl(helpCenterMessages.howDoAlertWorkTextThree)}</p>
            <p>{intl(helpCenterMessages.howDoAlertWorkTextFour)}<span
            className="text-medium-blue cursor-pointer" onClick={() => openUrlOnNewTab(AppRoutes.PRICING)}>{intl(helpCenterMessages.seePricingPage)}</span></p>
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
            {intl(helpCenterMessages.alertListTitle)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>{intl(helpCenterMessages.alertListText)}<span className="text-medium-blue cursor-pointer" onClick={() => redirectToFunctionality(AppRoutes.MY_ALERT)}>{intl(helpCenterMessages.click)}</span> {intl(helpCenterMessages.viewAlerts)}</p>
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
            {intl(helpCenterMessages.cancelAlertTitle)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <p>{intl(helpCenterMessages.cancelAlertTextOne)}</p>
            <p>{intl(helpCenterMessages.cancelAlertTextTwo)}</p>
          </Accordion.Content>
        </div>

        <div className="accordion__item">
          <Accordion.Title
            active={activeIndex === 4}
            index={4}
            onClick={handleClick}
          >
            <Minus />
            <Plus />
            {intl(helpCenterMessages.notGettingAlertTitle)}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 4}>
            <p>{intl(helpCenterMessages.dueToReason)}</p>
            <ol>
              <li>
                <p>{intl(helpCenterMessages.notGettingAlertTextOne)}</p>
                <p>{intl(helpCenterMessages.notGettingAlertTextTwo)}</p>
                <p>{intl(helpCenterMessages.notGettingAlertTextThree)}</p>
              </li>
              <li>
                <p>{intl(helpCenterMessages.notGettingAlertTextFour)}</p>
                <p>{intl(helpCenterMessages.notGettingAlertTextFive)}</p>
              </li>
              <li>
                <p>{intl(helpCenterMessages.notGettingAlertTextSix)}</p>
                <p>{intl(helpCenterMessages.notGettingAlertTextSeven)}</p>
              </li>
            </ol>
          </Accordion.Content>
        </div>
      </Accordion>
    </>
  )
}

export default AlertsHelp
