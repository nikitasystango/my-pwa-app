import React, { useEffect, useState, useMemo } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import AlertBox from './alertBox'
import { Link } from 'react-router-dom'
import history from 'utils/history'
import { CreateAlert, SortIconUp, SortIconDown } from '../../utils/svgs'
import Loader from 'components/LoadingSpinner'
import SeoHelmet from 'utils/seoHelmet'
import Messages from 'constants/messages'
import SeoTexts from 'constants/seoConstants'
import { AppRoutes } from '../../constants/appRoutes'
import SendAlertCard from '../SearchPanel/sendAlertCard'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import dashboardMessages from 'constants/messages/dashboardMessages'
import './assets/my-alert.scss'
import { sortText } from 'utils/helpers'

const MyAlert = (props) => {
  const {
    editAlert,
    airlines,
    cancelSubscribedAlerts,
    myAlerts: { alerts, editAlertLoading, fetchingAlerts, cancellingAlert },
    pageAnalytics,
    user: {
      isUserSilverMember,
      isUserGoldMember,
      createAlertsLimit,
      allowedAlertDateRange
    },
    getAirlineList,
    search,
    pathname,
    updateReducerState,
    getFlightAvailability,
    flights,
    searchPanel: { availablePassengerCabinClasses }
  } = props

  const [selectedValue, setSelectedValue] = useState('start_date')

  const [sortBy, setSortBy] = useState({
    'start_date': {
      sort: 'asc'
    },
    'source_code': {
      sort: 'AtoZ'
    },
    'destination_code': {
      sort: 'AtoZ'
    }
  })

  const sortedAlertList = useMemo(
    () =>
      alerts.sort((a, b) => {
        let sortList = []
        if (selectedValue === 'start_date') {
          sortList =
          sortBy[selectedValue].sort === 'asc'
              ? new Date(b[selectedValue]).valueOf() -
                new Date(a[selectedValue]).valueOf()
              : new Date(a[selectedValue]).valueOf() -
                new Date(b[selectedValue]).valueOf()
        } else sortList = sortText(a, b, sortBy, selectedValue)
        return sortList
      }),
      // eslint-disable-next-line
    [alerts, sortBy]
  )

  const cancelAlertSubscription = (id) => {
    cancelSubscribedAlerts(id)
  }

  useEffect(() => {
    if (!airlines.length) {
      getAirlineList({ isSetDefault: false, selectedAirline: 'BA' })
    }
    pageAnalytics()
    // eslint-disable-next-line
  }, [])


  const handleChangeSort = (str) => {
    setSelectedValue(str ? str : 'start_date')
    let sortCond = ''
    if(str === 'start_date') {
      sortCond = sortBy[str].sort === 'asc'
      ? 'desc'
      : sortBy[str].sort === 'desc'
      ? 'asc'
      : 'desc'

    }else{
      sortCond = sortBy[str].sort === 'ZtoA'
      ? 'AtoZ'
      : sortBy[str].sort === 'AtoZ'
      ? 'ZtoA'
      : 'AtoZ'
    }
      setSortBy({
        ...sortBy,
        [str]: {
          sort: sortCond
        }
      })
    }


  const renderLoader = () => {
    let loader = null
    if (fetchingAlerts) {
      loader = <Loader message={Messages.FETCHING_ALERTS_LIST} />
    } else if (cancellingAlert) {
      loader = <Loader message={Messages.CANCELLING_ALERT} />
    } else if (editAlertLoading) {
      loader = <Loader />
    }
    return loader
  }

  return (
    <>
      {renderLoader()}
      <SeoHelmet title={SeoTexts.ALERT_TITLE} />
      {alerts && alerts.length ? (
        <>
          <Grid className="m-0 p-0">
            <Grid.Row className="pt-0">
              {!isUserSilverMember && !isUserGoldMember && (
                <p className="note-text note-text--my-alert">
                  {intl(dashboardMessages.myAlertAlertPerDay)}{' '}
                  <Link to={AppRoutes.PRICING} className="text-medium-blue">
                    {intl(dashboardMessages.myAlertPricingPerMonth)}
                  </Link>
                </p>
              )}
              {isUserSilverMember && (
                <p className="note-text note-text--my-alert">
                  {intl(dashboardMessages.myAlertAlertPerDaySilver)}{' '}
                  <Link to={AppRoutes.PRICING} className="text-medium-blue">
                    {intl(dashboardMessages.myAlertPricingPerMonthSilver)}
                  </Link>
                </p>
              )}
              <Grid.Column mobile={16} tablet={3} computer={3} widescreen={3}>
                <h2 className="alerts-count">
                  {alerts && alerts.length} Alert
                  {alerts && alerts.length > 1 && 's'}
                </h2>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={13} computer={13} widescreen={13} className="sort-button-main-wrap">
                <div
                  className = "sort-alert-wrap"
                >
                  <span className="sortText">{intl(commonMessages.sortBy)}: </span>
                  <div
                   className={`sort-button ${selectedValue === 'start_date' ? 'highlight-btn': ''}`}
                    onClick={() =>
                      handleChangeSort('start_date')
                    }
                  >
                    {sortBy['start_date'].sort === 'asc' ?
                      <SortIconUp/>
                    : <SortIconDown/>
                    }
                    {intl(commonMessages.departureDate)}
                  </div>
                  <div
                   className={`sort-button ${selectedValue === 'source_code' ? 'highlight-btn': ''}`}
                    onClick={() =>
                      handleChangeSort('source_code')
                    }
                  >
                    {sortBy['source_code'].sort === 'AtoZ' ?
                      <SortIconUp/>
                    : <SortIconDown/>
                    }
                    {intl(commonMessages.originText)}
                  </div>
                  <div
                   className={`sort-button ${selectedValue === 'destination_code' ? 'highlight-btn': ''}`}
                    onClick={() =>
                      handleChangeSort('destination_code')
                    }
                  >
                    {sortBy["destination_code"].sort === 'AtoZ' ?
                      <SortIconUp/>
                    : <SortIconDown/>
                    }
                    {intl(commonMessages.destinationText)}
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {sortedAlertList.map((item, index) => (
            <AlertBox
              key={index + 1}
              data={item}
              cancelAlertSubscription={cancelAlertSubscription}
              airlines={airlines}
              editAlert={editAlert}
              editAlertLoading={editAlertLoading}
              search={search}
              alerts={alerts}
              updateReducerState={updateReducerState}
              getFlightAvailability={getFlightAvailability}
              flights={flights}
              allowedAlertDateRange={allowedAlertDateRange}
              isUserGoldMember={isUserGoldMember}
              isUserSilverMember={isUserSilverMember}
              availablePassengerCabinClasses={availablePassengerCabinClasses}
            />
          ))}

          <SendAlertCard
            label={'myAlerts'}
            pathname={pathname}
            alertMessage={
              createAlertsLimit === alerts.length
                ? isUserGoldMember
                  ? `You can only have ${createAlertsLimit} ${Messages.CREATE_ALERT_LIMIT_GOLD}`
                  : `You can only have ${createAlertsLimit} ${Messages.CREATE_ALERT_LIMIT}`
                : Messages.CREATE_ANOTHER_ALERT_SEARCH
            }
            hideSearchButton={createAlertsLimit === alerts.length}
          />
        </>
      ) : (
        <div className="no-alert-box min-h-100">
          <div className="no-alert-box__inner">
            <CreateAlert className="d-b mx-auto" />
            <p className="text-light my-2">
              {intl(dashboardMessages.myAlertMakeSearch)}
            </p>
            <Button
              onClick={() => history.push(AppRoutes.HOME)}
              className="btn btn--medium-blue"
            >
              {intl(commonMessages.search)}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

MyAlert.propTypes = {
  cancelSubscribedAlerts: PropTypes.func,
  myAlerts: PropTypes.object,
  pageAnalytics: PropTypes.func,
  user: PropTypes.object,
  airlines: PropTypes.array,
  getAirlineList: PropTypes.func,
  editAlert: PropTypes.func,
  search: PropTypes.object,
  pathname: PropTypes.object,
  updateReducerState: PropTypes.func,
  getFlightAvailability: PropTypes.func,
  flights: PropTypes.object,
  searchPanel: PropTypes.object
}

export default MyAlert
