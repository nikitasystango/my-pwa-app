import React, { useState } from 'react'
import TreeSelect from 'rc-tree-select'
import PropTypes from 'prop-types'
import AmericanLogo from './assets/american_airlines.png'
// import BritishLogo from './assets/british-airways.svg'
import { BritishLogo } from '../../utils/svgs'
import intl from 'utils/intlMessage'
import searchPanelMessages from 'constants/messages/searchPanelMessages'
import commonMessages from 'constants/messages/commonMessages'
import { AppRoutes } from 'constants/appRoutes'
import history from 'utils/history'
import { retrieveFromLocalStorage } from 'utils/helpers'
import { handleSetTrueToCabinClass } from 'utils/commonFunction'

const AirlineSelector = (props) => {
  const { airlines, handlerSetError, getSouDesLocations, getSouDesPossibleRoutes, location, isCalendarHover, updateReducerState } = props

  const [isOpen, setIsOpen] = useState(false)

  React.useMemo(()=> {
    // Close dropdown if div overlaps calendar
    if(isCalendarHover) {
      setIsOpen(false)
      updateReducerState('flights', 'isCalendarHover', false)
    }
    // eslint-disable-next-line
  }, [isCalendarHover])

  const handleSelectedItem = (selectedAirline, node) => {
    const { props: { data } } = node
    const { searchPanel: { selectedAirline: currentlySelectedAirline, selectedAirlineCode, ticketsSearchBox }, updateReducerState } = props
    const { airlineCode, membershipCode } = data
    if(location !== AppRoutes.CALENDER && location !== AppRoutes.LOCATION) {
      history.push({
        pathname: data.airlineCode === airlineName.VA.CODE ? AppRoutes.VIRGIN_ATLANTIC_REWARD_FLIGHTS : AppRoutes.HOME,
        search: appendParams || '',
        state: {
          selectedAirline: `${airlineCode}_${membershipCode}`,
          selectedAirlineCode: airlineCode,
          airlineMembership: membershipCode,
          membership: membershipCode
        }
      })
    }

    if (currentlySelectedAirline !== selectedAirline) {
      const index = selectedAirline.indexOf('_')
      const airlineMember = selectedAirline.substr(index + 1)
      updateReducerState('searchPanel', 'selectedAirline', selectedAirline)
      updateReducerState('searchPanel', 'airlineMembership', airlineMember)
      updateReducerState('searchPanel', 'selectedAirlineCode', data.airlineCode ? data.airlineCode : null)
      updateReducerState('searchPanel', 'membership', data.membershipCode ? data.membershipCode : null)
      updateReducerState('searchPanel', 'calendarSupport', data.calendarSupport ? data.calendarSupport : false)
    }
    if(selectedAirlineCode !== data.airlineCode && location === AppRoutes.CALENDER) {
      const values = retrieveFromLocalStorage(`${data.airlineCode === airlineName.BA.CODE ? 'recentSearch' : 'recentSearchVA'} `)
      let dataJson = {}
      if(values) {
        const data = values.split(';')
        if (data && data.length) {
           dataJson = JSON.parse(data[0])
        }
      }
      getSouDesLocations({ selectedAirline: data.airlineCode })
      getSouDesPossibleRoutes({ selectedAirline: data.airlineCode })
      updateReducerState('searchPanel', 'arrival', dataJson.arrival ? dataJson.arrival : {
        name: '',
        value: ''
      })
      updateReducerState('searchPanel', 'departure', dataJson.departure ? dataJson.departure : {
        name: '',
        value: ''
      })

      // To filter cabin class according to membership tier selection
      const selectedClasses = handleSetTrueToCabinClass(data.airlineCode)
      updateReducerState('searchPanel', 'toggalClasses', selectedClasses)

    } else if(selectedAirlineCode !== data.airlineCode && location === AppRoutes.LOCATION) {
      updateReducerState('mapData', 'sourceLocation', {
        name: '',
        value: ''
      })
      updateReducerState('mapData', 'destinationLocation', {
        name: '',
        value: ''
      })
    }

    // update ticket class on change of Airline
    if (selectedAirlineCode !== data.airlineCode) {
      const airlineIndex = airlines.findIndex(item => item.value === data.airlineCode)
      if (airlineIndex > -1) {
        const supportedClasses = airlines[airlineIndex].classes ? airlines[airlineIndex].classes : []
        if (supportedClasses.length) {
          const defaultPassengerData = {
            ...ticketsSearchBox,
            ticketClass: {
              label: supportedClasses[0].title,
              value: supportedClasses[0].value
            }
          }
          updateReducerState('searchPanel', 'ticketsSearchBox', defaultPassengerData)
        }
      }
    }
    handlerSetError('airlineError', false)
  }

  const arrangeAirlinesList = () => {
    const { airlines } = props
    const finalValues = []
     // eslint-disable-next-line
    airlines.map((item, index) => {
      const membershipsChildren = []
      if (item.memberships && item.memberships.length) {
        item.memberships.map((member) => {
          membershipsChildren.push({
            key: `${item.value}${member.value}`,
            title:
              // eslint-disable-next-line react/jsx-indent
              <p className="active-list-item place-list-item">
                {`${member.title}`}
                {member?.value === 'blue' &&
                  <span className="ad-right-info">{intl(commonMessages.chooseIfUnsure)}</span>
                }
              </p>,
            value: `${item.value}_${member.value}`,
            // value: `${member.value}`,
            data: {
              airline: item.airline,
              airlineCode: item.value,
              membershipType: member.title,
              membershipCode: member.value,
              calendarSupport: item.calendarSupport
            }
          })
          return membershipsChildren
        })
        finalValues.push({
          key: index,
          title:
            // eslint-disable-next-line react/jsx-indent
            <p className="active-list-item place-list-item airline">
              <span className="airline__logo">
                {/* <img className="airline__logo-img lazyload" src={index === 0 ? BritishLogo : AmericanLogo} alt="✈️airlines" /> */}
                {
                  index === 0
                    ?
                      <BritishLogo className="airline__logo-img lazyload" />
                    :
                      <img className="airline__logo-img lazyload" src={AmericanLogo} alt="✈️airlines" />
                }
              </span>
              <span className="airline__name">{item.airline}</span>
            </p>,
          value: item.value,
          disabled: true,
          children: membershipsChildren,
          data: {
            airline: item.airline,
            airlineCode: item.value,
            membershipCode: null,
            calendarSupport: item.calendarSupport
          }
        })
      } else {
        finalValues.push({
          key: index,
          title:
            // eslint-disable-next-line react/jsx-indent
            <p className="active-list-item place-list-item">
              {item.airline}
            </p>,
          value: item.value,
          disabled: true,
          data: {
            airline: item.airline,
            airlineCode: item.value,
            membershipCode: null,
            calendarSupport: item.calendarSupport
          }
        })
      }
    })
    return finalValues
  }

  const getSelectedAirlineValue = (currentlySelectedAirline, selectedAirlineCode) => {
    let value = intl(searchPanelMessages.selectBaExecutive)
    if (currentlySelectedAirline) {
      const index = currentlySelectedAirline.indexOf('_')
      const result = currentlySelectedAirline.substr(index + 1)
      value =
        <div className="airline-logo">
          {/* <img className="airline-logo__img lazyload" src={selectedAirlineCode === 'AA' ? AmericanLogo : BritishLogo} alt="airlines✈️" /> */}
          {
            selectedAirlineCode === airlineName.AA.CODE
              ?
                <img className="airline-logo__img lazyload" src={AmericanLogo} alt="✈️airlines" />
              :
                <BritishLogo className="airline-logo__img lazyload" />
          }
          <span>{selectedAirlineCode} | <span className="text-capitalize">{result}</span></span>
        </div>
    }
    return value
  }

  const treeData = arrangeAirlinesList()
  const { fetchingAirlines, searchPanel: { selectedAirline: currentlySelectedAirline, selectedAirlineCode }, dropdownClassName, className } = props
  return (
    <TreeSelect
      open={isOpen}
      treeData={treeData}
      value={getSelectedAirlineValue(currentlySelectedAirline, selectedAirlineCode)}
      transitionName="rc-tree-select-dropdown-slide-up"
      treeDefaultExpandAll
      style={{ width: 250 }}
      dropdownStyle={{ maxHeight: 200, overflow: 'auto', zIndex: 1500 }}
      filterTreeNode={false}
      notFoundContent={fetchingAirlines ? <span>{intl(searchPanelMessages.fetchingAirlines)}</span> : intl(searchPanelMessages.noAirlinesFound)}
      treeNodeFilterProp="value"
      treeNodeLabelProp="title"
      onSelect={handleSelectedItem}
      showSearch={false}
      dropdownClassName={dropdownClassName ? dropdownClassName : ''}
      className={className ? className : ''}
      onDropdownVisibleChange={(visible)=> setIsOpen(visible)}
    />
  )
}

AirlineSelector.propTypes = {
  airlines: PropTypes.array,
  fetchingAirlines: PropTypes.bool,
  searchPanel: PropTypes.object,
  updateReducerState: PropTypes.func,
  dropdownClassName: PropTypes.string,
  className: PropTypes.string,
  handlerSetError: PropTypes.func,
  getSouDesLocations: PropTypes.func,
  getSouDesPossibleRoutes: PropTypes.func,
  location: PropTypes.string,
  isCalendarHover: PropTypes.bool
}

export default React.memo(AirlineSelector)
