import React, { useEffect } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import './dateRangePicker.scss'
import { ArrowNext, ArrowPrev } from 'utils/svgs'
import intl from 'utils/intlMessage'
import flightMessages from 'constants/messages/flightMessages'
import commonMessages from 'constants/messages/commonMessages'

const DateSelect = (props) => {
  const { retDates, depDates, toggalDatesModal, focused, focusedReturn, setDepFocus, setReturnFocus,
    setReturnDates, setdepDates, setToggalDatesModalHandler, jType, setSelctedDatesHandler,
    departureStartDate, departureEndDate, returnStartDate, returnEndDate, updateReducerState } = props
  const { depStartDateState, depEndDateState } = depDates
  const { retStartDateState, retEndDateState } = retDates
  const ref = React.useRef()

  const handleReturnOutsideRange = (day) => {
    if (depStartDateState || departureStartDate) {
      return moment(day).isBefore(depStartDateState || departureStartDate, 'date')
    } else {
      return moment(day).isBefore(moment(), 'date')
    }
  }

  const changeDepartureDatesHandler = ({ startDate, endDate }) => {
    if (retStartDateState) {
      setReturnDates({
        ...retDates,
        retStartDateState: null,
        retEndDateState: null
      })
    }
    if(returnStartDate) {
      updateReducerState('mapData', 'startDateReturn', null)
      updateReducerState('mapData', 'endDateReturn', null)
    }
    setdepDates({
      depStartDateState: startDate,
      depEndDateState: endDate
    })
    if (jType === 'return' && startDate && endDate) {
      setReturnFocus('startDate')
      setDepFocus(null)
    }

    if(startDate=== null && endDate === null) {
      setdepDates({
        depStartDateState: null,
        depEndDateState: null
      })
      updateReducerState('mapData', 'startDateDep', null)
      updateReducerState('mapData', 'endDateDep', null)
      setDepFocus('startDate')
      setReturnFocus(null)
    }
  }

  const changeReturnDatesHandler = ({ startDate, endDate }) => {
    setReturnDates({
      ...retDates,
      retStartDateState: startDate,
      retEndDateState: endDate
    })
    if(startDate=== null && endDate === null) {
      setReturnFocus('startDate')
      updateReducerState('mapData', 'startDateReturn', null)
      updateReducerState('mapData', 'endDateReturn', null)
    }
  }

  const handlerSetDates = () => {
    setSelctedDatesHandler()
    handleClosePopUp()
  }

  const handleClosePopUp = () => {
    setdepDates({
      ...depDates,
      depStartDateState: null,
      depEndDateState: null
    })

    setReturnDates({
      ...retDates,
      retStartDateState: null,
      retEndDateState: null
    })
    setToggalDatesModalHandler(false)
    setDepFocus(null)
    setReturnFocus(null)
  }

  const departRenderDayContent = (date) => <div className="CalendarDay__Date">{moment(date).format('DD')}</div>

  const returnRenderDayContent = (date) => <div className="CalendarDay__Date">{moment(date).format('DD')}</div>

  let deviceWidth = window.innerWidth < 576 ? true : false

  useEffect(() => {
    window.onresize = () => {
      // eslint-disable-next-line
      deviceWidth = window.innerWidth < 576 ? true : false
    }
    // eslint-disable-next-line
  }, [])

  const getStartArrivalMonthDateDeparture = () => {
    if (depStartDateState || departureStartDate) {
      return depStartDateState || departureStartDate
    } else {
      return moment()
    }
  }

  const getStartArrivalMonthDateReturn = () => {
    if (retStartDateState || returnStartDate || depStartDateState || departureStartDate) {
      return retStartDateState || returnStartDate || depStartDateState || departureStartDate
    } else {
      return moment()
    }
  }

  // Manage click outside function call
  useEffect(() => {
    const data = document.getElementsByClassName('show')
    if(data && data.length > 0) {
      document.addEventListener('click', handleClickOutside, true)
    }
    return () => {
        document.removeEventListener('click', handleClickOutside, true)
    }
    // eslint-disable-next-line
})

const handleClickOutside = (event) => {
  if (
      ref.current &&
      !ref.current.contains(event.target)
  ) {
    if(event.target.classList.contains('date-select-popup-overlay')) {
      setSelctedDatesHandler()
      handleClosePopUp()
    }
  }
}

  return (
    <>
      <div ref={ref} className={`date-select-popup ${jType === 'return' ? '' : 'date-select-popup--one-way'} ${toggalDatesModal ? 'show' : ''}`}>
        <div className="date-select-popup__inner mappageDatePicker">
          <Grid className="date-select-popup__grid m-0">
            <Grid.Row className="date-select-popup__header">
              <Grid.Column width={8} className="date-select-popup__depart">
                <label>{intl(flightMessages.outboundDateText)}</label>
                <div className={`DateRangePickerWrapper ${focused ? 'DateRangePickerWrapper--focus' : ''}`}>
                  <DateRangePicker
                    startDate={depStartDateState || departureStartDate || null}
                    startDateId="departureStartDate"
                    endDate={depEndDateState || (!depStartDateState && departureEndDate) || null}
                    endDateId="departureEndDate"
                    onDatesChange={({ startDate, endDate }) => changeDepartureDatesHandler({ startDate, endDate, startDateId: 'departureStartDate' })}
                    focusedInput={focused}
                    numberOfMonths={deviceWidth ? 1 : 2}
                    keepOpenOnDateSelect
                    daySize={35}
                    minimumNights={0}
                    displayFormat="DD/MM/YYYY"
                    onFocusChange={focusedInput => {
                      if (focusedInput) {
                        setReturnFocus(null)
                        setDepFocus(focusedInput)
                      }
                    }}
                    isOutsideRange={(day) => moment(day).isBefore(moment(), 'date')}
                    transitionDuration={0}
                    navPrev={<ArrowPrev />}
                    navNext={<ArrowNext />}
                    renderDayContents={date => departRenderDayContent(date)}
                    initialVisibleMonth={() => getStartArrivalMonthDateDeparture()}
                    readOnly
                    showClearDates
                    minDate={moment()}
                  />
                </div>
              </Grid.Column>
              {jType === 'return' &&
                <Grid.Column width={8} className="date-select-popup__return">
                  <label>{intl(flightMessages.inboundDateText)}</label>
                  <div className={`DateRangePickerWrapper ${focusedReturn ? 'DateRangePickerWrapper--focus' : ''}`}>
                    <DateRangePicker
                      startDate={retStartDateState || (!depStartDateState && returnStartDate) || null}
                      startDateId="returnStartDate"
                      endDate={retEndDateState || (!depStartDateState && !retStartDateState && returnEndDate) || null}
                      endDateId="returnEndDate"
                      onDatesChange={({ startDate, endDate }) => changeReturnDatesHandler({ startDate, endDate, startDateId: 'returnStartDate' })}
                      focusedInput={focusedReturn}
                      numberOfMonths={deviceWidth ? 1 : 2}
                      keepOpenOnDateSelect
                      daySize={35}
                      minimumNights={0}
                      displayFormat="DD/MM/YYYY"
                      onFocusChange={focusedInput => {
                        if (focusedInput) {
                          setDepFocus(null)
                          setReturnFocus(focusedInput)
                        }
                      }}
                      disabled={depStartDateState && depEndDateState ? false : departureStartDate && departureEndDate ? false : true}
                      isOutsideRange={(day) => handleReturnOutsideRange(day, focusedReturn)}
                      transitionDuration={0}
                      navPrev={<ArrowPrev />}
                      navNext={<ArrowNext />}
                      renderDayContents={date => returnRenderDayContent(date)}
                      initialVisibleMonth={() => getStartArrivalMonthDateReturn()}
                      readOnly
                      showClearDates
                      minDate={moment()}
                    />
                  </div>
                </Grid.Column>
              }
            </Grid.Row>
            <Grid.Row className="date-select-popup__body" />
            <Grid.Row className="date-select-popup__footer">
              <Grid.Column width={16} textAlign="right" >
                <Button onClick={() => handleClosePopUp()} className="btn btn--dark-invert">{intl(commonMessages.cancel)}</Button>
                <Button onClick={() => handlerSetDates()} className="btn btn--medium-blue">{intl(commonMessages.setDates)}</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
      <div className={`date-select-popup-overlay ${toggalDatesModal ? 'show' : ''}`} />
    </>
  )
}
DateSelect.propTypes = {
  depDates: PropTypes.object,
  retDates: PropTypes.object,
  toggalDatesModal: PropTypes.bool,
  setSelctedDatesHandler: PropTypes.func,
  departureStartDate: PropTypes.object,
  departureEndDate: PropTypes.object,
  returnStartDate: PropTypes.object,
  returnEndDate: PropTypes.object,
  setToggalDatesModalHandler: PropTypes.func,
  jType: PropTypes.string,
  focused: PropTypes.string,
  focusedReturn: PropTypes.string,
  setDepFocus: PropTypes.func,
  setReturnFocus: PropTypes.func,
  setReturnDates: PropTypes.func,
  setdepDates: PropTypes.func,
  updateReducerState: PropTypes.func
}
export default DateSelect
