import React, { useState } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import intl from 'utils/intlMessage'
import { InputBox } from 'utils/formUtils'
import { countryOptionsConstant } from 'constants/countryOptionsConstant'
import commonMessages from 'constants/messages/commonMessages'
import dashboardMessages from 'constants/messages/dashboardMessages'
import Validator from 'utils/validator'
import { retrieveFromLocalStorage } from 'utils/helpers'
import { SelectBox } from 'utils/formUtils'

const EditProfile = (props) => {
  const {
    error,
    setErrors,
    userData,
    setUserData,
    formSubmitHandlerRuntime
  } = props
  const {
    firstName,
    lastName,
    country
  } = userData || {}
  const token = retrieveFromLocalStorage('token')

  // Validations on blur
  const validateOnBlur = (name, fieldName, value) => {
    const { errors } = _isValid(name)
    setErrors({ ...error, [name]: errors[name] })
    if(!errors[name]) {
      const data = {
        user: {
          access_token: token,
          [fieldName]: value
        }
      }
      formSubmitHandlerRuntime(data)
    }
  }

  // For profile form validation
  const _isValid = (field = null) => {
    const validate = Validator.createValidator(
      {
        firstName: ['required', 'minLength|2', 'noSpecialCharacter'],
        lastName: ['required', 'minLength|2', 'noSpecialCharacter'],
        country: ['required']
        // currency: ['required']
      },
      {
        firstName: firstName,
        lastName: lastName,
        country: country
        // currency: currency
      },
      field,
      {
        firstName: '',
        lastName: '',
        country: ''
        // currency: ''
      }
    )

    return validate
  }

  return (
    <Grid.Row className="py-0">
      <Grid.Column mobile={8} tablet={5} computer={5}>
        <InputBox
        errorMessage={error.firstName}
        label={intl(commonMessages.firstName)}
        placeholder={intl(commonMessages.firstName)}
        type={'text'}
        name={'firstName'}
        value={firstName}
        onChange={name => setUserData({
          ...userData,
          firstName: name.trimStart().replace(/[^A-Za-z]/gi, '')
        })}
        maxLength={25}
        onBlur={(e) => validateOnBlur(e.target.name, 'first_name', firstName)}
        className="required-field"
        />
      </Grid.Column>
      <Grid.Column mobile={8} tablet={5} computer={5}>
        <InputBox
        label={intl(commonMessages.lastName)}
        placeholder={intl(commonMessages.lastName)}
        errorMessage={error.lastName}
        type={'text'}
        name={'lastName'}
        value={lastName}
        onChange={name => setUserData({
          ...userData,
          lastName: name.trimStart().replace(/[^A-Za-z]/gi, '')
        })}
        maxLength={25}
        onBlur={(e) => validateOnBlur(e.target.name, 'last_name', lastName)}
        className="required-field"
        />
        <span>{intl(dashboardMessages.accountSettingLogginWithGoogle)}</span>
      </Grid.Column>
      <Grid.Column mobile={8} tablet={5} computer={5}>
        <Form.Field className="required-field">
          <SelectBox
          errorMessage={error.country}
          name="country"
          options={countryOptionsConstant}
          label={intl(commonMessages.county)}
          placeholder={intl(commonMessages.county)}
          onChange={(data)=> setUserData({
            ...userData,
            country: data
          })}
          onBlur={() => validateOnBlur('country', 'country', country)}
          Datavalue={country}
          className="required-field"
          />
        </Form.Field>
      </Grid.Column>
    </Grid.Row>
  )
}

EditProfile.propTypes = {
  error: PropTypes.object,
  setErrors: PropTypes.func,
  userData: PropTypes.object,
  setUserData: PropTypes.func,
  formSubmitHandlerRuntime: PropTypes.func
}

export default EditProfile
