import React, { useState, useEffect } from 'react'
import { phoneNumberConstants } from 'constants/phoneNumberConstant'
import { InputBox } from 'utils/formUtils'
import { Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './index.scss'
import InputMask from 'react-input-mask'
import intl from 'utils/intlMessage'
import dashboardMessages from 'constants/messages/dashboardMessages'

const CustomPhoneInput = (props) => {
  const { mobileDetails, setMobileDetails, validateOnBlur, userNumber } = props
  const { phone = '', isoCode, countryCode } = mobileDetails
  const [selectedOption, setSelectedOption] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(()=>{
    if(isoCode) {
      // eslint-disable-next-line
   const dialCode = phoneNumberConstants.filter(
    (item) => item.code === isoCode
  )[0]
  setSelectedOption(dialCode)
   }
   // eslint-disable-next-line
  }, [isoCode])

  const getPhoneNumberCode = (data) => {
    const code = []
    let searchOptions = phoneNumberConstants
    if (data) {
      searchOptions = phoneNumberConstants.filter((item) =>
        item.text.toLowerCase().includes(data.toLowerCase())
      )
    }
    searchOptions.map((item, index) => {
      const flagIcon = item.code
      code.push({
        key: index + 1,
        text: <img className="flag-image" src={item.flag} alt={item.code} width="23px" height="25px" />,
        value: item.code,
        content: `${item.text} ${item.dial_code}`,
        flag: flagIcon.toLowerCase()
      })
      return code
    })
    return code
  }

  const setPhoneNoHandler = (data) => {
    const value = data.replace(/[^\w\s]/gi, '')
    // if (/^[0-9]*$/g.test(value)) {
      setMobileDetails({
        ...mobileDetails,
        phone: value
      })
    // }
  }

  const onCountryChange = (e, { ...dropDownAttribute }) => {
    const { value } = dropDownAttribute
    // eslint-disable-next-line
    const dialCode = phoneNumberConstants.filter(
      (item) => item.code === value
    )[0]
    setSelectedOption(dialCode)
    setMobileDetails({
      ...mobileDetails,
      countryCode: dialCode.dial_code || '',
      isoCode: value,
      phone: value !== mobileDetails.isoCode ? '' : value
    })
  }

  return (
    <div className="notification_input">
      <div>
        <Dropdown
        inline
        placeholder="Class"
        value={isoCode}
        onChange={onCountryChange}
        fluid
        search={(_, data) => getPhoneNumberCode(data)}
        onClose={()=>setIsDropdownOpen(false)}
        onOpen={()=>setIsDropdownOpen(true)}
        selection
        options={getPhoneNumberCode()}
        disabled={userNumber}
        className={`${isDropdownOpen ? 'test55' : 'dropdown-none'}`}
        />
        {isDropdownOpen &&
        <span className="search-emoji countrySearchIcon" role="img" aria-label="Magnifying glass">🔎</span>
      }
      </div>
      <div className={`manageContact-CustomInput ${selectedOption && selectedOption.inputMask !== '' ? '' : 'non-masking-wrap'}`}>
        <span>{countryCode}</span>
        {selectedOption && selectedOption.inputMask !== '' ? (
          <InputMask
            mask={selectedOption.inputMask}
            alwaysShowMask={false}
            maskChar={null}
            label={''}
            type={'text'}
            name={'lastName'}
            placeholder={intl(dashboardMessages.mobileNumber)}
            value={phone}
            onChange={(e) => setPhoneNoHandler(e.target.value)}
            // minLength={7}
            // maxLength={14}
            disabled={userNumber}
            onBlur={(e) => validateOnBlur(e.target.name)}
            className="required-field masked-input-wrap"
            autoComplete={'new-password'}
          />
        ) : (
          <InputBox
            label={''}
            type={'text'}
            name={'lastName'}
            placeholder={intl(dashboardMessages.mobileNumber)}
            value={phone}
            onChange={(data) => {
              const value = data.replace(/[^\w\s]/gi, '')
              if (/^[0-9]*$/g.test(value)) {
                setMobileDetails({
                  ...mobileDetails,
                  phone: value
                })
              }
            }}
            maxLength={selectedOption?.maxLength || 14}
            disabled={userNumber}
            onBlur={(e) => validateOnBlur(e.target.name)}
            className="required-field"
          />
        )}
      </div>
    </div>
  )
}

CustomPhoneInput.propTypes = {
  mobileDetails: PropTypes.object,
  setMobileDetails: PropTypes.func,
  validateOnBlur: PropTypes.func,
  userNumber: PropTypes.bool
}

export default CustomPhoneInput
