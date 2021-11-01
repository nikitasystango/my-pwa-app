import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Grid, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { InputBox } from 'utils/formUtils'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import { retrieveFromLocalStorage, sortSlectedRouteValue } from 'utils/helpers'
import Validator from 'utils/validator'
import ReactSelect from 'components/SearchPanel/reactSelect'
import './index.scss'
import searchPanelMessages from 'constants/messages/searchPanelMessages'
import CommonReactSelect from 'common/CommonReactSelect'
import { postcodeValidator } from 'postcode-validator'
import {
  genderOptions,
  ageBandOption,
  approxNumberFlights,
  travelAbroadOptions
} from 'constants/globalConstants'
import { preferredCountriesForPhoneInput } from 'constants/phoneNumberConstant'
import { getStatesOfCountry } from 'utils/commonFunction'

const UpdateUserDetailModal = (props) => {
  const [error, setErrors] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    addressFirst: '',
    addressSecond: '',
    country: '',
    city: '',
    state: '',
    postCode: '',
    departureCity: '',
    gender: '',
    ageGroup: '',
    approxFlightNum: '',
    travelAbroad: ''
  })

  const {
    toggleModal,
    updateUserName,
    updateUserNameLoading,
    getSouDesLocations,
    getSouDesPossibleRoutes,
    searchPanel: {
      possibleRoutes,
      nearestAirports,
      airportsWithMultiCity,
      souDesAirports
    },
    userDetails,
    userId,
    getCountriesList,
    getStateList,
    getCityList,
    dashboard: { countriesList, statesList, citiesList }
  } = props
  const token = retrieveFromLocalStorage('token')
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

  useEffect(() => {
    getSouDesLocations({ selectedAirline: 'BA' })
    getSouDesPossibleRoutes({ selectedAirline: 'BA' })
    getCountriesList()
    getStateList()
    getCityList()
    // eslint-disable-next-line
  }, []);

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
    const { address1, address2, city, zip, airpot_city } = address || {}
    setUserData({
      ...userData,
      firstName: firstName ? firstName : '',
      lastName: lastName ? lastName : '',
      addressFirst: address1 || '',
      addressSecond: address2 || '',
      postCode: zip || '',
      country: getCountry() || null,
      city: city
        ? {
            label: city || '',
            value: city || ''
          }
        : null,
      state: getState(),
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
  }, [userDetails, countriesList, statesList, citiesList]);

  const getState = () => {
    const selectedCountry = countriesList.find(
      (item) => item.sortname === userDetails?.country
    )
    const list = getStatesOfCountry(
      statesList,
      selectedCountry?.id,
      'country_id'
    )
    const selectedState = list.find(
      (item) => item.id === userDetails?.address?.state
    )
    if (selectedState && selectedState.name) {
      return {
        label: selectedState?.name || undefined,
        value: selectedState?.id || undefined,
        countryId: selectedState?.country_id || undefined
      }
    } else {
      return null
    }
  }

  const formSubmitHandlerClick = () => {
    const { isValid } = _isValid()
    if (isValid) {
      const isPost = postcodeValidator(postCode, country?.sortname)
      if (!isPost) {
        setErrors({ ...error, postCode: 'Invalid postal code' })
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
          city: city?.value,
          state: state?.value,
          postal_code: postCode.toString().replace(/\s+/g, ''),
          airpot_city: JSON.stringify(departureCity),
          gender: gender?.value,
          age_band: ageGroup?.value,
          flights_taken_annually: approxFlightNum?.value,
          travelling_abroad_in_next_12_months: travelAbroad?.value
        },
        id: userId
      }
      updateUserName({ data })
    } else {
      const { errors } = _isValid()
      setErrors({ ...errors })
    }
  }

  // Validations on blur
  const validateOnBlur = (name) => {
    const { errors } = _isValid(name)
    let text = errors[name]
    let isPost = true
    if (country?.sortname) {
      isPost = postcodeValidator(postCode, country?.sortname)
    }
    if (name === 'postCode' && errors?.postCode === undefined && !isPost) {
      text = 'Invalid postal code'
    }
    setErrors({ ...error, [name]: text })
  }

  // For profile form validation
  const _isValid = (field = null) => {
    let list = {
      firstName: ['minLength|2', 'noSpecialCharacter'],
      lastName: ['minLength|2', 'noSpecialCharacter'],
      addressFirst: ['minLength|2'],
      addressSecond: ['minLength|2']
      // state: ['required'],
      // country: ['required'],
      // postCode: ['required'],
      // departureCity: ['required'],
      // gender: ['required'],
      // ageGroup: ['required'],
      // approxFlightNum: ['required'],
      // travelAbroad: ['required']
    }
    // if (cityList.length) {
    //   list = {
    //     ...list,
    //     city: ['required']
    //   }
    // }
    const validate = Validator.createValidator(
      list,
      {
        firstName: firstName,
        lastName: lastName,
        addressFirst: addressFirst,
        addressSecond: addressSecond,
        state: state?.value,
        country: country?.value,
        city: city?.value,
        postCode: postCode,
        departureCity: departureCity?.value,
        gender: gender?.value,
        ageGroup: ageGroup?.value,
        approxFlightNum: approxFlightNum?.value,
        travelAbroad: travelAbroad?.value
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
      }
    )

    return validate
  }

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
    if (name === 'country' && postCode && data?.sortname) {
      const isPost = postcodeValidator(postCode, data?.sortname)
      setErrors({
        ...error,
        city: null,
        state: null,
        postCode: !isPost ? 'Invalid postal code' : null
      })
    } else {
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

  const stateList = React.useMemo(() => {
    const list = getStatesOfCountry(statesList, country?.value, 'country_id')
    const data = []
    // eslint-disable-next-line
    list.map((state) => {
      data.push({
        label: state.name,
        value: state.id,
        countryId: state.country_id
      })
    })
    return data
    // eslint-disable-next-line
  }, [country]);

  const cityList = React.useMemo(() => {
    const list = getStatesOfCountry(citiesList, state?.value, 'state_id')
    const data = []
    // eslint-disable-next-line
    list.map((city) => {
      data.push({
        label: city.name,
        value: city.name,
        stateId: city.state_id
      })
    })
    return data
    // eslint-disable-next-line
  }, [state, country]);

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

  const handleInputChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value
    })
    setErrors({ ...error, [name]: null })
  }

  const errorCond = (error && (error.firstName || error.lastName || error.addressFirst
    || error.country
    || error.state
    || error.departureCity
    || error.ageGroup
    || error.gender
    || error.postCode
    || error.travelAbroad
    || error.approxNumberFlights
    )) ? true : false
    const cityCond = cityList?.length ? !city ? true : false : false
  const isDisabled =
   (!firstName ||
    !lastName ||
    !addressFirst ||
    !country ||
    !state ||
    !departureCity ||
    !ageGroup ||
    !gender ||
    !postCode ||
    !travelAbroad ||
    !approxNumberFlights) || errorCond || cityCond

  return (
    <Modal
      open={toggleModal}
      closeOnDimmerClick={false}
      className="cst-popup updateProfilePopup"
    >
      <Header content={intl(commonMessages.updateProfileDetails)} />
      <Modal.Content className="p-0 mb-1">
        <>
          <Form className="account-popup-setting__form">
            <Grid className="">
              <Grid.Row className="py-0 j-c-c">
                <Grid.Column mobile={8} tablet={8} computer={8}>
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

                <Grid.Column mobile={8} tablet={8} computer={8}>
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
                <Grid.Column mobile={8} tablet={8} computer={8}>
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

                <Grid.Column mobile={8} tablet={8} computer={8}>
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

              <Grid.Row className="py-0 j-c-c">
                <Grid.Column mobile={8} tablet={8} computer={8}>
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

                <Grid.Column mobile={8} tablet={8} computer={8}>
                  <label>
                    {intl(commonMessages.stateText)}
                    <span className="color-red">*</span>
                  </label>
                  <CommonReactSelect
                    groupedOptions={stateList}
                    handlerSetData={(data) => handlerSetData(data, 'state')}
                    selectedValue={state}
                    className={error.state ? 'error-field' : ''}
                    placeholder={intl(commonMessages.stateText)}
                    isDisabled={!country?.value}
                    validateOnBlur={() => validateOnBlur('state')}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="py-0 j-c-c">
                <Grid.Column
                  mobile={8}
                  tablet={8}
                  computer={8}
                  className="mt-1"
                >
                  <label>
                    {intl(commonMessages.cityText)}{' '}
                    {cityList.length ? (
                      <span className="color-red">*</span>
                    ) : (
                      ''
                    )}
                  </label>
                  <CommonReactSelect
                    groupedOptions={cityList}
                    handlerSetData={(data) => handlerSetData(data, 'city')}
                    selectedValue={city}
                    className={error.city ? 'error-field' : ''}
                    placeholder={intl(commonMessages.cityText)}
                    isDisabled={!state?.value || !cityList.length}
                    validateOnBlur={() => validateOnBlur('city')}
                  />
                </Grid.Column>
                <Grid.Column
                  mobile={8}
                  tablet={8}
                  computer={8}
                  className="mt-1"
                >
                  <InputBox
                    label={intl(commonMessages.postCodeNum)}
                    placeholder={intl(commonMessages.postCodeNum)}
                    errorMessage={error.postCode}
                    type={'text'}
                    name={'postCode'}
                    value={postCode}
                    onChange={(name) =>
                      handleInputChange('postCode', name.trimStart())
                    }
                    maxLength={25}
                    onBlur={(e) => validateOnBlur(e.target.name)}
                    className="required-field"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="py-0 text-left">
                <Grid.Column mobile={16} tablet={8} computer={8}>
                  <label>
                    {intl(commonMessages.departure)}
                    <span className="color-red">*</span>
                  </label>
                  <ReactSelect
                    handlerSetData={handlerSetDeptData}
                    selectedValue={departureCity}
                    className={error.departureCity ? 'error-field' : ''}
                    placeholder={intl(searchPanelMessages.departureCityAirport)}
                    groupedOptions={handlerGetGroupOptions()}
                    validateOnBlur={() => validateOnBlur('departureCity')}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    locationLabel={'profileDetailsModal'}
                  />
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={8}>
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
              </Grid.Row>

              <Grid.Row className="py-0 j-c-c mt-1 mb-1">
                <Grid.Column mobile={8} tablet={8} computer={8}>
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

                <Grid.Column mobile={8} tablet={8} computer={8}>
                  <label>
                    {intl(commonMessages.genderSelection)}
                    <span className="color-red">*</span>
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

              <Grid.Row className="py-0">
                <Grid.Column mobile={16} tablet={8} computer={8}>
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
              <Grid.Row>
                <Grid.Column className="mt-10">
                  <Button
                    disabled={
                      Boolean(updateUserNameLoading) ||
                      isDisabled
                    }
                    loading={Boolean(updateUserNameLoading)}
                    size={'small'}
                    primary
                    content={intl(commonMessages.save)}
                    onClick={formSubmitHandlerClick}
                    className="btn btn--medium-blue btn--account-setting"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </>
      </Modal.Content>
    </Modal>
  )
}

UpdateUserDetailModal.propTypes = {
  toggleModal: PropTypes.bool,
  updateUserName: PropTypes.func,
  updateUserNameLoading: PropTypes.bool,
  getSouDesLocations: PropTypes.func,
  getSouDesPossibleRoutes: PropTypes.func,
  searchPanel: PropTypes.object,
  userDetails: PropTypes.object,
  userId: PropTypes.number,
  getCountriesList: PropTypes.func,
  getStateList: PropTypes.func,
  getCityList: PropTypes.func,
  dashboard: PropTypes.object
}

export default UpdateUserDetailModal