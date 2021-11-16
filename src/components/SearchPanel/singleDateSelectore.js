import React, { useState } from 'react'
import { SingleDatePicker } from 'react-dates'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ArrowNext, ArrowPrev } from '../../utils/svgs'
import { SingleDatePickerWrapper } from './style'

const SingleDateSelectore = (props) => {
  const { date, name, onSelectTravel, placeholder, isOutsideRange, renderDayContents, startMonthDate } = props
  const [focused, setFocused] = useState(false)

  const onDateChange = date => {
    onSelectTravel(name, date)
  }

  const onFocusChange = ({ focused }) => {
    setFocused(focused)
  }

  // const resetDate = () => {
  //   onSelectTravel(name, null)
  // }

  const getStartMonthDate = () => {
    if (startMonthDate) {
      return startMonthDate
    } else {
      return moment()
    }
  }

  return (
    <SingleDatePickerWrapper>
      <SingleDatePicker
        date={date}
        focused={focused}
        numberOfMonths={1}
        onDateChange={onDateChange}
        onFocusChange={onFocusChange}
        displayFormat="DD/MM/YYYY"
        // onNextMonthClick={resetDate}
        // onPrevMonthClick={resetDate}
        placeholder={placeholder}
        isOutsideRange={day => isOutsideRange(name, day)}
        transitionDuration={0}
        navPrev={<ArrowPrev />}
        navNext={<ArrowNext />}
        renderDayContents={renderDayContents}
        initialVisibleMonth={() => getStartMonthDate()}
      />
    </SingleDatePickerWrapper>
  )
}

SingleDateSelectore.propTypes = {
  date: PropTypes.object,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onSelectTravel: PropTypes.func,
  isOutsideRange: PropTypes.func,
  startMonthDate: PropTypes.object,
  renderDayContents: PropTypes.func
}

export default React.memo(SingleDateSelectore)

