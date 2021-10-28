import React from 'react'
import PropTypes from 'prop-types'
import intl from 'utils/intlMessage'
import authMessages from 'constants/messages/authMessages'
import { List } from 'semantic-ui-react'
import { oneLowerCase, digitRegex, oneUpperCase } from 'constants/globalConstants'

const PasswordAcceptance = (props) => {
    const { value } = props
    return (
      <>
      <p><b> {intl(authMessages.passwordContainText)} </b></p>
        <List>
          <List.Item>
            <List.Icon name={oneLowerCase.test(value) ? 'check' : 'close'}
            color={oneLowerCase.test(value) ? '' : 'red'}
            />
            <List.Content>{intl(authMessages.atLeastOneLowerCase)}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name={oneUpperCase.test(value) ? 'check' : 'close'}
            color={oneUpperCase.test(value) ? '' : 'red'}
            />
            <List.Content>{intl(authMessages.atLeastOneUpperCase)}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name={digitRegex.test(value) ? 'check' : 'close'}
            color={digitRegex.test(value) ? '' : 'red'}
            />
            <List.Content>{intl(authMessages.atLeastOneNumber)}</List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name={value.length < 8 ? 'close' : 'check'}
            color={value.length < 8 ? 'red' : ''}
            />
            <List.Content>{intl(authMessages.atleast8Characters)}</List.Content>
          </List.Item>
        </List>
      </>
    )
}

PasswordAcceptance.propTypes = {
  value: PropTypes.string
}

export default PasswordAcceptance
