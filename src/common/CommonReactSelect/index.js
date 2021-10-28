import React from 'react'
import Select, { components } from 'react-select'
import PropTypes from 'prop-types'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'

const CommonReactSelect = (props) => {
  const { handlerSetData, selectedValue, className, placeholder,
    groupedOptions, isDisabled, validateOnBlur } = props

  const groupStyles = {
    // border: `2px dotted ${colourOptions[2].color}`,
    borderRadius: '5px',
    background: '#f2fcff'
  }



  const Group = props => (
    <div style={groupStyles} >
      <components.Group {...props} />
    </div>
  )


  return (
    <Select
      value={selectedValue && selectedValue.label ? selectedValue : null}
      options={groupedOptions}
      components={{ Group }}
      onChange={data => handlerSetData(data)}
      onBlur={validateOnBlur}
      className={className ? className : ''}
      placeholder={placeholder ? placeholder : intl(commonMessages.select)}
      noOptionsMessage={() => intl(commonMessages.noOptions)}
      isClearable
      isDisabled={isDisabled}
    />
  )
}

CommonReactSelect.propTypes = {
  groupedOptions: PropTypes.array,
  handlerSetData: PropTypes.func,
  selectedValue: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  validateOnBlur: PropTypes.func
}
export default CommonReactSelect
