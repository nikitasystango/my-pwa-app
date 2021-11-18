import React, { useEffect } from 'react'
import { Form, Grid, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import intl from 'utils/intlMessage'
import { InputBox } from 'utils/formUtils'
import commonMessages from 'constants/messages/commonMessages'
import dashboardMessages from 'constants/messages/dashboardMessages'
import Validator from 'utils/validator'
import { retrieveFromLocalStorage } from 'utils/helpers'
import CommonReactSelect from 'common/CommonReactSelect'
import { countryOptionsConstant } from 'constants/countryOptionsConstant'

const EditProfile = (props) => {
  const {
    error,
    setErrors,
    userData,
    setUserData,
    updateProfileDetails,
    userDetails,
    updateUserProfileLoading
  } = props
  const {
    firstName,
    lastName,
    city,
    state,
    country
  } = userData || {}
  const token = retrieveFromLocalStorage('token')

  useEffect(() => {
    const { firstName, lastName } = userDetails || {}
    setUserData({
      ...userData,
      firstName: firstName ? firstName : '',
      lastName: lastName ? lastName : '',
      country: getCountry()
    })
    // eslint-disable-next-line
  }, [userDetails]);

  const handlerSetData = (data, name) => {
    setUserData({
      ...userData,
      country: name === 'country' ? data : country,
      state: name === 'state' ? data : name === 'country' ? null : state,
      city:
        name === 'city'
          ? data
          : name === 'country'
          ? null
          : name === 'state'
          ? null
          : city
    })
    // if (name === 'country' && postCode && data?.value) {
    //   const isPost = postcodeValidator(postCode, data?.value)
    //   setErrors({ ...error, postCode: !isPost ? 'Invalid postal code' : null })
    // }
  }

  const countryList = React.useMemo(() => {
    const list = countryOptionsConstant
    const data = []
    // eslint-disable-next-line
    list.map((country) => {
      data.push({
        label: country.text,
        value: country.value
      })
    })
    return data
    // eslint-disable-next-line
  }, [countryOptionsConstant]);

  // Validations on blur
  const validateOnBlur = (name) => {
    const { errors } = _isValid(name)
    setErrors({ ...error, [name]: errors[name] })
  }

  const formSubmitHandlerClick = () => {
    const { isValid } = _isValid()
    if (isValid) {
      const data = {
        user: {
          access_token: token,
          first_name: firstName,
          last_name: lastName,
          country: country?.value
        }
      }
      updateProfileDetails({ data, name: 'userDetails' })
    } else {
      const { errors } = _isValid()
      setErrors({ ...errors })
    }
  }


  // For profile form validation
  const _isValid = (field = null) => {
    const list = {
      firstName: ['minLength|2', 'noSpecialCharacter'],
      lastName: ['minLength|2', 'noSpecialCharacter']
      // country: ['required']
      // currency: ['required']
    }
    const validate = Validator.createValidator(
      list,
      {
        firstName: firstName,
        lastName: lastName,
        country: country?.value
        // currency: currency
      },
      field,
      {
        country: '',
        firstName: '',
        lastName: ''
      }
    )

    return validate
  }

  const handleInputChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value
    })
    setErrors({ ...error, [name]: null })
  }

  const getCountry = () => {
    const selectedCountry = countryOptionsConstant.find(
      (item) => item.value === userDetails?.country
    )
    if(selectedCountry && selectedCountry.text) {
      return {
        label: selectedCountry?.text,
        value: selectedCountry?.value
      }
    }else {
      return null
    }
  }
  const errorCond = (error && (error.firstName || error.lastName|| error.country)) ? true : false

  const isDisabled =
   (!firstName ||
    !lastName ||
    !country) || errorCond

  return (
    <Form className="account-setting__form">
      <Grid className="accordion-myprofile">
        <Grid.Row className="py-0">
          <Grid.Column mobile={12} tablet={8} computer={12}>
            <h2 className="tabsHeading">
              {intl(dashboardMessages.accountSettingProfileHead)}
            </h2>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="py-0 j-c-c">
          <Grid.Column mobile={8} tablet={5} computer={7}>
            <InputBox
              errorMessage={error.firstName}
              label={intl(commonMessages.firstName)}
              placeholder={intl(commonMessages.firstName)}
              type={'text'}
              name={'firstName'}
              value={firstName}
              onChange={(name) =>
                 handleInputChange('firstName', name.trimStart().replace(/[^A-Za-z]/gi, ''))
              }
              maxLength={25}
              onBlur={(e) =>
                validateOnBlur(e.target.name)
              }
              className="required-field"
            />
            {error && error.firstName &&
            <span className="error-text">{error.firstName}</span>
               }
          </Grid.Column>
          <Grid.Column mobile={8} tablet={5} computer={7}>
            <InputBox
              label={intl(commonMessages.lastName)}
              placeholder={intl(commonMessages.lastName)}
              errorMessage={error.lastName}
              type={'text'}
              name={'lastName'}
              value={lastName}
              onChange={(name) =>
                handleInputChange('lastName', name.trimStart().replace(/[^A-Za-z]/gi, ''))
              }
              maxLength={25}
              onBlur={(e) =>
                validateOnBlur(e.target.name)
              }
              className="required-field"
            />
            {error && error.lastName &&
              <span className="error-text">{error.lastName}</span>
               }
           
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="py-0 j-c-c">
          <Grid.Column mobile={8} tablet={5} computer={7}>
            <label>
              {intl(commonMessages.county)}
              <span className="color-red">*</span>
            </label>
            <CommonReactSelect
              groupedOptions={countryList}
              handlerSetData={(data) => {
                handlerSetData(data, 'country')
                setErrors({ ...error, city: null, state: null })
              }}
              selectedValue={country}
              className={error.country ? 'error-field' : ''}
              placeholder={intl(commonMessages.county)}
              validateOnBlur={() => validateOnBlur('country')}
            />
          </Grid.Column>
        </Grid.Row>
        {!userDetails?.socialUserPasswordSet && (
              <span>
                {intl(dashboardMessages.accountSettingLogginWithGoogle)}
              </span>
            )}
        <Grid.Row className="py-0">
          <Grid.Column width={16} className="mt-10">
            <Button disabled={Boolean(updateUserProfileLoading === 'userDetails') || isDisabled} loading={Boolean(updateUserProfileLoading === 'userDetails')} size={'small'} primary content={intl(commonMessages.update)} onClick={formSubmitHandlerClick} className="btn btn--medium-blue btn--account-setting" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  )
}

EditProfile.propTypes = {
  error: PropTypes.object,
  setErrors: PropTypes.func,
  userData: PropTypes.object,
  setUserData: PropTypes.func,
  updateProfileDetails: PropTypes.func,
  userDetails: PropTypes.object,
  searchPanel: PropTypes.object,
  updateUserProfileLoading: PropTypes.bool
}

export default EditProfile
