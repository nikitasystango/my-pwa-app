import React from 'react'
import { Grid, Dropdown } from 'semantic-ui-react'
// import { InputRadio } from 'utils/formUtils'
import PropTypes from 'prop-types'
import intl from 'utils/intlMessage'
import commonMessages from 'constants/messages/commonMessages'
import { AppRoutes } from 'constants/appRoutes'

const JourneyTypeSelector = (props) => {
  const { updateReducerState, journeyType } = props
  const options = [
    {
      key: '1',
      text: intl(commonMessages.oneWay),
      value: 'one-way'
    },
    {
      key: '2',
      text: intl(commonMessages.return),
      value: 'return'
    }
  ]

  // Handle journey change
  const onJourneyChange = (e, { value }) => {
    updateReducerState('searchPanel', 'journeyType', value)
    if (value === 'one-way') {
      updateReducerState('searchPanel', 'returnStartDate', '')
      updateReducerState('searchPanel', 'returnEndDate', '')
    }else{
      window.location.pathname === AppRoutes.LOCATION &&
      updateReducerState('mapData', 'flyToSearch', 'travelFrom')
    }
  }

  return (
    <Grid.Row>
      <Dropdown
        inline
        options={options}
        placeholder={intl(commonMessages.journey)}
        value={journeyType}
        onChange={onJourneyChange}
      />
    </Grid.Row>
  )
}

JourneyTypeSelector.propTypes = {
  updateReducerState: PropTypes.func,
  journeyType: PropTypes.string
}

export default React.memo(JourneyTypeSelector)

