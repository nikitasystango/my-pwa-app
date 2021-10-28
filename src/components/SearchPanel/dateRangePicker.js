import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DateRangePicker } from 'react-dates'
import { ArrowNext, ArrowPrev } from 'utils/svgs'
import moment from 'moment'

const DateRangeSelectore = (props) => {

  const { startDate, isOutsideRange, disabled, endDate, startDateId,
    endDateId, startName, endName, updateSelectedDateRange, startMonthDate, clearDates } = props
  const [focused, setFocus] = useState(null)

  const changeHandler = ({ startDate, endDate }) => {
    if(startDate=== null && endDate === null) {
      clearDates(startName, endName)
      setFocus(null)
    }else{
    if (focused === 'startDate') {
      updateSelectedDateRange(startName, startDate)
    } else {
      updateSelectedDateRange(endName, endDate)
    }
  }
  }

  const renderDayContent = (date) => {
    return <div className="CalendarDay__Date">{moment(date).format('DD')}</div>
  }

  const getStartMonthDate = () => {
    if (startMonthDate) {
      return startMonthDate
    } else {
      return moment()
    }
  }

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId={startDateId}
      endDate={endDate}
      endDateId={endDateId}
      onDatesChange={({ startDate, endDate }) => changeHandler({ startDate, endDate, startDateId })}
      focusedInput={focused}
      numberOfMonths={1}
      daySize={35}
      minimumNights={0}
      displayFormat="DD/MM/YYYY"
      onFocusChange={focusedInput => {
        setFocus(focusedInput)
      }}
      disabled={disabled}
      isOutsideRange={(day) => isOutsideRange(day, focused)}
      navPrev={<ArrowPrev />}
      navNext={<ArrowNext />}
      renderDayContents={date => renderDayContent(date)}
      initialVisibleMonth={() => getStartMonthDate()}
      readOnly
      showClearDates
      minDate={moment()}
    />
  )
}

DateRangeSelectore.propTypes = {
  updateSelectedDateRange: PropTypes.func,
  startName: PropTypes.string,
  endName: PropTypes.string,
  disabled: PropTypes.bool,
  startDateId: PropTypes.string,
  endDateId: PropTypes.string,
  isOutsideRange: PropTypes.func,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  startMonthDate: PropTypes.object,
  clearDates: PropTypes.func
}

export default React.memo(DateRangeSelectore)

