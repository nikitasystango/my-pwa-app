import React from 'react'
import { Form, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import intl from 'utils/intlMessage'
import dashboardMessages from 'constants/messages/dashboardMessages'
import { retrieveFromLocalStorage } from 'utils/helpers'

const NotificationSetting = (props) => {
  const {
    userDetails,
    toggleSmsNotificationHandler,
    toggleEmailsNotification
  } = props

  const token = retrieveFromLocalStorage('token')

  return (
    <Form className="account-setting__form">
      <Grid className="accordion-myprofile">
      <Grid.Row>
        <Grid.Column mobile={12} tablet={8} computer={12}>
          <h2 className="tabsHeading">{intl(dashboardMessages.accountSettingNotificationHead)}</h2>
        </Grid.Column>
      </Grid.Row>
        <Grid.Row className="py-0 alert_input">
          <Grid.Column mobile={12} tablet={12} computer={12}>
            <h3 className="account-setting__heading mb-2">{intl(dashboardMessages.accountSettingAlertToggle)}</h3>
            <div className="sms_notification_wrap">
              <span className="sms_label">{intl(dashboardMessages.accountSettingSmsAlert)}</span>
              <div className="ui fitted toggle checkbox">
                <input
                      type="checkbox"
                      checked={Boolean(userDetails?.phoneNumber?.enabled)}
                      onClick={toggleSmsNotificationHandler}
                />
                <label />
                <span />
              </div>
            </div>
            <span className="notify-span">{intl(dashboardMessages.accountSettingWifi)}</span>
            <div className="divider"></div>
            <div className="sms_notification_wrap">
              <span className="sms_label">{intl(dashboardMessages.accountSettingEmailAlert)}</span>
              <div className="ui fitted toggle checkbox" >
                <input
                      checked={userDetails?.isEmailNotificationEnable || false}
                      type="checkbox"
                      onChange={() => toggleEmailsNotification({ isActive: !userDetails?.isEmailNotificationEnable, token })}
                />
                <label />
                <span />
              </div>
              <span />
            </div>
            <span className="notify-span">{intl(dashboardMessages.keepEmailAlertNotificationOn)}</span>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

NotificationSetting.propTypes = {
  userDetails: PropTypes.object,
  toggleSmsNotificationHandler: PropTypes.func,
  toggleEmailsNotification: PropTypes.func,
  checkNotificationHandeler: PropTypes.func,
  notifications: PropTypes.object
}

export default NotificationSetting
