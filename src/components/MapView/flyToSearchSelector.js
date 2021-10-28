import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Form, Radio } from 'semantic-ui-react'
import intl from 'utils/intlMessage'
import mapViewMessages from 'constants/messages/mapViewMessages'

const FlyToSearchSelector = (props) => {
    const { selectedValue, handleChange } = props
  return (
    <div className="fly-search-wrap">
      <Form>
        <Form.Field>
          <Radio
            label={intl(mapViewMessages.iknowWhereIWantToGo)}
            name="travelFrom"
            value="travelFrom"
            checked={selectedValue === 'travelFrom'}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label={intl(mapViewMessages.iDontknowWhereIWantToGo)}
            name="travelTo"
            value="travelTo"
            checked={selectedValue === 'travelTo'}
            onChange={handleChange}
          />
        </Form.Field>
      </Form>
    </div>
  )
}

FlyToSearchSelector.propTypes = {
  selectedValue: PropTypes.string,
  handleChange: PropTypes.func
}

export default withRouter(FlyToSearchSelector)
