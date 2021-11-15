import React, { useState, useEffect } from 'react'
import { Form, Grid, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import intl from 'utils/intlMessage'
import { InputBox } from 'utils/formUtils'
import commonMessages from 'constants/messages/commonMessages'
import dashboardMessages from 'constants/messages/dashboardMessages'
import Validator from 'utils/validator'
import { retrieveFromLocalStorage, sortSlectedRouteValue } from 'utils/helpers'
import ReactSelect from 'components/SearchPanel/reactSelect'
import CommonReactSelect from 'common/CommonReactSelect'
import { postcodeValidator } from 'postcode-validator'
import {
  genderOptions,
  ageBandOption,
  approxNumberFlights,
  travelAbroadOptions
} from 'constants/globalConstants'
import { preferredCountriesForPhoneInput } from 'constants/phoneNumberConstant'
import profileDetailsMessages from 'constants/messages/profileDetailsMessages'
import validationMessages from 'constants/messages/validationMessages'

const EditProfile = (props) => {
  const {
    error,
    setErrors,
    userData,
    setUserData,
    updateProfileDetails,
    userDetails,
    searchPanel: {
      possibleRoutes,
      nearestAirports,
      airportsWithMultiCity,
      souDesAirports
    },
    updateUserProfileLoading,
    dashboard: { countriesList }
  } = props
  const {
    firstName,
    lastName,
    addressFirst,
    addressSecond,
    city,
    state,
    postCode,
    departureCity,
    country,
    gender,
    ageGroup,
    approxFlightNum,
    travelAbroad
  } = userData || {}
  const token = retrieveFromLocalStorage('token')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const {
      firstName,
      lastName,
      address,
      gender,
      ageBand,
      flightsTakenAnnually,
      travellingAbroad
    } = userDetails || {}
    const { address1, address2, city, zip, airpot_city, state } = address || {}
    setUserData({
      ...userData,
      firstName: firstName ? firstName : '',
      lastName: lastName ? lastName : '',
      addressFirst: address1 || '',
      addressSecond: address2 || '',
      postCode: zip || '',
      country: getCountry(),
      city: city || '',
      state: state || '',
      departureCity: airpot_city ? JSON.parse(airpot_city) : {},
      gender: gender
        ? genderOptions.find((data) => data.value === gender)
        : null,
      ageGroup: ageBand
        ? ageBandOption.find((data) => data.value === ageBand)
        : null,
      approxFlightNum: flightsTakenAnnually
        ? approxNumberFlights.find(
            (data) => data.value === flightsTakenAnnually
          )
        : null,
      travelAbroad: travellingAbroad
        ? travelAbroadOptions.find((data) => data.value === travellingAbroad)
        : null
    })
    // eslint-disable-next-line
  }, [userDetails, countriesList]);

  // Validations on blur
  const validateOnBlur = (name) => {
    const { errors } = _isValid(name)
    let text = errors[name]
    let isPost = true
    if (country?.sortname) {
      isPost = postcodeValidator(postCode, country?.sortname)
    }
    if (name === 'postCode' && errors?.postCode === undefined && !isPost) {
      text = intl(validationMessages.invalidPostalCode)
    }
    setErrors({ ...error, [name]: text })
  }

  const formSubmitHandlerClick = () => {
    const { isValid } = _isValid()
    if (isValid) {
      const isPost = postcodeValidator(postCode, country.sortname)
      if (!isPost) {
        setErrors({ ...error, postCode: intl(validationMessages.invalidPostalCode) })
        return true
      }
      const data = {
        user: {
          access_token: token,
          first_name: firstName,
          last_name: lastName,
          address1: addressFirst,
          address2: addressSecond,
          country: country?.sortname,
          city: city,
          state: state,
          postal_code: postCode.toString().replace(/\s+/g, ''),
          airpot_city: JSON.stringify(departureCity),
          gender: gender?.value,
          age_band: ageGroup?.value,
          flights_taken_annually: approxFlightNum?.value,
          travelling_abroad_in_next_12_months: travelAbroad?.value
        }
      }
      updateProfileDetails({ data, name: 'userDetails' })
    } else {
      const { errors } = _isValid()
      const isPost = postcodeValidator(postCode, country.sortname)
      setErrors({
        ...errors,
        postCode: !isPost ? intl(validationMessages.invalidPostalCode) : null
      })
    }
  }

  // For profile form validation
  const _isValid = (field = null) => {
    const list = {
      firstName: ['minLength|2', 'noSpecialCharacter'],
      lastName: ['minLength|2', 'noSpecialCharacter'],
      addressFirst: ['minLength|2'],
      addressSecond: ['minLength|2'],
      city: ['minLength|2'],
      state: ['minLength|2']
    }
    const validate = Validator.createValidator(
      list,
      {
        firstName: firstName,
        lastName: lastName,
        addressFirst: addressFirst,
        addressSecond: addressSecond,
        state: state,
        country: country?.value,
        city: city,
        postCode: postCode,
        departureCity: departureCity?.value,
        gender: gender?.value,
        ageGroup: ageGroup?.value,
        approxFlightNum: approxFlightNum?.value,
        travelAbroad: travelAbroad?.value
        // currency: currency
      },
      field,
      {
        email: '',
        firstName: '',
        lastName: '',
        addressFirst: '',
        addressSecond: '',
        state: '',
        city: '',
        postCode: '',
        departureCity: '',
        gender: '',
        ageGroup: '',
        approxFlightNum: '',
        travelAbroad: ''
        // currency: ''
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

  const handlerSetData = (data, name) => {
    setUserData({
      ...userData,
      country: data
    })
    if (name === 'country' && postCode && data?.value) {
      const isPost = postcodeValidator(postCode, data?.sortname)
      setErrors({ ...error, city: null,
        state: null, postCode: !isPost ? intl(validationMessages.invalidPostalCode) : null })
    }else {
      setErrors({ ...error, city: null, state: null })
    }
  }

  const handlerSetDeptData = (data) => {
    setUserData({
      ...userData,
      departureCity: {
        name: data.label,
        value: data.value
      }
    })
  }

  const countryList = React.useMemo(() => {
    const list = countriesList
    const data = []
    // eslint-disable-next-line
    list.map((country) => {
      if (preferredCountriesForPhoneInput.includes(country.sortname)) {
        data.push({
          label: country.name,
          value: country.id,
          sortname: country.sortname
        })
      }
    })
    return data
    // eslint-disable-next-line
  }, [countriesList]);

  const handlerGetGroupOptions = () =>
    sortSlectedRouteValue(
      possibleRoutes,
      '',
      souDesAirports,
      airportsWithMultiCity,
      nearestAirports
    )

  const getCountry = () => {
    const selectedCountry = countriesList.find(
      (item) => item.sortname === userDetails?.country
    )
    return {
      label: selectedCountry?.name,
      value: selectedCountry?.id,
      sortname: selectedCountry?.sortname
    }
  }


  const errorCond = (error && (error.firstName || error.lastName || error.addressFirst
    || error.country
    || error.state
    || error.ageGroup
    || error.postCode
    || error.travelAbroad
    || error.approxNumberFlights
    )) ? true : false

  const isDisabled =
   (!firstName ||
    !lastName ||
    !addressFirst ||
    !country ||
    !city ||
    !ageGroup ||
    !postCode ||
    !travelAbroad ||
    !approxNumberFlights) || errorCond

  return (
    <Form className="account-setting__form">
      <Grid className="accordion-myprofile">
        <Grid.Row className="py-0">
          <Grid.Column mobile={12} tablet={8} computer={12}>
            <h2 className="tabsHeading">
              {intl(dashboardMessages.accountSettingProfileHead)}
            </h2>
            {!userDetails?.socialUserPasswordSet && (
              <span className="socialAccountText">
                {intl(dashboardMessages.accountSettingLogginWithGoogle)}
              </span>
            )}
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
              onBlur={(e) => validateOnBlur(e.target.name)}
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
              onBlur={(e) => validateOnBlur(e.target.name)}
              className="required-field"
            />
            {error && error.lastName &&
              <span className="error-text">{error.lastName}</span>
               }
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="py-0 j-c-c">
          <Grid.Column mobile={8} tablet={5} computer={7}>
            <InputBox
              label={intl(commonMessages.addressFirst)}
              placeholder={intl(commonMessages.addressFirst)}
              errorMessage={error.addressFirst}
              type={'text'}
              name={'addressFirst'}
              value={addressFirst}
              onChange={(name) =>
                handleInputChange('addressFirst', name.trimStart())
              }
              maxLength={70}
              onBlur={(e) => validateOnBlur(e.target.name)}
              className="required-field"
              autoComplete="address"
            />
            {error && error.addressFirst &&
              <span className="error-text">{error.addressFirst}</span>
               }
          </Grid.Column>

          <Grid.Column mobile={8} tablet={5} computer={7}>
            <InputBox
              label={intl(commonMessages.addressSecond)}
              placeholder={intl(commonMessages.addressSecond)}
              errorMessage={error.addressSecond}
              type={'text'}
              name={'addressSecond'}
              value={addressSecond}
              onChange={(name) =>
                handleInputChange('addressSecond', name.trimStart())
              }
              maxLength={70}
              onBlur={(e) => validateOnBlur(e.target.name)}
              autoComplete="address"
            />
            {error && error.addressSecond &&
              <span className="error-text">{error.addressSecond}</span>
               }
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="py-0 j-c-c countryRow">
          <Grid.Column mobile={8} tablet={5} computer={7}>
            <label>
              {intl(commonMessages.county)}
              <span className="color-red">*</span>
            </label>
            <CommonReactSelect
              groupedOptions={countryList}
              handlerSetData={(data) => {
                handlerSetData(data, 'country')
              }}
              selectedValue={country}
              className={error.country ? 'error-field' : ''}
              placeholder={intl(commonMessages.county)}
              validateOnBlur={() => validateOnBlur('country')}
            />
          </Grid.Column>

          <Grid.Column mobile={8} tablet={5} computer={7}>
            <InputBox
              label={intl(commonMessages.cityText)}
              placeholder={intl(commonMessages.cityText)}
              errorMessage={error.city}
              type={'text'}
              name={'city'}
              value={city}
              onChange={(name) =>
                handleInputChange('city', name.trimStart())
              }
              onBlur={(e) => validateOnBlur(e.target.name)}
              className="required-field"
            />
            {error && error.city &&
              <span className="error-text">{error.city}</span>
               }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="py-0 j-c-c">
          <Grid.Column mobile={8} tablet={5} computer={7} className="mt-1">
            <InputBox
              label={intl(profileDetailsMessages.countyStateText)}
              placeholder={intl(profileDetailsMessages.countyStateText)}
              errorMessage={error.state}
              type={'text'}
              name={'state'}
              value={state}
              onChange={(name) =>
                handleInputChange('state', name.trimStart())
              }
              onBlur={(e) => validateOnBlur(e.target.name)}
            />
            {error && error.state &&
              <span className="error-text">{error.state}</span>
               }
          </Grid.Column>
          <Grid.Column mobile={8} tablet={5} computer={7} className="mt-1">
            <InputBox
              label={intl(profileDetailsMessages.postalZipCode)}
              placeholder={intl(profileDetailsMessages.postalZipCode)}
              errorMessage={error.postCode}
              type={'text'}
              name={'postCode'}
              value={postCode}
              onChange={(name) =>
                handleInputChange('postCode', name.trimStart())
              }
              maxLength={25}
              onBlur={(e) => e.target.value && validateOnBlur(e.target.name)}
              className="required-field"
            />
            {error && error.postCode &&
            <span className="error-text">{error.postCode}</span>
               }
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="py-0 text-left">
          <Grid.Column mobile={8} tablet={5} computer={7}>
            <label>
              {intl(profileDetailsMessages.closestAirport)}
            </label>
            <ReactSelect
              handlerSetData={handlerSetDeptData}
              selectedValue={departureCity}
              className={error.departureCity ? 'error-field' : ''}
              groupedOptions={handlerGetGroupOptions()}
              validateOnBlur={() => validateOnBlur('departureCity')}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              locationLabel={'profileDetailsModal'}
            />
          </Grid.Column>
          <Grid.Column mobile={8} tablet={5} computer={3}>
            <label>
              {intl(commonMessages.ageBand)}
              <span className="color-red">*</span>
            </label>
            <CommonReactSelect
              groupedOptions={ageBandOption}
              handlerSetData={(data) => {
                handleInputChange('ageGroup', data)
              }}
              selectedValue={ageGroup}
              className={error.ageGroup ? 'error-field' : ''}
              placeholder={intl(commonMessages.ageBand)}
              validateOnBlur={() => validateOnBlur('ageGroup')}
            />
          </Grid.Column>
          <Grid.Column mobile={8} tablet={5} computer={4}>
            <label>
              {intl(commonMessages.genderSelection)}
            </label>
            <CommonReactSelect
              groupedOptions={genderOptions}
              handlerSetData={(data) =>
                handleInputChange('gender', data)
              }
              selectedValue={gender}
              className={error.gender ? 'error-field' : ''}
              placeholder={intl(commonMessages.genderSelection)}
              validateOnBlur={() => validateOnBlur('gender')}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="py-0 j-c-c">
          <Grid.Column mobile={8} tablet={5} computer={7}>
            <label>
              {intl(commonMessages.approxFlights)}
              <span className="color-red">*</span>
            </label>
            <CommonReactSelect
              groupedOptions={approxNumberFlights}
              handlerSetData={(data) => {
                handleInputChange('approxFlightNum', data)
              }}
              selectedValue={approxFlightNum}
              className={error.approxFlightNum ? 'error-field' : ''}
              placeholder={intl(commonMessages.select)}
              validateOnBlur={() => validateOnBlur('approxFlightNum')}
            />
          </Grid.Column>
          <Grid.Column mobile={8} tablet={5} computer={7}>
            <label>
              {intl(commonMessages.howLikelyYouTravel)}
              <span className="color-red">*</span>
            </label>
            <CommonReactSelect
              groupedOptions={travelAbroadOptions}
              handlerSetData={(data) => {
                handleInputChange('travelAbroad', data)
              }}
              selectedValue={travelAbroad}
              className={error.travelAbroad ? 'error-field' : ''}
              placeholder={intl(commonMessages.select)}
              validateOnBlur={() => validateOnBlur('travelAbroad')}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="py-0">
          <Grid.Column width={16} className="mt-10">
            <Button
              disabled={
                Boolean(updateUserProfileLoading === 'userDetails') || isDisabled
              }
              loading={Boolean(updateUserProfileLoading === 'userDetails')}
              size={'small'}
              primary
              content={intl(commonMessages.update)}
              onClick={formSubmitHandlerClick}
              className="btn btn--medium-blue btn--account-setting"
            />
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
