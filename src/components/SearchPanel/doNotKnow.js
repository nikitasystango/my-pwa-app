import React from 'react'
import { Grid, Dropdown, Popup } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { sourceCodeOption } from 'constants/globalConstants'
import SingleDateSelectore from './singleDateSelectore'
import moment from 'moment'
import { isMobile } from 'react-device-detect'
import { AppRoutes } from 'constants/appRoutes'
import intl from 'utils/intlMessage'
import searchPanelMessages from 'constants/messages/searchPanelMessages'
import commonMessages from 'constants/messages/commonMessages'
import 'semantic-ui-css/components/popup.min.css'

const DoNOtKnow = (props) => {
  const { doNotKnowObj: { flyFrom, mapDepartureDate, mapDestinationDate },
    journeyType, path, updateDoNotKnowSearch,
    dontKnowError: { dontKnowGoDateError, dontKnowComeBackDateError,
      dontKnowSourceError }, handlerSetDontKnowErrors } = props

  // Handle journey change
  const handlerOnChange = (name, value, errorName) => {
    updateDoNotKnowSearch(name, value)
    if (errorName) {
      handlerSetDontKnowErrors(errorName, false)
    }
  }

  const handleDepartOutsideRange = (name, day) => {
    return moment(day).isBefore(moment(), 'date')
  }

  const handleReturnOutsideRange = (name, day) => {
    if (name === 'mapDestinationDate') {
      return moment(day).isBefore(
        mapDepartureDate || moment(),
        'date'
      )
    } else {
      return moment(day).isBefore(mapDepartureDate, 'date')
    }
  }

  const onDateSelect = (name, value) => {
    updateDoNotKnowSearch(name, value)
    updateDoNotKnowSearch('mapDestinationDate', null)
    handlerSetDontKnowErrors('dontKnowGoDateError', false)
  }

  const onSelectTravelValues = (name, value) => {
    updateDoNotKnowSearch(name, value)
    handlerSetDontKnowErrors('dontKnowComeBackDateError', false)
  }
  return (
    <Grid className="dont-know-grid">
      <Grid.Row>
        {journeyType === 'one-way' ?
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={9}
            widescreen={10}
            className="dropdown doNotKnowSection dont-know-grid__column dont-know-grid__column--dropdown" textAlign="center"
          >
            <Dropdown
              fluid
              options={sourceCodeOption}
              placeholder={intl(searchPanelMessages.whereYouWantToFly)}
              value={flyFrom}
              onChange={(e, { value }) => handlerOnChange('flyFrom', value, 'dontKnowSourceError')}
              className={dontKnowSourceError ? 'error-field' : ''}
            />
          </Grid.Column>
          :
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={7}
            widescreen={7}
            className="dropdown doNotKnowSection whereDoyouFlyDropDown dont-know-grid__column dont-know-grid__column--dropdown"
            textAlign="center"
          >
            <Dropdown
              fluid
              options={sourceCodeOption}
              placeholder={path === AppRoutes.CALENDER ? <Popup content={intl(searchPanelMessages.whereYouWantToFly)} trigger={<span>{intl(searchPanelMessages.whereYouWantToFly)}</span>} /> : intl(searchPanelMessages.whereYouWantToFly)}
              value={flyFrom}
              onChange={(e, { value }) => handlerOnChange('flyFrom', value, 'dontKnowSourceError')}
              className={dontKnowSourceError ? 'error-field' : ''}
            />

          </Grid.Column>
        }
        {journeyType === 'one-way' ?
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={7}
            widescreen={6}
            className="dropdown ipadSet dont-know-grid__column dont-know-grid__column--date-picker"
            textAlign="center"
          >
            <Grid className="">
              <Grid.Row>
                <Grid.Column
                  mobile={16}
                  tablet={16}
                  computer={16}
                  widescreen={16}
                  className={`dropdown doNotKnowSection ipadDateSelector ${journeyType === 'one-way' && path === AppRoutes.LOCATION ? 'oneWayJourney' : 'oneWayJourneyDatePick'}  ${journeyType === 'one-way' && path === AppRoutes.CALENDER ? 'oneWayStartDates datePick' : ''} ${isMobile ? 'singleWay' : ''} ${dontKnowGoDateError ? 'error-field' : ''}`}
                  textAlign="left"
                >
                  <SingleDateSelectore
                    date={mapDepartureDate}
                    name="mapDepartureDate"
                    onSelectTravel={onDateSelect}
                    placeholder={intl(commonMessages.startDate)}
                    isOutsideRange={handleDepartOutsideRange}
                    className="error-field"
                    renderDayContents={date => <div className="CalendarDay__Date">{moment(date).format('DD')}</div>}
                    startMonthDate={mapDepartureDate}
                  />
                </Grid.Column>
                {journeyType === 'return' &&
                  <Grid.Column
                    mobile={16}
                    tablet={8}
                    computer={8}
                    widescreen={8}
                    className={`dropdown doNotKnowSection ipadDateSelector pl-0 ${dontKnowComeBackDateError ? 'error-field' : ''}`}
                    textAlign="left"
                  >
                    <SingleDateSelectore
                      date={mapDestinationDate}
                      name="mapDestinationDate"
                      onSelectTravel={onSelectTravelValues}
                      placeholder={intl(commonMessages.endDate)}
                      isOutsideRange={handleReturnOutsideRange}
                      renderDayContents={date => <div className="CalendarDay__Date">{moment(date).format('DD')}</div>}
                      startMonthDate={mapDestinationDate || mapDepartureDate}
                    />

                  </Grid.Column>
                }
              </Grid.Row>
            </Grid>
          </Grid.Column>
          :
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={9}
            widescreen={9}
            className="dropdown ipadSet dont-know-grid__column"
            textAlign="center"
          >
            <Grid className="dont-know-start-end-date-grid">
              <Grid.Row>
                <Grid.Column
                  mobile={16}
                  tablet={8}
                  computer={8}
                  widescreen={8}
                  className={`dropdown doNotKnowSection ipadDateSelector mt-2px  ${isMobile ? 'singleWay' : ''} mapView ${dontKnowGoDateError ? 'error-field' : ''}`}
                  textAlign="left"
                >
                  <SingleDateSelectore
                    date={mapDepartureDate}
                    name="mapDepartureDate"
                    onSelectTravel={onDateSelect}
                    placeholder={intl(commonMessages.startDate)}
                    isOutsideRange={handleDepartOutsideRange}
                    renderDayContents={date => <div className="CalendarDay__Date">{moment(date).format('DD')}</div>}
                    startMonthDate={mapDepartureDate}
                  />
                </Grid.Column>
                {journeyType === 'return' &&
                  <Grid.Column
                    mobile={16}
                    tablet={8}
                    computer={8}
                    widescreen={8}
                    className={`dropdown doNotKnowSection ipadDateSelector mt-2px prRemove ${isMobile ? 'singleWay' : ''} mapView
                    ${dontKnowComeBackDateError ? 'error-field' : ''}`}
                    textAlign="left"
                  >
                    <SingleDateSelectore
                      date={mapDestinationDate}
                      name="mapDestinationDate"
                      onSelectTravel={onSelectTravelValues}
                      placeholder={intl(commonMessages.endDate)}
                      isOutsideRange={handleReturnOutsideRange}
                      renderDayContents={date => <div className="CalendarDay__Date">{moment(date).format('DD')}</div>}
                      startMonthDate={mapDestinationDate || mapDepartureDate}
                    />

                  </Grid.Column>
                }
              </Grid.Row>
            </Grid>
          </Grid.Column>
        }
      </Grid.Row>
    </Grid>
  )
}

DoNOtKnow.propTypes = {
  doNotKnowObj: PropTypes.object,
  journeyType: PropTypes.string,
  handlerSetDontKnowErrors: PropTypes.func,
  path: PropTypes.string,
  dontKnowError: PropTypes.object,
  updateDoNotKnowSearch: PropTypes.func
}

export default DoNOtKnow
