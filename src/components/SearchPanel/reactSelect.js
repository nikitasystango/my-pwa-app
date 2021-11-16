import React from 'react'
import Select, { components } from 'react-select'
import PropTypes from 'prop-types'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import mapViewMessages from 'constants/messages/mapViewMessages'

const ReactSelect = (props) => {
  const { handlerSetData, selectedValue, className, placeholder,
    groupedOptions, locationLabel='', isOpen, setIsOpen, isCalendarHover, updateReducerState, validateOnBlur, journeyType, flyToSearch = '' } = props

  const groupStyles = {
    // border: `2px dotted ${colourOptions[2].color}`,
    borderRadius: '5px',
    background: '#f2fcff'
  }

  const selectStyles = {
    list: () => ({ height: 60 })
  }

  const Group = props => (
    <div style={groupStyles} >
      <components.Group {...props} />
    </div>
  )

  const SelectMenuButton = (props) => (
    <components.MenuList {...props}>
      {locationLabel=== 'mapview' &&
      <span className="header-menulist">
        {intl(mapViewMessages.directlyOperatedByBA, journeyType !== 'return' && flyToSearch === 'travelTo' ? 'from' : 'to')}
      </span>
       }
      {props.children}
    </components.MenuList >
    )

  React.useMemo(()=> {
    // Close dropdown if div overlaps calendar
    if(isCalendarHover) {
      setIsOpen(false)
      updateReducerState('flights', 'isCalendarHover', false)
    }
     // eslint-disable-next-line
  }, [isCalendarHover])

  const getValue = () => {
    let data = ''
    if (selectedValue.value) {
      data = {
        value: selectedValue.value,
        label: selectedValue.name
      }
    }
    return data
  }

  const filterOptions = (candidate, input) => {
    const sea = candidate?.data?.search?.toLowerCase()
    if (input && sea) {
      const inputValue = input.toLowerCase()
      return sea.includes(inputValue)
    }
    return true
  }

  const handleDeptBlur = () => {
    validateOnBlur()
    setIsOpen(false)
  }

  const onKeyDown = e => {
    if (e.keyCode === 8) {
      handlerSetData({
        name: '',
        value: ''
      })
      setIsOpen(false)
    }
  }

  return (
    <Select
      value={getValue()}
      filterOption={filterOptions}
      options={groupedOptions}
      components={{ Group, MenuList: SelectMenuButton }}
      onChange={data =>
            handlerSetData(data)
        }
      className={className ? className : ''}
      placeholder={placeholder ? placeholder : intl(commonMessages.select)}
      noOptionsMessage={() => locationLabel=== 'mapview' ? null : intl(commonMessages.noOptions)}
      styles={locationLabel=== 'mapview' && selectStyles}
      menuIsOpen={isOpen}
      onMenuOpen={()=> setIsOpen(true)}
      onMenuClose={()=> setIsOpen(false)}
      onBlur={()=> {locationLabel === 'profileDetailsModal' ? handleDeptBlur() : setIsOpen(false)}}
      onKeyDown={onKeyDown}
    />
  )
}

ReactSelect.propTypes = {
  groupedOptions: PropTypes.array,
  handlerSetData: PropTypes.func,
  selectedValue: PropTypes.object,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  locationLabel: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  isCalendarHover: PropTypes.bool,
  updateReducerState: PropTypes.func,
  validateOnBlur: PropTypes.func
}
export default ReactSelect
